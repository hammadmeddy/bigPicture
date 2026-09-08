import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "rounded-lg font-medium bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900",
  secondary:
    "rounded-lg font-medium bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus-visible:outline-slate-900",
  ghost:
    "rounded-lg font-medium bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-900",
  gold: "rounded-full font-kanit font-semibold text-[13px] text-center uppercase whitespace-nowrap bg-gold text-white shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:brightness-105 focus-visible:outline-dark-blue",
  outline:
    "rounded-full font-kanit font-semibold text-[13px] text-center uppercase whitespace-nowrap bg-transparent text-white ring-2 ring-inset ring-white/70 hover:bg-white/10 focus-visible:outline-white",
} as const;

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  pill: "h-11 pl-4 pr-1 gap-2",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");

    // Internal routes: next/link (client navigation). External/tel: native <a>.
    if (isExternal) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<
    ButtonAsButton,
    keyof CommonProps
  >;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
