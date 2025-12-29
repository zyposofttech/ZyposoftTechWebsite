import Image from "next/image";
import Link from "next/link";

import { home } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/site/Reveal";
import Button from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Eyebrow, H2, H3, P } from "@/components/ui/Typography";
import { HeroAIStudio } from "@/components/site/HeroAIStudio";
import AboutUs from "@/components/site/AboutUs";
import TechnologySection from "@/components/site/TechnologyMap";
import DeliverySection from "@/components/site/DeliverySection";
import ProductEngineeringSection from "@/components/site/ProductEngineeringSection";
export default function HomePage() {
  return (
    <main className="zyposoft-site text-[#0b1e3a]">
      {/* HERO Section */}
      <HeroAIStudio />

      {/* ABOUT Us Section */}
      <AboutUs />

      {/* Product Engineering Section*/}
      <ProductEngineeringSection />

      {/* OUR TECHNOLOGY */}

      <TechnologySection />

      {/* DELIVERY Section */}
      <DeliverySection />



      {/* CONTACT CTA (redesigned: not boxy, no hard borders) */}
      <section id="contact" className="zyposoft-cta">
        <div className="zyposoft-cta__bg" aria-hidden>
          <div className="zyposoft-cta__mesh" />
          <div className="zyposoft-cta__noise" />
          <div className="zyposoft-cta__halo" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <Reveal threshold={0.3} rootMargin="0px 0px -30% 0px">
              <div className="zyposoft-cta__inner">
                <div className="text-xs text-spaced text-[rgba(11,30,58,0.55)]">
                  {home.finalCta.titleSpaced}
                </div>

                <div className="mt-4 max-w-3xl md:mx-auto">
                  <H2>{home.finalCta.title}</H2>
                  <P className="mt-4">
                    Discover how our high-availability ecosystem can drive measurable outcomes for your organization. Whether you are modernizing legacy systems or launching a new venture, let's discuss how we can enforce scalability and security from Day One.
                  </P>

                  <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
                    <Link href="/services" className="zyposoft-linkAccent">
                      See delivery capabilities
                    </Link>
                    <Link href="/contact" className="zyposoft-linkMuted">
                      Start a conversation
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
} 
