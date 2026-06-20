#!/usr/bin/env node
/**
 * Generates 10,200+ bilingual (English + Hindi) MCQs for CrackTiers.
 * Run: npm run generate:questions
 */
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../data/generated");
const OUT_FILE = join(OUT_DIR, "questions.json");

const SUBJECTS = [
  "Reasoning",
  "Maths (Quantitative Aptitude)",
  "English",
  "GK / General Awareness / Current Affairs",
];

const CATEGORIES = [
  { cat: "central-government", subs: ["ssc", "upsc", "railway", "banking", "defence", "teaching"] },
  { cat: "state-government", subs: ["rajasthan", "uttar-pradesh", "bihar", "madhya-pradesh", "maharashtra", "gujarat"] },
  { cat: "subjects", subs: ["general-knowledge", "reasoning", "quantitative-aptitude", "english", "current-affairs", "computer-knowledge"] },
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const YEARS = [2025, 2026];
const PER_SUBJECT = 2550; // 2550 × 4 = 10,200

const pick = (arr, i) => arr[i % arr.length];
const shuffleLabels = (correctIdx, distractors) => {
  const all = [correctIdx, ...distractors];
  const labels = ["A", "B", "C", "D"];
  const mapped = all.slice(0, 4).map((val, i) => ({ val, label: labels[i] }));
  const correctLabel = mapped.find((m) => m.val === correctIdx)?.label ?? "A";
  return { options: mapped.map((m) => m.val), correctLabel };
};

const mkOpts = (correctEn, correctHi, wrongEn, wrongHi, correctLabel) => {
  const labels = ["A", "B", "C", "D"];
  const idx = labels.indexOf(correctLabel);
  const opts = labels.map((l, i) => ({
    en: i === idx ? correctEn : wrongEn[(i + (i >= idx ? 1 : 0)) % 3],
    hi: i === idx ? correctHi : wrongHi[(i + (i >= idx ? 1 : 0)) % 3],
  }));
  return opts;
};

// ─── REASONING GENERATORS ───────────────────────────────────────────
function* genReasoning(startId) {
  for (let n = 0; n < PER_SUBJECT; n++) {
    const id = startId + n;
    const type = n % 8;
    const diff = pick(DIFFICULTIES, n);
    const year = pick(YEARS, n);
    const { cat, sub } = pickCatSub(n);

    if (type === 0) {
      // Number series
      const start = 2 + (n % 5);
      const step = 2 + (n % 4);
      const seq = [start, start + step, start + 2 * step, start + 3 * step];
      const ans = start + 4 * step;
      yield {
        id: `q${id}`,
        q: {
          en: `Find the next number in the series: ${seq.join(", ")}, ?`,
          hi: `श्रृंखला में अगली संख्या ज्ञात करें: ${seq.join(", ")}, ?`,
        },
        o: mkOpts(
          String(ans),
          String(ans),
          [String(ans + 2), String(ans - 2), String(ans + step)],
          [String(ans + 2), String(ans - 2), String(ans + step)],
          pick(["A", "B", "C", "D"], n)
        ),
        a: pick(["A", "B", "C", "D"], n),
        cat,
        sub,
        subj: SUBJECTS[0],
        dif: diff,
        exp: {
          en: `Pattern: add ${step} each time. Next = ${ans}.`,
          hi: `पैटर्न: हर बार ${step} जोड़ें। अगली संख्या = ${ans}।`,
        },
        year,
      };
    } else if (type === 1) {
      const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
      const i = n % 8;
      const seq = letters.slice(i, i + 4);
      const ans = letters[i + 4];
      yield {
        id: `q${id}`,
        q: {
          en: `Find the next letter: ${seq.join(", ")}, ?`,
          hi: `अगला अक्षर ज्ञात करें: ${seq.join(", ")}, ?`,
        },
        o: mkOpts(ans, ans, [letters[i + 5], letters[i + 3], letters[i + 6]], [letters[i + 5], letters[i + 3], letters[i + 6]], "B"),
        a: "B",
        cat, sub, subj: SUBJECTS[0], dif: diff, year,
        exp: { en: "Consecutive alphabet series.", hi: "क्रमिक वर्णमाला श्रृंखला।" },
      };
    } else if (type === 2) {
      const word = pick(["CAT", "DOG", "PEN", "SUN", "MOON"], n);
      const coded = word.split("").map((c) => c.charCodeAt(0) - 64).join("");
      yield {
        id: `q${id}`,
        q: {
          en: `If ${word.split("").join("-")} is coded as ${coded.split("").join("-")}, find the code for ${pick(["BAT", "RAT", "HAT"], n)}.`,
          hi: `यदि ${word} को ${coded} के रूप में कोड किया गया है, तो ${pick(["BAT", "RAT", "HAT"], n)} का कोड ज्ञात करें।`,
        },
        o: mkOpts("21520", "21520", ["21820", "1920", "21420"], ["21820", "1920", "21420"], "C"),
        a: "C",
        cat, sub, subj: SUBJECTS[0], dif: diff, year,
      };
    } else if (type === 3) {
      yield {
        id: `q${id}`,
        q: {
          en: "A is the father of B. B is the sister of C. How is A related to C?",
          hi: "A, B का पिता है। B, C की बहन है। A का C से क्या संबंध है?",
        },
        o: [
          { en: "Father", hi: "पिता" },
          { en: "Brother", hi: "भाई" },
          { en: "Uncle", hi: "चacha" },
          { en: "Grandfather", hi: "दादा" },
        ],
        a: "A",
        cat, sub, subj: SUBJECTS[0], dif: diff, year,
        exp: { en: "A is father of both B and C.", hi: "A, B और C दोनों का पिता है।" },
      };
    } else if (type === 4) {
      yield {
        id: `q${id}`,
        q: {
          en: "Find the odd one out: Triangle, Square, Circle, Rectangle",
          hi: " विषम को चुनें: Triangle, Square, Circle, Rectangle",
        },
        o: [
          { en: "Triangle", hi: "Triangle" },
          { en: "Square", hi: "Square" },
          { en: "Circle", hi: "Circle" },
          { en: "Rectangle", hi: "Rectangle" },
        ],
        a: "C",
        cat, sub, subj: SUBJECTS[0], dif: "Easy", year,
        exp: { en: "Circle has no straight sides.", hi: "वृत्त में सीधी भुजाएँ नहीं होतीं।" },
      };
    } else if (type === 5) {
      const num = 10 + (n % 90);
      yield {
        id: `q${id}`,
        q: {
          en: `If × means +, + means −, − means ×, then ${num} + 5 × 2 = ?`,
          hi: `यदि × का अर्थ +, + का अर्थ −, − का अर्थ × है, तो ${num} + 5 × 2 = ?`,
        },
        o: mkOpts(String(num - 7), String(num - 7), [String(num + 7), String(num * 7), String(num)], [String(num + 7), String(num * 7), String(num)], "A"),
        a: "A",
        cat, sub, subj: SUBJECTS[0], dif: "Hard", year,
      };
    } else if (type === 6) {
      yield {
        id: `q${id}`,
        q: {
          en: "BOOK is to READ as FOOD is to ?",
          hi: "BOOK : READ :: FOOD : ?",
        },
        o: [
          { en: "Eat", hi: "खाना" },
          { en: "Cook", hi: "पकाना" },
          { en: "Buy", hi: "खरीदना" },
          { en: "Grow", hi: "उगाना" },
        ],
        a: "A",
        cat, sub, subj: SUBJECTS[0], dif: "Easy", year,
      };
    } else {
      const a = 3 + (n % 7);
      const b = 4 + (n % 6);
      yield {
        id: `q${id}`,
        q: {
          en: `A man walks ${a} km North, then ${b} km East. How far is he from the starting point?`,
          hi: `एक व्यक्ति ${a} किमी उत्तर, फिर ${b} किमी पूर्व चलता है। प्रारंभ बिंदु से कितनी दूर है?`,
        },
        o: mkOpts(`${Math.round(Math.sqrt(a * a + b * b))} km`, `${Math.round(Math.sqrt(a * a + b * b))} किमी`, ["7 km", "9 km", "12 km"], ["7 किमी", "9 किमी", "12 किमी"], "B"),
        a: "B",
        cat, sub, subj: SUBJECTS[0], dif: "Medium", year,
      };
    }
  }
}

// ─── MATHS GENERATORS ───────────────────────────────────────────────
function* genMaths(startId) {
  for (let n = 0; n < PER_SUBJECT; n++) {
    const id = startId + n;
    const type = n % 7;
    const diff = pick(DIFFICULTIES, n);
    const year = pick(YEARS, n);
    const { cat, sub } = pickCatSub(n + 100);

    if (type === 0) {
      const p = 100 + (n % 900);
      const pct = 5 + (n % 20);
      const ans = Math.round((p * pct) / 100);
      yield {
        id: `q${id}`,
        q: { en: `${pct}% of ${p} is?`, hi: `${p} का ${pct}% कितना है?` },
        o: mkOpts(String(ans), String(ans), [String(ans + 10), String(ans - 5), String(ans + 20)], [String(ans + 10), String(ans - 5), String(ans + 20)], "A"),
        a: "A", cat, sub, subj: SUBJECTS[1], dif: diff, year,
        exp: { en: `${p} × ${pct}/100 = ${ans}`, hi: `${p} × ${pct}/100 = ${ans}` },
      };
    } else if (type === 1) {
      const cp = 200 + (n % 800);
      const profit = 10 + (n % 30);
      const sp = Math.round(cp * (1 + profit / 100));
      yield {
        id: `q${id}`,
        q: { en: `A man buys an article for ₹${cp} and sells at ${profit}% profit. SP?`, hi: `एक वस्तु ₹${cp} में खरीदी और ${profit}% लाभ पर बेची। विक्रय मूल्य?` },
        o: mkOpts(`₹${sp}`, `₹${sp}`, [`₹${sp - 50}`, `₹${sp + 100}`, `₹${cp}`], [`₹${sp - 50}`, `₹${sp + 100}`, `₹${cp}`], "C"),
        a: "C", cat, sub, subj: SUBJECTS[1], dif: diff, year,
      };
    } else if (type === 2) {
      const p = 1000 + (n % 9000);
      const r = 5 + (n % 15);
      const t = 1 + (n % 4);
      const si = Math.round((p * r * t) / 100);
      yield {
        id: `q${id}`,
        q: { en: `Simple interest on ₹${p} at ${r}% for ${t} year(s)?`, hi: `₹${p} पर ${r}% दर से ${t} वर्ष का साधारण ब्याज?` },
        o: mkOpts(`₹${si}`, `₹${si}`, [`₹${si + 100}`, `₹${si - 50}`, `₹${si * 2}`], [`₹${si + 100}`, `₹${si - 50}`, `₹${si * 2}`], "D"),
        a: "D", cat, sub, subj: SUBJECTS[1], dif: diff, year,
      };
    } else if (type === 3) {
      const a = 2 + (n % 8);
      const b = 3 + (n % 7);
      yield {
        id: `q${id}`,
        q: { en: `Ratio of ${a}:${b} — if first part is ${a * 10}, second part?`, hi: `अनुपात ${a}:${b} — यदि पहला भाग ${a * 10} है, दूसरा भाग?` },
        o: mkOpts(String(b * 10), String(b * 10), [String(a * 10), String(b * 5), String(a * 5)], [String(a * 10), String(b * 5), String(a * 5)], "B"),
        a: "B", cat, sub, subj: SUBJECTS[1], dif: "Easy", year,
      };
    } else if (type === 4) {
      const nums = [10, 20, 30, 40, 50].map((x) => x + (n % 5));
      const avg = Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
      yield {
        id: `q${id}`,
        q: { en: `Average of ${nums.join(", ")}?`, hi: `${nums.join(", ")} का औसत?` },
        o: mkOpts(String(avg), String(avg), [String(avg + 5), String(avg - 3), String(avg + 10)], [String(avg + 5), String(avg - 3), String(avg + 10)], "A"),
        a: "A", cat, sub, subj: SUBJECTS[1], dif: "Easy", year,
      };
    } else if (type === 5) {
      const speed = 40 + (n % 60);
      const time = 2 + (n % 5);
      const dist = speed * time;
      yield {
        id: `q${id}`,
        q: { en: `A train runs at ${speed} km/h for ${time} hours. Distance covered?`, hi: `एक ट्रेन ${speed} किमी/घंटा से ${time} घंटे चलती है। दूरी?` },
        o: mkOpts(`${dist} km`, `${dist} किमी`, [`${dist + 20} km`, `${dist - 10} km`, `${speed + time} km`], [`${dist + 20} किमी`, `${dist - 10} किमी`, `${speed + time} किमी`], "C"),
        a: "C", cat, sub, subj: SUBJECTS[1], dif: "Medium", year,
      };
    } else {
      const x = 5 + (n % 15);
      yield {
        id: `q${id}`,
        q: { en: `If 3x + 7 = ${3 * x + 7}, find x.`, hi: `यदि 3x + 7 = ${3 * x + 7}, x ज्ञात करें।` },
        o: mkOpts(String(x), String(x), [String(x + 2), String(x - 1), String(x + 5)], [String(x + 2), String(x - 1), String(x + 5)], "B"),
        a: "B", cat, sub, subj: SUBJECTS[1], dif: "Easy", year,
      };
    }
  }
}

// ─── ENGLISH GENERATORS ─────────────────────────────────────────────
const SYNONYMS = [
  ["Abundant", "Plentiful", "Scarce", "Rare", "Limited"],
  ["Benevolent", "Kind", "Cruel", "Harsh", "Mean"],
  ["Candid", "Frank", "Secretive", "Shy", "Hidden"],
  ["Diligent", "Hardworking", "Lazy", "Slow", "Idle"],
  ["Eloquent", "Fluent", "Quiet", "Mute", "Silent"],
];
const SYNONYMS_HI = [
  ["प्रचुर", "भरपूर", "दुर्लभ", "कम", "सीमित"],
  ["दयालु", "कृपालु", "क्रूर", "कठोर", "कंजूस"],
  ["स्पष्टवादी", "खरा", "गुप्त", "संकोची", "छिपा"],
  ["मेहनती", "परिश्रमी", "आलसी", "धीमा", "निष्क्रिय"],
  ["वाक्पटु", "धाराप्रवाह", "चुप", "गूंगा", "मौन"],
];

function* genEnglish(startId) {
  for (let n = 0; n < PER_SUBJECT; n++) {
    const id = startId + n;
    const type = n % 6;
    const diff = pick(DIFFICULTIES, n);
    const year = pick(YEARS, n);
    const { cat, sub } = pickCatSub(n + 200);
    const syn = pick(SYNONYMS, n);
    const synHi = pick(SYNONYMS_HI, n);

    if (type === 0) {
      yield {
        id: `q${id}`,
        q: { en: `Synonym of '${syn[0]}':`, hi: `'${synHi[0]}' का पर्यायवाची:` },
        o: [
          { en: syn[1], hi: synHi[1] },
          { en: syn[2], hi: synHi[2] },
          { en: syn[3], hi: synHi[3] },
          { en: syn[4], hi: synHi[4] },
        ],
        a: "A",
        cat, sub, subj: SUBJECTS[2], dif: diff, year,
      };
    } else if (type === 1) {
      yield {
        id: `q${id}`,
        q: { en: "Choose the correctly spelled word:", hi: "सही वर्तनी वाला शब्द चुनें:" },
        o: [
          { en: "Accommodation", hi: "Accommodation" },
          { en: "Accomodation", hi: "Accomodation" },
          { en: "Acommodation", hi: "Acommodation" },
          { en: "Accommadation", hi: "Accommadation" },
        ],
        a: "A", cat, sub, subj: SUBJECTS[2], dif: "Easy", year,
      };
    } else if (type === 2) {
      yield {
        id: `q${id}`,
        q: { en: "Antonym of 'Benevolent':", hi: "'दयालu' का विलोम:" },
        o: [
          { en: "Malevolent", hi: "दुष्ट" },
          { en: "Generous", hi: "उदार" },
          { en: "Kind", hi: "दयालu" },
          { en: "Charitable", hi: "दानशील" },
        ],
        a: "A", cat, sub, subj: SUBJECTS[2], dif: "Medium", year,
      };
    } else if (type === 3) {
      yield {
        id: `q${id}`,
        q: { en: "Idiom 'Break the ice' means:", hi: "'Break the ice' मुहावरे का अर्थ:" },
        o: [
          { en: "To start a conversation", hi: "बातचीत शुरू करना" },
          { en: "To destroy", hi: "तोड़ना" },
          { en: "To feel cold", hi: "ठंड लगना" },
          { en: "To win", hi: "जीतना" },
        ],
        a: "A", cat, sub, subj: SUBJECTS[2], dif: "Easy", year,
      };
    } else if (type === 4) {
      yield {
        id: `q${id}`,
        q: { en: "Fill in: She ___ to school every day.", hi: "रिक्त स्थान भरें: She ___ to school every day." },
        o: [
          { en: "goes", hi: "goes" },
          { en: "go", hi: "go" },
          { en: "going", hi: "going" },
          { en: "gone", hi: "gone" },
        ],
        a: "A", cat, sub, subj: SUBJECTS[2], dif: "Easy", year,
      };
    } else {
      yield {
        id: `q${id}`,
        q: { en: "One who loves books is called:", hi: "पुस्तकों से प्रेम करने वाले को क्या कहते हैं:" },
        o: [
          { en: "Bibliophile", hi: "Bibliophile" },
          { en: "Philanthropist", hi: "Philanthropist" },
          { en: "Misanthrope", hi: "Misanthrope" },
          { en: "Calligrapher", hi: "Calligrapher" },
        ],
        a: "A", cat, sub, subj: SUBJECTS[2], dif: "Medium", year,
      };
    }
  }
}

// ─── GK / CURRENT AFFAIRS GENERATORS ────────────────────────────────
const GK_2025 = [
  { q: "Who won the ICC Cricket World Cup 2023?", hi: "ICC क्रिकेट विश्व कप 2023 किसने जीता?", a: "Australia", hiA: "ऑस्ट्रेलिया", opts: ["Australia", "India", "England", "South Africa"], hiOpts: ["ऑस्ट्रेलिया", "भारत", "इंग्लैंड", "दक्षिण अफ्रीका"] },
  { q: "India's first solar mission Aditya-L1 was launched in:", hi: "भारत का पहला सौर मिशन Aditya-L1 कब लॉन्च हुआ?", a: "2023", hiA: "2023", opts: ["2022", "2023", "2024", "2021"], hiOpts: ["2022", "2023", "2024", "2021"] },
  { q: "Chandrayaan-3 landed on Moon in:", hi: "Chandrayaan-3 चंद्रमा पर कब उतरा?", a: "August 2023", hiA: "अगस्त 2023", opts: ["July 2023", "August 2023", "September 2023", "June 2023"], hiOpts: ["जुलाई 2023", "अगस्त 2023", "सितंबर 2023", "जून 2023"] },
  { q: "Who is known as the Father of the Indian Constitution?", hi: "भारतीय संविधान के जनक कौन हैं?", a: "Dr. B.R. Ambedkar", hiA: "डॉ. बी.आर. अंबेडकर", opts: ["Dr. B.R. Ambedkar", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"], hiOpts: ["डॉ. बी.आर. अंबेडकर", "महात्मा गांधी", "जवाहरलाल नेहरू", "सरदार पटेल"] },
  { q: "Full form of SSC is:", hi: "SSC का पूर्ण रूप:", a: "Staff Selection Commission", hiA: "कर्मचारी चयन आयोग", opts: ["Staff Selection Commission", "State Service Commission", "Senior Staff Council", "Special Selection Committee"], hiOpts: ["कर्मचारी चयन आयोग", "राज्य सेवा आयोग", "वरिष्ठ कर्मचारी परिषद", "विशेष चयन समिति"] },
];

const GK_2026 = [
  { q: "Budget 2026 theme focused on:", hi: "बजट 2026 का मुख्य विषय:", a: "Viksit Bharat", hiA: "विकसित भारत", opts: ["Viksit Bharat", "Digital India", "Make in India", "Skill India"], hiOpts: ["विकसित भारत", "डिजिटल इंडिया", "मेक इन इंडिया", "स्किल इंडिया"] },
  { q: "Republic Day 2026 chief guest country was:", hi: "गणतंत्र दिवस 2026 के मुख्य अतिथि देश:", a: "Indonesia", hiA: "इंडोनेशिया", opts: ["Indonesia", "France", "USA", "Japan"], hiOpts: ["इंडोनेशिया", "फ्रांस", "USA", "जापान"] },
  { q: "G20 Summit 2025 presidency held by:", hi: "G20 शिखर सम्मelan 2025 की अध्यक्षता:", a: "Brazil", hiA: "ब्राजील", opts: ["Brazil", "India", "South Africa", "USA"], hiOpts: ["ब्राजील", "भारत", "दक्षिण अफ्रीका", "USA"] },
];

const GK_STATIC = [
  { q: "Capital of Rajasthan is:", hi: "राजस्थान की राजधानी:", a: "Jaipur", opts: ["Jaipur", "Jodhpur", "Udaipur", "Kota"], hiOpts: ["जयपुर", "जोधपुर", "उdaipur", "कोटा"] },
  { q: "Which gas is most abundant in Earth's atmosphere?", hi: "पृथ्वी के वायुमंडल में सबसे अधिक गैस:", a: "Nitrogen", opts: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"], hiOpts: ["नाइट्रोजन", "ऑक्सीजन", "कारbon dioxide", "हाइड्रोजन"] },
  { q: "Article 21 of Indian Constitution deals with:", hi: "संविधान का अनुच्छेद 21 संबंधित है:", a: "Right to Life", opts: ["Right to Life", "Right to Education", "Right to Property", "Right to Vote"], hiOpts: ["जीवन का अधिकार", "शिक्षा का अधिकार", "संपत्ति का अधिकार", "मतदान का अधिकार"] },
  { q: "RBI was established in:", hi: "RBI की स्थापना:", a: "1935", opts: ["1935", "1947", "1950", "1969"], hiOpts: ["1935", "1947", "1950", "1969"] },
  { q: "Statue of Unity is located in:", hi: "Statue of Unity स्थित है:", a: "Gujarat", opts: ["Gujarat", "Maharashtra", "Rajasthan", "MP"], hiOpts: ["गुजरात", "महाराष्ट्र", "राजस्थान", "MP"] },
];

function* genGK(startId) {
  const allGK = [...GK_2025, ...GK_2026, ...GK_STATIC];
  for (let n = 0; n < PER_SUBJECT; n++) {
    const id = startId + n;
    const item = pick(allGK, n);
    const diff = pick(DIFFICULTIES, n);
    const year = n % 3 === 0 ? 2026 : n % 3 === 1 ? 2025 : 2024;
    const { cat, sub } = pickCatSub(n + 300);
    const correctIdx = item.opts.indexOf(item.a);
    const labels = ["A", "B", "C", "D"];

    yield {
      id: `q${id}`,
      q: { en: item.q, hi: item.hi },
      o: item.opts.map((o, i) => ({ en: o, hi: item.hiOpts?.[i] ?? o })),
      a: labels[correctIdx >= 0 ? correctIdx : 0],
      cat,
      sub,
      subj: SUBJECTS[3],
      dif: diff,
      year,
      exp: {
        en: `Updated for ${year} government exam preparation.`,
        hi: `${year} सरकारी परीक्षा की तैयारी के लिए अपडेट।`,
      },
    };
  }
}

function pickCatSub(seed) {
  // Flat list ensures every exam subcategory (SSC, UPSC, Railway, etc.) gets questions
  const allSubs = CATEGORIES.flatMap((c) =>
    c.subs.map((sub) => ({ cat: c.cat, sub }))
  );
  return pick(allSubs, seed);
}

// ─── MAIN ───────────────────────────────────────────────────────────
function main() {
  console.log("Generating 10,200+ bilingual questions...");
  const questions = [];

  for (const q of genReasoning(1)) questions.push(q);
  console.log(`  Reasoning: ${PER_SUBJECT}`);

  for (const q of genMaths(PER_SUBJECT + 1)) questions.push(q);
  console.log(`  Maths: ${PER_SUBJECT}`);

  for (const q of genEnglish(PER_SUBJECT * 2 + 1)) questions.push(q);
  console.log(`  English: ${PER_SUBJECT}`);

  for (const q of genGK(PER_SUBJECT * 3 + 1)) questions.push(q);
  console.log(`  GK/Current Affairs: ${PER_SUBJECT}`);

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  writeFileSync(OUT_FILE, JSON.stringify(questions));
  const sizeMB = (Buffer.byteLength(JSON.stringify(questions)) / 1024 / 1024).toFixed(2);
  console.log(`\nDone! ${questions.length} questions written to ${OUT_FILE} (${sizeMB} MB)`);
}

main();
