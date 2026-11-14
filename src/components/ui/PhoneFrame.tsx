import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Plain CSS phone frame: thin ink outline, large radius, flat. Screenshots in
 * public/screenshots are 588x1280. `alt` must describe what the screen shows.
 * <PhoneFrame src="/screenshots/home.png" alt="..." priority />
 */
export function PhoneFrame({
  src,
  alt,
  width = 588,
  height = 1280,
  priority,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[280px] rounded-[2.5rem] border-[1.5px] border-ink bg-ground p-2", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 768px) 280px, 70vw"
        className="block h-auto w-full rounded-[2rem]"
      />
    </div>
  );
}
