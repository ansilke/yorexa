
import React, { useEffect, useState } from "react";
import { FanGallery } from "../components/fan-gallery/fan-gallery";

const teamMembers = [
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793396418/Screenshot_2026-10-31_at_3.09.40_AM_iaw1gz.png",
    alt: "Ubaise K",
    name: "Ubaise K",
    role: "Web Developer",
  },
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793396585/Screenshot_2026-10-31_at_3.11.44_AM_mathr6.png",
    alt: "Navaneeth K K",
    name: "Navaneeth K K",
    role: "Web Developer",
  },
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793278500/Group_258_fl1vfm.png",
    alt: "Muhammed Ansil",
    name: "Muhammed Ansil",
    role: "Web Developer",
  },
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793396629/Screenshot_2026-10-31_at_3.13.21_AM_t3nhqc.png",
    alt: "Jomon J M",
    name: "Jomon J M",
    role: "Digital Marketing & Graphics",
  },
  {
    src: "https://res.cloudinary.com/daadrhhk9/image/upload/v1793433113/924CED37-2BD3-4BAB-B2C2-AB522C1F70B2_1_201_a_dnjeyh.jpg",
    alt: "Yaseen",
    name: "Yaseen",
    role: "Digital Marketing & Graphics",
  },
];

export default function Team() {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section
      id="team"
      className={`
        relative isolate block box-border w-full
        border-0 outline-none ring-0 shadow-none
        bg-white font-[inherit] px-4
        ${
          isMobile
            ? "h-[100svh] min-h-[100svh] overflow-hidden py-24"
            : "h-screen overflow-hidden px-4 pb-6 pt-32 md:px-8 md:pt-26 lg:px-14"
        }
      `}
    >
      <div
        className={`
          mx-auto flex w-full max-w-9xl flex-col justify-center
          ${isMobile ? "min-h-[calc(100svh-12rem)]" : "h-full"}
        `}
      >
        {/* HEADING */}
        <div
          className={`
            shrink-0 text-center
            ${isMobile ? "mb-5 px-1 translate-y-15" : "mb-9"}
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
                  ? "text-[40px] leading-[1.12]"
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

        {/* FAN GALLERY */}
        <div
          className={`
            relative flex w-full min-h-0 flex-1 items-center justify-center
            ${isMobile ? "min-h-[340px] pb-2 pt-10 translate-y-11" : ""}
          `}
        >
          <div className="w-full min-w-0">
            <FanGallery
              items={teamMembers}
              cardWidth={isMobile ? 138 : 220}
              aspectRatio={0.70}
              spacing={isMobile ? 0.84 : 0.90}
              curve={isMobile ? 0.20 : 0.3}
              lift={isMobile ? 16 : 38}
              tilt={isMobile ? 3 : 26}
              spread={isMobile ? 0.04 : 0.12}
              stackFrom="left"
              speed={0.7}
              stagger={0.09}
              bounce={0.35}
              hoverSpeed={0.28}
              radius={isMobile ? 14 : 18}
              entrance="stack"
              trigger="scroll"
              viewportStart={75}
              once={true}
              showTitle={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
