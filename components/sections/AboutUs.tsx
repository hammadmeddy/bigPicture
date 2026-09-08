import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/**
 * Figma about gallery — PNGs already include perspective + rounded corners.
 * Vertically center-aligned; equal gutters; outer tall → center short.
 */
const photos = [
  {
    src: "/images/about-3.png",
    alt: "Dentist performing a digital scan for a patient",
    width: 286,
    height: 495,
  },
  {
    src: "/images/about-2.png",
    alt: "Child prepared for dental imaging",
    width: 286,
    height: 354,
  },
  {
    src: "/images/about-1.png",
    alt: "Smiling young patient holding a toothbrush",
    width: 288,
    height: 288,
  },
  {
    src: "/images/about-5.png",
    alt: "Team member showing a dental model to a child",
    width: 286,
    height: 353,
  },
  {
    src: "/images/about-4.png",
    alt: "Dentist treating a child patient",
    width: 286,
    height: 490,
  },
] as const;

export default function AboutUs() {
  return (
    <section
      id="about-us"
      aria-labelledby="about-us-heading"
      className="relative z-10 -mt-28 bg-cream pb-20 pt-0 sm:-mt-36 sm:pb-24 md:-mt-44"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        <p className="font-cursive text-2xl text-gold sm:text-3xl">About Us</p>

        <h2
          id="about-us-heading"
          className="mt-2 text-3xl font-semibold text-dark-blue sm:text-5xl"
        >
          Pediatric Dentist In{" "}
          <span className="text-secondary">Houston, TX</span>
        </h2>

        <p className="mt-5 max-w-6xl text-base leading-relaxed text-body-gray sm:text-lg">
          At our office serving Clear Lake and Houston, our welcoming team at
          Big Picture Pediatric Dentistry provides a patient experience that
          goes beyond dentistry. With a proactive, compassionate approach and
          open communication every step of the way, Dr. Jason Brock and our
          entire team deliver educational dental care for lifelong oral
          health. Your child will feel excited to be involved in taking care
          of their own smile and as a parent, you will feel confident knowing
          that your little one will receive the highest quality of service
          while accommodating your budget, lifestyle, and individual needs.
        </p>

        {/* Outer large → adjacent medium → center small; shared vertical centerline */}
        <div className="mt-8 flex w-full max-w-5xl items-center justify-center gap-2.5 sm:mt-10 sm:gap-3 md:gap-3.5">
          {photos.map(({ src, alt, width, height }, index) => {
            const sizeClass =
              index === 2
                ? // center — smallest
                  "relative z-[2] w-[13.5%] min-w-[56px] max-w-[160px] shrink-0"
                : index === 1 || index === 3
                  ? // next to center — medium
                    "relative z-[1] w-[18%] min-w-[70px] max-w-[210px] shrink-0"
                  : // far left / far right — largest
                    "relative z-[1] w-[23%] min-w-[86px] max-w-[260px] shrink-0";

            return (
              <div key={src} className={sizeClass}>
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="pointer-events-none h-auto w-full select-none drop-shadow-[0_10px_22px_rgba(43,66,93,0.16)]"
                  sizes="(max-width: 768px) 24vw, 260px"
                />
              </div>
            );
          })}
        </div>

        {/* Gap under center card ≈ button height */}
        <div className="mt-5 sm:mt-6">
          <Button href="/about-us" variant="gold" size="pill">
            <span className="hidden sm:block">Read More About Us</span>
            <Image
              src="/icons/request-appointment-icon.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0"
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}
