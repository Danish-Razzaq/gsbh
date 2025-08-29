import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import ScrollStack, {
  ScrollStackItem,
} from "./Components/ScrollStack/ScrollStack";
import DarkVeilLocal from "./Components/DarkVeil/DarkVeil";
import SpotlightCard from "./Components/SpotlightCard/SpotlightCard";
import PricingPage from "./PricingPage";
/**
 * ErpPitchDeck — final stable single-file implementation
 * - No external reactbits imports or dynamic CDN fetches (avoids sandbox fetch errors)
 * - Local replacements for DarkVeil background and ScrollStack animation
 * - Vertical snap-scroll sections, right-side dot nav, keyboard nav
 * - Revenue slider limited to 10..1000 (users × $30/month)
 */

const SLIDES = [
  {
    id: "hero",
    title: "Launching Soon: Your All-in-One Business Platform",
    subtitle:
      "GSBH is introducing an exclusive member benefit: a complete business platform that saves time, reduces costs, and helps you grow—all under the trusted GSBH brand.",
    img: "/images/hero_image.jpg",
    placeholder: "[Screenshot placeholder — GSBH-Branded Member Portal]",
  },
  {
    id: "why",
    title: "Why GSBH Is Bringing This to Members",
    bullets: [
      "Affordable, enterprise-grade tools delivered through your membership",
      "Simplify daily operations—finance, sales, HR, inventory, reports",
      "Exclusive insights and benchmarks from GSBH’s global SME network",
    ],
    placeholder: "[Screenshot placeholder — Member Dashboard & Insights]",
    video: "/videos/why_video.mp4",
  },
  {
    id: "features",
    title: "Everything You’ll Soon Have in One Place",
    subtitle:
      "Accounting, CRM, Inventory, HR, Projects — integrated into a single platform for SMEs.",
  },
  {
    id: "governance",
    title: "Built for Security, Compliance & Trust",
    bullets: [
      "Regional hosting with dedicated, secure instances",
      "Encrypted backups and audit logs",
      "Your data always belongs to you—export anytime",
    ],
    placeholder: "[Screenshot placeholder — Security & Settings]",
    img: "/images/owner.jpg",
  },
  {
    id: "commercials",
    title: "Simple Member Pricing",
    subtitle:
      "GSBH members will enjoy exclusive pricing when the platform launches.",
    placeholder: "[Screenshot placeholder — Member Pricing Tiers]",
    img: "/images/Commercial.jpg",
  },
  // {
  //   id: "revenue",
  //   title: "See the Value for Your Business",
  //   subtitle:
  //     "Estimate the time and cost savings you’ll unlock once you start using the platform.",
  //   placeholder: "[Screenshot placeholder — ROI Estimator]",
  //   img: "/images/Revenue.jpg",
  // },
  {
    id: "pilot",
    title: "Early Access Pilot",
    subtitle:
      "GSBH will onboard an initial group of members in the launch phase—be among the first to experience the benefits.",
    placeholder: "[Screenshot placeholder — Member Onboarding]",
    img: "/images/pilot.png",
  },

  {
    id: "pricing",
    title: "Pricing Plans",
    subtitle:
      "GSBH members will enjoy exclusive pricing when the platform launches.",
    // placeholder: "[Screenshot placeholder — Member Pricing Tiers]",
    // img: "/images/Commercial.jpg",
  },
];

const FEATURES = [
  {
    title: "Finance & Billing",
    member:
      "Send invoices, reconcile payments, and keep tax-ready ledgers with ease.",
    association:
      "As a GSBH member, you’ll access professional-grade finance tools at a fraction of the usual cost.",
    placeholder: "[Screenshot: Invoices & Ledger]",
    img: "/images/Finance&Billing.png",
  },
  {
    title: "CRM & Sales",
    member:
      "Track leads, manage pipelines, and automate follow-ups to close more deals.",
    association:
      "GSBH helps members accelerate growth with tools designed for SMEs.",
    placeholder: "[Screenshot: CRM Pipeline]",
    img: "/images/hero.jpg",
  },
  {
    title: "Inventory & Operations",
    member: "Manage stock, orders, and shipments in one connected system.",
    association:
      "Less admin, fewer errors, and smoother operations for every SME.",
    placeholder: "[Screenshot: Stock & Orders]",
    img: "/images/helpingdesk.jpg",
  },
  {
    title: "People & Payroll",
    member:
      "Simplify attendance, payroll, and employee self-service with confidence.",
    association:
      "GSBH makes compliance and team management straightforward for members.",
    placeholder: "[Screenshot: Payroll & HR]",
    img: "/images/payroll.jpg",
  },
  {
    title: "Reports & Insights",
    member: "See your KPIs and cash flow in real time, with clear dashboards.",
    association:
      "Exclusive anonymized benchmarks from GSBH help you measure against peers.",
    placeholder: "[Screenshot: Dashboards & Benchmarks]",
    img: "/images/Reports&Insights.jpg",
  },
];

/* Local DarkVeil: subtle, readable, and not dependent on external libs */
// function DarkVeilLocal() {
//   return (
//     <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: -2 }}>
//       <div
//         style={{
//           position: "absolute",
//           left: -160,
//           top: -160,
//           width: 520,
//           height: 520,
//           borderRadius: 9999,
//           filter: "blur(90px)",
//           background:
//             "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.16), rgba(99,102,241,0))",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           right: -140,
//           bottom: -140,
//           width: 520,
//           height: 520,
//           borderRadius: 9999,
//           filter: "blur(84px)",
//           background:
//             "radial-gradient(circle at 70% 70%, rgba(14,165,233,0.12), rgba(99,102,241,0))",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: "rgba(3,7,18,0.82)",
//         }}
//       />
//     </div>
//   );
// }

function ScrollStackLocal({ items }) {
  return (
    <div className="scrollbar lg:h-[75vh] h-[100vh] w-full overflow-hidden">
      <ScrollStack>
        {items.map((it, i) => (
          <ScrollStackItem key={i}>
            <div
              className="
                grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10
                w-full h-full items-center  px-1  sm:px-6 md:px-8
              "
            >
              {/* Text */}
              <div
                className="
                  px-1 py-6 md:px-8 md:py-12
                  rounded-2xl border border-white/10 bg-white/5 shadow-lg
                  flex flex-col justify-center
                  text-center md:text-left
                  max-w-lg mx-auto md:mx-0
                "
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                  {it.title}
                </h3>
                <p className="mt-2 text-white text-sm md:text-base">
                  <strong>Members:</strong> {it.member}
                </p>
                <h3 className="mt-1 text-[#30cfce] !text-[20px] font-semibold md:text-base">
                  {it.association}
                </h3>
              </div>

              {/* Image */}
              <div className="flex justify-center mt-6 md:mt-0">
                <img
                  src={it.img}
                  alt={it.title}
                  className="
                    w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
                    rounded-xl object-cover shadow-md
                  "
                />
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}

export default function ErpPitchDeck() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [active, setActive] = useState(0);

  // revenue state
  const [users, setUsers] = useState(100);
  const price = 30; // $30 per user per month
  const monthly = users * price;

  // animated displayed counter for monthly amount
  const [displayed, setDisplayed] = useState(monthly);
  const rafRef = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const start = displayed;
    const end = monthly;
    const duration = 420;
    const t0 = performance.now();

    function step(now) {
      const t = Math.min(1, (now - t0) / duration);
      const v = Math.floor(start + (end - start) * t);
      setDisplayed(v);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [monthly]);

  // IntersectionObserver to highlight current slide
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx")) || 0;
            setActive(idx);
          }
        });
      },
      { threshold: 0.45 }
    );

    const nodes = sectionsRef.current.filter(Boolean);
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (i) => {
    const el = sectionsRef.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowDown")
        scrollTo(Math.min(active + 1, SLIDES.length - 1));
      if (e.key === "ArrowUp") scrollTo(Math.max(active - 1, 0));
      if (
        e.key === "ArrowLeft" &&
        SLIDES[active] &&
        SLIDES[active].id === "revenue"
      )
        setUsers((u) => Math.max(10, u - 10));
      if (
        e.key === "ArrowRight" &&
        SLIDES[active] &&
        SLIDES[active].id === "revenue"
      )
        setUsers((u) => Math.min(1000, u + 10));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        fontFamily: "Inter, ui-sans-serif, system-ui",
      }}
      // ref={containerRef}
    >
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <DarkVeilLocal
          hueShift={237}
          noiseIntensity={0}
          scanlineIntensity={0.15}
          speed={0.8}
          warpAmount={0.02}
        />
      </div>

      <div
        ref={containerRef}
        style={{
          // height: "100vh",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
          // background: "linear-gradient(180deg,#071133,#021024)",
          color: "#eef2ff",
          position: "relative",
          zIndex: 10,
        }}
      >
        {SLIDES.map((s, idx) => (
          <section
            key={s.id}
            ref={(el) => (sectionsRef.current[idx] = el)}
            data-idx={idx}
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 12px",
              scrollSnapAlign: "start",
              boxSizing: "border-box",
            }}
            className="-mt-14"
          >
            <div
              style={{
                maxWidth: 1200,
                width: "100%",
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 1024 ? "1fr" : "1fr 520px",
                gap: window.innerWidth < 1024 ? 24 : 48,
                alignItems: "center",
              }}
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    fontSize: window.innerWidth < 768 ? 28 : 40,
                    fontWeight: 800,
                    lineHeight: 1.02,
                  }}
                >
                  {s.title}
                </motion.h2>

                {s.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 }}
                    style={{
                      marginTop: 12,
                      // color: "#cbd5e1",
                      fontSize: window.innerWidth < 768 ? 16 : 18,
                    }}
                  >
                    {s.subtitle}
                  </motion.p>
                )}

                {s.bullets && (
                  <ul
                    style={{
                      marginTop: 18,
                      // color: "#cbd5e1",
                      fontSize: window.innerWidth < 768 ? 16 : 18,
                    }}
                  >
                    {s.bullets.map((b, i) => (
                      <li key={i} style={{ marginBottom: 10 }}>
                        • {b}
                      </li>
                    ))}
                  </ul>
                )}

                {s.id === "features" && (
                  <div
                    style={
                      {
                        // marginTop: 22,
                        // width: "210%",
                        // minHeight: "60vh",
                        // overflow: "hidden"
                      }
                    }
                    className="lg:w-[195%]  w-full"
                  >
                    <ScrollStackLocal items={FEATURES} />
                  </div>
                )}

                {s.id === "pricing" && <div className="lg:w-[195%] w-full"><PricingPage /></div>}

                {s.id === "commercials" && (
                  <div
                    style={{
                      marginTop: 22,
                      display: "grid",
                      gridTemplateColumns:
                        window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)",
                      gap: 12,
                    }}
                  >
                    <SpotlightCard
                      className="custom-spotlight-card"
                      spotlightColor="rgba(0, 229, 255, 0.2)"
                    >
                      <div style={{ fontWeight: 800 }}>Foundation</div>
                      <div style={{ marginTop: 6 }}>
                        Flat monthly per company. Core modules & support.
                      </div>
                    </SpotlightCard>
                    <SpotlightCard
                      className="custom-spotlight-card"
                      spotlightColor="rgba(0, 229, 255, 0.2)"
                    >
                      <div style={{ fontWeight: 800 }}>Growth</div>
                      <div style={{ marginTop: 6 }}>
                        Tiered pricing, priority onboarding, integrations.
                      </div>
                    </SpotlightCard>
                    <SpotlightCard
                      className="custom-spotlight-card"
                      spotlightColor="rgba(0, 229, 255, 0.2)"
                    >
                      <div style={{ fontWeight: 800 }}>Enterprise</div>
                      <div style={{ marginTop: 6 }}>
                        Dedicated instances and custom SLAs.
                      </div>
                    </SpotlightCard>
                  </div>
                )}

                {s.id === "pilot" && (
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 mt-9">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-transparent ">
                      Join Early Access
                    </span>
                  </button>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{ width: window.innerWidth < 1024 ? "100%" : 560 }}
                  >
                    <div style={{ borderRadius: 12 }}>
                      <div
                        style={{
                          padding: 5,
                          textAlign: "center",
                          color: "#cbd5e1",
                          minHeight: window.innerWidth < 768 ? 200 : 140,
                        }}
                      >
                        {s.video ? (
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ maxWidth: "100%", borderRadius: 12 }}
                          >
                            <source src={s.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={s.img}
                            alt={s.placeholder}
                            style={{
                              maxWidth: "100%",
                              borderRadius: 12,
                              width: "200%",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Right-side dot nav */}
      <div
        style={{
          position: "fixed",
          right: window.innerWidth < 768 ? 12 : 28,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SLIDES.map((sl, i) => (
            <button
              key={sl.id}
              onClick={() => scrollTo(i)}
              style={{
                width: active === i ? (window.innerWidth < 768 ? 48 : 72) : 12,
                height: 12,
                borderRadius: active === i ? 999 : 6,
                background: active === i ? "#DE2624" : "gray",
                transition: "all 240ms ease",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Go to ${sl.title}`}
            />
          ))}
        </div>
      </div>

      {/* style */}
      <style jsx>{`
        .scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #de2624 transparent;
        }

        .scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar::-webkit-scrollbar-thumb {
          background-color: #7c3aed;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
