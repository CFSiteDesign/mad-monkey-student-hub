import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { z } from "zod";
import logo from "@/assets/mad-monkey-logo.png.asset.json";
import { pillClass } from "@/components/PillButton";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply | Mad Monkey Student Travel Ambassador" },
      { name: "description", content: "Apply to become a Mad Monkey Student Travel Ambassador. Tell us about yourself and your ideas." },
      { property: "og:title", content: "Apply | Mad Monkey Student Travel Ambassador" },
      { property: "og:description", content: "Apply to become a Mad Monkey Student Travel Ambassador. Tell us about yourself and your ideas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplyPage,
});

type Key = "full_name" | "email" | "university" | "course_and_year" | "social_handles" | "why_ambassador" | "how_get_students";

const req = (max: number) => z.string().trim().min(1, "Required").max(max, `Max ${max} characters`);

const questions: { key: Key; title: string; required: boolean; long?: boolean; type?: string; placeholder?: string; schema: z.ZodTypeAny; autoComplete?: string }[] = [
  { key: "full_name", title: "Full name", required: true, schema: req(120), placeholder: "Your full name", autoComplete: "name" },
  { key: "email", title: "Email address", required: true, type: "email", schema: z.string().trim().email("Enter a valid email").max(200), placeholder: "you@uni.ac.uk", autoComplete: "email" },
  { key: "university", title: "University", required: true, schema: req(200), placeholder: "Your university" },
  { key: "course_and_year", title: "Course and year of study", required: true, schema: req(200), placeholder: "e.g. Marketing, 2nd year" },
  { key: "social_handles", title: "Social media handles", required: false, schema: z.string().trim().max(200, "Max 200 characters"), placeholder: "e.g. @yourname on Instagram or TikTok" },
  { key: "why_ambassador", title: "Why would you like to become a Mad Monkey Student Ambassador?", required: true, long: true, schema: req(3000), placeholder: "Type your answer here..." },
  { key: "how_get_students", title: "How would you get other students interested in travelling with Mad Monkey?", required: true, long: true, schema: req(3000), placeholder: "Type your answer here..." },
];

function getSource() {
  try {
    const p = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    p.forEach((v, k) => { if (k.startsWith("utm_")) utm[k] = v; });
    const s = JSON.stringify({ referrer: document.referrer || null, ...utm });
    return s.slice(0, 1000);
  } catch {
    return null;
  }
}

function ApplyPage() {
  const [step, setStep] = useState(-1); // -1 intro, questions.length = done
  const [values, setValues] = useState<Record<Key, string>>({ full_name: "", email: "", university: "", course_and_year: "", social_handles: "", why_ambassador: "", how_get_students: "" });
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const total = questions.length;
  const q = step >= 0 && step < total ? questions[step] : null;
  const value = q ? values[q.key] : "";
  const validation = useMemo(() => (q ? q.schema.safeParse(value) : null), [q, value]);
  const valid = !!validation?.success;
  const isLast = step === total - 1;

  useEffect(() => {
    setError(null);
    setTouched(false);
    if (q) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  async function submit() {
    setSending(true);
    setError(null);
    if (honey) {
      setTimeout(() => { setSending(false); setStep(total); }, 600);
      return;
    }
    const social = values.social_handles.trim();
    const { error: err } = await supabase.from("student_ambassador_applications").insert({
      full_name: values.full_name.trim(),
      email: values.email.trim().toLowerCase(),
      university: values.university.trim(),
      course_and_year: values.course_and_year.trim(),
      social_handles: social || null,
      why_ambassador: values.why_ambassador.trim(),
      how_get_students: values.how_get_students.trim(),
      source: getSource(),
      user_agent: navigator.userAgent.slice(0, 500),
    });
    setSending(false);
    if (err) {
      setError(err.code === "23505" ? "This email has already been submitted." : "Something went wrong. Please try again.");
      return;
    }
    setStep(total);
  }

  function next() {
    if (!q) return;
    setTouched(true);
    if (!valid || sending) return;
    if (isLast) submit();
    else setStep((s) => s + 1);
  }

  function onKey(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    if (q?.long) {
      if (e.metaKey || e.ctrlKey) { e.preventDefault(); next(); }
    } else {
      e.preventDefault();
      next();
    }
  }

  const inputCls = "w-full rounded-xl border-2 border-input bg-background px-4 text-lg font-medium outline-none transition-colors focus:border-primary";
  const pct = q ? Math.round(((step + 1) / total) * 100) : 0;

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link to="/"><img src={logo.url} alt="Mad Monkey" className="h-8 w-auto sm:h-9" /></Link>
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Student Hub</span>
        </div>
        {q && (
          <div className="mx-auto max-w-3xl px-4 pb-3 sm:px-6">
            <div className="flex justify-between text-xs font-bold text-muted-foreground">
              <span>Step {step + 1} of {total}</span>
              <span>{pct}%</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        {step === -1 && (
          <div key="intro" className="step-in">
            <img src={logo.url} alt="" className="h-14 w-auto" />
            <h1 className="headline mt-8 text-4xl sm:text-6xl">Apply to Become a Mad Monkey Student Ambassador</h1>
            <p className="mt-6 text-lg font-semibold">Love travel and have ideas for getting other students exploring Southeast Asia?</p>
            <p className="mt-3 text-lg font-medium text-muted-foreground">Tell us a little about yourself and how you'd approach being a Mad Monkey Student Ambassador.</p>
            <button type="button" onClick={() => setStep(0)} className={pillClass({ size: "lg", className: "mt-10" })}>Let's go</button>
          </div>
        )}

        {q && (
          <form key={q.key} className="step-in" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Website<input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} name="website" /></label>
            </div>
            <span className="text-sm font-extrabold text-primary">Q{step + 1}</span>
            <label htmlFor={q.key} className="mt-2 block text-2xl font-extrabold leading-tight sm:text-3xl">
              {q.title}
              {q.required && <span className="text-destructive"> *</span>}
            </label>
            <div className="mt-6">
              {q.long ? (
                <textarea
                  id={q.key}
                  ref={(el) => { inputRef.current = el; }}
                  rows={6}
                  maxLength={3000}
                  value={value}
                  placeholder={q.placeholder}
                  onChange={(e) => setValues((v) => ({ ...v, [q.key]: e.target.value }))}
                  onKeyDown={onKey}
                  className={`${inputCls} min-h-40 py-3`}
                />
              ) : (
                <input
                  id={q.key}
                  ref={(el) => { inputRef.current = el; }}
                  type={q.type ?? "text"}
                  inputMode={q.type === "email" ? "email" : undefined}
                  autoComplete={q.autoComplete}
                  maxLength={q.key === "full_name" ? 120 : 200}
                  value={value}
                  placeholder={q.placeholder}
                  onChange={(e) => setValues((v) => ({ ...v, [q.key]: e.target.value }))}
                  onKeyDown={onKey}
                  className={`${inputCls} h-12`}
                />
              )}
              <p className="mt-2 min-h-5 text-sm font-semibold text-destructive" role="alert">
                {error ?? (touched && !valid && value ? validation?.error?.issues[0]?.message : "")}
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                {q.long ? "Press Cmd/Ctrl + Enter to continue" : "Press Enter to continue"}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setStep((s) => s - 1)} className={pillClass({ variant: "outline" })}>Back</button>
              <div className="flex items-center gap-3">
                {!q.required && !value.trim() && (
                  <button type="button" onClick={() => setStep((s) => s + 1)} className="text-sm font-bold underline underline-offset-4">Skip</button>
                )}
                <button type="submit" disabled={!valid || sending} className={pillClass({})}>
                  {isLast ? (sending ? "Sending..." : "Send application") : "Continue"}
                </button>
              </div>
            </div>
          </form>
        )}

        {step === total && (
          <div key="done" className="step-in text-center">
            <img src={logo.url} alt="Mad Monkey" className="mx-auto h-14 w-auto" />
            <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-4xl font-black sticker">✓</div>
            <h1 className="headline mt-8 text-4xl sm:text-6xl">Thanks for applying!</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg font-medium">We've received your Student Ambassador application. Our team will review it and be in touch if you're shortlisted for the next stage.</p>
            <Link to="/" className={pillClass({ variant: "outline", className: "mt-10" })}>Back to Student Hub</Link>
          </div>
        )}
      </main>
    </div>
  );
}
