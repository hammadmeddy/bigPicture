"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/ui/icons";

const phoneNumber = "(346) 230-2811";
const phoneHref = `tel:${phoneNumber.replace(/[^\d+]/g, "")}`;

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: "/icons/facebook.svg" },
  { href: "https://x.com", label: "X", icon: "/icons/x.svg" },
  { href: "https://instagram.com", label: "Instagram", icon: "/icons/instagram.svg" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "/icons/linkedin.svg" },
];

const leftNavLinks = [
  { targetId: "hero", label: "Home" },
  { targetId: "about-us", label: "About Us", hasDropdown: true },
  { targetId: "pediatric-dentistry", label: "Pediatric Dentistry", hasDropdown: true },
  { targetId: "services", label: "Services", hasDropdown: true },
  { targetId: "for-parents", label: "For Parents", hasDropdown: true },
];

const rightNavLinks = [
  { targetId: "blog", label: "Blog" },
  { targetId: "membership", label: "Membership" },
  { targetId: "contact", label: "Contact" },
];

function scrollToSection(targetId: string) {
  if (targetId === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function NavLink({
  targetId,
  label,
  hasDropdown,
}: {
  targetId: string;
  label: string;
  hasDropdown?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(targetId)}
      className="flex items-center gap-1 whitespace-nowrap text-[13px] font-medium uppercase tracking-wide text-dark-blue transition-colors hover:text-secondary xl:text-[14px]"
    >
      {label}
      {hasDropdown && <ChevronDownIcon className="h-3 w-3 text-gold" />}
    </button>
  );
}


function LogoMark() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection("hero")}
      className="absolute left-1/2 top-1 z-40 -translate-x-1/2"
      aria-label="Big Picture Pediatric Dentistry — Home"
    >
      <Image
        src="/images/logo-notch.png"
        alt="Big Picture Pediatric Dentistry"
        width={306}
        height={194}
        priority
        className="h-auto w-[150px] bg-transparent md:w-[180px] xl:w-[250px]"
      />
    </button>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 overflow-visible">
      <LogoMark />

      <div className="relative z-20 bg-cream md:bg-light-blue">
        <Container className="flex h-11 items-center justify-between md:h-10">
          <button
            type="button"
            onClick={() => {
              window.location.href = phoneHref;
            }}
            aria-label={`Call us at ${phoneNumber}`}
            className="inline-flex items-center justify-center md:hidden"
          >
            <Image
              src="/icons/phone-chat-smallscreen.svg"
              alt=""
              width={39}
              height={39}
              className="h-8 w-8"
            />
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = phoneHref;
            }}
            className="hidden items-center gap-2 text-sm font-semibold text-white md:flex"
          >
            <span>CALL US TODAY:</span> {phoneNumber}
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-[15px] md:flex">
              {socialLinks.map(({ href, label, icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
                  aria-label={label}
                  className="flex items-center justify-center"
                >
                  <Image src={icon} alt="" width={14} height={14} className="h-full w-full" />
                </button>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center xl:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((open) => !open)}
            >
              <Image
                src="/icons/hamburger-smallscreen.svg"
                alt=""
                width={39}
                height={39}
                className="h-8 w-8"
              />
            </button>
          </div>
        </Container>
      </div>

      <div className="relative z-10 bg-cream">
        <div className="relative mx-auto grid h-[92px] w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 md:h-[100px] lg:px-10">
          <nav
            className="hidden shrink-0 items-center gap-4 justify-self-start xl:flex xl:gap-5"
            aria-label="Main"
          >
            {leftNavLinks.map((link) => (
              <NavLink key={link.targetId} {...link} />
            ))}
          </nav>

          <div className="w-[160px] md:w-[180px] xl:w-[200px]" aria-hidden="true" />

          <div className="hidden shrink-0 items-center gap-4 justify-self-end md:flex xl:gap-5">
            <div className="hidden items-center gap-4 xl:flex xl:gap-5">
              {rightNavLinks.map((link) => (
                <NavLink key={link.targetId} {...link} />
              ))}
            </div>
            <Button
              type="button"
              variant="gold"
              size="pill"
              className="text-[11px] xl:text-[13px]"
              onClick={() => scrollToSection("contact")}
            >
              <span className="hidden xl:inline">Request an Appointment</span>
              <span className="xl:hidden">Appointment</span>
              <Image
                src="/icons/request-appointment-icon.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0"
              />
            </Button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-black/5 bg-cream xl:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          <nav className="flex flex-col" aria-label="Mobile">
            {[...leftNavLinks, ...rightNavLinks].map((link) => (
              <button
                key={link.targetId}
                type="button"
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-dark-blue hover:bg-black/5"
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection(link.targetId);
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-2 px-3 md:hidden">
            <Button
              type="button"
              variant="gold"
              size="pill"
              className="w-full"
              onClick={() => {
                setIsOpen(false);
                scrollToSection("contact");
              }}
            >
              Request an Appointment
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
      </div>
    </header>
  );
}
