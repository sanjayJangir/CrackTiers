import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type {
  Question,
  QuestionFilters,
  QuestionsResponse,
  StoredQuestion,
} from "./types";
import { filterQuestionsList } from "@/lib/question-filters";

const DATA_PATH = join(process.cwd(), "data/generated/questions.json");

let cache: Question[] | null = null;

function toQuestion(stored: StoredQuestion): Question {
  const labels = ["A", "B", "C", "D"] as const;
  return {
    id: stored.id,
    question: stored.q.en,
    questionHi: stored.q.hi,
    options: stored.o.map((opt, i) => ({
      label: labels[i],
      text: opt.en,
      textHi: opt.hi,
    })),
    correctAnswer: stored.a,
    categorySlug: stored.cat,
    subcategorySlug: stored.sub,
    subject: stored.subj,
    difficulty: stored.dif,
    explanation: stored.exp?.en,
    explanationHi: stored.exp?.hi,
    year: stored.year,
  };
}

export function loadAllQuestions(): Question[] {
  if (cache) return cache;

  if (!existsSync(DATA_PATH)) {
    console.warn(
      "Question bank not found. Run: npm run generate:questions"
    );
    cache = [];
    return cache;
  }

  const raw = readFileSync(DATA_PATH, "utf-8");
  const stored: StoredQuestion[] = JSON.parse(raw);
  cache = stored.map(toQuestion);
  return cache;
}

export function getTotalQuestionCount(): number {
  return loadAllQuestions().length;
}

export function getSubjectCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const q of loadAllQuestions()) {
    counts[q.subject] = (counts[q.subject] ?? 0) + 1;
  }
  return counts;
}

export function filterQuestions(filters: QuestionFilters): Question[] {
  return filterQuestionsList(loadAllQuestions(), filters);
}

export function getQuestionsResponse(
  filters: QuestionFilters = {}
): QuestionsResponse {
  const questions = filterQuestions(filters);
  return { questions, total: questions.length };
}

export function getQuestionsByCategory(categorySlug: string): Question[] {
  return loadAllQuestions().filter((q) => q.categorySlug === categorySlug);
}

export function getQuestionsBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Question[] {
  return loadAllQuestions().filter(
    (q) =>
      q.categorySlug === categorySlug &&
      q.subcategorySlug === subcategorySlug
  );
}

export function getQuestionsBySubject(subject: string): Question[] {
  return loadAllQuestions().filter((q) => q.subject === subject);
}

/** Pick random questions for mock test (Fisher-Yates shuffle) */
export function getRandomQuestions(
  filters: QuestionFilters,
  count: number
): Question[] {
  const pool = filterQuestions(filters);
  return shuffleTake(pool, count);
}

/** Try category+subcategory first, then broaden until questions are found */
export function getRandomQuestionsWithFallback(
  filters: QuestionFilters,
  count: number
): Question[] {
  const attempts: QuestionFilters[] = [
    filters,
    { ...filters, subcategory: undefined },
    {
      category: filters.category,
      subject: filters.subject,
      difficulty: filters.difficulty,
      year: filters.year,
    },
    { subject: filters.subject, difficulty: filters.difficulty, year: filters.year },
    { subject: filters.subject },
    {},
  ];

  for (const attempt of attempts) {
    const pool = filterQuestions(attempt);
    if (pool.length > 0) {
      return shuffleTake(pool, count);
    }
  }

  return [];
}

function shuffleTake(pool: Question[], count: number): Question[] {
  if (pool.length === 0) return [];

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/** Update subcategory question counts from generated data */
export function countBySubcategory(
  categorySlug: string,
  subSlug: string
): number {
  return getQuestionsBySubcategory(categorySlug, subSlug).length;
}
