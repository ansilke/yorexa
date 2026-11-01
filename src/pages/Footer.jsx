
import React, { useEffect, useRef } from "react";
import { ShapePhysics } from "../components/shape-physics";

import {
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  const scrollAnimationRef = useRef(null);

  // LINEAR SMOOTH SCROLL
  const smoothScrollTo = (targetY) => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startY = window.scrollY;
    const distance = targetY - startY;

    if (Math.abs(distance) < 2) return;

    const duration = Math.min(
      1400,
      Math.max(700, Math.abs(distance) * 0.45)
    );

    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentPosition = startY + distance * progress;

      window.scrollTo({
        top: currentPosition,
        behavior: "instant",
      });

      if (progress < 1) {
        scrollAnimationRef.current =
          requestAnimationFrame(animate);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current =
      requestAnimationFrame(animate);
  };

  // CLEANUP
  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  // NAVIGATION
  const handleNavigation = (event, id) => {
    event.preventDefault();

    // CONTACT: GO TO FOOTER AFTER WORKS SECTION
    if (id === "contact") {
      const works = document.getElementById("works");

      if (works) {
        const worksBottom =
          works.getBoundingClientRect().bottom +
          window.scrollY;

        const maxScroll =
          document.documentElement.scrollHeight -
          window.innerHeight;

        smoothScrollTo(
          Math.min(worksBottom, maxScroll)
        );
      }

      return;
    }

    // OTHER SECTIONS: EXACT TOP
    const target = document.getElementById(id);

    if (!target) return;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY;

    smoothScrollTo(Math.max(0, targetPosition));
  };

  return (
    <footer
      id="contact"
      className="relative isolate w-full min-h-screen overflow-hidden bg-black text-white"
    >
      {/* FOOTER CONTENT */}
      <div className="pointer-events-none relative mx-auto w-full px-6 md:px-12 lg:px-16">

        {/* MAIN LOGO */}
        <div className="pointer-events-none relative z-30 pt-24 md:pt-32">
          <h1 className="select-none whitespace-nowrap text-center font-black text-[17vw] leading-[0.85] tracking-[-0.10em] md:text-[20vw]">
            {"YOREXA.IN".split("").map((letter, index) => {
              const colors = [
                "#FF8A00",
                "#FF3030",
                "#22C55E",
                "#3B82F6",
                "#A66A3F",
                "#FF3030",
                "#22C55E",
                "#3B82F6",
                "#FF8A00",
              ];

              return (
                <span
                  key={index}
                  className="
                    pointer-events-auto
                    inline-block
                    cursor-pointer
                    transition-all
                    duration-300
                    ease-out
                    hover:-translate-y-3
                    hover:!text-[var(--hover-color)]
                  "
                  style={{
                    "--hover-color": colors[index],
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </h1>
        </div>

        {/* FOOTER LINKS */}
        <div className="pointer-events-auto relative z-30 mt-20 grid grid-cols-2 gap-12 border-t border-white/20 py-12 md:grid-cols-4">

          {/* SITEMAP */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-widest text-white/40">
              Sitemap
            </p>

            <div className="flex flex-col items-start gap-3 text-sm">
              <a
                href="#home"
                onClick={(e) => handleNavigation(e, "home")}
                className="transition-colors duration-200 hover:text-[#F5C542]"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={(e) => handleNavigation(e, "about")}
                className="transition-colors duration-200 hover:text-[#F5C542]"
              >
                About
              </a>

              <a
                href="#team"
                onClick={(e) => handleNavigation(e, "team")}
                className="transition-colors duration-200 hover:text-[#F5C542]"
              >
                Our Team
              </a>

              <a
                href="#works"
                onClick={(e) => handleNavigation(e, "works")}
                className="transition-colors duration-200 hover:text-[#F5C542]"
              >
                Works
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavigation(e, "contact")}
                className="transition-colors duration-200 hover:text-[#F5C542]"
              >
                Contact
              </a>
            </div>
          </div>

          {/* SOCIALS */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-widest text-white/40">
              Socials
            </p>

            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/yorexa.in/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition-all duration-300 hover:-translate-y-1 hover:text-[#E879A8]"
              >
                <FaInstagram size={24} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-all duration-300 hover:-translate-y-1 hover:text-[#4DA3FF]"
              >
                <FaLinkedinIn size={24} />
              </a>

              <a
                href="https://wa.me/919526950251"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="transition-all duration-300 hover:-translate-y-1 hover:text-[#25D366]"
              >
                <FaWhatsapp size={25} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="transition-all duration-300 hover:-translate-y-1 hover:text-[#1877F2]"
              >
                <FaFacebookF size={23} />
              </a>
            </div>
          </div>

          {/* CONTACT DETAILS */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-widest text-white/40">
              Get in touch
            </p>

            <div className="flex flex-col items-start gap-3 text-sm">
              <a
                href="mailto:yorexa2026@gmail.com"
                className="transition-colors duration-200 hover:text-[#F5C542]"
              >
                yorexa2026@gmail.com
              </a>

              <a
                href="tel:+919526950251"
                className="transition-colors duration-200 hover:text-[#F5C542]"
              >
                +91 9526950251
              </a>
            </div>
          </div>

          {/* BACK TO TOP */}
          <div className="flex flex-col items-start md:items-end">
            <p className="mb-6 text-xs uppercase tracking-widest text-white/40">
              Back to
            </p>

            <button
              type="button"
              onClick={() =>
                handleNavigation(
                  { preventDefault: () => {} },
                  "home"
                )
              }
              className="cursor-pointer text-sm transition-colors duration-200 hover:text-[#F5C542]"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pointer-events-none relative z-10 flex flex-col justify-between gap-4 border-t border-white/20 py-6 text-xs text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} YOREXA.IN. All rights reserved.
          </p>

          <p>Designed & Developed with care.</p>
        </div>
      </div>

      {/* SHAPE PHYSICS */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <div className="pointer-events-auto absolute inset-0">

          {/* DESKTOP */}
          <div className="hidden h-full w-full md:block">
            <ShapePhysics
              height="100%"
              className="h-full w-full"
              count={5}
              size={78}
              gravity={1600}
              spawnRate={30}
              interactive={true}
              clickToAdd={false}
              background="transparent"
            />
          </div>

          {/* TABLET */}
          <div className="hidden h-full w-full sm:block md:hidden">
            <ShapePhysics
              height="100%"
              className="h-full w-full"
              count={3}
              size={48}
              gravity={1200}
              spawnRate={20}
              interactive={true}
              clickToAdd={false}
              background="transparent"
            />
          </div>

          {/* MOBILE */}
          <div className="h-full w-full sm:hidden">
            <ShapePhysics
              height="100%"
              className="h-full w-full"
              count={3}
              size={32}
              gravity={900}
              spawnRate={15}
              interactive={true}
              clickToAdd={false}
              background="transparent"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
