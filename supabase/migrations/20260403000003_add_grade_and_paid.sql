-- Add grade and price_paid_cents to user_cards for detailed tracking
alter table user_cards add column if not exists grade text;
alter table user_cards add column if not exists price_paid_cents int check (price_paid_cents >= 0);
