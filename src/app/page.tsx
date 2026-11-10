import { Hero } from "@/components/home/Hero";
import { FeaturedDevelopments } from "@/components/home/FeaturedDevelopments";
import { Statistics } from "@/components/home/Statistics";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { BrandedCarousel } from "@/components/home/BrandedCarousel";
import { SelectDifference } from "@/components/home/SelectDifference";
import { Testimonial } from "@/components/home/Testimonial";
import { PastDevelopments } from "@/components/home/PastDevelopments";
import { Awards } from "@/components/home/Awards";
import { LatestNews } from "@/components/home/LatestNews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDevelopments />
      <Statistics />
      <WhatWeDo />
      <BrandedCarousel />
      <SelectDifference />
      <Testimonial />
      <PastDevelopments />
      <Awards />
      <LatestNews />
    </>
  );
}
