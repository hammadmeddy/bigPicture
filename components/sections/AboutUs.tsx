import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/**
 * Figma about gallery (responsive):
 * Equal widths; heights from assets (501 / 357 / 290); centerline aligned.
 */
const photos = [
  {
    src: "/images/about-3.png",
    alt: "Dentist performing a digital scan for a patient",
    width: 286,
    height: 501,
  },
  {
    src: "/images/about-2.png",
    alt: "Child prepared for dental imaging",
    width: 286,
    height: 357,
  },
  {
    src: "/images/about-1.png",
    alt: "Smiling young patient holding a toothbrush",
    width: 288,
    height: 290,
  },
  {
    src: "/images/about-5.png",
    alt: "Team member showing a dental model to a child",
    width: 286,
    height: 357,
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
      className="relative z-0 -mt-4 overflow-x-clip bg-cream pb-14 pt-14 sm:-mt-16 sm:pb-20 sm:pt-8 md:-mt-28 md:pb-24 md:pt-2 lg:-mt-36"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        <p className="font-cursive text-2xl text-gold sm:text-3xl">About Us</p>

        <h2
          id="about-us-heading"
          className="mt-2 text-[1.65rem] leading-tight font-semibold text-dark-blue sm:text-4xl md:text-5xl"
        >
          Pediatric Dentist In{" "}
          <span className="text-secondary">Houston, TX</span>
        </h2>

        <p className="mt-4 max-w-6xl text-sm leading-relaxed text-body-gray sm:mt-5 sm:text-base md:text-lg">
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

        {/* Scale down as a unit on small screens so the 5-card fan stays intact */}
        <div className="mt-8 w-full overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-10 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-[560px] max-w-none items-center justify-center gap-2 sm:w-full sm:max-w-5xl sm:gap-4 md:gap-5 lg:gap-[22px]">
            {photos.map(({ src, alt, width, height }) => (
              <div
                key={src}
                className="relative w-[18.5%] min-w-0 max-w-[286px] shrink-0"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="pointer-events-none h-auto w-full select-none drop-shadow-[0_10px_22px_rgba(43,66,93,0.16)]"
                  sizes="(max-width: 640px) 104px, (max-width: 1024px) 18vw, 286px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <Button href="/about-us" variant="gold" size="pill">
            <span className="sm:hidden">Read More</span>
            <span className="hidden sm:inline">Read More About Us</span>
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
