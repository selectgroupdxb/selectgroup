import Link from "next/link";
import { cn } from "@/lib/cn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import type { NavGroup } from "./nav-data";

type MegaPanelProps = {
  group: NavGroup;
  open: boolean;
  id: string;
};

export function MegaPanel({ group, open, id }: MegaPanelProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label={`${group.label} menu`}
      aria-hidden={!open}
      className={cn(
        "absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-600 [transition-timing-function:var(--ease-reveal)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr] pointer-events-none",
      )}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "border-t border-sg-grey-5 bg-white shadow-modal transition-opacity duration-320",
            open ? "opacity-100 delay-150" : "opacity-0",
          )}
        >
          <div className="mx-auto grid max-w-[var(--page-max)] grid-cols-[0.7fr_3.4fr] gap-12 px-16 py-12">
            <div className="flex flex-col items-start gap-5 border-r border-sg-grey-5 pr-12">
              <h3 className="font-body text-h4 font-bold tracking-normal text-sg-black normal-case">
                {group.label}
              </h3>
              <p className="text-body-sm text-sg-grey-1">{group.intro}</p>
              <Button href={group.href} variant="outline" size="compact">
                View All
              </Button>
            </div>
            <ul className="grid grid-cols-4 gap-5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group block" tabIndex={open ? 0 : -1}>
                    <ImagePlaceholder
                      label={link.label}
                      aspect="7/5"
                      className="mb-3 transition-transform duration-600 group-hover:scale-[1.04]"
                    />
                    <span className="text-card-title font-display tracking-display text-sg-black uppercase group-hover:text-sg-pacific">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
