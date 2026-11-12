export function KeyFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 bg-sg-black tablet:grid-cols-3 desktop:grid-cols-5">
      {facts.map((fact) => (
        <div key={fact.label} className="border-l border-white/14 px-5 py-7 first:border-l-0 tablet:px-6">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">{fact.label}</p>
          <p className="mt-2 text-[20px] tracking-heading text-white uppercase">{fact.value}</p>
        </div>
      ))}
    </div>
  );
}
