-- Trade matching function: finds users who have cards I want, and want cards I have
create or replace function public.find_trade_matches(current_user_id uuid)
returns table (
  match_user_id uuid,
  match_username text,
  match_display_name text,
  they_have_i_want bigint,
  i_have_they_want bigint,
  total_match_score bigint
) as $$
begin
  return query
  with my_wants as (
    select card_id from user_cards where user_id = current_user_id and status = 'want'
  ),
  my_haves as (
    select card_id from user_cards where user_id = current_user_id and status in ('have', 'for_trade')
  ),
  they_have_i_want as (
    select uc.user_id, count(*) as cnt
    from user_cards uc
    join my_wants mw on uc.card_id = mw.card_id
    where uc.user_id != current_user_id
    and uc.status in ('have', 'for_trade')
    group by uc.user_id
  ),
  i_have_they_want as (
    select uc.user_id, count(*) as cnt
    from user_cards uc
    join my_haves mh on uc.card_id = mh.card_id
    where uc.user_id != current_user_id
    and uc.status = 'want'
    group by uc.user_id
  )
  select
    coalesce(t.user_id, i.user_id) as match_user_id,
    p.username as match_username,
    p.display_name as match_display_name,
    coalesce(t.cnt, 0) as they_have_i_want,
    coalesce(i.cnt, 0) as i_have_they_want,
    coalesce(t.cnt, 0) + coalesce(i.cnt, 0) as total_match_score
  from they_have_i_want t
  full outer join i_have_they_want i on t.user_id = i.user_id
  join profiles p on p.id = coalesce(t.user_id, i.user_id)
  order by total_match_score desc
  limit 50;
end;
$$ language plpgsql security definer;

-- Badges table
create table if not exists badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  badge_type text not null,
  badge_name text not null,
  badge_description text,
  earned_at timestamptz not null default now(),
  metadata jsonb,
  unique(user_id, badge_type)
);

create index idx_badges_user on badges(user_id);

alter table badges enable row level security;

create policy "Badges are viewable by everyone"
  on badges for select using (true);

create policy "System can insert badges"
  on badges for insert with check (auth.uid() = user_id);

-- Add estimated_value_cents to cards for collection valuation
alter table cards add column if not exists estimated_value_cents int;
