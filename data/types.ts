export type Difficulty = "Easy" | "Medium" | "Hard";
export type Language = "en" | "hi";

export interface BilingualText {
  en: string;
  hi: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  questionCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: SubCategory[];
}

export interface QuestionOption {
  label: "A" | "B" | "C" | "D";
  text: string;
  textHi: string;
}

/** Compact stored format in generated JSON */
export interface StoredQuestion {
  id: string;
  q: BilingualText;
  o: BilingualText[];
  a: "A" | "B" | "C" | "D";
  cat: string;
  sub: string;
  subj: string;
  dif: Difficulty;
  exp?: BilingualText;
  year: number;
}

export interface Question {
  id: string;
  question: string;
  questionHi: string;
  options: QuestionOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  categorySlug: string;
  subcategorySlug: string;
  subject: string;
  difficulty: Difficulty;
  explanation?: string;
  explanationHi?: string;
  year: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  phone?: string;
  targetExam?: string;
  city?: string;
  state?: string;
}

export interface QuestionFilters {
  search?: string;
  category?: string;
  subcategory?: string;
  subject?: string;
  difficulty?: string;
  year?: number;
}

export interface QuestionsResponse {
  questions: Question[];
  total: number;
}

/** @deprecated Use QuestionsResponse — kept for compatibility */
export interface PaginatedQuestions extends QuestionsResponse {
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Mock test session stored in sessionStorage during exam */
export interface MockTestSession {
  id: string;
  title: string;
  subject: string;
  examSlug?: string;
  testId?: string;
  totalQuestions: number;
  durationMinutes: number;
  startedAt: string;
  submittedAt?: string;
  questions: Question[];
  answers: Record<string, string | null>;
  markedForReview: string[];
}

export interface MockTestResult {
  sessionId: string;
  title: string;
  subject: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  accuracy: number;
  timeTakenSeconds: number;
  durationMinutes: number;
  submittedAt: string;
  questionResults: MockTestQuestionResult[];
}

export interface MockTestQuestionResult {
  questionId: string;
  index: number;
  question: Question;
  selected: string | null;
  correct: boolean;
  correctAnswer: string;
}
