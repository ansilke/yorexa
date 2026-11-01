
import React, { useEffect, useState } from "react";
import { FanGallery } from "../components/fan-gallery/fan-gallery";

const teamMembers = [
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793396418/Screenshot_2026-10-31_at_3.09.40_AM_iaw1gz.png",
    alt: "Ubaise K",
    name: "Ubaise K",
    role: "Web Developer",
    borderColor: "#08C779",
  },
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793396585/Screenshot_2026-10-31_at_3.11.44_AM_mathr6.png",
    alt: "Navaneeth K K",
    name: "Navaneeth K K",
    role: "Web Developer",
    borderColor: "#FF263D",
  },
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793278500/Group_258_fl1vfm.png",
    alt: "Muhammed Ansil",
    name: "Muhammed Ansil",
    role: "Web Developer",
    borderColor: "#986B43",
  },
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793396629/Screenshot_2026-10-31_at_3.13.21_AM_t3nhqc.png",
    alt: "Jomon J M",
    name: "Jomon J M",
    role: "Digital Marketing & Graphics",
    borderColor: "#1685F8",
  },
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793433113/924CED37-2BD3-4BAB-B2C2-AB522C1F70B2_1_201_a_dnjeyh.jpg",
    alt: "Yaseen",
    name: "Yaseen",
    role: "Digital Marketing & Graphics",
    borderColor: "#FF9500",
  },
];

/* MOBILE ANIMATION STYLES */
const TeamAnimationStyles = () => (
  <style>{`
    .team-card-reveal {
      opacity: 0;
      transform: translateY(45px) scale(0.94);
    }

    .team-section-visible .team-card-reveal {
      animation: teamCardEntrance 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
      animation-delay: calc(var(--card-index) * 480ms);
    }

    @keyframes teamCardEntrance {
      0% {
        opacity: 0;
        transform: translateY(45px) scale(0.94);
      }

      70% {
        opacity: 1;
      }

      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .team-card-reveal,
      .team-section-visible .team-card-reveal {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }
  `}</style>
);

export default function Team() {
  const [isMobile, setIsMobile] = useState(false);

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

  // MOBILE SECTION ENTRANCE OBSERVER
  useEffect(() => {
    if (!isMobile) return;

    const section = document.getElementById("team");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("team-section-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <>
      <TeamAnimationStyles />

      <section
        id="team"
        className={`
          relative isolate box-border w-full
          border-0 outline-none ring-0 shadow-none
          bg-white font-[inherit] px-4
          ${
            isMobile
              ? "min-h-screen overflow-visible py-20"
              : "h-screen overflow-hidden px-4 pb-6 pt-32 md:px-8 md:pt-26 lg:px-14"
          }
        `}
      >
        <div
          className={`
            mx-auto flex w-full max-w-9xl flex-col justify-center
            ${isMobile ? "min-h-full" : "h-full"}
          `}
        >
          {/* HEADING */}
          <div
            className={`
              shrink-0 text-center
              ${isMobile ? "mb-9 px-1" : "mb-9"}
            `}
          >
            <p
              className={`
                font-medium uppercase tracking-[0.28em] text-zinc-500
                ${isMobile ? "mb-2 text-[10px]" : "mb-3 text-xs md:text-sm"}
              `}
            >
              Meet Our Team
            </p>

            <h2
              className={`
                font-extrabold tracking-tight text-zinc-950
                ${
                  isMobile
                    ? "text-[36px] leading-[1.12]"
                    : "text-4xl md:text-6xl lg:text-7xl"
                }
              `}
            >
              The Minds Behind Yorexa
            </h2>

            <p
              className={`
                mx-auto text-zinc-500
                ${
                  isMobile
                    ? "mt-3 max-w-[310px] text-[12px] leading-[1.7]"
                    : "mt-4 max-w-xl text-sm leading-7 md:text-base"
                }
              `}
            >
              A passionate team of creative minds, developers and digital
              specialists working together to bring ideas to life.
            </p>
          </div>

          {/* MOBILE TEAM GRID */}
          {isMobile ? (
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-7">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`
                    team-card-reveal
                    flex min-w-0 flex-col items-center text-center
                    ${index === 4 ? "col-span-2 mx-auto w-[48%]" : ""}
                  `}
                  style={{
                    "--card-index": index,
                  }}
                >
                  {/* IMAGE WITH INDIVIDUAL COLOUR BORDER */}
                  <div
                    className="aspect-[0.78] w-full overflow-hidden rounded-[16px] border-[6px] bg-zinc-100"
                    style={{
                      borderColor: member.borderColor,
                    }}
                  >
                    <img
                      src={member.src}
                      alt={member.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="mt-3 text-sm font-bold text-zinc-950">
                    {member.name}
                  </h3>

                  {/* ROLE */}
                  <p className="mt-1 text-[10px] leading-relaxed text-zinc-500">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* DESKTOP FAN GALLERY — ORIGINAL DESIGN */
            <div className="relative flex w-full min-h-0 flex-1 items-center justify-center">
              <div className="w-full min-w-0">
                <FanGallery
                  items={teamMembers}
                  cardWidth={220}
                  aspectRatio={0.70}
                  spacing={0.90}
                  curve={0.3}
                  lift={38}
                  tilt={26}
                  spread={0.12}
                  stackFrom="left"
                  speed={0.7}
                  stagger={0.09}
                  bounce={0.35}
                  hoverSpeed={0.28}
                  radius={18}
                  entrance="stack"
                  trigger="scroll"
                  viewportStart={75}
                  once={true}
                  showTitle={false}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
