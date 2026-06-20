import type { Question, QuestionFilters } from "@/data/types";

export function matchesQuestionFilters(
  q: Question,
  filters: QuestionFilters
): boolean {
  if (filters.search) {
    const term = filters.search.toLowerCase();
    const matches =
      q.question.toLowerCase().includes(term) ||
      q.questionHi.includes(term) ||
      q.subject.toLowerCase().includes(term) ||
      q.options.some(
        (o) =>
          o.text.toLowerCase().includes(term) || o.textHi.includes(term)
      );
    if (!matches) return false;
  }
  if (
    filters.category &&
    filters.category !== "all" &&
    q.categorySlug !== filters.category
  )
    return false;
  if (
    filters.subcategory &&
    filters.subcategory !== "all" &&
    q.subcategorySlug !== filters.subcategory
  )
    return false;
  if (
    filters.subject &&
    filters.subject !== "all" &&
    q.subject !== filters.subject
  )
    return false;
  if (
    filters.difficulty &&
    filters.difficulty !== "all" &&
    q.difficulty !== filters.difficulty
  )
    return false;
  if (filters.year && q.year !== filters.year) return false;
  return true;
}

export function filterQuestionsList(
  questions: Question[],
  filters: QuestionFilters
): Question[] {
  return questions.filter((q) => matchesQuestionFilters(q, filters));
}
