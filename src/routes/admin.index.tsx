import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";
import logo from "@/assets/mad-monkey-logo.png.asset.json";
import { pillClass } from "@/components/PillButton";
import { Toaster } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { adminHead, downloadCsv, formatUk, parseSource, sourceLabel, type Application, type Status } from "@/lib/admin";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => adminHead("Student Hub Admin | Mad Monkey"),
  component: AdminPage,
});

const inputCls = "h-12 w-full rounded-xl border-2 border-input bg-background px-4 text-base focus:border-primary focus:outline-none";
const STATUSES: Status[] = ["new", "shortlisted", "rejected"];
const LABEL: Record<string, string> = { new: "New", shortlisted: "Shortlisted", rejected: "Rejected" };
const BADGE: Record<string, string> = {
  new: "bg-secondary text-secondary-foreground",
  shortlisted: "bg-primary text-primary-foreground",
  rejected: "bg-muted text-muted-foreground",
};

function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") setSession(s);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setIsAdmin(null);
    if (!session) return;
    supabase.rpc("is_student_hub_admin").then(({ data, error }) => setIsAdmin(!error && data === true));
  }, [session?.user.id]);

  const signOut = async () => { await supabase.auth.signOut(); };

  let body;
  if (session === undefined || (session && isAdmin === null)) body = <Center><p className="text-muted-foreground">Loading...</p></Center>;
  else if (!session) body = <Login />;
  else if (!isAdmin)
    body = (
      <Center>
        <img src={logo.url} alt="Mad Monkey" className="mx-auto h-14 w-auto" />
        <p className="mt-6 text-center font-bold">This account doesn't have admin access.</p>
        <button onClick={signOut} className={pillClass({ variant: "outline", className: "mt-6 w-full" })}>Sign out</button>
      </Center>
    );
  else body = <Dashboard email={session.user.email ?? ""} onSignOut={signOut} />;

  return <>{body}<Toaster position="top-center" /></>;
}

function Center({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10"><div className="w-full max-w-sm">{children}</div></main>;
}

function Login() {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setInfo(null);
    const em = email.trim().toLowerCase();
    if (!em) { setErr("Enter your email."); return; }
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: em, password: pw });
        if (error) setErr(error.message);
      } else if (mode === "signup") {
        if (pw.length < 8) { setErr("Use at least 8 characters for your password."); return; }
        const { data: ok, error: rpcErr } = await supabase.rpc("is_student_hub_admin_email", { p_email: em });
        if (rpcErr) { setErr("Something went wrong. Please try again."); return; }
        if (!ok) { setErr("This email doesn't have admin access."); return; }
        const { error } = await supabase.auth.signUp({ email: em, password: pw, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        if (error) setErr(error.message);
        else setInfo("Check your inbox to confirm your email, then sign in here.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(em, { redirectTo: `${window.location.origin}/admin/reset-password` });
        if (error) setErr(error.message);
        else setInfo("If that email has an account, a reset link is on its way.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <Center>
      <img src={logo.url} alt="Mad Monkey" className="mx-auto h-14 w-auto" />
      <h1 className="headline mt-6 text-center text-2xl">Student Hub Admin</h1>
      {mode !== "signin" && <p className="mt-2 text-center text-sm text-muted-foreground">{mode === "signup" ? "Create your password" : "Reset your password"}</p>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input type="email" className={inputCls} placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {mode !== "forgot" && (
          <input type="password" className={inputCls} placeholder="Password" autoComplete={mode === "signup" ? "new-password" : "current-password"} value={pw} onChange={(e) => setPw(e.target.value)} />
        )}
        {err && <p className="text-sm font-semibold text-destructive">{err}</p>}
        {info && <p className="rounded-xl bg-secondary p-3 text-sm font-semibold text-secondary-foreground">{info}</p>}
        <button disabled={busy} className={pillClass({ className: "w-full" })}>
          {busy ? "Please wait..." : mode === "signin" ? "Sign in" : mode === "signup" ? "Create password" : "Send reset link"}
        </button>
      </form>
      <div className="mt-6 flex flex-col items-center gap-2 text-sm">
        {mode === "signin" ? (
          <>
            <button className="font-semibold underline" onClick={() => { setMode("forgot"); setErr(null); setInfo(null); }}>Forgot password?</button>
            <button className="font-semibold text-primary underline" onClick={() => { setMode("signup"); setErr(null); setInfo(null); }}>First time here? Create your password</button>
          </>
        ) : (
          <button className="font-semibold underline" onClick={() => { setMode("signin"); setErr(null); setInfo(null); }}>Back to sign in</button>
        )}
      </div>
    </Center>
  );
}

async function fetchAll(): Promise<Application[]> {
  const out: Application[] = [];
  const size = 1000;
  for (let from = 0; ; from += size) {
    const { data, error } = await supabase
      .from("student_ambassador_applications")
      .select("id,created_at,full_name,email,university,course_and_year,social_handles,why_ambassador,how_get_students,status,source")
      .order("created_at", { ascending: false })
      .order("id")
      .range(from, from + size - 1);
    if (error) throw error;
    out.push(...(data as Application[]));
    if (!data || data.length < size) break;
  }
  return out;
}

function Dashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [rows, setRows] = useState<Application[] | null>(null);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [openId, setOpenId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setError(false); setRows(null);
    fetchAll().then(setRows).catch(() => setError(true));
  }, []);
  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: 0, new: 0, shortlisted: 0, rejected: 0 };
    for (const r of rows ?? []) { c["all"] = (c["all"] ?? 0) + 1; c[r.status] = (c[r.status] ?? 0) + 1; }
    return c;
  }, [rows]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = (rows ?? []).filter((r) => filter === "all" || r.status === filter);
    if (term)
      list = list.filter((r) =>
        [r.full_name, r.email, r.university, r.course_and_year, r.social_handles ?? "", r.why_ambassador, r.how_get_students].some((f) => f.toLowerCase().includes(term)),
      );
    return [...list].sort((a, b) => (sort === "newest" ? b.created_at.localeCompare(a.created_at) : a.created_at.localeCompare(b.created_at)));
  }, [rows, filter, q, sort]);

  const open = rows?.find((r) => r.id === openId) ?? null;

  async function setStatus(id: string, status: Status) {
    setSaving(true);
    const { data, error } = await supabase.from("student_ambassador_applications").update({ status }).eq("id", id).select("id");
    setSaving(false);
    if (error || !data?.length) { toast.error("Couldn't save. Please try again."); return; }
    setRows((rs) => rs?.map((r) => (r.id === id ? { ...r, status } : r)) ?? rs);
    toast.success("Saved");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <img src={logo.url} alt="Mad Monkey" className="h-9 w-auto" />
          <span className="eyebrow hidden text-primary sm:inline">Student Hub Admin</span>
          <div className="ml-auto flex min-w-0 items-center gap-3">
            <span className="hidden truncate text-sm text-muted-foreground md:inline">{email}</span>
            <button onClick={onSignOut} className={pillClass({ variant: "outline", size: "sm" })}>Sign out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="headline text-2xl sm:hidden">Student Hub Admin</h1>
        <div className="mt-2 flex flex-wrap gap-2 sm:mt-0">
          {(["all", ...STATUSES] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={cn(
                "rounded-full border-2 px-4 py-1.5 text-sm font-bold",
                filter === k ? "border-ink bg-ink text-ink-foreground" : "border-border bg-background hover:bg-muted",
              )}
            >
              {k === "all" ? "All" : LABEL[k]} <span className="ml-1 opacity-70">{counts[k] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input className={inputCls + " sm:flex-1"} placeholder="Search applications" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
          <div className="flex gap-3">
            <select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "oldest")} className="h-12 flex-1 rounded-xl border-2 border-input bg-background px-3 text-base" aria-label="Sort">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            <button onClick={() => downloadCsv(shown)} disabled={!shown.length} className={pillClass({ variant: "lime", className: "shrink-0" })}>Export CSV</button>
          </div>
        </div>

        <div className="mt-6">
          {error ? (
            <div className="rounded-2xl border-2 border-border p-8 text-center">
              <p className="font-bold">We couldn't load the applications.</p>
              <button onClick={load} className={pillClass({ className: "mt-4" })}>Retry</button>
            </div>
          ) : rows === null ? (
            <p className="py-10 text-center text-muted-foreground">Loading applications...</p>
          ) : rows.length === 0 ? (
            <p className="py-10 text-center font-bold">No applications yet.</p>
          ) : shown.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">No applications match your filters.</p>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-2xl border-2 border-border md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-xs uppercase tracking-wide">
                    <tr>{["Name", "University", "Course and year", "Status", "Submitted"].map((h) => <th key={h} className="px-4 py-3 font-extrabold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {shown.map((r) => (
                      <tr key={r.id} onClick={() => setOpenId(r.id)} className="cursor-pointer border-t border-border hover:bg-muted/60">
                        <td className="px-4 py-3"><div className="font-bold">{r.full_name}</div><div className="text-xs text-muted-foreground">{r.email}</div></td>
                        <td className="px-4 py-3">{r.university}</td>
                        <td className="px-4 py-3">{r.course_and_year}</td>
                        <td className="px-4 py-3"><Badge s={r.status} /></td>
                        <td className="whitespace-nowrap px-4 py-3">{formatUk(r.created_at).date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="space-y-3 md:hidden">
                {shown.map((r) => (
                  <li key={r.id}>
                    <button onClick={() => setOpenId(r.id)} className="w-full rounded-2xl border-2 border-border p-4 text-left active:bg-muted">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold">{r.full_name}</span>
                        <Badge s={r.status} />
                      </div>
                      <div className="mt-1 text-sm">{r.university}</div>
                      <div className="text-sm text-muted-foreground">{r.course_and_year}</div>
                      <div className="mt-2 text-xs text-muted-foreground">{formatUk(r.created_at).date}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
          {open && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-extrabold">{open.full_name}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    disabled={saving}
                    onClick={() => open.status !== s && setStatus(open.id, s)}
                    className={cn("flex-1 rounded-full border-2 py-2 text-sm font-bold disabled:opacity-60", open.status === s ? BADGE[s] + " border-transparent" : "border-border hover:bg-muted")}
                  >
                    {LABEL[s]}
                  </button>
                ))}
              </div>
              <dl className="mt-6 space-y-4 text-sm">
                <Field label="Email"><a className="font-semibold text-primary underline break-all" href={`mailto:${open.email}`}>{open.email}</a></Field>
                <Field label="University">{open.university}</Field>
                <Field label="Course and year">{open.course_and_year}</Field>
                <Field label="Social handles">{open.social_handles || "Not provided"}</Field>
                <Field label="Why would you like to become a Mad Monkey Student Ambassador?"><p className="whitespace-pre-wrap">{open.why_ambassador}</p></Field>
                <Field label="How would you get other students interested in travelling with Mad Monkey?"><p className="whitespace-pre-wrap">{open.how_get_students}</p></Field>
                <Field label="Submitted">{formatUk(open.created_at).full}</Field>
                <Field label="Source">
                  {Object.keys(parseSource(open.source)).length === 0 ? "Direct" : (
                    <ul className="space-y-1">
                      {Object.entries(parseSource(open.source)).map(([k, v]) => (
                        <li key={k}><span className="font-semibold">{sourceLabel(k)}:</span> <span className="break-all">{v}</span></li>
                      ))}
                    </ul>
                  )}
                </Field>
              </dl>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Badge({ s }: { s: string }) {
  return <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-extrabold uppercase", BADGE[s] ?? BADGE["rejected"])}>{LABEL[s] ?? s}</span>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}
