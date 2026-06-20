import type { MockTestResult, MockTestSession } from "@/data/types";

const SESSION_KEY = "cracktiers_mock_session";
const RESULT_KEY = "cracktiers_mock_result";

export function saveMockSession(session: MockTestSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getMockSession(): MockTestSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as MockTestSession) : null;
  } catch {
    return null;
  }
}

export function updateMockSession(
  updater: (session: MockTestSession) => MockTestSession
): void {
  const session = getMockSession();
  if (session) saveMockSession(updater(session));
}

export function clearMockSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function saveMockResult(result: MockTestResult): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export function getMockResult(): MockTestResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(RESULT_KEY);
    return raw ? (JSON.parse(raw) as MockTestResult) : null;
  } catch {
    return null;
  }
}

export function calculateMockResult(
  session: MockTestSession,
  timeTakenSeconds: number
): MockTestResult {
  const questionResults = session.questions.map((q, index) => {
    const selected = session.answers[q.id] ?? null;
    const correct = selected === q.correctAnswer;
    return {
      questionId: q.id,
      index: index + 1,
      question: q,
      selected,
      correct,
      correctAnswer: q.correctAnswer,
    };
  });

  const attempted = questionResults.filter((r) => r.selected !== null).length;
  const correct = questionResults.filter((r) => r.correct).length;
  const wrong = attempted - correct;
  const skipped = session.totalQuestions - attempted;
  const score = Math.round((correct / session.totalQuestions) * 100);
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  return {
    sessionId: session.id,
    title: session.title,
    subject: session.subject,
    totalQuestions: session.totalQuestions,
    attempted,
    correct,
    wrong,
    skipped,
    score,
    accuracy,
    timeTakenSeconds,
    durationMinutes: session.durationMinutes,
    submittedAt: new Date().toISOString(),
    questionResults,
  };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
