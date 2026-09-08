"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import {
  ChevronDownIcon,
  ArrowUpIcon,
} from "@/components/ui/icons";

const phoneNumber = "(346) 230-2811";
const phoneHref = `tel:${phoneNumber.replace(/[^\d+]/g, "")}`;
const email = "appointments@bigpicturedds.com";

const openingHours = [
  { day: "Monday", hours: "7:30am-4:30pm" },
  { day: "Tuesday", hours: "7:30am-4:30pm" },
  { day: "Wednesday", hours: "7:30am-4:30pm" },
  { day: "Thursday", hours: "7:30am-4:30pm" },
  { day: "Friday", hours: "7:30am-4:30pm" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

const services = [
  "General Dentistry",
  "Preventive Care",
  "Sedation Dentistry",
  "Orthodontics",
  "Emergency Dentistry",
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: "/icons/facebook.svg" },
  { href: "https://x.com", label: "X", icon: "/icons/x.svg" },
  { href: "https://instagram.com", label: "Instagram", icon: "/icons/instagram.svg" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "/icons/linkedin.svg" },
];

const fieldClasses =
  "w-full rounded-lg bg-white px-4 py-2.5 text-sm text-dark-blue placeholder:text-body-gray/70 focus:outline-2 focus:outline-gold";

function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={fieldClasses} />;
}

export default function Footer() {
  return (
    <footer className="relative bg-dark-blue text-white">
      {/*
        Full footer wave from Figma:
        - cream top → blends from section above
        - gold wave + transparent bottom → dark footer shows through
        - logo sits on the center of the wave
      */}
      <div className="relative z-20 -mt-2 w-full leading-[0] sm:-mt-4">
        <Image
          src="/images/footer-wave-clear.png"
          alt=""
          width={1024}
          height={93}
          priority={false}
          className="h-auto w-full"
        />

        <div className="pointer-events-none absolute left-1/2 top-[28%] z-30 -translate-x-1/2 -translate-y-[55%] sm:top-[30%] lg:top-[40%]">
          <Image
            src="/images/logo-footer.png"
            alt="Big Picture Pediatric Dentistry"
            width={213}
            height={246}
            className="h-[110px] w-auto sm:h-[130px] md:h-[150px] lg:h-[190px] "
          />
        </div>
      </div>

      <Container className="pt-16 sm:pt-20">
        <div className="grid gap-12 border-b border-white/20 pb-16 lg:grid-cols-3 lg:gap-0">
          <div className="lg:border-r lg:border-white/20 lg:pr-8 xl:pr-10">
            <p className="font-cursive text-3xl text-gold">Don&apos;t Be A Stranger</p>
            <p className="mt-1 text-base font-bold tracking-wide text-white">
              REQUEST AN APPOINTMENT
            </p>

            <form
              action={`mailto:${email}`}
              method="post"
              encType="text/plain"
              className="mt-5 flex flex-col gap-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <FieldInput name="firstName" placeholder="Full name" aria-label="Full name" />
                <FieldInput name="lastName" placeholder="Last name" aria-label="Last name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FieldInput name="phone" type="tel" placeholder="Phone" aria-label="Phone" />
                <FieldInput name="email" type="email" placeholder="Email" aria-label="Email" />
              </div>

              <div className="relative">
                <select
                  name="service"
                  defaultValue=""
                  aria-label="Which service you're interested in?"
                  className={`${fieldClasses} appearance-none text-body-gray/70`}
                >
                  <option value="" disabled>
                    Which service you&apos;re interested in ?
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service} className="text-dark-blue">
                      {service}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body-gray/70" />
              </div>

              <textarea
                name="message"
                rows={4}
                placeholder="Message"
                aria-label="Message"
                className={fieldClasses}
              />

              <Button type="submit" variant="gold" size="pill" className="mt-1 self-start">
                Submit Form
                <Image
                  src="/icons/request-appointment-icon.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0"
                />
              </Button>
            </form>
          </div>

          <div className="flex flex-col items-center text-center lg:border-r lg:border-white/20 lg:px-8 xl:px-10">
            <Image
              src="/images/big-pic-footer.png"
              alt="Big Picture Pediatric Dentistry"
              width={320}
              height={80}
              className="h-auto w-[200px] sm:w-[240px]"
            />

            <p
              className="mt-6 w-full max-w-xs bg-[#364c66] py-2 text-center text-[18px] font-bold uppercase text-[#DDBA83]"
              style={{ fontFamily: '"Proxima Nova", var(--font-poppins), sans-serif' }}
            >
              Opening Hours
            </p>

            <ul className="mt-4 w-full max-w-xs text-sm text-white/80">
              {openingHours.map(({ day, hours }) => (
                <li key={day} className="flex items-baseline gap-2 py-1">
                  <span>{day}</span>
                  <span
                    className="mb-1 flex-1 border-b border-dotted border-white/30"
                    aria-hidden="true"
                  />
                  <span>{hours}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-white">
              Closed on select Mondays or Fridays
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gold transition-transform hover:scale-105"
                >
                  <Image src={icon} alt="" width={14} height={14} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pl-8 xl:pl-10">
            <p className="text-base font-bold tracking-wide text-white">CONTACT US</p>

            <div className="mt-5 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-[#DDBA83]">
                  <Image
                    src="/icons/call-footer.svg"
                    alt=""
                    width={23}
                    height={23}
                    className="h-5 w-5"
                  />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-wide text-white uppercase">
                    Call Us
                  </p>
                  <a
                    href={phoneHref}
                    className="mt-0.5 block text-sm text-white/80 hover:text-white"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-[#DDBA83]">
                  <Image
                    src="/icons/email-footer.svg"
                    alt=""
                    width={26}
                    height={20}
                    className="h-4 w-5"
                  />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-wide text-white uppercase">
                    Email Us
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="mt-0.5 block text-sm break-all text-white/80 hover:text-white"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-[#DDBA83]">
                  <Image
                    src="/icons/location-footer.svg"
                    alt=""
                    width={20}
                    height={25}
                    className="h-5 w-4"
                  />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-wide text-white uppercase">
                    Location
                  </p>
                  <p className="mt-0.5 text-sm text-white/80">
                    17150 El Camino Real
                    <br />
                    Houston, TX 77058
                  </p>
                  <p className="mt-2 max-w-xs text-xs text-white/70">
                    (We serve patients in the{" "}
                    <span className="text-gold">Clear Lake</span>,{" "}
                    <span className="text-gold">League City</span>, Houston and{" "}
                    <span className="text-gold">Friendswood</span> areas)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="absolute left-1/2 top-0 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-light-blue text-white shadow-md transition-transform hover:scale-105"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>

          <div className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
            <p className="text-white">© Big Picture Pediatric Dentistry {new Date().getFullYear()}</p>
            <Link href="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
