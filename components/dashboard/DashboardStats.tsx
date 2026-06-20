import {
  BookOpen,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

interface DashboardStatsProps {
  questionsAttempted?: number;
  accuracy?: number;
  streak?: number;
  categoriesExplored?: number;
}

const stats = [
  {
    key: "attempted",
    label: "Questions Attempted",
    icon: BookOpen,
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
  },
  {
    key: "accuracy",
    label: "Accuracy Rate",
    icon: Target,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    key: "streak",
    label: "Day Streak",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
  },
  {
    key: "categories",
    label: "Categories Explored",
    icon: CheckCircle,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
] as const;

export default function DashboardStats({
  questionsAttempted = 24,
  accuracy = 78,
  streak = 5,
  categoriesExplored = 4,
}: DashboardStatsProps) {
  const values: Record<string, string> = {
    attempted: String(questionsAttempted),
    accuracy: `${accuracy}%`,
    streak: `${streak} days`,
    categories: String(categoriesExplored),
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.key}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-sm`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <Clock className="h-4 w-4 text-slate-300" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{values[stat.key]}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
