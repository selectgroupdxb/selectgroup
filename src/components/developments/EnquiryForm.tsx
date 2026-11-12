"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const fieldClass =
  "h-12 w-full border border-sg-grey-4 bg-sg-white px-4 text-body-sm text-sg-black placeholder:text-sg-grey-3 focus-visible:border-sg-pacific";

type Persona = "investor" | "end-user" | "researching" | "agent" | "";

export function EnquiryForm({ developmentName, image }: { developmentName: string; image?: string }) {
  const [sent, setSent] = useState(false);
  const [persona, setPersona] = useState<Persona>("");
  const showBedrooms = persona === "investor" || persona === "end-user";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to the GoHighLevel route handler once it exists — this is a
    // front-end-only submission for now, matching the rest of the project's
    // "no fabricated backend" precedent.
    setSent(true);
  }

  return (
    <section id="register" className="relative overflow-hidden bg-sg-black">
      <ImagePlaceholder label={`${developmentName} enquiry background`} src={image} sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-sg-black/70" aria-hidden />
      <Section tone="black" padding="standard" className="relative">
        <div className="grid gap-12 desktop:grid-cols-2 desktop:gap-20">
          <div>
            <Eyebrow tone="inverse">{developmentName}</Eyebrow>
            <h2 className="mt-3 max-w-[16ch] text-h2 text-white">Register Your Interest</h2>
            <p className="mt-5 max-w-prose text-body text-white/82">
              Speak to our team about availability, pricing and payment plans for this development.
            </p>
          </div>

          <div className="bg-sg-white p-7 tablet:p-10">
            {sent ? (
              <div>
                <h3 className="text-h3 text-sg-black">Thank you!</h3>
                <p className="mt-3 max-w-prose text-body text-sg-grey-1">
                  Your submission has been received! A member of our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="First Name*" className={fieldClass} />
                  <input required placeholder="Last Name*" className={fieldClass} />
                </div>
                <input required type="email" placeholder="Email*" className={fieldClass} />
                <div className="flex gap-2">
                  <span className="flex h-12 shrink-0 items-center border border-sg-grey-4 bg-sg-tint-2 px-3 text-body-sm text-sg-grey-1">
                    AE +971
                  </span>
                  <input required type="tel" placeholder="Phone*" className={fieldClass} />
                </div>
                <select required defaultValue="" className={fieldClass} aria-label="Investment timeline">
                  <option value="" disabled>
                    What Is Your Investment Timeline?
                  </option>
                  <option value="immediate">Immediate</option>
                  <option value="short-term">Short Term</option>
                  <option value="long-term">Long Term</option>
                  <option value="researching">Still Researching</option>
                </select>
                <select
                  required
                  value={persona}
                  onChange={(e) => setPersona(e.target.value as Persona)}
                  className={fieldClass}
                  aria-label="What best describes you"
                >
                  <option value="" disabled>
                    What Best Describes You?
                  </option>
                  <option value="investor">Investor</option>
                  <option value="end-user">End User</option>
                  <option value="researching">Just Researching</option>
                  <option value="agent">I Am A Real Estate Agent</option>
                </select>
                {showBedrooms ? (
                  <select required defaultValue="" className={fieldClass} aria-label="Bedrooms">
                    <option value="" disabled>
                      I Am Looking To Buy
                    </option>
                    <option value="studio">Studio</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+ Bedrooms</option>
                  </select>
                ) : null}
                <label className="flex items-start gap-3 text-body-sm text-sg-grey-1">
                  <input required type="checkbox" className="mt-0.5" />
                  I agree to the terms and conditions and privacy policy.
                </label>
                <Button type="submit" variant="filled" className="mt-2 w-full">
                  Register Interest
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </section>
  );
}
