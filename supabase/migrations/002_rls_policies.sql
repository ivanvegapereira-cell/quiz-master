-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.student_groups enable row level security;
alter table public.students enable row level security;
alter table public.quizzes enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.live_sessions enable row level security;
alter table public.student_answers enable row level security;
alter table public.leaderboards enable row level security;
alter table public.rewards enable row level security;
alter table public.reward_transactions enable row level security;
alter table public.student_feedback_guides enable row level security;

-- Users table policies
create policy "Users can read their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Student groups policies
create policy "Teachers can read their groups"
  on public.student_groups for select
  using (auth.uid() = teacher_id);

create policy "Teachers can insert their groups"
  on public.student_groups for insert
  with check (auth.uid() = teacher_id);

create policy "Teachers can update their groups"
  on public.student_groups for update
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

create policy "Teachers can delete their groups"
  on public.student_groups for delete
  using (auth.uid() = teacher_id);

-- Students policies
create policy "Teachers can read their students"
  on public.students for select
  using (auth.uid() = teacher_id);

create policy "Teachers can insert students"
  on public.students for insert
  with check (auth.uid() = teacher_id);

create policy "Teachers can update their students"
  on public.students for update
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

create policy "Teachers can delete their students"
  on public.students for delete
  using (auth.uid() = teacher_id);

-- Quizzes policies
create policy "Teachers can read their quizzes"
  on public.quizzes for select
  using (auth.uid() = teacher_id or is_public = true);

create policy "Teachers can insert quizzes"
  on public.quizzes for insert
  with check (auth.uid() = teacher_id);

create policy "Teachers can update their quizzes"
  on public.quizzes for update
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

create policy "Teachers can delete their quizzes"
  on public.quizzes for delete
  using (auth.uid() = teacher_id);

-- Questions policies
create policy "Teachers can read questions from their quizzes"
  on public.questions for select
  using (
    exists (
      select 1 from public.quizzes
      where quizzes.id = questions.quiz_id
      and quizzes.teacher_id = auth.uid()
    )
  );

create policy "Teachers can insert questions"
  on public.questions for insert
  with check (
    exists (
      select 1 from public.quizzes
      where quizzes.id = questions.quiz_id
      and quizzes.teacher_id = auth.uid()
    )
  );

create policy "Teachers can update questions"
  on public.questions for update
  using (
    exists (
      select 1 from public.quizzes
      where quizzes.id = questions.quiz_id
      and quizzes.teacher_id = auth.uid()
    )
  );

create policy "Teachers can delete questions"
  on public.questions for delete
  using (
    exists (
      select 1 from public.quizzes
      where quizzes.id = questions.quiz_id
      and quizzes.teacher_id = auth.uid()
    )
  );

-- Question options policies (inherit from questions)
create policy "Users can read question options"
  on public.question_options for select
  using (
    exists (
      select 1 from public.questions
      where questions.id = question_options.question_id
      and exists (
        select 1 from public.quizzes
        where quizzes.id = questions.quiz_id
        and (quizzes.teacher_id = auth.uid() or quizzes.is_public = true)
      )
    )
  );

-- Live sessions policies
create policy "Teachers can read their sessions"
  on public.live_sessions for select
  using (auth.uid() = teacher_id);

create policy "Teachers can create sessions"
  on public.live_sessions for insert
  with check (auth.uid() = teacher_id);

create policy "Teachers can update their sessions"
  on public.live_sessions for update
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

-- Student answers policies
create policy "Students can insert their answers"
  on public.student_answers for insert
  with check (
    exists (
      select 1 from public.students
      where students.id = student_answers.student_id
      and students.id = auth.uid()
    )
  );

-- Rewards policies
create policy "Teachers can read their rewards"
  on public.rewards for select
  using (auth.uid() = teacher_id);

create policy "Teachers can insert rewards"
  on public.rewards for insert
  with check (auth.uid() = teacher_id);

create policy "Teachers can update their rewards"
  on public.rewards for update
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

create policy "Teachers can delete their rewards"
  on public.rewards for delete
  using (auth.uid() = teacher_id);

-- Reward transactions policies
create policy "Students can read their transactions"
  on public.reward_transactions for select
  using (
    exists (
      select 1 from public.students
      where students.id = reward_transactions.student_id
      and students.teacher_id = auth.uid()
    )
  );
