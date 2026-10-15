import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/mad-monkey-logo.png.asset.json";
import { pillClass } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

const TITLE = "Mad Monkey Student Hub | Become a Student Travel Ambassador";
const DESC = "Love travel, events and bringing people together? This one's for you.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const benefits = [
  { e: "🚀", t: "Gain real industry experience", b: "Work directly with the Mad Monkey team on real projects in travel, marketing, events and partnerships. Develop practical skills, build your CV and get experience that goes beyond the classroom." },
  { e: "💸", t: "Earn commission on every booking", b: "Turn your connections and ideas into extra income. Earn commission for every qualifying traveller you bring to Mad Monkey, whether it's a group of mates or a bigger university trip." },
  { e: "🌏", t: "Get 10 bookings. Earn a free trip.", b: "Bring 10 travellers to Mad Monkey and earn your own place on a Southeast Asia adventure, on top of your commission. International flight contributions are also up for grabs for top performers." },
  { e: "🤝", t: "Build your network", b: "Connect with Student Ambassadors from universities around the world. Share ideas, collaborate on projects and build connections with other students and travel industry professionals." },
];

const checklist = [
  "Love travel and discovering new places",
  "Enjoy meeting people and bringing groups together",
  "Have ideas for trips, events, campaigns or communities they'd love to try",
  "Are proactive, reliable and happy to take the initiative",
  "Want to gain practical experience alongside their studies",
];

const faqs: { q: string; a: string[] }[] = [
  { q: "Who can apply?", a: ["University students from anywhere in the world. No previous experience required."] },
  { q: "What will I actually be doing as a Student Ambassador?", a: ["That depends on your interests and ideas! You could bring together a group of friends for a trip, build a travel community at your university, organise events that get people excited about travel, create social media campaigns or help us develop new trips for students.", "We'll work with you to find projects that suit your strengths and interests."] },
  { q: "What kind of support will I get?", a: ["You'll work directly with the Mad Monkey team, with regular check-ins, mentoring and guidance along the way. We'll provide marketing materials, trip information and booking links, and help you turn your ideas into something that actually happens.", "You'll also be part of an international community of Student Ambassadors to share ideas and learn from."] },
  { q: "Is this a paid job or a volunteer opportunity?", a: ["This is a flexible, commission-based ambassador opportunity rather than a salaried position. You'll earn commission on qualifying bookings, with the chance to unlock free travel and other rewards.", "You'll also gain practical experience working on real projects with an international travel brand."] },
  { q: "Can I use Mad Monkey as a reference on my CV?", a: ["Absolutely! You'll be able to include your Student Ambassador experience on your CV and LinkedIn, and we'll be happy to confirm your involvement in the programme.", "For ambassadors who actively contribute and demonstrate their skills, we can also provide personalised professional references highlighting their work and achievements."] },
  { q: "Do I need a big social media following?", a: ["No! You can bring friends together, build communities, organise events or create campaigns. A large following isn't necessary."] },
  { q: "How do I earn commission?", a: ["Earn commission for each qualifying booking through your ambassador referral link or code. Rates vary by trip, and we'll explain payment and tracking before you start. Commission is only paid once the trip has passed its cancellation period, usually 30 days before departure."] },
  { q: "How can I earn a free trip?", a: ["Generate 10 qualifying bookings and earn a free place on an eligible Mad Monkey trip, on top of your commission. We'll explain what's included and any additional costs before you start."] },
  { q: "Can I create my own trip?", a: ["Yes! Promote an existing itinerary or work with our team to develop something for your audience."] },
  { q: "Do I have to organise or lead trips?", a: ["Not unless you want to! We handle the itineraries, bookings, payments and travel arrangements. You bring the travellers together."] },
  { q: "How much time do I need to commit?", a: ["It's flexible around university life, and you get out what you put in. We recommend 5-10 hours per week, but we'll discuss your availability and ideas to find an approach that works for you."] },
  { q: "What happens after I apply?", a: ["We'll review your application and invite shortlisted applicants for an informal chat with our team."] },
];

function ApplyBtn({ label = "Apply now", variant = "primary" as const, size = "lg" as const, outline = false }: { label?: string; variant?: "primary" | "lime" | "ink"; size?: "sm" | "md" | "lg"; outline?: boolean }) {
  return (
    <Link to="/apply" className={pillClass({ variant, size, className: cn("text-center", outline && "ring-4 ring-background") })}>
      {label}
    </Link>
  );
}

function Eyebrow({ children, tone = "pink" }: { children: string; tone?: "pink" | "ink" }) {
  return (
    <span className={`eyebrow inline-block rounded-full px-4 py-1.5 ${tone === "pink" ? "bg-primary text-primary-foreground" : "bg-ink text-ink-foreground"}`}>
      {children}
    </span>
  );
}

function Index() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo.url} alt="Mad Monkey" className="h-8 w-auto sm:h-10" />
            <span className="hidden rounded-full bg-secondary px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-secondary-foreground min-[400px]:inline">
              Student Hub
            </span>
          </Link>
          <ApplyBtn size="sm" />
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute -right-24 top-10 h-64 w-64 rotate-12 rounded-3xl bg-secondary sm:h-96 sm:w-96" />
          <div aria-hidden className="absolute -left-16 bottom-0 h-40 w-40 -rotate-12 rounded-full bg-primary sm:h-64 sm:w-64" />
          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20 lg:pb-28">
            <Reveal>
              <h1 className="headline max-w-4xl text-[2.9rem] sm:text-7xl lg:text-8xl">
                Become a <span className="bg-primary px-2 text-primary-foreground [box-decoration-break:clone]">Mad Monkey</span> Student Travel Ambassador
              </h1>
              <p className="mt-8 max-w-2xl text-xl font-extrabold sm:text-2xl">
                Love travel, events and bringing people together? <span className="bg-secondary px-1">This one's for you.</span>
              </p>
              <div className="mt-6 max-w-xl space-y-4 rounded-2xl bg-background/90 text-base font-medium leading-relaxed sm:text-lg">
                <p>Get hands-on experience with Mad Monkey, the youth travel brand bringing people together through social hostels and group adventures across Southeast Asia.</p>
                <p>Build your skills, bring your ideas to life, earn commission and unlock unreal travel perks.</p>
              </div>
              <div className="mt-10">
                <ApplyBtn />
              </div>
            </Reveal>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="border-y-2 border-ink bg-secondary py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <Eyebrow tone="ink">What's in it for you?</Eyebrow>
              <h2 className="headline mt-5 max-w-3xl text-4xl sm:text-6xl">Real experience. Real rewards. Incredible adventures.</h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {benefits.map((b, i) => (
                <Reveal key={b.t}>
                  <div className="relative h-full rounded-3xl bg-background p-7 pt-12 sticker">
                    <span className={`absolute -top-7 left-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl sticker ${i % 2 ? "bg-secondary" : "bg-primary"} ${i % 2 ? "rotate-6" : "-rotate-6"}`}>
                      {b.e}
                    </span>
                    <h3 className="headline text-2xl">{b.t}</h3>
                    <p className="mt-3 font-medium leading-relaxed">{b.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal><Eyebrow>How it works</Eyebrow></Reveal>
            <ol className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                { t: "Apply to become an ambassador", b: [<>Tell us about yourself and your ideas through our short <Link to="/apply" className="font-extrabold text-primary underline underline-offset-4">application form</Link>.</>] },
                { t: "Choose a trip or create your own", b: ["Pick from our ready-made Southeast Asia itineraries or work with our team to develop a bespoke trip.", "You bring the people and ideas. We'll handle the bookings, logistics and travel arrangements."] },
                { t: "Get guidance and connect with other ambassadors", b: ["Get regular check-ins, mentoring and marketing support from the Mad Monkey team.", "Join a network of Student Ambassadors from universities around the world to share ideas, collaborate and learn from each other."] },
                { t: "Earn commission and free travel", b: ["Get paid for every qualifying traveller you bring to Mad Monkey. Bring us 10 travellers and earn a free place on a Mad Monkey trip."] },
              ].map((s, i) => (
                <Reveal key={s.t}>
                  <li className="flex h-full gap-5 rounded-3xl border-2 border-ink p-6">
                    <span className={`headline shrink-0 text-7xl sm:text-8xl ${i % 2 ? "text-ink" : "text-primary"}`}>{i + 1}</span>
                    <div>
                      <h3 className="headline text-xl sm:text-2xl">{s.t}</h3>
                      {s.b.map((p, j) => <p key={j} className="mt-3 font-medium leading-relaxed">{p}</p>)}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ADVENTURE */}
        <section className="bg-ink py-20 text-ink-foreground">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <Eyebrow>The adventure</Eyebrow>
              <h2 className="headline mt-5 text-4xl sm:text-6xl">This could be your next adventure.</h2>
              <p className="mt-5 max-w-2xl text-lg font-medium">Think you know Southeast Asia? From hidden islands to epic road trips, these are the destinations we think should be on every student's radar.</p>
            </Reveal>
          </div>
          <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 md:mx-auto md:grid md:max-w-6xl md:grid-cols-3 md:overflow-visible">
            {destinations.map((d, i) => <DestinationCard key={d.id} d={d} index={i} />)}
          </div>
        </section>

        {/* MID CTA */}
        <section className="bg-primary py-20 text-primary-foreground">
          <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="headline text-5xl sm:text-7xl">Sound like your kind of thing?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold sm:text-xl">You don't need previous experience. Just ideas, initiative and a willingness to get involved.</p>
            <div className="mt-10"><ApplyBtn variant="lime" /></div>
          </Reveal>
        </section>

        {/* WHO */}
        <section className="py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Who we're looking for</Eyebrow>
              <h2 className="headline mt-5 text-4xl sm:text-6xl">Think you'd be a good fit?</h2>
              <p className="mt-6 text-lg font-medium leading-relaxed">Are you the person who always gets everyone together? The one planning the next holiday, organising nights out or coming up with ideas for events that actually get people excited?</p>
              <p className="mt-4 text-lg font-medium leading-relaxed">Maybe you're studying marketing, events, business or tourism and want some real-world experience. Or maybe you're studying something completely different but love travel, meeting new people and making things happen.</p>
            </Reveal>
            <Reveal>
              <h3 className="headline text-2xl">We're looking for students who:</h3>
              <ul className="mt-6 space-y-3">
                {checklist.map((c) => (
                  <li key={c} className="flex items-start gap-3 rounded-2xl border-2 border-ink p-4 font-semibold">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-black">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rotate-[-1deg] rounded-3xl bg-secondary p-6 sticker">
                <p className="headline text-xl">No previous experience required.</p>
                <p className="mt-2 font-medium leading-relaxed">You don't need a huge social media following or a background in travel. We're much more interested in your personality, enthusiasm and willingness to get involved.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t-2 border-ink bg-muted py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <Eyebrow>FAQs</Eyebrow>
              <h2 className="headline mt-5 text-4xl sm:text-6xl">Your questions, answered.</h2>
            </Reveal>
            <div className="mt-10 space-y-3">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} className="overflow-hidden rounded-2xl border-2 border-ink bg-background">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-extrabold sm:text-lg"
                    >
                      {f.q}
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl font-black transition-transform ${isOpen ? "rotate-45 bg-primary text-primary-foreground" : "bg-secondary"}`}>+</span>
                    </button>
                    {isOpen && (
                      <div id={`faq-${i}`} className="space-y-3 px-5 pb-5 font-medium leading-relaxed">
                        {f.a.map((p) => <p key={p}>{p}</p>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-secondary py-24">
          <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="headline text-5xl sm:text-7xl">Got ideas? Let's hear them.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold">Whether you're a natural organiser, a creative thinker or simply someone who loves bringing people together, we'd love to hear from you.</p>
            <div className="mt-10"><ApplyBtn label="Apply to become a Student Ambassador" /></div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t-2 border-ink py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-sm font-semibold sm:flex-row sm:justify-between sm:px-6">
          <img src={logo.url} alt="Mad Monkey" className="h-9 w-auto" />
          <div className="flex items-center gap-5">
            <span>© Mad Monkey Hostels</span>
            <a href="https://madmonkeyhostels.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">madmonkeyhostels.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
