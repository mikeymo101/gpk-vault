-- Add description column to sets table
alter table sets add column if not exists description text;
alter table sets add column if not exists release_date text;
alter table sets add column if not exists artists text;
alter table sets add column if not exists notable text;
