import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function MeetTheDoctor() {
  return (
    <section
      id="meet-the-doctor"
      aria-labelledby="meet-the-doctor-heading"
      className="relative isolate overflow-hidden bg-cream text-white"
    >
      {/* Figma wavy blue background — transparent above the curve */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 min-h-full"
        aria-hidden="true"
      >
        <Image
          src="/images/meet-the-doctor-bg.png"
          alt=""
          width={1920}
          height={920}
          className="h-full min-h-[720px] w-full object-cover object-top select-none sm:min-h-0 sm:object-contain sm:object-top"
          priority={false}
        />
        {/* Extend blue under tall content on mobile */}
        <div className="absolute inset-x-0 top-[40%] bottom-0 -z-10 bg-[#2b425d] sm:hidden" />
      </div>

      <Container className="relative z-10 grid gap-10 py-16 sm:gap-12 sm:py-24 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <p className="font-cursive text-2xl text-gold sm:text-3xl">
            Meet The Doctor
          </p>
          <h2
            id="meet-the-doctor-heading"
            className="mt-2 text-[1.75rem] font-semibold sm:text-4xl md:text-5xl"
          >
            Dr. Jason Brock
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg">
            Dr. Brock grew up outside of Pittsburgh, Pennsylvania. Although his
            father was a dentist, it wasn&apos;t until college that he realized
            his own passion for dentistry, with a compassionate approach and
            open communication every step of the way. After earning a Master of
            Arts with a specialization in pediatric care, he furthered his
            education by completing a pediatric dental residency at UT Houston
            School of Dentistry and he looks forward to seeing your child smile.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <Button
              href="/about-us/our-team"
              variant="gold"
              size="pill"
              className="w-full max-w-xs justify-between sm:w-auto sm:justify-center"
            >
              <span className="truncate text-[11px] sm:text-[13px]">
                Read More About Doctor
              </span>
              <Image
                src="/icons/request-appointment-icon.svg"
                alt=""
                width={36}
                height={36}
                className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
              />
            </Button>
            <Button
              href="/about-us/our-team"
              variant="ghost"
              size="pill"
              className="gap-3 border-none bg-transparent px-2 text-white hover:bg-white/10 focus-visible:outline-white sm:px-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-1">
                <Image
                  src="/icons/Arrow 1.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              </span>
              <span className="text-[13px] font-kanit font-semibold uppercase">
                Meet The Team
              </span>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] overflow-visible sm:max-w-[420px] lg:mx-0 lg:ml-auto lg:max-w-[460px]">
          <div
            className="pointer-events-none absolute right-0 top-0 z-0 w-[22%] translate-x-[36%] -translate-y-[30%] sm:w-[24%] sm:translate-x-[40%] sm:-translate-y-[34%] lg:translate-x-[45%]"
            aria-hidden="true"
          >
            <Image
              src="/images/logo-behind-doctor.png"
              alt=""
              width={171}
              height={171}
              className="h-auto w-full"
            />
          </div>

          <div className="relative z-10">
            <Image
              src="/images/doc-image.png"
              alt="Dr. Jason Brock, pediatric dentist at Big Picture Pediatric Dentistry"
              width={645}
              height={671}
              className="h-auto w-full"
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 460px"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
