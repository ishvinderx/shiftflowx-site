import { cn } from "@/lib/utils";

/**
 * Plain CSS phone frame: thin ink outline, large radius, flat. Screenshots in
 * public/screenshots are 588x1280, as NAME-light.png with a NAME-dark.png beside it; the dark
 * capture is served when the visitor prefers a dark colour scheme. `alt` must describe the screen.
 * <PhoneFrame src="/screenshots/shifts-light.png" alt="..." priority />
 */
export function PhoneFrame({
  src,
  darkSrc = src.replace(/-light\.png$/, "-dark.png"),
  alt,
  width = 588,
  height = 1280,
  priority,
  className,
}: {
  src: string;
  darkSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[280px] rounded-[2.5rem] border border-rule bg-card p-2", className)}>
      <picture>
        {darkSrc !== src && <source media="(prefers-color-scheme: dark)" srcSet={darkSrc} />}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full rounded-[2rem]"
        />
      </picture>
    </div>
  );
}
