import { cn } from "@/lib/utils";

type WaveDividerProps = {
  className?: string;
};

/**
 * Figma wave divider: higher on the sides, dips in the center (notch),
 * cream fill below so it blends into the About section.
 */
export default function WaveDivider({ className }: WaveDividerProps) {
  return (
    <div className={cn("relative w-full leading-[0]", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1440 180"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#456A96" />
            <stop offset="100%" stopColor="#81B2F6" />
          </linearGradient>
        </defs>

        {/* Cream body under the wave */}
        <path
          d="M0 58
             C160 58 260 34 400 42
             C540 50 620 102 720 112
             C820 102 900 50 1040 42
             C1180 34 1280 58 1440 58
             L1440 180 L0 180 Z"
          fill="#fffcf7"
        />

        {/* Blue wave ribbon */}
        <path
          d="M0 50
             C160 50 260 26 400 34
             C540 42 620 94 720 104
             C820 94 900 42 1040 34
             C1180 26 1280 50 1440 50
             L1440 66
             C1280 66 1180 42 1040 50
             C900 58 820 110 720 120
             C620 110 540 58 400 50
             C260 42 160 66 0 66
             Z"
          fill="url(#waveBlue)"
        />

        {/* Top white highlight edge */}
        <path
          d="M0 50
             C160 50 260 26 400 34
             C540 42 620 94 720 104
             C820 94 900 42 1040 34
             C1180 26 1280 50 1440 50"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Bottom white edge */}
        <path
          d="M0 66
             C160 66 260 42 400 50
             C540 58 620 110 720 120
             C820 110 900 58 1040 50
             C1180 42 1280 66 1440 66"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
      </svg>
    </div>
  );
}
