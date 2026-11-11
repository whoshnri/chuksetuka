"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { ArrowRight, DownloadSimple, Minus, Plus } from "./phosphor-icons";
import { paperAssets } from "./site-ui";

const questions = [
  {
    category: "Leadership & Culture",
    question: "How regularly does your senior leadership team actively discuss inclusion?",
    options: [
      "Mainly during awareness months or specific events",
      "Occasionally, when an issue arises",
      "Regularly as part of organisational conversations",
      "It is embedded into leadership decision making, priorities and accountability",
    ],
  },
  {
    category: "Leadership & Culture",
    question: "If an employee raises a concern about discrimination, exclusion or unfair treatment, how confident are you that it will be taken seriously?",
    options: [
      "I'm not sure",
      "It depends on who raises it or who is involved",
      "Generally, concerns are taken seriously",
      "There is clear, set processes in place and people feel safe to speak up",
    ],
  },
  {
    category: "Recruitment & Progression",
    question: "When recruiting, how much consideration is given to accessibility and inclusion?",
    options: [
      "To our knowledge, we meet the legal requirements",
      "We make adjustments when someone asks",
      "Accessibility and inclusion are considered during recruitment",
      "We proactively design recruitment processes to remove barriers",
    ],
  },
  {
    category: "Recruitment & Progression",
    question: "Do you know whether different groups of employees experience different outcomes when it comes to recruitment, progression or promotion?",
    options: [
      "No, we don't collect this information",
      "We collect some information but don't regularly analyse it",
      "We monitor some workforce data",
      "We actively analyse the data and take action where disparities appear",
    ],
  },
  {
    category: "Accessibility & Everyday Experience",
    question: "How accessible is your workplace, physically, digitally and culturally?",
    options: [
      "We haven't really assessed it",
      "We respond when someone identifies a barrier",
      "We have made a number of improvements",
      "Accessibility is considered proactively when we design spaces, systems and processes",
    ],
  },
  {
    category: "Accessibility & Everyday Experience",
    question: "When making changes to policies, services, systems or the workplace, whose voices are included?",
    options: [
      "Mainly senior leaders",
      "Relevant managers or specialists",
      "Employees are sometimes consulted",
      "People who will be impacted by the change are deliberately involved in the design process",
    ],
  },
  {
    category: "Psychological Safety",
    question: "Do your employees feel able to challenge decisions or actions that they may feel are unfair or not inclusive?",
    options: [
      "People generally keep their heads down",
      "Some people speak up, but there can be repercussions",
      "Employees feel they can challenge in a positive way",
      "There is an open culture of constructive challenge and psychological safety",
    ],
  },
  {
    category: "Psychological Safety",
    question: "If someone gets something wrong or says something that may not be inclusive, what happens?",
    options: [
      "Everyone feels awkward and forgets about it",
      "Someone quietly corrects them",
      "It is addressed and used as a learning opportunity",
      "The organisation has the confidence and skills to have honest conversations about impact, accountability and learning",
    ],
  },
  {
    category: "Going from intention to action",
    question: "Which statement best describes your organisation?",
    options: [
      "We're still figuring out where to start",
      "Have good intentions but don't know how to take action",
      "We have actions and policies but want to become more consistent",
      "Inclusion is embedded, but we're continually looking for ways to improve",
    ],
  },
  {
    category: "Going from intention to action",
    question: "You find out there is a significant obstacle/barrier facing some of your employees. What will your organisation do?",
    options: [
      "Investigate what happened",
      "Find a solution for the immediate problem",
      "Address the problem and look at processes that may have failed",
      "Involve those affected, understand the root cause, redesign the process and monitor whether the change works",
    ],
  },
];

const sections = [...new Set(questions.map((question) => question.category))];

const scoreBands = [
  {
    min: 10,
    max: 19,
    name: "FOUNDATIONS",
    message:
      "Your organisation may have good intentions, but inclusion doesn't yet appear consistently in everyday practice. Don't feel discouraged. This is where you start. Your biggest opportunity is to move from reacting to individual issues towards identifying and removing barriers systematically.",
    nextSteps: [
      "Ask: Who might currently be excluded from our workplace?",
      "Listen: Create safe spaces and opportunities for employees to share their experiences.",
      "Act: Identify three practical barriers and decide what you can change now.",
    ],
  },
  {
    min: 20,
    max: 27,
    name: "PROGRESSING",
    message:
      "There are positive foundations in place, however, your approach may depend too heavily on individual people, initiatives or good intentions. The next step is creating consistency and accountability.",
    nextSteps: [
      "Measure: Collect information about your workforce and employee experience to understand where inequalities exist.",
      "Embed: Build inclusion into recruitment, leadership, policies and decision-making.",
      "Review: Don't just introduce initiatives. Check whether they actually make a difference.",
    ],
  },
  {
    min: 28,
    max: 34,
    name: "EMBEDDING",
    message:
      "You're doing more than talking about inclusion. There are signs that it is becoming part of how your organisation operates. There is always room for improvement: inclusion isn't a destination. Your opportunity now is to identify the gaps between policy, intention and lived experience.",
    nextSteps: [
      "Listen: Do your employees feel your culture the way you think they do?",
      "Challenge: Where are your blind spots?",
      "Co-design: Involve the people most affected when designing solutions.",
    ],
  },
  {
    min: 35,
    max: 40,
    name: "LEADING",
    message:
      "Inclusion appears to be embedded into many areas of your organisation, but even strong organisations can have blind spots. The question now isn't simply “Are we inclusive?” It's: “Who might we still be excluding?” Because the moment inclusion becomes something we believe we've achieved is probably the moment we stop improving.",
    nextSteps: [
      "Keep listening.",
      "Keep challenging.",
      "Keep redesigning.",
    ],
  },
];

function getScoreBand(score: number) {
  return (
    scoreBands.find((band) => score >= band.min && score <= band.max) ??
    scoreBands[0]
  );
}

function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-flex w-fit items-center gap-2 font-sans text-sm font-semibold text-brand-action no-underline transition hover:underline hover:underline-offset-4"
    >
      <ArrowRight className="rotate-180" size={16} aria-hidden="true" />
      Back to home
    </Link>
  );
}

type CategoryScore = { category: string; score: number; total: number };

const opportunityDetails: Record<string, string> = {
  "Leadership & Culture": "Look at how inclusion is discussed in leadership and whether people trust the process for raising concerns.",
  "Recruitment & Progression": "Review recruitment and progression outcomes across different employee groups, then address barriers where disparities appear.",
  "Accessibility & Everyday Experience": "You may benefit from taking a closer look at how accessible your physical spaces, digital systems, policies and everyday processes really are.",
  "Psychological Safety": "Explore whether employees can challenge unfairness and have honest, constructive conversations when something goes wrong.",
  "Going from intention to action": "Identify the barriers people face, involve them in the response, and check whether changes resolve the root cause.",
};

const sectionAnalysis: Record<
  string,
  { dimensions: [string, string]; implication: string; action: string }
> = {
  "Leadership & Culture": {
    dimensions: ["leadership attention to inclusion", "confidence in the response to concerns"],
    implication: "Leadership attention and the experience of speaking up need to reinforce one another for commitments to feel credible.",
    action: "Put inclusion on a regular leadership agenda, agree a clear response route for concerns and report back on what changed.",
  },
  "Recruitment & Progression": {
    dimensions: ["inclusive recruitment practice", "understanding of different workforce outcomes"],
    implication: "Removing barriers in the hiring process is strongest when the organisation also checks who progresses and where disparities remain.",
    action: "Review one recruitment or promotion stage alongside available workforce data, then agree an owner for any barrier you find.",
  },
  "Accessibility & Everyday Experience": {
    dimensions: ["accessibility of the workplace and systems", "involvement of people affected by change"],
    implication: "Accessibility improvements are more likely to address real barriers when people who experience them help shape the changes.",
    action: "Ask disabled employees and colleagues with access needs about barriers, then involve them in reviewing one policy, system or process.",
  },
  "Psychological Safety": {
    dimensions: ["confidence to challenge unfairness", "ability to learn when harm or exclusion occurs"],
    implication: "People need both the safety to raise a challenge and the shared skills to respond without avoiding impact or accountability.",
    action: "Agree how teams can raise concerns and practise a response that names impact, supports learning and follows through.",
  },
  "Going from intention to action": {
    dimensions: ["clarity about the organisation's current stage", "response to a significant barrier"],
    implication: "Knowing where the organisation stands matters most when it leads to action that addresses root causes and checks whether change works.",
    action: "Choose one barrier, involve the people affected, redesign the process that created it and review the impact after the change.",
  },
};

const responseStages = ["an initial response", "an emerging practice", "an established practice", "an embedded practice"];

function getCombinationAnalysis(category: string, answerIndexes: number[]) {
  const analysis = sectionAnalysis[category];
  const first = answerIndexes[0] ?? 0;
  const second = answerIndexes[1] ?? 0;
  const difference = Math.abs(first - second);
  let combination: string;

  if (difference === 0) {
    combination = first === 0
      ? "Both answers point to an initial response. The shared pattern is largely reactive, so establish ownership and a reliable starting process before expanding the work."
      : first === 1
        ? "Both answers point to emerging practice. There is some activity, but it may rely on individual judgement or happen inconsistently; agree a repeatable approach."
        : first === 2
          ? "Both answers point to established practice. The foundations are working across both dimensions; strengthen consistency, review impact and close any remaining gaps."
          : "Both answers point to embedded practice. Keep checking this through employee experience and outcomes so established processes continue to respond to real needs.";
  } else if (difference === 1) {
    const leadingDimension = first > second ? analysis.dimensions[0] : analysis.dimensions[1];
    const developingDimension = first < second ? analysis.dimensions[0] : analysis.dimensions[1];
    combination = `${leadingDimension} is a little further along than ${developingDimension}. This is a near-aligned combination: build on the stronger practice and make the developing one more consistent.`;
  } else {
    const leadingDimension = first > second ? analysis.dimensions[0] : analysis.dimensions[1];
    const developingDimension = first < second ? analysis.dimensions[0] : analysis.dimensions[1];
    combination = `${leadingDimension} is notably further along than ${developingDimension}. This uneven combination can mean good practice is not yet translating into people's experience; focus first on bringing the developing dimension up to the same standard.`;
  }

  return `${analysis.dimensions[0]} is showing ${responseStages[first]}, while ${analysis.dimensions[1]} is showing ${responseStages[second]}. ${combination} ${analysis.implication} ${analysis.action}`;
}

function ResultsAccordion({ items, answers }: { items: Pick<CategoryScore, "category">[]; answers: Record<number, number> }) {
  const id = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, index) => {
        const open = index === openIndex;
        const panelId = `${id}-area-${index}`;
        return (
          <article
            className={`rounded-lg px-5 transition-colors duration-500 ${open ? "bg-brand-teal-soft" : "bg-[#f1f4f4]"}`}
            key={item.category}
          >
            <button
              type="button"
              className="flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left font-sans text-base font-semibold leading-[1.4] text-[#171514] outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-ink focus-visible:ring-offset-4"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <span>{item.category}</span>
              </span>
              <span
                className="relative grid size-7 shrink-0 place-items-center text-brand-teal-ink"
                aria-hidden="true"
              >
                <motion.span
                  className="absolute"
                  animate={{
                    opacity: open ? 0 : 1,
                    rotate: open ? 90 : 0,
                    scale: open ? 0.75 : 1,
                  }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Plus size={21} />
                </motion.span>
                <motion.span
                  className="absolute"
                  animate={{
                    opacity: open ? 1 : 0,
                    rotate: open ? 0 : -90,
                    scale: open ? 1 : 0.75,
                  }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Minus size={21} />
                </motion.span>
              </span>
            </button>
            <motion.div
              id={panelId}
              aria-hidden={!open}
              initial={false}
              animate={open ? "open" : "closed"}
              variants={{
                open: { height: "auto", opacity: 1 },
                closed: { height: 0, opacity: 0 },
              }}
              transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
                <div className="flex flex-col gap-5 pb-5 pr-10">
                  <section className="flex flex-col gap-2 rounded-lg bg-white/70 p-4" aria-label={`${item.category} combination analysis`}>
                    <h3 className="m-0 font-sans text-sm font-bold text-brand-teal-ink">How these answers work together</h3>
                    <p className="m-0 text-sm leading-6 text-[#303635]">
                      {getCombinationAnalysis(item.category, questions.flatMap((question, questionIndex) => question.category === item.category && answers[questionIndex] !== undefined ? [answers[questionIndex]] : []))}
                    </p>
                  </section>
                  {questions.map((question, questionIndex) => {
                    if (question.category !== item.category) return null;
                    const selectedAnswer = answers[questionIndex];
                    return (
                      <div className="flex flex-col gap-2" key={question.question}>
                        <h3 className="m-0 font-sans text-sm font-semibold leading-6 text-[#252b2a]">
                          {questionIndex + 1}. {question.question}
                        </h3>
                        <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-sm leading-5 text-[#4b5351]">
                          {question.options.map((option, optionIndex) => (
                            <li className={`rounded-sm px-3 py-2 ${optionIndex === selectedAnswer ? "bg-wine font-medium text-white" : "bg-white/70"}`} key={option}>
                              <span className="mr-2 font-semibold">{String.fromCharCode(65 + optionIndex)}.</span>{option}
                              {optionIndex === selectedAnswer}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
            </motion.div>
          </article>
        );
      })}
    </div>
  );
}

export function PulseCheck() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [resultsStage, setResultsStage] = useState<
    "idle" | "preparing" | "email-gate" | "ready"
  >("idle");
  const [email, setEmail] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [urlStateReady, setUrlStateReady] = useState(false);
  const flowHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const savedAnswers = params.get("answers");
    const savedStepValue = params.get("step");
    const savedStep =
      savedStepValue === null ? Number.NaN : Number(savedStepValue);
    const savedStage = params.get("stage");

    if (savedAnswers && /^[.0-3]{10}$/.test(savedAnswers)) {
      const restoredAnswers: Record<number, number> = {};
      for (const [index, value] of [...savedAnswers].entries()) {
        if (value !== ".") restoredAnswers[index] = Number(value);
      }
      setAnswers(restoredAnswers);
    }

    const savedEmail = window.sessionStorage.getItem("pulse-check-email");
    if (savedEmail) setEmail(savedEmail);

    if (
      Number.isInteger(savedStep) &&
      savedStep >= -1 &&
      savedStep <= questions.length
    ) {
      setStep(savedStep);
    }

    if (
      savedStage === "ready" ||
      savedStage === "email-gate" ||
      savedStage === "preparing"
    ) {
      // A refresh during the brief loading state should land on the email gate.
      setResultsStage(
        savedStage === "ready" && !savedEmail
          ? "email-gate"
          : savedStage === "preparing"
            ? "email-gate"
            : savedStage,
      );
      setStep(questions.length);
    }
    setUrlStateReady(true);
  }, []);

  useEffect(() => {
    if (!urlStateReady) return;

    const params = new URLSearchParams(window.location.search);
    params.set("step", String(step));
    params.set(
      "answers",
      questions.map((_, index) => answers[index] ?? ".").join(""),
    );
    if (resultsStage === "idle") params.delete("stage");
    else params.set("stage", resultsStage);

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [answers, resultsStage, step, urlStateReady]);

  useEffect(() => {
    flowHeadingRef.current?.focus({ preventScroll: true });
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top: 0, behavior });
  }, [step, resultsStage]);

  useEffect(() => {
    if (resultsStage !== "preparing") return;
    const timer = window.setTimeout(() => setResultsStage("email-gate"), 1100);
    return () => window.clearTimeout(timer);
  }, [resultsStage]);

  const totalScore = useMemo(
    () =>
      Object.values(answers).reduce((total, answer) => total + answer + 1, 0),
    [answers],
  );
  const band = getScoreBand(totalScore);
  const categoryScores = useMemo(() => {
    const scores = new Map<string, { score: number; total: number }>();
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer === undefined) return;
      const current = scores.get(question.category) ?? { score: 0, total: 0 };
      current.score += answer + 1;
      current.total += 4;
      scores.set(question.category, current);
    });
    return [...scores.entries()].map(([category, result]) => ({
      category,
      ...result,
    }));
  }, [answers]);

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answers[step] === undefined) return;
    if (step === questions.length - 1) {
      setStep(questions.length);
      setResultsStage("preparing");
      return;
    }
    setStep((current) => current + 1);
  }

  function handlePrevious() {
    setStep((current) => (current <= 0 ? -1 : current - 1));
  }

  function restart() {
    setAnswers({});
    setEmail("");
    window.sessionStorage.removeItem("pulse-check-email");
    setResultsStage("idle");
    setStep(-1);
  }

  async function unlockResults(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (emailSubmitting) return;
    setEmailSubmitting(true);
    setEmailError("");
    try {
      const response = await fetch("/api/subscribe/pulse-check", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent: emailConsent,
          website: (new FormData(event.currentTarget).get("website") || "").toString(),
        }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) {
        setEmailError(result.error || "Signup is temporarily unavailable. Please try again.");
        return;
      }
      window.sessionStorage.setItem("pulse-check-email", email.trim().toLowerCase());
      setResultsStage("ready");
    } catch {
      setEmailError("Signup is temporarily unavailable. Please try again.");
    } finally {
      setEmailSubmitting(false);
    }
  }

  async function downloadResults() {
    const reportDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    async function loadLogo() {
      const sources = [
        paperAssets.logo,
        `/_next/image?url=${encodeURIComponent(paperAssets.logo)}&w=384&q=90`,
      ];
      for (const source of sources) {
        try {
          const image = new window.Image();
          image.crossOrigin = "anonymous";
          image.src = source;
          await Promise.race([
            new Promise<void>((resolve, reject) => {
              image.onload = () => resolve();
              image.onerror = () => reject(new Error("Logo unavailable"));
            }),
            new Promise<never>((_, reject) =>
              window.setTimeout(
                () => reject(new Error("Logo load timed out")),
                4000,
              ),
            ),
          ]);
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext("2d");
          if (!context || !image.naturalWidth) continue;
          context.drawImage(image, 0, 0);
          return {
            data: canvas.toDataURL("image/png"),
            aspectRatio: image.naturalWidth / image.naturalHeight,
          };
        } catch {
          // Try the same logo through the site's image proxy if direct CORS is blocked.
        }
      }
      return null;
    }

    function addWatermark() {
      const mark = email || "Chuks Etuka Consulting";
      doc.setTextColor(234, 238, 237);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.text(mark, pageWidth / 2, pageHeight / 2, {
        align: "center",
        angle: 32,
      });
      doc.setTextColor(28, 34, 33);
    }

    function ensureSpace(height: number) {
      if (y + height <= pageHeight - 19) return;
      doc.addPage();
      addWatermark();
      y = 20;
    }

    function write(
      text: string,
      size: number,
      color: [number, number, number],
      options: { bold?: boolean; indent?: number; gap?: number } = {},
    ) {
      const { bold = false, indent = 0, gap = 2 } = options;
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(
        text,
        contentWidth - indent,
      ) as string[];
      const lineHeight = size * 0.48;
      ensureSpace(lines.length * lineHeight + gap);
      doc.text(lines, margin + indent, y);
      y += lines.length * lineHeight + gap;
      doc.setTextColor(28, 34, 33);
    }

    function writeLink(text: string, href: string) {
      ensureSpace(8);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(233, 97, 27);
      const linkWidth = doc.getTextWidth(text);
      doc.text(text, margin, y);
      doc.link(margin, y - 4, linkWidth, 6, { url: href });
      y += 8;
    }

    addWatermark();
    const logo = await loadLogo();
    if (!logo) {
      window.alert("The Chuks Etuka Consulting logo could not be loaded, so the PDF was not created. Please try again when the logo is available.");
      return;
    }
    const logoWidth = 43;
    const logoHeight = logoWidth / logo.aspectRatio;
    doc.addImage(logo.data, "PNG", margin, y - 4, logoWidth, logoHeight);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(23, 104, 108);
    doc.text("INCLUSION PULSE CHECK", pageWidth - margin, y + 3, {
      align: "right",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(90, 98, 96);
    doc.text(reportDate, pageWidth - margin, y + 8, { align: "right" });
    y += 26;

    write(`You are: ${band.name}`, 23, [23, 21, 20], { bold: true, gap: 4 });
    write(band.message, 10, [75, 83, 81], { gap: 6 });

    ensureSpace(27);
    doc.setFillColor(23, 104, 108);
    doc.roundedRect(margin, y, contentWidth, 25, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(220, 239, 237);
    doc.text("YOUR INCLUSION PULSE SCORE", margin + 7, y + 9);
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text(`${totalScore} / 40`, pageWidth - margin - 7, y + 17, { align: "right" });
    y += 32;

    if (focusArea) {
      write("Your biggest opportunity", 15, [23, 21, 20], { bold: true, gap: 4 });
      write(`Based on your lowest-scoring questions: ${focusArea.category}`, 9, [23, 104, 108], { bold: true, gap: 3 });
      write(opportunityDetails[focusArea.category], 10, [65, 73, 71], { gap: 7 });
    }

    write("Your 3 quick wins", 15, [23, 21, 20], { bold: true, gap: 4 });
    band.nextSteps.forEach((item, index) => write(`${index + 1}. ${item}`, 9, [65, 73, 71], { indent: 2, gap: 3 }));

    write("Your results by area", 17, [23, 21, 20], { bold: true, gap: 5 });
    for (const result of categoryScores) {
      ensureSpace(54);
      doc.setFillColor(238, 245, 244);
      doc.roundedRect(margin, y - 4, contentWidth, 13, 2, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(23, 104, 108);
      doc.text(`SECTION ${sections.indexOf(result.category) + 1} — ${result.category}`, margin + 4, y + 4);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(23, 21, 20);
      doc.text(
        `${result.score} / ${result.total}`,
        pageWidth - margin - 4,
        y + 4,
        { align: "right" },
      );
      y += 15;
      write(
        getCombinationAnalysis(
          result.category,
          questions.flatMap((question, index) => question.category === result.category ? [answers[index] ?? 0] : []),
        ),
        9,
        [65, 73, 71],
        { gap: 5 },
      );
      questions.forEach((question, index) => {
        if (question.category !== result.category) return;
        const answerIndex = answers[index];
        ensureSpace(60);
        write(`Question ${index + 1}: ${question.question}`, 9, [35, 40, 39], {
          bold: true,
          indent: 3,
          gap: 2,
        });
        question.options.forEach((option, optionIndex) => {
          const letter = String.fromCharCode(65 + optionIndex);
          const selected = optionIndex === answerIndex;
          write(`${letter}. ${option}${selected ? "  (YOUR RESPONSE)" : ""}`, 8, selected ? [23, 104, 108] : [75, 83, 81], { indent: 5, bold: selected, gap: 1 });
        });
        y += 3;
      });
      y += 3;
    }

    write("Scoring", 13, [23, 21, 20], { bold: true, gap: 3 });
    write("A = 1 point · B = 2 points · C = 3 points · D = 4 points. Maximum score: 40.", 9, [75, 83, 81], { gap: 5 });
    write("Your score is useful. But it's only the starting point. A self-assessment tells you what you think is happening. A proper diagnostic explores what is actually happening.", 10, [23, 21, 20], { bold: true, gap: 4 });
    write("Want to go deeper?", 15, [23, 104, 108], { bold: true, gap: 3 });
    write("Chuks Etuka Consulting can help you move from insight to action. I work with organisations to decode DEI, build trust and boost impact through practical EDI strategies, accessibility assessments, inclusive leadership, policy review, training and organisational culture work.", 9, [75, 83, 81], { gap: 4 });
    writeLink("Book a FREE 30-minute Inclusion Discovery Call", `${window.location.origin}/book-a-call`);
    writeLink("Send me a message", `${window.location.origin}/contact`);
    const pageCount = doc.getNumberOfPages();
    for (let page = 1; page <= pageCount; page += 1) {
      doc.setPage(page);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 108, 106);
      doc.text("Chuks Etuka Consulting", margin, pageHeight - 9);
      doc.text(`${page} / ${pageCount}`, pageWidth - margin, pageHeight - 9, {
        align: "right",
      });
    }
    doc.save(
      `inclusion-pulse-results-${new Date().toISOString().slice(0, 10)}.pdf`,
    );
  }

  function emailResults() {
    const body = [
      `My Inclusion Pulse Check result: ${band.name} (${totalScore}/40)`,
      band.message,
      "",
      ...categoryScores.map(
        (result) => `${result.category}: ${result.score}/${result.total}`,
      ),
      "",
      "A conversation starter, not a verdict. Choose one practical action and agree who will own it.",
    ].join("\n");
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("My Inclusion Pulse Check results")}&body=${encodeURIComponent(body)}`;
  }

  const lowestQuestion = questions.reduce<{ category: string; answer: number } | null>(
    (lowest, question, index) => {
      const answer = answers[index];
      if (answer === undefined || (lowest && answer >= lowest.answer)) return lowest;
      return { category: question.category, answer };
    },
    null,
  );
  const focusArea = categoryScores.find((result) => result.category === lowestQuestion?.category) ?? null;

  if (!urlStateReady) return null;

  if (step === -1) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col items-start gap-4">
          <h1 className="m-0 max-w-4xl font-[var(--font-heading)] text-4xl font-bold leading-[1.05] tracking-[-.04em] text-[#171514] sm:text-5xl lg:text-6xl">
            Is your culture inclusive… or just well-branded?
          </h1>
          <p className="m-0 max-w-2xl text-base leading-7 text-[#555d5c] sm:text-lg">
            A quick, honest look at what inclusion feels like day to day in your
            organisation.
          </p>
        </header>

        <ul
          className="m-0 flex flex-wrap gap-2 p-0 text-sm font-semibold"
          aria-label="At a glance"
        >
          <li className="rounded-lg bg-brand-teal-ink px-4 py-2.5 text-white">
            5 minutes
          </li>
          <li className="rounded-lg bg-brand-teal-soft px-4 py-2.5 text-brand-teal-ink">
            10 questions
          </li>
          <li className="rounded-lg bg-brand-teal-soft px-4 py-2.5 text-brand-teal-ink">
            Instant result
          </li>
        </ul>

        <section className="rounded-lg shape-fancy grid grid-cols-1 gap-8 bg-wine px-7 pb-16 pt-9 text-white shadow-lg md:grid-cols-[minmax(0,1.25fr)_minmax(230px,.75fr)] md:px-12 md:pb-20 md:pt-12">
          <div className="flex flex-col items-start gap-5">
            <h2 className="m-0 max-w-[18ch] font-[var(--font-heading)] text-3xl font-semibold leading-tight !text-white sm:text-4xl">
              Ten questions. A clearer next step.
            </h2>
            <p className="m-0 max-w-2xl text-base leading-7 text-white/90">
              Answer honestly. There are no perfect scores and no judgement.
              You’ll get an instant snapshot across leadership, recruitment,
              accessibility, culture and measurement.
            </p>
            <Button
              size="lg"
              className="fancy-button !rounded-lg"
              onClick={() => setStep(0)}
            >
              Start the pulse check <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 self-center text-sm leading-5 text-white">
            {[
              "Leadership & Culture",
              "Recruitment & Progression",
              "Accessibility & Everyday Experience",
              "Psychological Safety",
              "Going from intention to action",
            ].map((item) => (
              <li key={item} className="rounded-lg bg-white/15 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  if (step < questions.length) {
    const currentQuestion = questions[step];
    const currentAnswer = answers[step] ?? null;
    const progress = ((step + 1) / questions.length) * 100;

    return (
      <section
        className="mx-auto flex w-full max-w-3xl flex-col gap-6"
        aria-live="polite"
      >
        <BackToHome />
        <div className="flex flex-col gap-3" aria-label="Question progress">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#525a59]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold">
                Question {step + 1} of {questions.length}
              </span>
            </div>
            <span className="tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-lg bg-[#e2e8e7]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={step + 1}
            aria-label={`Question ${step + 1} of ${questions.length}`}
          >
            <div
              className="h-full rounded-lg bg-accent transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="m-0 font-sans text-xs font-bold uppercase tracking-[.12em] text-brand-teal-ink">
          Section {sections.indexOf(currentQuestion.category) + 1} — {currentQuestion.category}
        </p>
        <h1
          ref={flowHeadingRef}
          tabIndex={-1}
          className="m-0 font-[var(--font-heading)] text-[clamp(30px,4vw,44px)] font-semibold leading-[1.15] tracking-[-.035em] text-[#171514] outline-none focus-visible:ring-2 focus-visible:ring-brand-action focus-visible:ring-offset-4"
        >
          {currentQuestion.question}
        </h1>

        <form onSubmit={handleNext} className="flex flex-col gap-5">
          <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
            <legend className="sr-only">
              Choose the answer that best describes your organisation
            </legend>
            {currentQuestion.options.map((option, index) => {
              const selected = currentAnswer === index;
              return (
                <label
                  htmlFor={`pulse-answer-${index}`}
                  className={`group flex min-h-16 cursor-pointer items-center gap-4 rounded-lg border px-4 py-4 text-base leading-6 transition duration-150 hover:-translate-y-px focus-within:ring-2 focus-within:ring-brand-action focus-within:ring-offset-2 ${selected ? "border-brand-teal-ink bg-brand-teal-ink text-white" : "border-[#d7dfde] bg-white text-[#303635] hover:border-accent hover:bg-brand-teal-soft"}`}
                  key={option}
                >
                  <input
                    id={`pulse-answer-${index}`}
                    className="peer sr-only"
                    type="radio"
                    name={`pulse-answer-${step}`}
                    value={index}
                    checked={selected}
                    onChange={() =>
                      setAnswers((current) => ({ ...current, [step]: index }))
                    }
                  />
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-lg border text-sm font-semibold transition-colors ${selected ? "border-white bg-white text-brand-teal-ink" : "border-[#b9c7c5] text-brand-teal-ink group-hover:border-accent group-hover:text-accent"}`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                </label>
              );
            })}
          </fieldset>

          <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              type="button"
              onClick={handlePrevious}
              className="!rounded-lg min-w-28 cursor-pointer bg-teal hover:scale-95 hover:bg-teal fancy-button invert-shape
            "
            >
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              shape="none"
              disabled={currentAnswer === null}
              className="!rounded-lg fancy-button cursor-pointer flip-shape invert-shape bg-wine hover:bg-wine hover:scale-105 min-w-36"
            >
              {step === questions.length - 1 ? "See my result" : "Continue"}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </form>
        <p className="m-0 text-xs leading-5 text-[#626a69]">
          Use the arrow keys to move between answers, Space to select and Enter
          to continue.
        </p>
      </section>
    );
  }

  if (resultsStage === "preparing") {
    return (
      <section
        className="mx-auto flex min-h-[55vh] w-full max-w-3xl flex-col items-center justify-center gap-5 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.span
          className="size-10 rounded-lg bg-accent"
          animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1, 0.9] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <h1 className="m-0 font-[var(--font-heading)] text-3xl font-semibold tracking-[-.03em] text-[#171514] sm:text-4xl">
          Preparing your results…
        </h1>
        <p className="m-0 max-w-lg text-base leading-7 text-[#5b6264]">
          We’re bringing your answers together into a clear snapshot.
        </p>
      </section>
    );
  }

  if (resultsStage === "email-gate") {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <h1 className="m-0 font-[var(--font-heading)] text-4xl font-semibold leading-tight tracking-[-.035em] text-[#171514] sm:text-5xl">
          Your assessment insights are ready.
        </h1>
        <p className="m-0 max-w-xl text-base leading-7 text-[#555d5c]">
          Enter your email to unlock your personalised insights. We’ll add you
          to the Pulse Check email group for related follow-up; your score and
          breakdown will appear here to view or download.
        </p>
        <form onSubmit={unlockResults} className="flex flex-col gap-4">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden" />
          <input
            id="pulse-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="you@organisation.com"
            className="min-h-12 w-full !rounded-lg border border-[#bfcac8] bg-white px-4 text-base text-[#171514] outline-none placeholder:text-[#7a8280] focus:border-brand-action focus:ring-2 focus:ring-brand-action/20"
          />
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#555d5c]">
            <input
              type="checkbox"
              name="pulse-email-consent"
              required
              checked={emailConsent}
              onChange={(event) => setEmailConsent(event.target.checked)}
              className="mt-1 size-4 shrink-0 accent-[#17686c]"
            />
            <span>I agree to receive my Pulse Check result and related follow-up emails. I can unsubscribe at any time.</span>
          </label>
          <Button
            type="submit"
            size="lg"
            disabled={emailSubmitting}
            className="!rounded-lg w-fit cursor-pointer fancy-button"
          >
            {emailSubmitting ? "Adding you…" : "Show my results"} <ArrowRight data-icon="inline-end" />
          </Button>
          {emailError && <p role="alert" className="m-0 text-sm text-red-700">{emailError}</p>}
          <p className="m-0 text-xs leading-5 text-[#626a69]">
            Your email is securely sent to MailerLite for the Pulse Check group.
            It also stays in this browser session and is added as a watermark
            to your report.
          </p>
        </form>
        <button
          type="button"
          onClick={() => {
            setResultsStage("idle");
            setStep(questions.length - 1);
          }}
          className="w-fit bg-transparent p-0 text-sm font-semibold text-brand-action hover:underline hover:underline-offset-4"
        >
          Back to my last answer
        </button>
      </section>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      <BackToHome />

      <section className="grid grid-cols-1 items-end gap-5 pb-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:pb-10">
        <div className="flex flex-col gap-3">
          <h1
            ref={flowHeadingRef}
            tabIndex={-1}
            className="m-0 font-[var(--font-heading)] text-4xl font-semibold leading-tight tracking-[-.035em] text-[#171514] outline-none focus-visible:ring-2 focus-visible:ring-brand-action focus-visible:ring-offset-4 sm:text-5xl"
          >
            You are: {band.name}
          </h1>
          <p className="m-0 max-w-2xl text-base leading-7 text-[#555d5c]">
            {band.message}
          </p>
        </div>
        <div className="flex items-baseline gap-2 sm:pb-1">
          <strong className="font-[var(--font-heading)] text-6xl font-semibold leading-none tracking-[-.05em] text-accent sm:text-7xl">
            {totalScore}
          </strong>
          <span className="text-base text-[#5b6264]">/ 40</span>
        </div>
      </section>

      {focusArea && (
        <section
          className="flex flex-col gap-2 rounded-lg bg-brand-teal-soft p-5 sm:p-6"
          aria-labelledby="pulse-focus-title"
        >
          <h2 id="pulse-focus-title" className="m-0 font-[var(--font-heading)] text-xl font-semibold leading-snug text-[#171514]">
            Your biggest opportunity
          </h2>
          <p className="m-0 text-sm font-semibold leading-6 text-brand-teal-ink">Based on your lowest-scoring questions: {focusArea.category}</p>
          <p className="m-0 max-w-3xl text-sm leading-6 text-[#414947]">
            {opportunityDetails[focusArea.category]}
          </p>
        </section>
      )}

      <section className="flex flex-col gap-4" aria-labelledby="pulse-quick-wins-title">
        <h2 id="pulse-quick-wins-title" className="m-0 font-[var(--font-heading)] text-2xl font-semibold leading-tight tracking-[-.03em] text-[#171514] sm:text-3xl">Your 3 quick wins</h2>
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {band.nextSteps.map((item, index) => (
            <li className="flex items-start gap-4 rounded-lg bg-brand-teal-soft p-4 sm:p-5" key={item}>
              <span className="font-[var(--font-heading)] text-2xl font-semibold leading-none text-brand-teal-ink">0{index + 1}</span>
              <p className="m-0 flex-1 text-sm leading-6 text-[#303635]">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="flex flex-col gap-5"
        aria-labelledby="pulse-areas-title"
      >
        <div className="flex flex-col gap-2">
          <h2
            id="pulse-areas-title"
            className="m-0 font-[var(--font-heading)] text-2xl font-semibold leading-tight tracking-[-.03em] text-[#171514] sm:text-3xl"
          >
            Your results by area
          </h2>
          <p className="m-0 text-sm leading-6 text-[#5b6264]">
            Open a section to review the questions, all response options and the
            answers you selected.
          </p>
        </div>
        <ResultsAccordion items={categoryScores} answers={answers} />
      </section>

      <div className="grid grid-cols-1 items-stretch gap-4 pt-2 lg:grid-cols-2">
        <section
          className="flex h-full min-h-80 flex-col items-start gap-4 rounded-lg bg-brand-teal-ink p-6 pb-14 text-white sm:p-8 sm:pb-16"
          aria-labelledby="pulse-next-step-title"
        >
          <h2
            id="pulse-next-step-title"
            className="m-0 max-w-[22ch] font-[var(--font-heading)] text-2xl font-semibold leading-tight !text-white"
          >
            Want to go deeper?
          </h2>
          <div className="flex flex-1 flex-col gap-4">
            <p className="m-0 max-w-3xl text-sm leading-6 text-white/90">
              Your score is useful, but it’s only the starting point. A
              self-assessment tells you what you think is happening. A proper
              diagnostic explores what is actually happening.
            </p>
            <p className="m-0 max-w-3xl text-sm leading-6 text-white/90">
              Chuks Etuka Consulting can help you move from insight to action.
              I work with organisations to decode DEI, build trust and boost
              impact through practical EDI strategies, accessibility
              assessments, inclusive leadership, policy review, training and
              organisational culture work.
            </p>
            <p className="m-0 text-sm font-semibold leading-6 text-white">
              Book a FREE 30-minute Inclusion Discovery Call.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/book-a-call" className="fancy-button rounded-lg cursor-pointer">
              Book my free call <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white underline decoration-white/60 underline-offset-4 transition hover:decoration-white">
              Send me a message <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <button type="button" onClick={restart} className="bg-transparent p-0 text-sm font-medium text-white/75 transition hover:text-white hover:underline hover:underline-offset-4">
              Retake the pulse check
            </button>
          </div>
        </section>

        <section
          className="flex h-full min-h-80 flex-col gap-4 rounded-lg bg-wine p-6 pb-14 text-white sm:p-8 sm:pb-16"
          aria-labelledby="pulse-copy-title"
        >
          <div className="flex flex-1 flex-col gap-2">
            <h2
              id="pulse-copy-title"
              className="m-0 font-[var(--font-heading)] text-2xl font-semibold !text-white"
            >
              Keep a copy of your results
            </h2>
            <p className="m-0 max-w-3xl text-sm leading-6 text-white/85">
              Download a branded PDF with your score, every response and
              practical guidance for each area. Your email appears as a light
              watermark throughout.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              shape="none"
              onClick={downloadResults}
              className="!rounded-lg cursor-pointer"
            >
              Download PDF <DownloadSimple data-icon="inline-end" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={emailResults}
              className="!rounded-lg !border-white/50 !bg-transparent !text-white hover:!bg-white/10 cursor-pointer"
            >
              Send me my results
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
