import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/mad-monkey-logo.png";
import { pillClass } from "@/components/PillButton";
import { supabase } from "@/integrations/supabase/client";
import { adminHead } from "@/lib/admin";

export const Route = createFileRoute("/admin/reset-password")({
  ssr: false,
  head: () => adminHead("Set a new password | Student Hub Admin"),
  component: ResetPage,
});

const inputCls = "h-12 w-full rounded-xl border-2 border-input bg-background px-4 text-base focus:border-primary focus:outline-none";

function ResetPage() {
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) { setMsg("Use at least 8 characters."); return; }
    setBusy(true); setMsg(null);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) setMsg(error.message);
    else setDone(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-sm">
        <img src={logo} alt="Mad Monkey" className="mx-auto h-14 w-auto" />
        <h1 className="headline mt-6 text-center text-2xl">Set a new password</h1>
        {done ? (
          <div className="mt-6 text-center">
            <p>Your password has been updated.</p>
            <Link to="/admin" className={pillClass({ className: "mt-6" })}>Go to admin</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input type="password" className={inputCls} placeholder="New password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
            {msg && <p className="text-sm font-semibold text-destructive">{msg}</p>}
            <button disabled={busy} className={pillClass({ className: "w-full" })}>{busy ? "Saving..." : "Save password"}</button>
          </form>
        )}
      </div>
    </main>
  );
}
