
import React, { useEffect, useRef, useState } from "react";
import Ribbon from "./Ribbon";

const projects = [
  {
    number: "01",
    title: "arch.",
    category: "Architecture Website",
    description:
      "An architecture-focused website designed to showcase modern architectural spaces and creative projects. Featuring smooth scroll-based animations, immersive transitions and elegant visual storytelling to create an engaging browsing experience.",
    color: "#9259FF",
    textColor: "#FFFFFF",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1790491962/ChatGPT_Image_Sep_27_2026_12_21_16_PM_cven6v.png",
    url: "https://arch-delta-ten.vercel.app/",
    tags: ["React", "Tailwind CSS", "Scroll Animations"],
  },
  {
    number: "02",
    title: "yourspace",
    category: "Furniture Website",
    description:
      "A clean and minimal furniture website created to present modern furniture collections. Focused on elegant layouts, balanced spacing and a simple user experience that allows each product to stand out.",
    color: "#FF6701",
    textColor: "#171717",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791400031/Minimal_Workspace_with_Furniture_Website_x7u1ie.png",
    url: "https://yourrspace.netlify.app/",
    tags: ["React", "Tailwind CSS", "Minimal UI"],
  },
  {
    number: "03",
    title: "ke taste",
    category: "Food & Product Website",
    description:
      "A product-focused website for KE Taste, a pickle brand. Designed to showcase different pickle varieties with attractive product visuals, clear product presentation and a vibrant food-inspired experience.",
    color: "#F2382F",
    textColor: "#FFFFFF",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791401193/Late-Night_Pickle_Website_Workspace_qv6upl.png",
    url: "https://ke-taste.netlify.app/",
    tags: ["React", "Tailwind CSS", "Product Showcase"],
  },
  {
    number: "04",
    title: "starbucks",
    category: "Website Recreation",
    description:
      "A personal recreation of the Starbucks website, exploring its recognizable visual identity, product-focused sections and clean layout. Built as a frontend design practice project inspired by the original brand experience.",
    color: "#04C972",
    textColor: "#171717",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1790492343/ChatGPT_Image_Sep_27_2026_12_28_40_PM_tdfhus.png",
    url: "https://sstar-buckss.netlify.app/",
    tags: ["React", "Tailwind CSS", "Frontend Recreation"],
  },
];

const getTextStyles = (color) => {
  const dark = color === "#171717";

  return {
    primary: color,
    muted: dark
      ? "rgba(23, 23, 23, 0.70)"
      : "rgba(255, 255, 255, 0.70)",
    secondary: dark
      ? "rgba(23, 23, 23, 0.80)"
      : "rgba(255, 255, 255, 0.80)",
    border: dark
      ? "rgba(23, 23, 23, 0.30)"
      : "rgba(255, 255, 255, 0.30)",
  };
};

// MOBILE CARD ANIMATION — SAME AS SERVICES
const WorkAnimationStyles = () => (
  <style>{`
    .work-mobile-card {
      opacity: 0;
      transform: translate3d(0, 32px, 0) scale(0.985);
      will-change: transform, opacity;
    }

    .work-mobile-card.work-card-visible {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);

      transition:
        opacity 700ms ease-out,
        transform 850ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      .work-mobile-card,
      .work-mobile-card.work-card-visible {
        opacity: 1;
        transform: none;
        transition: none !important;
      }
    }
  `}</style>
);

function Work() {
  const cardsSectionRef = useRef(null);
  const mobileToggleRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // SCREEN SIZE
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  // MOBILE SEE MORE / SEE LESS HANDLER
  const handleMobileToggle = () => {
    if (showMore) {
      setShowMore(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mobileToggleRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      });
    } else {
      setShowMore(true);
    }
  };

  // MOBILE CARD REVEAL ON SCROLL
  useEffect(() => {
    if (!isMobile) return;

    const cards = document.querySelectorAll(".work-mobile-card");

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const index = Number(card.dataset.index);

            // SAME SOFT STAGGER AS SERVICES
            card.style.transitionDelay = `${index * 100}ms`;

            card.classList.add("work-card-visible");

            observer.unobserve(card);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [isMobile, showMore]);

  // DESKTOP SCROLL PROGRESS — ORIGINAL LOGIC
  useEffect(() => {
    if (isMobile) return;

    let ticking = false;

    const updateScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        if (cardsSectionRef.current) {
          const rect =
            cardsSectionRef.current.getBoundingClientRect();

          const scrolled = Math.max(0, -rect.top);
          const progress = scrolled / window.innerHeight;

          setScrollProgress(
            Math.max(0, Math.min(progress, projects.length - 1))
          );
        }

        ticking = false;
      });
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [isMobile]);

  const getCardStyle = (index) => {
    const isLastCard = index === projects.length - 1;

    const cardProgress = Math.max(
      0,
      Math.min(1, scrollProgress - index)
    );

    const stackOffset = index * 18;

    if (isLastCard) {
      return {
        transform: `translate3d(-50%, ${stackOffset}px, 0)`,
        zIndex: projects.length - index,
      };
    }

    const lift = cardProgress * 115;
    const tilt = cardProgress * 55;

    return {
      transform: `
        translate3d(-50%, calc(${stackOffset}px - ${lift}%), 0)
        rotateX(${tilt}deg)
      `,
      zIndex: projects.length - index,
    };
  };

  // MOBILE LAYOUT
  if (isMobile) {
    return (
      <>
        <WorkAnimationStyles />

        <section
          id="works"
          className="relative isolate block w-full mt-0 mb-0 border-0 outline-none ring-0 shadow-none bg-white"
        >
          {/* INTRO */}
          <div className="flex min-h-[1svh] w-full flex-col items-center justify-start px-5 pt-12 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              WHAT WE SHIP
            </p>

            <h2 className="text-4xl font-extrabold tracking-tight text-black">
              Our Selected Works
            </h2>

            <p className="mx-auto mt-3 max-w-[580px] text-xs leading-6 text-[#555]">
              A collection of ideas, creativity and digital
              experiences brought to life by our team.
            </p>
          </div>

          {/* MOBILE PROJECT CARDS */}
          <div className="flex w-full flex-col gap-5 px-3 pb-20 pt-9">
            {projects.map((project, index) => {
              if (index >= 2 && !showMore) return null;

              const textStyles = getTextStyles(
                project.textColor || "#FFFFFF"
              );

              return (
                <React.Fragment key={project.number}>
                  <article
                    data-index={index}
                    className="work-mobile-card relative flex min-h-[520px] w-full flex-col justify-between overflow-hidden rounded-[22px] px-5 py-6 shadow-xl"
                    style={{
                      backgroundColor: project.color,
                      color: textStyles.primary,
                    }}
                  >
                    {/* CARD HEADER */}
                    <div className="relative z-10 flex w-full items-center justify-between">
                      <span
                        className="text-[9px] font-bold tracking-[0.2em]"
                        style={{ color: textStyles.muted }}
                      >
                        YOREXA — SELECTED WORK
                      </span>

                      <span
                        className="text-[10px] font-bold tracking-widest"
                        style={{ color: textStyles.muted }}
                      >
                        {project.number} / 04
                      </span>
                    </div>

                    {/* PROJECT CONTENT */}
                    <div className="relative z-10 flex flex-1 flex-col justify-center gap-5 py-7">
                      {/* LEFT CONTENT */}
                      <div className="w-full text-left">
                        <p
                          className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: textStyles.muted }}
                        >
                          {project.category}
                        </p>

                        <h3 className="text-[clamp(27px,8vw,40px)] font-extrabold leading-[1.05] tracking-[-1.5px]">
                          {project.title}
                        </h3>

                        <p
                          className="mt-4 text-xs font-medium leading-relaxed"
                          style={{ color: textStyles.secondary }}
                        >
                          {project.description}
                        </p>

                        {/* TECHNOLOGY TAGS */}
                        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
                          {project.tags.map((tag, tagIndex) => (
                            <React.Fragment key={tag}>
                              <span className="text-[10px] font-semibold">
                                {tag}
                              </span>

                              {tagIndex !== project.tags.length - 1 && (
                                <span
                                  className="text-sm font-bold opacity-80"
                                  style={{ color: textStyles.primary }}
                                >
                                  ✦
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* PROJECT IMAGE */}
                      <div
                        className="relative mx-auto mt-2 aspect-square w-[65%] max-w-[230px] shrink-0 overflow-hidden rounded-xl border"
                        style={{
                          borderColor: textStyles.border,
                        }}
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} project preview`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* CARD FOOTER */}
                    <div
                      className="relative z-10 flex w-full items-center justify-between border-t pt-4"
                      style={{
                        borderColor: textStyles.border,
                      }}
                    >
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: textStyles.muted }}
                      >
                        Creative Digital Studio
                      </span>

                      {/* PROJECT WEBSITE LINK */}
                      <a
                        href={project.url || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title} website`}
                        aria-disabled={!project.url}
                        onClick={(event) => {
                          if (!project.url) {
                            event.preventDefault();
                          }
                        }}
                        className={`
                          flex h-9 w-9 items-center justify-center
                          rounded-full border text-lg
                          transition-all duration-300
                          ${
                            project.url
                              ? "cursor-pointer hover:scale-110 hover:bg-white/20"
                              : "cursor-default opacity-70"
                          }
                        `}
                        style={{
                          color: textStyles.primary,
                          borderColor: textStyles.border,
                        }}
                      >
                        ↗
                      </a>
                    </div>
                  </article>

                  {/* SEE MORE / SEE LESS BUTTON */}
                  {index === (showMore ? 3 : 1) && (
                    <div
                      ref={mobileToggleRef}
                      className="flex w-full justify-center py-3"
                    >
                      <button
                        type="button"
                        onClick={handleMobileToggle}
                        aria-expanded={showMore}
                        className="group flex items-center gap-3 rounded-full border border-black px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-black hover:text-white"
                      >
                        {showMore ? "See Less" : "See More"}

                        <span
                          className={`text-base transition-transform duration-300 ${
                            showMore
                              ? "rotate-180"
                              : "group-hover:translate-y-1"
                          }`}
                        >
                          ↓
                        </span>
                      </button>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* BOTTOM RIBBON */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full">
            <Ribbon />
          </div>
        </section>
      </>
    );
  }

  // DESKTOP LAYOUT — ORIGINAL DESIGN UNCHANGED
  return (
    <section
      id="works"
      className="relative isolate block w-full mt-0 mb-0 border-0 outline-none ring-0 shadow-none bg-white"
    >
      {/* INTRO */}
      <div className="flex min-h-[1svh] w-full flex-col items-center justify-start px-5 pt-12 text-center sm:pt-14 md:min-h-[5svh] md:pt-38">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 sm:text-xs">
          WHAT WE SHIP
        </p>

        <h2 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl md:text-6xl sm:text-[40px] lg:text-7xl">
          Our Selected Works
        </h2>

        <p className="mx-auto mt-3 max-w-[580px] text-xs leading-6 text-[#555] sm:mt-4 sm:text-sm md:text-base md:leading-7">
          A collection of ideas, creativity and digital
          experiences brought to life by our team.
        </p>
      </div>

      {/* PINNED PROJECT CARDS */}
      <div
        ref={cardsSectionRef}
        className="relative w-full"
        style={{
          height: `${projects.length * 100}svh`,
        }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <div
            className="absolute inset-0 mb-14"
            style={{
              perspective: "1400px",
              perspectiveOrigin: "50% 45%",
            }}
          >
            {projects.map((project, index) => {
              const textStyles = getTextStyles(
                project.textColor || "#FFFFFF"
              );

              return (
                <article
                  key={project.number}
                  className="
                    work-project-card
                    absolute
                    left-1/2
                    top-[25%]
                    flex
                    w-[98%]
                    max-w-[1450px]
                    flex-col
                    justify-between
                    overflow-hidden
                    rounded-[22px]
                    px-5
                    py-6
                    shadow-xl
                    sm:rounded-[28px]
                    sm:px-9
                    sm:py-9
                    md:top-[23%]
                    md:rounded-[32px]
                    md:px-14
                    md:py-10
                    lg:px-16
                  "
                  style={{
                    height: "68svh",
                    backgroundColor: project.color,
                    color: textStyles.primary,
                    transformOrigin: "50% 100%",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform",
                    ...getCardStyle(index),
                  }}
                >
                  {/* CARD HEADER */}
                  <div className="relative z-10 flex w-full items-center justify-between">
                    <span
                      className="text-[9px] font-bold tracking-[0.2em] sm:text-xs"
                      style={{ color: textStyles.muted }}
                    >
                      YOREXA — SELECTED WORK
                    </span>

                    <span
                      className="text-[10px] font-bold tracking-widest sm:text-xs"
                      style={{ color: textStyles.muted }}
                    >
                      {project.number} / 04
                    </span>
                  </div>

                  {/* PROJECT CONTENT */}
                  <div className="relative z-10 flex h-full flex-col justify-center gap-4 md:flex-row md:items-center md:justify-start md:gap-0">
                    {/* LEFT CONTENT */}
                    <div className="w-full text-left md:mr-auto md:w-[50%]">
                      <p
                        className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] sm:text-xs"
                        style={{ color: textStyles.muted }}
                      >
                        {project.category}
                      </p>

                      <h3 className="text-[clamp(27px,4.8vw,56px)] font-extrabold leading-[1.05] tracking-[-1.5px] sm:tracking-[-2px]">
                        {project.title}
                      </h3>

                      <p
                        className="mt-4 max-w-md text-xs font-medium leading-relaxed sm:text-sm md:mt-5 md:text-base md:leading-[1.5]"
                        style={{ color: textStyles.secondary }}
                      >
                        {project.description}
                      </p>

                      {/* TECHNOLOGY TAGS */}
                      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3 md:mt-6 md:gap-x-4">
                        {project.tags.map((tag, tagIndex) => (
                          <React.Fragment key={tag}>
                            <span className="text-[10px] font-semibold sm:text-xs md:text-sm">
                              {tag}
                            </span>

                            {tagIndex !== project.tags.length - 1 && (
                              <span
                                className="text-sm font-bold opacity-80 sm:text-base"
                                style={{ color: textStyles.primary }}
                              >
                                ✦
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT PROJECT IMAGE */}
                    <div
                      className="
                        relative
                        mx-auto
                        mt-2
                        aspect-square
                        w-[65%]
                        max-w-[210px]
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        border
                        sm:w-[55%]
                        sm:max-w-[230px]
                        md:absolute
                        md:right-0
                        md:top-1/2
                        md:mx-0
                        md:mt-0
                        md:w-[38%]
                        md:max-w-[370px]
                        md:-translate-y-1/2
                        md:rounded-2xl
                      "
                      style={{
                        borderColor: textStyles.border,
                      }}
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div
                    className="relative z-10 flex w-full items-center justify-between border-t pt-4"
                    style={{
                      borderColor: textStyles.border,
                    }}
                  >
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-xs"
                      style={{ color: textStyles.muted }}
                    >
                      Creative Digital Studio
                    </span>

                    {/* PROJECT WEBSITE LINK */}
                    <a
                      href={project.url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} website`}
                      aria-disabled={!project.url}
                      onClick={(event) => {
                        if (!project.url) {
                          event.preventDefault();
                        }
                      }}
                      className={`
                        flex h-9 w-9 items-center justify-center
                        rounded-full border
                        text-lg
                        transition-all duration-300
                        sm:h-10 sm:w-10
                        md:h-11 md:w-11 md:text-xl
                        ${
                          project.url
                            ? "cursor-pointer hover:scale-110 hover:bg-white/20"
                            : "cursor-default opacity-70"
                        }
                      `}
                      style={{
                        color: textStyles.primary,
                        borderColor: textStyles.border,
                      }}
                    >
                      ↗
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM RIBBON */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full">
        <Ribbon />
      </div>
    </section>
  );
}

export default Work;
