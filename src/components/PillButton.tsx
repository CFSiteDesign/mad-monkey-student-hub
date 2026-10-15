import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const pill = cva(
  "inline-flex items-center justify-center rounded-full font-extrabold uppercase tracking-wide transition-transform active:translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:-translate-y-0.5",
        lime: "bg-secondary text-secondary-foreground hover:-translate-y-0.5",
        ink: "bg-ink text-ink-foreground hover:-translate-y-0.5",
        outline: "border-2 border-ink bg-background text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-10 px-5 text-xs",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base sm:h-16 sm:px-10 sm:text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type PillProps = VariantProps<typeof pill>;
export const pillClass = (p: PillProps & { className?: string }) => cn(pill(p), p.className);
