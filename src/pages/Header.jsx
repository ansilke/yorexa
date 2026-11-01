
import React, { useEffect, useState, useRef } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

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

  // SCROLL DETECTION
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);

        const works = document.getElementById("works");
        const footer = document.getElementById("contact");

        if (!works || !footer) {
          setIsFooterVisible(false);
          ticking = false;
          return;
        }

        const worksRect = works.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();

        const workIsFinished = worksRect.bottom <= 1;

        const footerIsVisible =
          footerRect.top < window.innerHeight &&
          footerRect.bottom > 0;

        setIsFooterVisible(
          workIsFinished && footerIsVisible
        );

        ticking = false;
      });
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }

      handleScroll();
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  // NAVIGATION
  const scrollToSection = (event, id) => {
    event.preventDefault();
    setIsMenuOpen(false);

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

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Our Team", id: "team" },
    { label: "Works", id: "works" },
    { label: "Contact", id: "contact" },
  ];

  const navTextColor = isFooterVisible
    ? "text-white"
    : "text-[#333333]";

  const logoSrc = isFooterVisible
    ? "https://res.cloudinary.com/daadrhhk9/image/upload/v1793531673/Group_260_1_gvoqkb.png"
    : "https://res.cloudinary.com/daadrhhk9/image/upload/v1793376781/Group_260_bqkeao.png";

  return (
    <header
      className={`
        fixed left-0 top-0 z-50
        flex w-full items-center justify-between
        px-[4%] py-1.5
        transition-all duration-300
        md:px-[3%] md:py-2
        ${
          isFooterVisible
            ? "border-b border-white/10 bg-black/20 shadow-none backdrop-blur-lg"
            : isScrolled
            ? "border-b border-black/[0.06] bg-white/10 shadow-[0_3px_20px_rgba(0,0,0,0.05)] backdrop-blur-lg backdrop-saturate-150"
            : "border-b border-transparent bg-white/10 backdrop-blur-sm"
        }
      `}
    >
      {/* LOGO */}
      <a
        href="#home"
        onClick={(e) => scrollToSection(e, "home")}
        className="relative z-50 flex items-center"
      >
        <img
          src={logoSrc}
          alt="Yorexa Logo"
          className="
            h-[13px] w-auto max-w-[90px]
            object-contain
            transition-all duration-300
            sm:h-[15px]
            md:h-6 md:max-w-[115px]
          "
        />
      </a>

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => scrollToSection(e, item.id)}
            className={`
              text-sm font-semibold
              transition-colors duration-300
              hover:opacity-60
              ${navTextColor}
            `}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* LET'S TALK */}
      <a
        href="#contact"
        onClick={(e) => scrollToSection(e, "contact")}
        className={`
          hidden rounded-full
          px-5 py-2.5
          text-xs font-semibold
          transition-all duration-300
          md:inline-flex
          ${
            isFooterVisible
              ? "bg-white text-black hover:bg-white/80"
              : "bg-[#111111] text-white hover:bg-[#444444]"
          }
        `}
      >
        Let's Talk ↗
      </a>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        className={`
          relative z-50
          flex h-9 w-9
          items-center justify-center
          rounded-full border
          transition-all duration-300
          md:hidden
          ${
            isFooterVisible
              ? "border-white/40 text-white"
              : "border-black/20 text-black"
          }
        `}
      >
        <div className="flex w-4 flex-col gap-[5px]">
          <span
            className={`
              h-[1.5px] w-full
              transition-all duration-300
              ${isFooterVisible ? "bg-white" : "bg-black"}
              ${isMenuOpen ? "translate-y-[3.25px] rotate-45" : ""}
            `}
          />

          <span
            className={`
              h-[1.5px] w-full
              transition-all duration-300
              ${isFooterVisible ? "bg-white" : "bg-black"}
              ${isMenuOpen ? "-translate-y-[3.25px] -rotate-45" : ""}
            `}
          />
        </div>
      </button>

      {/* MOBILE DROPDOWN */}
      <div
        className={`
          absolute left-0 top-full z-40
          w-full overflow-hidden
          border-b border-black/5
          bg-white/90 shadow-lg
          backdrop-blur-xl
          transition-all duration-300
          md:hidden
          ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0"
          }
        `}
      >
        <nav className="flex flex-col px-[6%] py-5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="
                border-b border-black/[0.06]
                py-3.5 text-sm font-semibold
                text-[#333333]
                transition-colors
                hover:text-gray-500
              "
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="
              mt-5 flex w-full
              items-center justify-center
              rounded-full bg-black
              px-5 py-3
              text-sm font-semibold text-white
              transition hover:bg-gray-800
            "
          >
            Let's Talk ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
