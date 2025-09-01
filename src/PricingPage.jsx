import React, { useState, useRef, useEffect } from "react";
import DarkVeilLocal from "./Components/DarkVeil/DarkVeil";

export default function PricingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const plans = [
    {
      name: "Monthly Plan",
      price: "$50",
      duration: "per member / month",
      features: ["Full Access", "24/7 Support", "Cancel Anytime"],
      popular: false,
    },
    {
      name: "Yearly Plan",
      price: "$500",
      duration: "per member / year",
      note: "Save 2 months",
      features: [
        "Full Access",
        "24/7 Support",
        "Priority Support",
        "2 Months Free",
      ],
      popular: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="pt-14 mt-5 flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ color: "#fff" }}
    >
      {/* Mouse light effect */}
      <div
        className="fixed pointer-events-none -z-5 rounded-full opacity-20 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: "400px",
          height: "400px",
          background:
            // "radial-gradient(circle, rgba(48, 207, 206, 0.3) 0%, rgba(48, 207, 206, 0.1) 30%, transparent 70%)",
            // red color bg i want to shor in rgb
            "radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0.1) 30%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Title */}
      {/* <div className="text-4xl md:text-5xl font-bold mb-4 !text-start pb-2 bg-gradient-to-r from-white via-red-300 to-white bg-clip-text text-transparent">
      Pricing Plans
      </div>
      <p className="text-lg text-gray-300 mb-12 !text-start max-w-2xl">
        GSBH members will enjoy exclusive pricing when the platform launches.
      </p> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`group relative rounded-3xl p-[1px] transition-all duration-500 hover:scale-105 ${
              plan.popular
                ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                : "bg-gradient-to-r from-gray-600 to-gray-400"
            }`}
            style={{
              animation: `fadeInUp 0.8s ease-out ${idx * 0.2}s both`,
            }}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-sm font-bold px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}

            {/* Card content */}
            <div className="relative h-full rounded-3xl bg-gray-900/90 backdrop-blur-sm p-8 flex flex-col">
              {/* Glow effect overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-[25rem] z-10">
                <div className=" relative text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{plan.duration}</p>
                  {plan.note && (
                    <div className="inline-flex items-center gap-1 mt-3 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {plan.note}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="flex-1 mb-8 relative">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIdx) => (
                      <li
                        key={featureIdx}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 bottom-0 absolute px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Choose {plan.name}
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional info */}
      <div className="mt-16 text-center text-gray-400 max-w-2xl">
        <p className="text-sm">
          All plans include full access to our platform. No hidden fees, no
          setup costs.
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            filter: brightness(1);
          }
          100% {
            filter: brightness(1.1);
          }
        }
      `}</style>
    </div>
  );
}
