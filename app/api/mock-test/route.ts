import { NextRequest, NextResponse } from "next/server";
import {
  getRandomQuestions,
  getRandomQuestionsWithFallback,
} from "@/data/question-loader";
import { getTestPaper } from "@/data/test-series";
import type { MockTestSession } from "@/data/types";
import {
  FREE_MOCK_MAX_DURATION,
  FREE_MOCK_MAX_QUESTIONS,
  SUBJECTS,
} from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      examSlug,
      testId,
      subject = "all",
      count = 20,
      durationMinutes = 30,
      isLoggedIn = false,
    } = body as {
      examSlug?: string;
      testId?: string;
      subject?: string;
      count?: number;
      durationMinutes?: number;
      isLoggedIn?: boolean;
    };

    // ── Online Test Series mode ──
    if (examSlug && testId) {
      const found = getTestPaper(examSlug, testId);
      if (!found) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 });
      }

      const { series, paper } = found;

      if (!paper.isFree && !isLoggedIn) {
        return NextResponse.json(
          { error: "Register to unlock this test" },
          { status: 403 }
        );
      }

      const maxQ = isLoggedIn ? paper.questions : Math.min(paper.questions, FREE_MOCK_MAX_QUESTIONS);
      const maxMin = isLoggedIn ? paper.durationMinutes : Math.min(paper.durationMinutes, FREE_MOCK_MAX_DURATION);

      const questions = getRandomQuestionsWithFallback(
        {
          category: series.categorySlug,
          subcategory: series.subcategorySlug,
          subject: paper.subject,
        },
        maxQ
      );

      if (questions.length === 0) {
        return NextResponse.json(
          { error: "No questions available for this test" },
          { status: 404 }
        );
      }

      const session: MockTestSession = {
        id: `mock-${Date.now()}`,
        title: paper.name,
        subject: series.name,
        examSlug: series.slug,
        testId: paper.id,
        totalQuestions: questions.length,
        durationMinutes: maxMin,
        startedAt: new Date().toISOString(),
        questions,
        answers: Object.fromEntries(questions.map((q) => [q.id, null])),
        markedForReview: [],
      };

      return NextResponse.json({ session });
    }

    // ── Legacy custom mock test mode ──
    const maxQuestions = isLoggedIn ? 50 : FREE_MOCK_MAX_QUESTIONS;
    const maxDuration = isLoggedIn ? 60 : FREE_MOCK_MAX_DURATION;

    const safeCount = Math.min(Math.max(5, count), maxQuestions);
    const safeDuration = Math.min(Math.max(5, durationMinutes), maxDuration);

    if (
      subject !== "all" &&
      !SUBJECTS.includes(subject as (typeof SUBJECTS)[number])
    ) {
      return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
    }

    const questions = getRandomQuestions(
      { subject: subject === "all" ? undefined : subject },
      safeCount
    );

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "No questions available for this subject" },
        { status: 404 }
      );
    }

    const subjectLabel = subject === "all" ? "All Subjects" : subject;

    const session: MockTestSession = {
      id: `mock-${Date.now()}`,
      title: `${subjectLabel} Mock Test`,
      subject: subjectLabel,
      totalQuestions: questions.length,
      durationMinutes: safeDuration,
      startedAt: new Date().toISOString(),
      questions,
      answers: Object.fromEntries(questions.map((q) => [q.id, null])),
      markedForReview: [],
    };

    return NextResponse.json({ session });
  } catch {
    return NextResponse.json(
      { error: "Failed to create mock test" },
      { status: 500 }
    );
  }
}
