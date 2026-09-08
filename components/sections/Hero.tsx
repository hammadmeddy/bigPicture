import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const phoneDisplay = "(346) 230-2811";
const phoneHref = "tel:+13462302811";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-10 overflow-x-clip pt-24 text-center text-white sm:pt-28 md:pt-32 lg:pt-36"
    >
      <Image
        src="/images/hero-with-notch.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      {/* Blue gradient overlay with logo cutout */}
      <Image
        src="/images/hero-overlay-exact.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top mix-blend-multiply"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-col items-center px-4 pb-28 sm:pb-36 md:pb-44 lg:pb-52">
        <p className="font-cursive text-xl text-gold sm:text-2xl md:text-3xl">
          Loved By Kids And Parents Alike
        </p>

        <h1
          id="hero-heading"
          className="mt-3 text-[2rem] leading-[0.95] font-extrabold uppercase sm:text-5xl md:text-6xl"
        >
          Big Picture
          <br />
          Pediatric Dentistry
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-white/90 sm:mt-5 sm:text-base md:text-lg">
          Proudly caring for smiles in and around Houston, Clear Lake, League
          City, and Friendswood, TX.
        </p>

        <div className="mt-6 flex w-full max-w-3xl flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <Button
            href="/appointment"
            variant="gold"
            size="pill"
            className="justify-between px-3 text-[11px] sm:justify-center sm:px-4 sm:text-[13px]"
          >
            <span className="truncate">Request an Appointment</span>
            <Image
              src="/icons/request-appointment-icon.svg"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
            />
          </Button>

          <Button
            href={phoneHref}
            variant="outline"
            size="pill"
            className="justify-center gap-2 pl-1.5 pr-4 text-[11px] sm:gap-3 sm:pr-5 sm:text-[13px]"
          >
            <Image
              src="/icons/callicon.svg"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
            />
            <span className="truncate">Call Us: {phoneDisplay}</span>
          </Button>
        </div>
      </Container>

      {/* Wave transition with tooth logo */}
      <div className="relative z-20 w-full overflow-visible">
        {/* Tooth logo - centered between waves */}
        <div className="pointer-events-none absolute left-1/2 bottom-0 z-40 -translate-x-1/2 translate-y-[35%]">
          <Image
            src="/images/logo-with-glow.png"
            alt=""
            width={213}
            height={246}
            priority
            className="h-[130px] w-auto sm:h-[160px] md:h-[190px] lg:h-[210px]"
          />
        </div>

        {/* Combined wave with white top and blue bottom */}
        <Image
          src="/images/full-wave-clear.png"
          alt=""
          width={1024}
          height={86}
          priority
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
