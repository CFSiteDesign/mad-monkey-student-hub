import { useEffect, useRef, useState } from "react";
import type { Destination } from "@/data/destinations";

export function DestinationCard({ d, index }: { d: Destination; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [posterOk, setPosterOk] = useState(false);
  const pink = index % 2 === 0;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setPosterOk(true);
    img.src = d.poster;
  }, [d.poster]);

  useEffect(() => {
    const v = ref.current;
    if (!v || failed) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting && !reduce) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [failed]);

  return (
    <article className="relative aspect-[9/16] w-[78vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-3xl sticker md:w-auto md:max-w-none">
      <div
        className={`absolute inset-0 flex items-start justify-center pt-16 ${pink ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
      >
        <span className="headline -rotate-6 text-center text-[17vw] md:text-6xl lg:text-7xl">{d.title}</span>
      </div>
      {!failed && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={d.video}
          poster={posterOk ? d.poster : undefined}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          aria-label={`${d.title} travel video`}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-scrim p-5 text-ink-foreground">
        <h3 className="headline text-xl">
          {d.title}: {d.tagline}
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed">{d.body}</p>
      </div>
    </article>
  );
}
