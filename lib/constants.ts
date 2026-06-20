/** Maximum questions visible without login */
export const FREE_QUESTION_LIMIT = 30;

export const APP_NAME = "CrackTiers";
export const APP_TAGLINE =
  "India's Premier Government Exam Question Bank — SSC, UPSC, Railway, Banking & State PSC";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cracktiers.in";

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

/** Core exam subjects */
export const SUBJECTS = [
  "Reasoning",
  "Maths (Quantitative Aptitude)",
  "English",
  "GK / General Awareness / Current Affairs",
] as const;

export type SubjectSlug =
  | "reasoning"
  | "maths"
  | "english"
  | "gk-current-affairs";

export const SUBJECT_META: Record<
  SubjectSlug,
  { name: string; slug: SubjectSlug; description: string; descriptionHi: string }
> = {
  reasoning: {
    name: "Reasoning",
    slug: "reasoning",
    description:
      "Practice logical reasoning, series, coding-decoding, puzzles & analytical questions for SSC, Banking & Railway exams.",
    descriptionHi:
      "SSC, बैंकिंग और रेलवे परीक्षाओं के लिए तर्क, श्रृंखला, कोडिंग-डिकोडिंग और पहेली प्रश्न अभ्यास करें।",
  },
  maths: {
    name: "Maths (Quantitative Aptitude)",
    slug: "maths",
    description:
      "Master percentage, profit-loss, SI/CI, ratio, average, time-speed-distance & arithmetic for government exams.",
    descriptionHi:
      "सरकारी परीक्षाओं के लिए प्रतिशत, लाभ-हानि, ब्याज, अनुपात, औसत और समय-दूरी के प्रश्न हल करें।",
  },
  english: {
    name: "English",
    slug: "english",
    description:
      "Improve grammar, vocabulary, synonyms, antonyms, idioms & comprehension for SSC CGL, Banking PO & UPSC.",
    descriptionHi:
      "SSC CGL, बैंकिंग PO और UPSC के लिए व्याकरण, शब्दावली, पर्यायवाची, विलोम और मुहावरे अभ्यास करें।",
  },
  "gk-current-affairs": {
    name: "GK / General Awareness / Current Affairs",
    slug: "gk-current-affairs",
    description:
      "Stay updated with 2025–2026 current affairs, Indian history, geography, polity & government schemes.",
    descriptionHi:
      "2025–2026 करंट अफेयर्स, भारतीय इतिहास, भूगोल, राजव्यवस्था और सरकारी योजनाओं से अपडेट रहें।",
  },
};

export const SUBJECT_NAME_TO_SLUG: Record<string, SubjectSlug> = {
  Reasoning: "reasoning",
  "Maths (Quantitative Aptitude)": "maths",
  English: "english",
  "GK / General Awareness / Current Affairs": "gk-current-affairs",
};

export const CURRENT_YEARS = [2025, 2026] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/question-bank", label: "Question Bank" },
  { href: "/online-test-series", label: "Test Series" },
] as const;

export const TOTAL_QUESTIONS_TARGET = 10200;

/** Mock test configuration */
export const MOCK_TEST_COUNTS = [10, 20, 30, 50] as const;
export const MOCK_TEST_DURATIONS = [15, 30, 45, 60] as const;
export const FREE_MOCK_MAX_QUESTIONS = 10;
export const FREE_MOCK_MAX_DURATION = 15;

export const MOCK_TEST_PRESETS = [
  {
    id: "quick",
    name: "Quick Test",
    nameHi: "त्वरित टेस्ट",
    questions: 10,
    minutes: 15,
    description: "10 questions · 15 minutes",
  },
  {
    id: "standard",
    name: "Standard Test",
    nameHi: "मानक टेस्ट",
    questions: 20,
    minutes: 30,
    description: "20 questions · 30 minutes",
  },
  {
    id: "full",
    name: "Full Mock",
    nameHi: "पूर्ण मॉक",
    questions: 50,
    minutes: 60,
    description: "50 questions · 60 minutes",
  },
] as const;
