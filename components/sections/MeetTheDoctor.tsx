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
      {/* Solid blue fill under the wave (extends for tall content) */}
      <div
        className="absolute inset-x-0 bottom-0 top-[12%]  sm:top-[10%] lg:top-[8%]"
        aria-hidden="true"
      />

      {/* Figma wavy blue background — transparent above the curve */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0" aria-hidden="true">
        <Image
          src="/images/meet-the-doctor-bg.png"
          alt=""
          width={1920}
          height={920}
          className="h-auto w-full select-none"
          priority={false}
        />
      </div>

      <Container className="relative z-10 grid gap-12 py-24 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32">
        <div className="max-w-xl">
          <p className="font-cursive text-2xl text-gold sm:text-3xl">
            Meet The Doctor
          </p>
          <h2
            id="meet-the-doctor-heading"
            className="mt-2 text-3xl font-semibold sm:text-5xl"
          >
            Dr. Jason Brock
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
            Dr. Brock grew up outside of Pittsburgh, Pennsylvania. Although his
            father was a dentist, it wasn&apos;t until college that he realized
            his own passion for dentistry, with a compassionate approach and
            open communication every step of the way. After earning a Master of
            Arts with a specialization in pediatric care, he furthered his
            education by completing a pediatric dental residency at UT Houston
            School of Dentistry and he looks forward to seeing your child smile.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button href="/about-us/our-team" variant="gold" size="pill">
              Read More About Doctor
              <Image
                src="/icons/request-appointment-icon.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
            </Button>
            <Button
              href="/about-us/our-team"
              variant=""
              size="pill"
              
              className="px-6 border-none!" 
            >
             
             <div className="h-9 w-9 shrink-0 flex items-center justify-center bg-white rounded-full p-1" >
              <Image
                src="/icons/Arrow 1.svg"
                alt=""
                width={20}
                height={20}
                className="shrink-0"
              />
             </div>
               <span>Meet The Team</span>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] overflow-visible lg:mx-0 lg:ml-auto lg:max-w-[460px]">
          {/* Brand mark — top-right corner of portrait; half tucked under, half peeking out */}
          <div
            className="pointer-events-none absolute right-0 top-0 z-0 w-[24%] translate-x-[40%] -translate-y-[34%] sm:w-[24%] lg:translate-x-[45%]"
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
              sizes="(max-width: 1024px) 90vw, 460px"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
