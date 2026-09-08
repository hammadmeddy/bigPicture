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
      className="relative isolate overflow-x-clip pt-28 text-center text-white sm:pt-32 lg:pt-36"
    >
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <Image
        src="/images/hero-overall.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-col items-center pb-16 sm:pb-20 lg:pb-24">
        <p className="font-cursive text-2xl text-gold sm:text-3xl">
          Loved By Kids And Parents Alike
        </p>

        <h1
          id="hero-heading"
          className="mt-3 text-4xl leading-[0.95] font-extrabold uppercase sm:text-6xl"
        >
          Big Picture
          <br />
          Pediatric Dentistry
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/90 sm:text-lg">
          Proudly caring for smiles in and around Houston, Clear Lake, League
          City, and Friendswood, TX.
        </p>

        <div className="mt-8 flex w-full max-w-3xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Button
            href="/appointment"
            variant="gold"
            size="pill"
            className="whitespace-nowrap"
          >
            Request an Appointment
            <Image
              src="/icons/request-appointment-icon.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0"
            />
          </Button>

          <Button
            href={phoneHref}
            variant="outline"
            size="pill"
            className="gap-3 whitespace-nowrap pl-1.5 pr-5"
          >
            <Image
              src="/icons/callicon.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0"
            />
            Call Us: {phoneDisplay}
          </Button>
        </div>
      </Container>

      {/*
        Full wave asset from Figma:
        - transparent top → hero shows through
        - blue wave + cream bottom → transition into About
        - logo sits in the center valley
      */}
      <div className="relative z-20 -mt-8 -mb-10 w-full leading-[0] sm:-mt-10 sm:-mb-14 md:-mt-12 md:-mb-16">
        <Image
          src="/images/full-wave-clear.png"
          alt=""
          width={1024}
          height={86}
          priority
          className="h-auto w-full"
        />

        <div className="pointer-events-none absolute left-1/2 top-[28%] z-30 -translate-x-1/2 -translate-y-[40%] sm:top-[30%]">
          <Image
            src="/images/logo-before-about.png"
            alt=""
            width={213}
            height={246}
            className="h-[110px] w-auto sm:h-[130px] md:h-[150px]"
          />
        </div>
      </div>
    </section>
  );
}
