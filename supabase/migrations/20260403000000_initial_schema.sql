-- GPK Vault: Initial Schema
-- Creates all tables for collection management, trading, and marketplace

-- Custom enum types
create type card_status as enum ('have', 'want', 'for_sale', 'for_trade');
create type trade_status as enum ('pending', 'accepted', 'rejected', 'cancelled');
create type listing_status as enum ('active', 'sold', 'cancelled');

-- Sets: GPK series/sets metadata
create table sets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year int not null,
  series text not null,
  total_cards int not null default 0,
  image_url text,
  created_at timestamptz not null default now()
);

-- Cards: individual cards with A/B name variants
create table cards (
  id uuid primary key default gen_random_uuid(),
  set_id uuid not null references sets(id) on delete cascade,
  number text not null,
  name_a text not null,
  name_b text,
  image_url_a text,
  image_url_b text,
  is_parallel boolean not null default false,
  parallel_type text,
  created_at timestamptz not null default now(),
  unique (set_id, number, is_parallel, parallel_type)
);

create index idx_cards_set_id on cards(set_id);

-- Profiles: user profiles linked to auth.users
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- User cards: collection entries
create table user_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  card_id uuid not null references cards(id) on delete cascade,
  status card_status not null,
  quantity int not null default 1 check (quantity > 0),
  condition text,
  notes text,
  price_cents int check (price_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_user_cards_user on user_cards(user_id);
create index idx_user_cards_card on user_cards(card_id);
create index idx_user_cards_status on user_cards(user_id, status);

-- Trades: trade proposals between users
create table trades (
  id uuid primary key default gen_random_uuid(),
  proposer_id uuid not null references profiles(id) on delete cascade,
  receiver_id uuid not null references profiles(id) on delete cascade,
  status trade_status not null default 'pending',
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_trades_proposer on trades(proposer_id);
create index idx_trades_receiver on trades(receiver_id);

-- Trade items: cards included in a trade
create table trade_items (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid not null references trades(id) on delete cascade,
  card_id uuid not null references cards(id),
  offered_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create index idx_trade_items_trade on trade_items(trade_id);

-- Listings: marketplace sale listings
create table listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  card_id uuid not null references cards(id),
  price_cents int not null check (price_cents > 0),
  condition text not null,
  description text,
  status listing_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_listings_user on listings(user_id);
create index idx_listings_card on listings(card_id);
create index idx_listings_status on listings(status);

-- Row Level Security
alter table sets enable row level security;
alter table cards enable row level security;
alter table profiles enable row level security;
alter table user_cards enable row level security;
alter table trades enable row level security;
alter table trade_items enable row level security;
alter table listings enable row level security;

-- Sets & Cards: readable by everyone (public catalog)
create policy "Sets are viewable by everyone"
  on sets for select using (true);

create policy "Cards are viewable by everyone"
  on cards for select using (true);

-- Profiles: readable by everyone, writable by owner
create policy "Profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- User cards: readable by everyone, writable by owner
create policy "User cards are viewable by everyone"
  on user_cards for select using (true);

create policy "Users can insert own cards"
  on user_cards for insert with check (auth.uid() = user_id);

create policy "Users can update own cards"
  on user_cards for update using (auth.uid() = user_id);

create policy "Users can delete own cards"
  on user_cards for delete using (auth.uid() = user_id);

-- Trades: viewable by participants, insertable by proposer
create policy "Trades viewable by participants"
  on trades for select using (
    auth.uid() = proposer_id or auth.uid() = receiver_id
  );

create policy "Users can propose trades"
  on trades for insert with check (auth.uid() = proposer_id);

create policy "Trade participants can update"
  on trades for update using (
    auth.uid() = proposer_id or auth.uid() = receiver_id
  );

-- Trade items: viewable by trade participants
create policy "Trade items viewable by participants"
  on trade_items for select using (
    exists (
      select 1 from trades
      where trades.id = trade_items.trade_id
      and (trades.proposer_id = auth.uid() or trades.receiver_id = auth.uid())
    )
  );

create policy "Trade proposer can add items"
  on trade_items for insert with check (auth.uid() = offered_by);

-- Listings: readable by everyone, writable by owner
create policy "Listings are viewable by everyone"
  on listings for select using (true);

create policy "Users can create own listings"
  on listings for insert with check (auth.uid() = user_id);

create policy "Users can update own listings"
  on listings for update using (auth.uid() = user_id);

create policy "Users can delete own listings"
  on listings for delete using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || left(new.id::text, 8)),
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'username')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger function
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on profiles
  for each row execute function public.update_updated_at();

create trigger set_updated_at before update on user_cards
  for each row execute function public.update_updated_at();

create trigger set_updated_at before update on trades
  for each row execute function public.update_updated_at();

create trigger set_updated_at before update on listings
  for each row execute function public.update_updated_at();
