
import React, { useEffect, useRef, useState } from 'react'

const steps = [
  {
    number: '01',
    color: '#9052F7',
    title: 'Creative thinking. Meaningful results.',
    description:
      'Yorexa.in is a creative digital team focused on building effective websites, creating distinctive visual identities and helping businesses connect with the right audience. We believe good digital work should look great, work smoothly and support real business goals.',
    label: 'CREATIVE THINKING',
  },
  {
    number: '02',
    color: '#FF6500',
    title: 'Everything starts with an idea.',
    description:
      'We take time to understand your vision, your audience and your goals. Every great project begins with a clear plan and a creative direction that makes your brand stand out.',
    label: 'OUR APPROACH',
  },
  {
    number: '03',
    color: '#986B43',
    title: 'Built with purpose and precision.',
    description:
      'From clean development to thoughtful design, we focus on every detail. Our goal is to create digital experiences that are reliable, meaningful and made to last.',
    label: 'OUR QUALITY',
  },
  {
    number: '04',
    color: '#1685F8',
    title: 'A team that works together.',
    description:
      'Developers, designers and creative thinkers work together as one team. We combine our skills to turn your ideas into a consistent and powerful digital experience.',
    label: 'OUR TEAM',
  },
  {
    number: '05',
    color: '#FF9500',
    title: 'Your growth is our success.',
    description:
      'We do not just finish projects and walk away. We want to build long-term relationships and help your business grow with the right digital solutions.',
    label: 'YOUR SUCCESS',
  },
]

const desktopPath =
  'M 0 330 C 75 370, 120 390, 160 430 C 230 500, 220 650, 350 690 C 470 730, 590 730, 650 610 C 710 490, 600 400, 500 440 C 390 480, 400 600, 430 700 C 465 810, 570 850, 700 850 C 835 850, 855 790, 970 820 C 1080 850, 1100 900, 1200 870 C 1300 840, 1320 850, 1440 850'

const DOT_THRESHOLDS = [
  1 / 6,
  2 / 6,
  3 / 6,
  4 / 6,
  5 / 6,
]

const POPUP_LEAD = 0.045

// MOBILE CARD ANIMATION STYLES
const WhyAnimationStyles = () => (
  <style>{`
    .why-mobile-card {
      opacity: 0;
      transform: translateY(45px) scale(0.96);
    }

    .why-mobile-card.why-card-visible {
      animation: whyCardEntrance 1200ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes whyCardEntrance {
      0% {
        opacity: 0;
        transform: translateY(45px) scale(0.96);
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
      .why-mobile-card {
        animation: none !important;
        opacity: 1;
        transform: none;
      }
    }
  `}</style>
)

function Why() {
  const sectionRef = useRef(null)
  const measurePathRef = useRef(null)
  const redPathRef = useRef(null)
  const frameRef = useRef(null)
  const activeIndexRef = useRef(-1)

  const [isMobile, setIsMobile] = useState(false)
  const [dots, setDots] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)

  // SCREEN SIZE
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)

    return () => {
      window.removeEventListener('resize', checkScreen)
    }
  }, [])

  // MOBILE: REVEAL EACH CARD ON SCROLL
  useEffect(() => {
    if (!isMobile) return

    const cards = document.querySelectorAll('.why-mobile-card')

    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target
            const index = Number(card.dataset.index)

            card.style.animationDelay = `${index * 380}ms`
            card.classList.add('why-card-visible')

            observer.unobserve(card)
          }
        })
      },
      {
        threshold: 0.15,
      }
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [isMobile])

  // DESKTOP ONLY PATH
  const currentPath = desktopPath
  const viewBoxWidth = 1440

  // CALCULATE DOT POSITIONS
  useEffect(() => {
    if (isMobile) return

    const path = measurePathRef.current
    if (!path) return

    const totalLength = path.getTotalLength()

    const positions = DOT_THRESHOLDS.map((threshold) => {
      const point = path.getPointAtLength(
        totalLength * threshold
      )

      return {
        x: point.x,
        y: point.y,
        threshold,
      }
    })

    setDots(positions)

    activeIndexRef.current = -1
    setActiveIndex(-1)

    if (redPathRef.current) {
      redPathRef.current.style.strokeDashoffset = '1'
    }
  }, [isMobile, currentPath])

  // DESKTOP SCROLL ANIMATION
  useEffect(() => {
    if (isMobile) return

    let ticking = false

    const updateProgress = () => {
      if (ticking) return

      ticking = true

      frameRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current

        if (!section) {
          ticking = false
          return
        }

        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY

        const scrollDistance =
          section.offsetHeight - window.innerHeight

        if (scrollDistance <= 0) {
          ticking = false
          return
        }

        const currentScroll =
          window.scrollY - sectionTop

        const progress = Math.max(
          0,
          Math.min(1, currentScroll / scrollDistance)
        )

        // RED LINE PROGRESS
        if (redPathRef.current) {
          redPathRef.current.style.strokeDashoffset =
            String(1 - progress)
        }

        // POPUP ACTIVATES BEFORE THE DOT
        const nextIndex = DOT_THRESHOLDS.reduce(
          (index, threshold, i) =>
            progress >= threshold - POPUP_LEAD ? i : index,
          -1
        )

        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex
          setActiveIndex(nextIndex)
        }

        ticking = false
      })
    }

    updateProgress()

    window.addEventListener('scroll', updateProgress, {
      passive: true,
    })

    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isMobile])

  const activeStep =
    activeIndex >= 0 ? steps[activeIndex] : null

  const activeDot =
    activeIndex >= 0 ? dots[activeIndex] : null

  // DESKTOP POPUP POSITION
  const getCardPosition = () => {
    if (!activeDot) return {}

    return {
      left: `${(activeDot.x / viewBoxWidth) * 100}%`,
      top: `${(activeDot.y / 1000) * 100}%`,
      transform: 'translate(-50%, calc(-100% - 15px))',
    }
  }

  const cardPosition = getCardPosition()

  return (
    <>
      <WhyAnimationStyles />

      <section
        ref={sectionRef}
        id="why-us"
        className="relative w-full bg-white"
        style={{
          height: isMobile ? 'auto' : '500svh',
        }}
      >
        {/* MOBILE DESIGN */}
        {isMobile ? (
          <div className="w-full bg-white px-5 pb-16 pt-16">

            {/* HEADING */}
            <div className="mb-9 text-center">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
                GET TO KNOW US
              </p>

              <h2 className="text-[34px] font-extrabold leading-tight tracking-[-1.3px] text-black">
                Why Work With Us
              </h2>

              <p className="mx-auto mt-3 max-w-[320px] text-[12px] leading-[1.7] text-[#555]">
                We combine development, creative design and digital marketing
                to help brands build a strong and consistent online presence.
              </p>
            </div>

            {/* MOBILE CARDS */}
            <div className="flex flex-col gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  data-index={index}
                  className="why-mobile-card w-full rounded-[18px] px-5 py-5 text-white"
                  style={{
                    backgroundColor: step.color,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[9px] font-bold tracking-[0.16em] opacity-80">
                      {step.label}
                    </span>

                    <span className="text-[10px] font-bold tracking-widest opacity-80">
                      {step.number} / 05
                    </span>
                  </div>

                  <h3 className="mt-3 text-[17px] font-extrabold leading-[1.25] tracking-[-0.4px]">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-[11px] leading-[1.7] text-white/90">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (

          /* DESKTOP DESIGN — UNCHANGED */
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-white">

            {/* HEADING */}
            <div className="absolute left-0 top-[13%] z-20 w-full px-5 text-center">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400 sm:text-[10px] md:mb-3 md:text-xs">
                GET TO KNOW US
              </p>

              <h2 className="text-4xl font-extrabold leading-tight tracking-[-1.3px] text-black sm:text-6xl md:text-7xl">
                Why Work With Us
              </h2>

              <p className="mx-auto mt-2 max-w-[480px] text-[11px] leading-[1.6] text-[#555] sm:text-sm md:mt-3 md:text-base">
                We combine development, creative design and digital marketing
                to help brands build a strong and consistent online presence.
              </p>
            </div>

            {/* SVG WORKFLOW */}
            <div className="pointer-events-none absolute inset-0 z-10">
              <svg
                viewBox="0 0 1440 1000"
                preserveAspectRatio="none"
                className="h-full w-full overflow-visible"
              >
                {/* HIDDEN MEASUREMENT PATH */}
                <path
                  ref={measurePathRef}
                  d={currentPath}
                  fill="none"
                  stroke="none"
                />

                {/* GREEN BASE LINE */}
                <path
                  d={currentPath}
                  fill="none"
                  stroke="#08C779"
                  strokeWidth={17}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* RED PROGRESS LINE */}
                <path
                  ref={redPathRef}
                  d={currentPath}
                  fill="none"
                  stroke="#FF263D"
                  strokeWidth={17}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  vectorEffect="non-scaling-stroke"
                />

                {/* DOTS */}
                {dots.map((dot, index) => {
                  const reached = activeIndex >= index

                  return (
                    <g key={index}>
                      {reached && (
                        <circle
                          cx={dot.x}
                          cy={dot.y}
                          r={34}
                          fill={steps[index].color}
                          opacity="0.16"
                        />
                      )}

                      <circle
                        cx={dot.x}
                        cy={dot.y}
                        r={24}
                        fill={steps[index].color}
                      />
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* DESKTOP POPUP CARD */}
            {activeStep && activeDot && (
              <div
                key={activeStep.number}
                className="absolute z-30 w-[38%] max-w-[410px]"
                style={cardPosition}
              >
                <div
                  className="why-popup-enter rounded-[18px] px-5 py-5 text-white shadow-lg md:rounded-[20px] md:px-6 md:py-5"
                  style={{
                    backgroundColor: activeStep.color,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold tracking-[0.16em] opacity-75 md:text-[10px]">
                      {activeStep.label}
                    </span>

                    <span className="text-[10px] font-bold tracking-widest opacity-75">
                      {activeStep.number} / 05
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-extrabold leading-[1.2] tracking-[-0.4px] md:text-2xl">
                    {activeStep.title}
                  </h3>

                  <p className="mt-3 text-xs leading-[1.7] text-white/90 md:text-[13px]">
                    {activeStep.description}
                  </p>
                </div>
              </div>
            )}

            {/* SCROLL INDICATOR */}
            {activeIndex === -1 && (
              <div className="absolute bottom-[4%] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-black/50">
                <span className="whitespace-nowrap text-[8px] font-bold tracking-[0.22em] sm:text-[9px]">
                  SCROLL TO EXPLORE
                </span>

                <span className="animate-bounce text-lg">↓</span>
              </div>
            )}

            {/* STEP INDICATOR */}
            <div className="absolute bottom-[3%] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 sm:bottom-[4%]">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="h-[4px] rounded-full transition-all duration-300 sm:h-[5px]"
                  style={{
                    width: activeIndex === index ? '23px' : '6px',
                    backgroundColor:
                      activeIndex >= index ? step.color : '#D4D4D4',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Why
