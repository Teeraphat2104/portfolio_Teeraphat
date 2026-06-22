import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import { Container } from "./Container";

const liveMetrics = [
  {
    label: "p99 dispatch",
    value: "15",
    unit: "ms",
    tone: "mint" as const,
    trend: "↓ from 42ms",
  },
  {
    label: "concurrent",
    value: "10k",
    unit: "+",
    tone: "blue" as const,
    trend: "peak this week",
  },
  {
    label: "tables shipped",
    value: "50",
    unit: "+",
    tone: "mint" as const,
    trend: "across 3 systems",
  },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setNow(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative pt-12 pb-20 md:pt-20 md:pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT: identity */}
          <div className="lg:col-span-7">
            {/* Status pill */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-rule rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-mint animate-[pulse-dot_2s_ease-in-out_infinite]" />
                  <span className="relative rounded-full h-2 w-2 bg-mint" />
                </span>
                <span className="text-xs font-medium text-ink tracking-wide mono uppercase">
                  Open to roles
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center text-xs text-muted mono">
                {now}
              </span>
            </div>

            {/* Headline */}
            <h1 className="display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold text-ink tracking-[-0.03em] text-balance leading-[1.05]">
              I build backends
              <br />
              that <span className="text-mint">don't fold</span>
              <br className="hidden sm:block" /> under load.
            </h1>

            <p className="mt-6 md:mt-8 text-base md:text-lg text-body max-w-xl leading-relaxed">
              Full-stack engineer in Bangkok. Real-time queues, dense academic
              platforms, and the interfaces that ride on top — designed from
              schema up.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/projects")}
                className="inline-flex h-12 items-center justify-center gap-2 px-6 bg-ink text-white text-sm font-medium rounded-full transition hover:bg-ink/90 active:scale-[0.98]"
              >
                View selected work
                <BiRightArrowAlt className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex h-12 items-center justify-center gap-2 px-6 bg-white border border-rule text-ink text-sm font-medium rounded-full transition hover:border-ink"
              >
                Get in touch
              </button>
              <a
                href="https://github.com/Teeraphat2104"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-5 py-2.5
                  rounded-full
                  bg-gradient-to-r from-gray-900 to-gray-700
                  text-white text-sm font-medium
                  shadow-lg shadow-gray-900/20
                  hover:shadow-xl hover:scale-105
                  hover:from-black hover:to-gray-800
                  transition-all duration-300
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.88 10.96.58.1.79-.25.79-.56 0-.28-.01-1.2-.02-2.18-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.27-5.23-5.68 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.79 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.6.24 2.78.12 3.07.74.81 1.18 1.85 1.18 3.11 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.03.78 2.08 0 1.5-.01 2.71-.01 3.08 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                View GitHub
              </a>
            </div>

            {/* Inline trust strip */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted mono">
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-mint" />
                schema → API → deploy
              </span>
              <span className="hidden sm:inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue" />
                measured at the wire
              </span>
              <span className="hidden md:inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-ink" />
                Bangkok / remote
              </span>
            </div>
          </div>

          {/* RIGHT: metric cards */}
          <div className="lg:col-span-5">
            <div className="relative bg-white border border-rule rounded-3xl p-5 md:p-6 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-mint-soft rounded-full blur-3xl opacity-70 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-soft rounded-full blur-3xl opacity-70 pointer-events-none" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-mint animate-[pulse-dot_2s_ease-in-out_infinite]" />
                      <span className="relative rounded-full h-2 w-2 bg-mint" />
                    </span>
                    <span className="text-[10px] font-semibold text-ink mono uppercase tracking-[0.15em]">
                      Production · live
                    </span>
                  </div>
                  <span className="text-[10px] text-muted mono hidden sm:inline tabular-nums">
                    {now}
                  </span>
                </div>

                {/* Metric stack */}
                <div className="space-y-3">
                  {liveMetrics.map((m) => {
                    const isMint = m.tone === "mint";
                    return (
                      <div
                        key={m.label}
                        className={`relative rounded-2xl p-4 md:p-5 border transition-colors ${
                          isMint
                            ? "bg-mint-soft/50 border-mint/20"
                            : "bg-blue-soft/50 border-blue/20"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <div
                            className={`text-[10px] font-semibold uppercase tracking-[0.15em] mono ${
                              isMint ? "text-mint-deep" : "text-blue-deep"
                            }`}
                          >
                            {m.label}
                          </div>
                          <div
                            className={`text-[10px] mono ${
                              isMint ? "text-mint-deep/60" : "text-blue-deep/60"
                            }`}
                          >
                            {m.trend}
                          </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span
                            className={`display text-4xl md:text-5xl font-semibold tabular-nums leading-none ${
                              isMint ? "text-mint-deep" : "text-blue-deep"
                            }`}
                          >
                            {m.value}
                          </span>
                          <span
                            className={`display text-xl md:text-2xl font-semibold ${
                              isMint ? "text-mint" : "text-blue"
                            }`}
                          >
                            {m.unit}
                          </span>
                        </div>

                        {/* Mini sparkline (CSS-drawn) */}
                        <svg
                          viewBox="0 0 100 20"
                          preserveAspectRatio="none"
                          className={`mt-3 w-full h-5 ${isMint ? "text-mint" : "text-blue"}`}
                        >
                          <path
                            d="M0,15 L10,12 L20,14 L30,9 L40,11 L50,7 L60,10 L70,5 L80,8 L90,4 L100,6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.7"
                          />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <a
            href="#selected-work"
            className="inline-flex flex-col items-center gap-2 text-muted hover:text-ink transition-colors group"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] mono">
              Scroll
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-y-0.5 transition-transform"
            >
              <path
                d="M3 6L8 11L13 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </Container>
    </div>
  );
};
