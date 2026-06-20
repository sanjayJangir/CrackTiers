import { NextResponse } from "next/server";
import { loadAllQuestions } from "@/data/question-loader";

export async function GET() {
  const questions = loadAllQuestions();

  return NextResponse.json(
    { questions, total: questions.length },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
