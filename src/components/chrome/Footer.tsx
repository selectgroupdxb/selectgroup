import Link from "next/link";
import { Logo } from "./Logo";
import { navGroups, utilityLinks } from "./nav-data";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export function Footer() {
  return (
    <footer className="bg-sg-black text-white">
      <div className="mx-auto max-w-[var(--page-max)] px-5 py-14 md:px-10 desktop:px-16 desktop:py-24">
        <div className="grid gap-10 border-b border-white/14 pb-14 desktop:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] desktop:gap-8">
          <div className="flex flex-col gap-5">
            <Logo variant="white" heightClass="h-8" />
            <p className="max-w-[32ch] text-body-sm text-white/72">
              Developing premium real estate since 2002.
            </p>
          </div>

          {navGroups.map((group) => (
            <div key={group.key} className="flex flex-col gap-3 border-t border-white/14 pt-5 desktop:border-0 desktop:pt-0">
              <h3 className="text-eyebrow tracking-eyebrow text-white/56 uppercase">{group.label}</h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block min-h-11 py-1 text-body-sm text-white/82 transition-colors duration-180 hover:text-sg-pacific"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-4 border-t border-white/14 pt-5 desktop:border-0 desktop:pt-0">
            <h3 className="text-eyebrow tracking-eyebrow text-white/56 uppercase">Newsletter</h3>
            <p className="text-body-sm text-white/72">Subscribe to our newsletter</p>
            <form className="flex">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder="Email address"
                className="h-12 min-w-0 flex-1 border border-white/32 bg-transparent px-4 text-body-sm text-white placeholder:text-white/48 focus-visible:outline-none"
              />
              <button
                type="submit"
                className="h-12 shrink-0 bg-sg-pacific px-5 text-button font-bold tracking-button text-white uppercase transition-colors duration-180 hover:bg-sg-bluish"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 desktop:flex-row desktop:items-center desktop:justify-between">
          <p className="text-body-sm text-white/56">
            &copy; {new Date().getFullYear()} Select Group. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[...LEGAL_LINKS, ...utilityLinks].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body-sm text-white/56 transition-colors duration-180 hover:text-sg-pacific"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
