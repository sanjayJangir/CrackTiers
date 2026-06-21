"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Question, QuestionsResponse } from "@/data/types";
import { FREE_QUESTION_LIMIT } from "@/lib/constants";
import { filterQuestionsList } from "@/lib/question-filters";
import { withBasePath } from "@/lib/base-path";

let cachedQuestions: Question[] | null = null;
let cachePromise: Promise<Question[]> | null = null;

async function loadAllQuestions(): Promise<Question[]> {
  if (cachedQuestions) return cachedQuestions;
  if (cachePromise) return cachePromise;

  cachePromise = fetch(withBasePath("/api/questions"))
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to load questions");
      const json: QuestionsResponse = await res.json();
      cachedQuestions = json.questions;
      return json.questions;
    })
    .catch((err) => {
      cachePromise = null;
      throw err;
    });

  return cachePromise;
}

export function useQuestions(params: {
  search: string;
  category?: string;
  subcategory?: string;
  subject: string;
  difficulty: string;
  year?: string;
}) {
  const [allQuestions, setAllQuestions] = useState<Question[] | null>(
    cachedQuestions
  );
  const [loading, setLoading] = useState(!cachedQuestions);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    if (cachedQuestions) {
      setAllQuestions(cachedQuestions);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const questions = await loadAllQuestions();
      setAllQuestions(questions);
    } catch {
      setError("Could not load questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const filtered = useMemo(() => {
    if (!allQuestions) return [];

    return filterQuestionsList(allQuestions, {
      search: params.search || undefined,
      category: params.category,
      subcategory: params.subcategory,
      subject: params.subject !== "all" ? params.subject : undefined,
      difficulty: params.difficulty !== "all" ? params.difficulty : undefined,
      year:
        params.year && params.year !== "all"
          ? parseInt(params.year, 10)
          : undefined,
    });
  }, [
    allQuestions,
    params.search,
    params.category,
    params.subcategory,
    params.subject,
    params.difficulty,
    params.year,
  ]);

  return {
    questions: filtered,
    total: filtered.length,
    loading,
    error,
    refetch: fetchQuestions,
  };
}

export function applyFreeLimit(
  questions: Question[],
  isLoggedIn: boolean
): { visible: Question[]; showLocked: boolean } {
  if (isLoggedIn || questions.length <= FREE_QUESTION_LIMIT) {
    return { visible: questions, showLocked: false };
  }

  return {
    visible: questions.slice(0, FREE_QUESTION_LIMIT),
    showLocked: true,
  };
}
