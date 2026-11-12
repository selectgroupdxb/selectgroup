import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { ConstructionMilestone } from "@/data/developmentDetails";

const statusColor: Record<ConstructionMilestone["status"], string> = {
  Complete: "text-sg-cobalt",
  "In progress": "text-sg-pacific",
  "Not started": "text-sg-grey-2",
};

type ConstructionProgressProps = {
  updated: string;
  handover: string;
  pct: number;
  milestones: ConstructionMilestone[];
};

export function ConstructionProgress({ updated, handover, pct, milestones }: ConstructionProgressProps) {
  return (
    <Section tone="white" padding="standard">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Construction Progress</Eyebrow>
          <h2 className="mt-3 text-h2 text-sg-black">Building Six Senses Residences Dubai Marina</h2>
        </div>
        <p className="text-body-sm text-sg-grey-2">Last updated {updated}</p>
      </div>

      <div className="mt-10 flex flex-wrap items-baseline gap-3 desktop:mt-14">
        <span className="text-[clamp(56px,7vw,84px)] font-display leading-none text-sg-black">{pct}</span>
        <span className="text-[32px] font-display text-sg-grey-2">%</span>
      </div>
      <div className="mt-4 h-1.5 w-full max-w-xl bg-sg-grey-5">
        <div className="h-full bg-sg-pacific" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex max-w-xl justify-between text-body-sm text-sg-grey-2">
        <span>Groundbreaking</span>
        <span>Handover {handover}</span>
      </div>

      <div className="mt-12 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
        {milestones.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between gap-4">
              <span className="text-body-sm text-sg-black">{m.label}</span>
              <span className={`text-[11px] font-bold tracking-[0.1em] uppercase ${statusColor[m.status]}`}>{m.status}</span>
            </div>
            <div className="mt-2 h-[3px] w-full bg-sg-grey-5">
              <div className="h-full bg-sg-pacific" style={{ width: `${m.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
