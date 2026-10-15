export type Status = "new" | "shortlisted" | "rejected";
export type Application = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  university: string;
  course_and_year: string;
  social_handles: string | null;
  why_ambassador: string;
  how_get_students: string;
  status: string;
  source: string | null;
};

export const adminHead = (title: string) => ({
  meta: [
    { title },
    { name: "robots", content: "noindex, nofollow" },
    { name: "description", content: "Mad Monkey Student Hub admin area." },
    { property: "og:title", content: title },
    { property: "og:description", content: "Mad Monkey Student Hub admin area." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});

export function parseSource(s: string | null): Record<string, string> {
  if (!s) return {};
  try {
    const o = JSON.parse(s);
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(o ?? {})) if (v != null && v !== "") out[k] = String(v);
    return out;
  } catch {
    return { referrer: s };
  }
}

export function sourceLabel(k: string) {
  if (k === "referrer") return "Referrer";
  if (k.startsWith("utm_")) return "UTM " + k.slice(4).replace(/_/g, " ");
  return k;
}

export function formatUk(iso: string) {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", day: "numeric", month: "short", year: "numeric" }).format(d);
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
  return { date, full: `${date}, ${time}` };
}

function cell(v: string) {
  let s = v ?? "";
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function downloadCsv(rows: Application[]) {
  const header = ["Submitted", "Status", "Full name", "Email", "University", "Course and year", "Social handles", "Why ambassador", "How get students", "Referrer", "UTM source", "UTM medium", "UTM campaign"];
  const lines = [header.map(cell).join(",")];
  for (const r of rows) {
    const src = parseSource(r.source);
    lines.push([
      formatUk(r.created_at).full, r.status, r.full_name, r.email, r.university, r.course_and_year,
      r.social_handles ?? "", r.why_ambassador, r.how_get_students,
      src["referrer"] ?? "", src["utm_source"] ?? "", src["utm_medium"] ?? "", src["utm_campaign"] ?? "",
    ].map(cell).join(","));
  }
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `student-hub-applications-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
