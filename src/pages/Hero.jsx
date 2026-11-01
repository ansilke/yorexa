
import React, { useEffect, useState } from "react";

import { ShapePhysics } from "../components/shape-physics";

import Header from "./Header";
import Services from "./Services";
import Why from "./Why";
import Team from "./Team";
import Work from "./Work";
import Ribbon from "./Ribbon";
import Footer from "./Footer";

function Hero() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToWorks = (event) => {
    event.preventDefault();

    const worksSection = document.getElementById("works");

    if (worksSection) {
      worksSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Individual letter hover animation
  const renderHeading = (text) => {
    return text.split("").map((letter, index) => (
      <span
        key={index}
        className="
          pointer-events-auto
          inline-block
          cursor-pointer
          transition-transform
          duration-300
          ease-out
          hover:-translate-y-2
        "
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));
  };

  return (
    <>
      {/* HERO SECTION */}
      <main
        id="home"
        className="
          relative h-screen min-h-screen
          w-full overflow-hidden
          bg-white text-[#111111]
        "
      >
        {/* BACKGROUND SHAPES */}
        <div className="absolute inset-0 z-0">
          <ShapePhysics
            height="100svh"
            count={isMobile ? 35 : 45}
            size={isMobile ? 30 : 48}
            gravity={1600}
            interactive={true}
          />
        </div>

        {/* HEADER */}
        <Header />

        {/* HERO CONTENT */}
        <section
          className="
            pointer-events-none
            absolute left-1/2 top-[37%]
            z-10 w-[90%] max-w-[1000px]
            -translate-x-1/2 -translate-y-1/2
            text-center
          "
        >
          <p
            className="
              mb-5 text-[10px]
              font-semibold uppercase
              tracking-[0.25em]
              text-black/50 sm:text-xs
            "
          >
            CREATIVE DIGITAL AGENCY
          </p>

          {/* HEADING */}
          <h1
            className="
              pointer-events-auto
              text-[clamp(52px,10vw,120px)]
              font-semibold leading-[0.95]
              tracking-[-0.07em]
            "
          >
            {renderHeading("Your Complete")}
            <br />
            {renderHeading("Digital Partner")}
          </h1>

          <p
            className="
              mx-auto mt-6 max-w-[550px]
              text-sm leading-relaxed
              text-black/55 sm:text-base
            "
          >
            We create meaningful digital experiences
            through web development, creative design
            and digital marketing.
          </p>

          <a
            href="#works"
            onClick={scrollToWorks}
            className="
              pointer-events-auto
              mt-8 inline-flex
              items-center gap-3
              rounded-full bg-black
              px-6 py-3
              text-xs font-semibold text-white
              transition-all duration-300
              hover:bg-gray-700
            "
          >
            Explore Our Work
            <span>↗</span>
          </a>
        </section>
      </main>

      {/* RIBBON */}
      <Ribbon />

      {/* ABOUT = SERVICES */}
      <section
        id="about"
        className="relative w-full scroll-mt-0"
      >
        <Services />
      </section>

      {/* WHY */}
      <Why />

      {/* OUR TEAM */}
      <section
        id="team"
        className="relative w-full scroll-mt-0"
      >
        <Team />
      </section>

      {/* WORK + FOOTER */}
      <div className="relative">
        <section className="relative z-20">
          <Work />
        </section>

        {/* FOOTER */}
        <div
          id="contact"
          className="
            sticky bottom-0 z-0
            scroll-mt-0
          "
        >
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Hero;
