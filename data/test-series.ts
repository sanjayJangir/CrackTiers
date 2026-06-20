export type TestPaperType = "full" | "sectional";

export interface TestPaper {
  id: string;
  name: string;
  nameHi: string;
  type: TestPaperType;
  /** Subject filter for sectional tests */
  subject?: string;
  questions: number;
  durationMinutes: number;
  /** First paper free; rest need registration */
  isFree: boolean;
  order: number;
}

export interface ExamTestSeries {
  slug: string;
  name: string;
  nameHi: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  categorySlug: string;
  subcategorySlug: string;
  icon: string;
  accent: string;
  tests: TestPaper[];
}

function papers(
  examPrefix: string,
  configs: Omit<TestPaper, "id" | "order">[]
): TestPaper[] {
  return configs.map((c, i) => ({
    ...c,
    id: `${examPrefix}-test-${i + 1}`,
    order: i + 1,
  }));
}

export const examTestSeries: ExamTestSeries[] = [
  {
    slug: "ssc",
    name: "SSC Online Test Series",
    nameHi: "SSC ऑनलाइन टेस्ट सीरीज",
    tagline: "CGL · CHSL · MTS · GD",
    taglineHi: "CGL · CHSL · MTS · GD",
    description:
      "Full-length & sectional mock tests for SSC CGL Tier 1, CHSL, MTS & GD — bilingual Hindi & English.",
    descriptionHi:
      "SSC CGL टियर 1, CHSL, MTS और GD के लिए पूर्ण और अनुभागवार मॉक टेस्ट — हिंदी और अंग्रेजी।",
    categorySlug: "central-government",
    subcategorySlug: "ssc",
    icon: "GraduationCap",
    accent: "from-orange-500 to-red-600",
    tests: papers("ssc", [
      { name: "SSC CGL Tier 1 — Full Mock 1", nameHi: "SSC CGL टियर 1 — पूर्ण मॉक 1", type: "full", questions: 50, durationMinutes: 60, isFree: true },
      { name: "SSC CGL Tier 1 — Full Mock 2", nameHi: "SSC CGL टियर 1 — पूर्ण मॉक 2", type: "full", questions: 50, durationMinutes: 60, isFree: false },
      { name: "SSC CHSL — Full Mock", nameHi: "SSC CHSL — पूर्ण मॉक", type: "full", questions: 40, durationMinutes: 50, isFree: false },
      { name: "Reasoning Sectional Test", nameHi: "रीजनिंग अनुभाग टेस्ट", type: "sectional", subject: "Reasoning", questions: 25, durationMinutes: 25, isFree: true },
      { name: "Quantitative Aptitude Sectional", nameHi: "मात्रात्मक योग्यता अनुभाग", type: "sectional", subject: "Maths (Quantitative Aptitude)", questions: 25, durationMinutes: 25, isFree: false },
      { name: "English Sectional Test", nameHi: "अंग्रेजी अनुभाग टेस्ट", type: "sectional", subject: "English", questions: 25, durationMinutes: 20, isFree: false },
      { name: "General Awareness Sectional", nameHi: "सामान्य जागरूकता अनुभाग", type: "sectional", subject: "GK / General Awareness / Current Affairs", questions: 25, durationMinutes: 20, isFree: false },
      { name: "SSC MTS — Mini Mock", nameHi: "SSC MTS — मिनी मॉक", type: "full", questions: 20, durationMinutes: 30, isFree: false },
    ]),
  },
  {
    slug: "upsc",
    name: "UPSC Online Test Series",
    nameHi: "UPSC ऑनलाइन टेस्ट सीरीज",
    tagline: "Prelims · CSAT · CAPF",
    taglineHi: "प्रारंभिक · CSAT · CAPF",
    description:
      "UPSC Prelims & CSAT pattern mock tests with GS, current affairs, reasoning & aptitude.",
    descriptionHi:
      "UPSC प्रारंभिक और CSAT पैटर्न मॉक टेस्ट — सामान्य अध्ययन, करंट अफेयर्स, तर्क और योग्यता।",
    categorySlug: "central-government",
    subcategorySlug: "upsc",
    icon: "Landmark",
    accent: "from-indigo-600 to-violet-700",
    tests: papers("upsc", [
      { name: "UPSC Prelims — Full Mock 1", nameHi: "UPSC प्रारंभिक — पूर्ण मॉक 1", type: "full", questions: 50, durationMinutes: 60, isFree: true },
      { name: "UPSC Prelims — Full Mock 2", nameHi: "UPSC प्रारंभिक — पूर्ण मॉक 2", type: "full", questions: 50, durationMinutes: 60, isFree: false },
      { name: "UPSC CSAT — Full Mock", nameHi: "UPSC CSAT — पूर्ण मॉक", type: "full", questions: 40, durationMinutes: 50, isFree: false },
      { name: "GS & Current Affairs Sectional", nameHi: "GS और करंट अफेयर्स अनुभाग", type: "sectional", subject: "GK / General Awareness / Current Affairs", questions: 30, durationMinutes: 30, isFree: true },
      { name: "CSAT Reasoning Sectional", nameHi: "CSAT रीजनिंग अनुभाग", type: "sectional", subject: "Reasoning", questions: 25, durationMinutes: 25, isFree: false },
      { name: "CSAT Aptitude Sectional", nameHi: "CSAT योग्यता अनुभाग", type: "sectional", subject: "Maths (Quantitative Aptitude)", questions: 25, durationMinutes: 25, isFree: false },
    ]),
  },
  {
    slug: "railway",
    name: "Railway Online Test Series",
    nameHi: "रेलवे ऑनलाइन टेस्ट सीरीज",
    tagline: "RRB NTPC · Group D · ALP",
    taglineHi: "RRB NTPC · ग्रुप D · ALP",
    description:
      "RRB NTPC, Group D & ALP pattern full mocks and sectionals for Railway recruitment exams.",
    descriptionHi:
      "RRB NTPC, ग्रुप D और ALP पैटर्न पूर्ण मॉक और अनुभाग टेस्ट रेलवे भर्ती परीक्षाओं के लिए।",
    categorySlug: "central-government",
    subcategorySlug: "railway",
    icon: "Train",
    accent: "from-blue-600 to-cyan-600",
    tests: papers("railway", [
      { name: "RRB NTPC — Full Mock 1", nameHi: "RRB NTPC — पूर्ण मॉक 1", type: "full", questions: 50, durationMinutes: 60, isFree: true },
      { name: "RRB NTPC — Full Mock 2", nameHi: "RRB NTPC — पूर्ण मॉक 2", type: "full", questions: 50, durationMinutes: 60, isFree: false },
      { name: "RRB Group D — Full Mock", nameHi: "RRB ग्रुप D — पूर्ण मॉक", type: "full", questions: 40, durationMinutes: 50, isFree: false },
      { name: "General Intelligence Sectional", nameHi: "सामान्य बुद्धिमत्ता अनुभाग", type: "sectional", subject: "Reasoning", questions: 25, durationMinutes: 25, isFree: true },
      { name: "Mathematics Sectional", nameHi: "गणित अनुभाग", type: "sectional", subject: "Maths (Quantitative Aptitude)", questions: 25, durationMinutes: 25, isFree: false },
      { name: "General Awareness Sectional", nameHi: "सामान्य जागरूकता अनुभाग", type: "sectional", subject: "GK / General Awareness / Current Affairs", questions: 25, durationMinutes: 20, isFree: false },
    ]),
  },
  {
    slug: "banking",
    name: "Banking Online Test Series",
    nameHi: "बैंकिंग ऑनलाइन टेस्ट सीरीज",
    tagline: "IBPS PO · SBI · Clerk",
    taglineHi: "IBPS PO · SBI · क्लर्क",
    description:
      "IBPS PO, Clerk & SBI exam pattern mock tests — reasoning, quant, English & banking awareness.",
    descriptionHi:
      "IBPS PO, क्लर्क और SBI परीक्षा पैटर्न मॉक टेस्ट — रीजनिंग, क्वांट, अंग्रेजी और बैंकिंग जागरूकता।",
    categorySlug: "central-government",
    subcategorySlug: "banking",
    icon: "Landmark",
    accent: "from-emerald-600 to-teal-700",
    tests: papers("banking", [
      { name: "IBPS PO — Full Mock 1", nameHi: "IBPS PO — पूर्ण मॉक 1", type: "full", questions: 50, durationMinutes: 60, isFree: true },
      { name: "IBPS PO — Full Mock 2", nameHi: "IBPS PO — पूर्ण मॉक 2", type: "full", questions: 50, durationMinutes: 60, isFree: false },
      { name: "IBPS Clerk — Full Mock", nameHi: "IBPS क्लर्क — पूर्ण मॉक", type: "full", questions: 40, durationMinutes: 50, isFree: false },
      { name: "Reasoning Sectional", nameHi: "रीजनिंग अनुभाग", type: "sectional", subject: "Reasoning", questions: 25, durationMinutes: 25, isFree: true },
      { name: "Quant Sectional", nameHi: "क्वांट अनुभाग", type: "sectional", subject: "Maths (Quantitative Aptitude)", questions: 25, durationMinutes: 25, isFree: false },
      { name: "English Sectional", nameHi: "अंग्रेजी अनुभाग", type: "sectional", subject: "English", questions: 25, durationMinutes: 20, isFree: false },
    ]),
  },
  {
    slug: "defence",
    name: "Defence Online Test Series",
    nameHi: "रक्षा ऑनलाइन टेस्ट सीरीज",
    tagline: "NDA · CDS · AFCAT",
    taglineHi: "NDA · CDS · AFCAT",
    description:
      "NDA, CDS & AFCAT pattern mock tests for defence aspirants — Maths, GAT & English.",
    descriptionHi:
      "रक्षा उम्मीदवारों के लिए NDA, CDS और AFCAT पैटर्न मॉक टेस्ट — गणित, GAT और अंग्रेजी।",
    categorySlug: "central-government",
    subcategorySlug: "defence",
    icon: "Shield",
    accent: "from-slate-700 to-slate-900",
    tests: papers("defence", [
      { name: "NDA — Full Mock 1", nameHi: "NDA — पूर्ण मॉक 1", type: "full", questions: 50, durationMinutes: 60, isFree: true },
      { name: "CDS — Full Mock", nameHi: "CDS — पूर्ण मॉक", type: "full", questions: 50, durationMinutes: 60, isFree: false },
      { name: "AFCAT — Full Mock", nameHi: "AFCAT — पूर्ण मॉक", type: "full", questions: 40, durationMinutes: 50, isFree: false },
      { name: "Mathematics Sectional", nameHi: "गणित अनुभाग", type: "sectional", subject: "Maths (Quantitative Aptitude)", questions: 25, durationMinutes: 30, isFree: true },
      { name: "GAT & GK Sectional", nameHi: "GAT और GK अनुभाग", type: "sectional", subject: "GK / General Awareness / Current Affairs", questions: 25, durationMinutes: 25, isFree: false },
    ]),
  },
  {
    slug: "teaching",
    name: "Teaching Online Test Series",
    nameHi: "शिक्षण ऑनलाइन टेस्ट सीरीज",
    tagline: "CTET · UGC NET · KVS",
    taglineHi: "CTET · UGC NET · KVS",
    description:
      "CTET, UGC NET & teaching eligibility mock tests — pedagogy, GK & subject knowledge.",
    descriptionHi:
      "CTET, UGC NET और शिक्षण पात्रता मॉक टेस्ट — शिक्षाशास्त्र, GK और विषय ज्ञान।",
    categorySlug: "central-government",
    subcategorySlug: "teaching",
    icon: "BookOpen",
    accent: "from-purple-600 to-pink-600",
    tests: papers("teaching", [
      { name: "CTET Paper 1 — Full Mock", nameHi: "CTET पेपर 1 — पूर्ण मॉक", type: "full", questions: 50, durationMinutes: 60, isFree: true },
      { name: "CTET Paper 2 — Full Mock", nameHi: "CTET पेपर 2 — पूर्ण मॉक", type: "full", questions: 50, durationMinutes: 60, isFree: false },
      { name: "Child Development Sectional", nameHi: "बाल विकास अनुभाग", type: "sectional", subject: "GK / General Awareness / Current Affairs", questions: 20, durationMinutes: 20, isFree: true },
      { name: "English Pedagogy Sectional", nameHi: "अंग्रेजी शिक्षाशास्त्र", type: "sectional", subject: "English", questions: 20, durationMinutes: 20, isFree: false },
    ]),
  },
  {
    slug: "rajasthan",
    name: "Rajasthan Online Test Series",
    nameHi: "राजस्थान ऑनलाइन टेस्ट सीरीज",
    tagline: "RPSC · REET · Patwar",
    taglineHi: "RPSC · REET · पटवार",
    description: "Rajasthan state exam mock tests — RPSC, REET & state GK focused papers.",
    descriptionHi: "राजस्थान राज्य परीक्षा मॉक टेस्ट — RPSC, REET और राज्य GK केंद्रित पेपर।",
    categorySlug: "state-government",
    subcategorySlug: "rajasthan",
    icon: "MapPin",
    accent: "from-amber-500 to-orange-600",
    tests: papers("rajasthan", [
      { name: "RPSC — Full Mock 1", nameHi: "RPSC — पूर्ण मॉक 1", type: "full", questions: 50, durationMinutes: 60, isFree: true },
      { name: "Rajasthan GK Sectional", nameHi: "राजस्थान GK अनुभाग", type: "sectional", subject: "GK / General Awareness / Current Affairs", questions: 30, durationMinutes: 30, isFree: true },
      { name: "REET — Full Mock", nameHi: "REET — पूर्ण मॉक", type: "full", questions: 40, durationMinutes: 50, isFree: false },
    ]),
  },
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh Online Test Series",
    nameHi: "उत्तर प्रदेश ऑनलाइन टेस्ट सीरीज",
    tagline: "UPPSC · UP SI · Lekhpal",
    taglineHi: "UPPSC · UP SI · लekhpal",
    description: "UPPSC PCS, UP SI & state-level mock tests with UP GK & current affairs.",
    descriptionHi: "UPPSC PCS, UP SI और राज्य स्तरीय मॉक टेस्ट UP GK और करंट अफेयर्स के साथ।",
    categorySlug: "state-government",
    subcategorySlug: "uttar-pradesh",
    icon: "MapPin",
    accent: "from-green-600 to-emerald-700",
    tests: papers("up", [
      { name: "UPPSC PCS — Full Mock 1", nameHi: "UPPSC PCS — पूर्ण मॉक 1", type: "full", questions: 50, durationMinutes: 60, isFree: true },
      { name: "UP GK Sectional", nameHi: "UP GK अनुभाग", type: "sectional", subject: "GK / General Awareness / Current Affairs", questions: 30, durationMinutes: 30, isFree: true },
      { name: "UPPSC PCS — Full Mock 2", nameHi: "UPPSC PCS — पूर्ण मॉक 2", type: "full", questions: 50, durationMinutes: 60, isFree: false },
    ]),
  },
];

export function getExamSeries(slug: string): ExamTestSeries | undefined {
  return examTestSeries.find((e) => e.slug === slug);
}

export function getTestPaper(
  examSlug: string,
  testId: string
): { series: ExamTestSeries; paper: TestPaper } | undefined {
  const series = getExamSeries(examSlug);
  if (!series) return undefined;
  const paper = series.tests.find((t) => t.id === testId);
  if (!paper) return undefined;
  return { series, paper };
}

export function getTotalTestCount(): number {
  return examTestSeries.reduce((sum, e) => sum + e.tests.length, 0);
}
