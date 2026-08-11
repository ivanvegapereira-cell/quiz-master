// User types
export interface User {
  id: string
  email: string
  name: string
  school?: string
  profile_picture?: string
  created_at: string
}

// Student types
export interface Student {
  id: string
  teacher_id: string
  name: string
  group_id?: string
  created_at: string
}

// Group types
export interface StudentGroup {
  id: string
  teacher_id: string
  name: string
  description?: string
  created_at: string
}

// Quiz types
export interface Quiz {
  id: string
  teacher_id: string
  title: string
  description?: string
  subject?: string
  duration?: number
  is_public: boolean
  created_at: string
  updated_at: string
}

// Question types
export type QuestionType = 'multiple_choice' | 'true_false'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: string
  quiz_id: string
  text: string
  type: QuestionType
  difficulty: Difficulty
  points: number
  created_at: string
}

export interface QuestionOption {
  id: string
  question_id: string
  text: string
  is_correct: boolean
  order: number
}

// Live Session types
export type SessionStatus = 'waiting' | 'active' | 'finished'

export interface LiveSession {
  id: string
  quiz_id: string
  teacher_id: string
  started_at: string
  ended_at?: string
  current_question_index: number
  status: SessionStatus
}

// Answer types
export interface StudentAnswer {
  id: string
  session_id: string
  student_id: string
  question_id: string
  selected_option_id: string
  is_correct: boolean
  time_taken: number
  points_earned: number
  answered_at: string
}

// Leaderboard types
export interface Leaderboard {
  id: string
  session_id: string
  student_id: string
  total_points: number
  rank: number
  updated_at: string
}

// Reward types
export interface Reward {
  id: string
  teacher_id: string
  name: string
  description?: string
  cost_in_points: number
  icon?: string
  created_at: string
}

export interface RewardTransaction {
  id: string
  student_id: string
  reward_id: string
  redeemed_at: string
  notes?: string
}

// Feedback Guide types
export interface StudentFeedbackGuide {
  id: string
  session_id: string
  student_id: string
  guide_content: string
  created_at: string
  reviewed_by_teacher: boolean
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Dashboard Stats
export interface DashboardStats {
  total_sessions: number
  total_students: number
  total_quizzes: number
  average_score: number
}
