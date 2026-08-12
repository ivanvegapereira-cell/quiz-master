-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table (inherits from auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  school text,
  profile_picture text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create student_groups table
create table public.student_groups (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create students table
create table public.students (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  group_id uuid references public.student_groups(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create quizzes table
create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text,
  subject text,
  duration integer,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create questions table
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  text text not null,
  type text not null check (type in ('multiple_choice', 'true_false')),
  difficulty text not null default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
  points integer default 10,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create question_options table
create table public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  text text not null,
  is_correct boolean default false,
  "order" integer not null
);

-- Create live_sessions table
create table public.live_sessions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  teacher_id uuid not null references public.users(id) on delete cascade,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  current_question_index integer default 0,
  status text not null default 'waiting' check (status in ('waiting', 'active', 'finished')),
  session_code text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create student_answers table
create table public.student_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  selected_option_id uuid references public.question_options(id) on delete set null,
  is_correct boolean,
  time_taken integer,
  points_earned integer default 0,
  answered_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create leaderboards table
create table public.leaderboards (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  total_points integer default 0,
  rank integer,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create rewards table
create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  description text,
  cost_in_points integer not null,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reward_transactions table
create table public.reward_transactions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  reward_id uuid not null references public.rewards(id) on delete cascade,
  redeemed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  notes text
);

-- Create student_feedback_guides table
create table public.student_feedback_guides (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  guide_content text not null,
  reviewed_by_teacher boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index idx_students_teacher_id on public.students(teacher_id);
create index idx_students_group_id on public.students(group_id);
create index idx_student_groups_teacher_id on public.student_groups(teacher_id);
create index idx_quizzes_teacher_id on public.quizzes(teacher_id);
create index idx_questions_quiz_id on public.questions(quiz_id);
create index idx_question_options_question_id on public.question_options(question_id);
create index idx_live_sessions_teacher_id on public.live_sessions(teacher_id);
create index idx_live_sessions_quiz_id on public.live_sessions(quiz_id);
create index idx_student_answers_session_id on public.student_answers(session_id);
create index idx_student_answers_student_id on public.student_answers(student_id);
create index idx_leaderboards_session_id on public.leaderboards(session_id);
create index idx_rewards_teacher_id on public.rewards(teacher_id);
create index idx_reward_transactions_student_id on public.reward_transactions(student_id);
create index idx_student_feedback_guides_session_id on public.student_feedback_guides(session_id);
create index idx_student_feedback_guides_student_id on public.student_feedback_guides(student_id);
