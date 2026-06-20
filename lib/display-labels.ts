/** Short labels for compact mobile UI */
export const SUBJECT_SHORT: Record<string, string> = {
  Reasoning: "Reasoning",
  "Maths (Quantitative Aptitude)": "Maths",
  English: "English",
  "GK / General Awareness / Current Affairs": "GK & CA",
};

export function getSubjectShortLabel(subject: string): string {
  return SUBJECT_SHORT[subject] ?? subject;
}
