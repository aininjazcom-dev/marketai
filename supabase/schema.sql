-- Supabase Schema for MarketingMate AI

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  restaurant_name text,
  location text,
  plan_type text default 'Pro Plan',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MARKETING KITS
create table if not exists public.marketing_kits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  subtitle text,
  icon_type text,
  status text default 'Ready',
  date date default current_date
);

-- NOTIFICATIONS
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  time timestamp with time zone default timezone('utc'::text, now()) not null,
  type text,
  is_unread boolean default true
);

-- PROJECTS
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  type text,
  status text,
  image_url text
);

-- ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.marketing_kits enable row level security;
alter table public.notifications enable row level security;
alter table public.projects enable row level security;

-- POLICIES
-- Profiles: Users can view and update their own profile
create policy "Users can view own profile" on public.profiles for select using ( auth.uid() = id );
create policy "Users can update own profile" on public.profiles for update using ( auth.uid() = id );

-- Marketing Kits: Users can view their own kits
create policy "Users can view own marketing kits" on public.marketing_kits for select using ( auth.uid() = user_id );

-- Notifications: Users can view their own notifications
create policy "Users can view own notifications" on public.notifications for select using ( auth.uid() = user_id );

-- Projects: Users can view their own projects
create policy "Users can view own projects" on public.projects for select using ( auth.uid() = user_id );
