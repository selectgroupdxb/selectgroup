import Link from "next/link";
import { Logo } from "./Logo";
import { footerColumns, socialLinks } from "./nav-data";

export function Footer() {
  return (
    <footer className="bg-sg-black text-white">
      <div className="px-5 pt-14 pb-8 tablet:px-10 desktop:px-16 desktop:pt-24 desktop:pb-12">
        <div className="grid gap-10 border-b border-white/18 pb-12 desktop:grid-cols-[280px_1fr] desktop:gap-16">
          <div className="flex flex-col gap-5">
            <Logo variant="white" heightClass="h-9" />
            <p className="max-w-[32ch] text-body-sm text-white/70">
              Developing premium real estate since 2002.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 tablet:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] tablet:gap-x-7">
            {footerColumns.map((column) => (
              <div key={column.label} className="flex flex-col gap-3">
                <h3 className="text-eyebrow tracking-eyebrow text-white/60 uppercase">{column.label}</h3>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
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
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 desktop:flex-row desktop:items-center desktop:justify-between">
          <p className="text-body-sm text-white/50">
            &copy; {new Date().getFullYear()} Select Group. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-body-sm font-bold tracking-[0.1em] text-white/70 transition-colors duration-180 hover:text-sg-pacific"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
