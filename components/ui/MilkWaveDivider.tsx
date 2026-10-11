import { cn } from "@/lib/utils";

interface MilkWaveDividerProps {
  variant?: "top" | "bottom" | "crest" | "gentle";
  fill?: string;
  className?: string;
  flip?: boolean;
}

export function MilkWaveDivider({
  variant = "bottom",
  fill = "#ffffff",
  className,
  flip = false
}: MilkWaveDividerProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-none pointer-events-none select-none",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      {variant === "crest" ? (
        <svg
          viewBox="0 0 1440 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 md:h-14 lg:h-18 block preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24C120 45 280 62 440 45C600 28 720 0 880 0C1040 0 1160 38 1320 48C1380 52 1410 40 1440 28V84H0V24Z"
            fill={fill}
          />
        </svg>
      ) : variant === "top" ? (
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 md:h-12 lg:h-16 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C240,55 480,70 720,50 C960,30 1200,65 1440,30 L1440,70 L0,70 Z"
            fill={fill}
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 md:h-10 lg:h-14 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 32C240 10 480 50 720 30C960 10 1200 45 1440 22V60H0V32Z"
            fill={fill}
          />
        </svg>
      )}
    </div>
  );
}
