export type ClassValue = string | undefined | null | false;

/** Merge class names */
export function cn(...inputs: ClassValue[]) {
  return inputs.filter((x) => typeof x === "string" && x.length > 0).join(" ");
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-100 text-emerald-700 ring-emerald-600/20";
    case "Medium":
      return "bg-amber-100 text-amber-700 ring-amber-600/20";
    case "Hard":
      return "bg-rose-100 text-rose-700 ring-rose-600/20";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-600/20";
  }
}
