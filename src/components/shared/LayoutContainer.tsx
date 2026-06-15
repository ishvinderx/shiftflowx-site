import { cn } from "@/lib/utils";

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;   // max-w-4xl — for FAQ, legal, blog post
  medium?: boolean;   // max-w-5xl — for pricing, download CTA
}

export default function LayoutContainer({
  children,
  className,
  narrow,
  medium,
}: LayoutContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8 lg:px-12",
        narrow ? "max-w-4xl" : medium ? "max-w-5xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
