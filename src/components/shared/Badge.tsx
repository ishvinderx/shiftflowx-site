import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "teal" | "indigo" | "amber" | "success" | "muted";
  className?: string;
}

const variantStyles = {
  brand: "bg-[#D63C6B]/15 text-[#D63C6B] border-[#D63C6B]/25",
  teal: "bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/25",
  indigo: "bg-[#6366F1]/15 text-[#6366F1] border-[#6366F1]/25",
  amber: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25",
  success: "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/25",
  muted: "bg-white/5 text-white/60 border-white/10",
};

export default function Badge({
  children,
  variant = "brand",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
