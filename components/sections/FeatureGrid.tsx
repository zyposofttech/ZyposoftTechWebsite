"use client";

import { Reveal } from "@/components/site/Reveal";
import { home } from "@/lib/content";

export function FeatureGrid() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0b1e3a]">
              Smarter engineering, built for teams.
            </h2>
            <p className="mt-4 text-lg text-[#0b1e3a]/60">
              From task planning to AI-driven suggestions, we give your team the tools to move fast.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Feature Card */}
          <div className="md:col-span-8">
            <Reveal delayMs={100}>
              <div className="glass-card rounded-[40px] p-10 h-full flex flex-col justify-between overflow-hidden relative">
                <div className="max-w-md">
                   <div className="feature-icon-wrapper mb-6">🚀</div>
                   <h3 className="text-2xl font-bold mb-4">Launch-ready in minutes</h3>
                   <p className="text-[#0b1e3a]/60 leading-relaxed">
                     Deploy your entire digital infrastructure with governed role-based access 
                     and audit trails built directly into the core.
                   </p>
                </div>
                {/* Abstract Visual Placeholder */}
                <div className="mt-10 h-40 bg-gradient-to-r from-[#1b59a7]/5 to-transparent rounded-2xl border border-black/5" />
              </div>
            </Reveal>
          </div>

          {/* Side Feature Card */}
          <div className="md:col-span-4">
            <Reveal delayMs={200}>
              <div className="glass-card rounded-[40px] p-10 h-full bg-[#1b59a7]/5 border-none">
                 <div className="feature-icon-wrapper mb-6">🔒</div>
                 <h3 className="text-2xl font-bold mb-4">Enterprise Grade</h3>
                 <p className="text-[#0b1e3a]/60">
                   Bank-level encryption and DPDP compliance posture for sensitive health data.
                 </p>
              </div>
            </Reveal>
          </div>

          {/* Lower Grid Row */}
          {home.platforms.items.map((item, idx) => (
            <div key={item.tag} className="md:col-span-4">
              <Reveal delayMs={300 + idx * 100}>
                <div className="glass-card rounded-[40px] p-10 border-black/5 hover:border-[#1b59a7]/20 transition-colors group">
                  <div className="h-10 w-10 rounded-xl bg-[#1b59a7]/10 flex items-center justify-center text-[#1b59a7] font-bold text-xs mb-6 group-hover:scale-110 transition-transform">
                    {item.tag}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-[#0b1e3a]/60">{item.blurb}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}