
import React, { useEffect, useRef, useState } from 'react'

const services = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Responsive websites, e-commerce stores and modern web applications built around your business goals.',
    tags: ['Websites', 'E-Commerce', 'Web Apps'],
    background: '#9259FF',
    textColor: '#FFFFFF',
  },
  {
    number: '02',
    title: 'Digital Marketing',
    description:
      'Reach the right audience and build your online presence through strategic digital marketing.',
    tags: ['SEO', 'Meta Ads', 'Google Ads'],
    background: '#FF6701',
    textColor: '#171717',
  },
  {
    number: '03',
    title: 'Graphic Design',
    description:
      'Creative visual identities and stunning designs that make your brand stand out from the crowd.',
    tags: ['Branding', 'Posters', 'Social Media'],
    background: '#FF253B',
    textColor: '#FFFFFF',
  },
  {
    number: '04',
    title: 'UI / UX Design',
    description:
      'Beautiful, intuitive and user-friendly digital experiences designed to connect with your audience.',
    tags: ['UI Design', 'UX Research', 'Prototyping'],
    background: '#04C972',
    textColor: '#171717',
  },
]

const SCROLL_STEP = 0.85

function Services() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [sectionStart, setSectionStart] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const updateMeasurements = () => {
      if (!sectionRef.current) return

      setSectionStart(
        sectionRef.current.getBoundingClientRect().top + window.scrollY
      )
      setViewportHeight(window.innerHeight)
      setScrollY(window.scrollY)
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    updateMeasurements()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateMeasurements)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateMeasurements)
    }
  }, [])

  const scrollProgress = Math.max(0, scrollY - sectionStart)
  const step = viewportHeight * SCROLL_STEP

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-white"
      style={{
        height: '355svh',
      }}
    >
      {/* PINNED VIEWPORT */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-white">

        {/* HEADING */}
        <div className="absolute left-0 top-[12svh] z-10 flex w-full flex-col items-center px-5 text-center sm:top-[13svh]">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 sm:text-xs">
            WHAT WE OFFER
          </p>

          <h2 className="text-5xl font-extrabold tracking-[-2px] text-black sm:text-5xl md:text-6xl lg:text-7xl">
            What We Do
          </h2>

          <p className="mx-auto mt-3 max-w-[580px] text-xs leading-6 text-[#555] sm:mt-4 sm:text-sm md:text-base md:leading-7">
            Everything your brand needs to build a stronger digital presence,
            from technology and creative design to marketing.
          </p>
        </div>

        {/* CARD STACK AREA */}
        <div className="absolute inset-x-0 top-[43svh] h-[58svh] px-4 sm:px-6 lg:px-[5%]">

          {services.map((service, index) => {
            let progress = 1

            if (index === 0) {
              progress = 1
            } else {
              const cardStart = (index - 1) * step

              progress =
                step > 0
                  ? Math.min(
                      1,
                      Math.max(0, (scrollProgress - cardStart) / step)
                    )
                  : 0
            }

            const translateY = (1 - progress) * 110

            return (
              <div
                key={service.number}
                className="absolute inset-x-0 top-0"
                style={{
                  zIndex: index + 1,
                  transform: `translateY(calc(${translateY}% + ${index * 13}px))`,
                  willChange: index === 0 || progress < 1
                    ? 'transform'
                    : 'auto',
                }}
              >
                <div
                  className="mx-auto flex h-[48svh] min-h-[300px] max-h-[520px] w-[97%] flex-col items-center justify-between overflow-hidden rounded-[22px] px-5 py-6 shadow-xl sm:rounded-[28px] sm:px-9 sm:py-9 md:rounded-[32px] md:px-14 md:py-10 lg:px-16"
                  style={{
                    backgroundColor: service.background,
                    color: service.textColor,
                  }}
                >
                  {/* CARD HEADER */}
                  <div className="w-full">
                    <div className="mb-6 flex items-center justify-between sm:mb-8">
                      <span className="text-[9px] font-bold tracking-[0.2em] opacity-70 sm:text-xs">
                        YOREXA — SERVICES
                      </span>

                      <span className="text-[10px] font-bold tracking-widest opacity-70 sm:text-xs">
                        {service.number} / 04
                      </span>
                    </div>

                    <h3 className="text-[clamp(27px,4.8vw,56px)] font-extrabold leading-[1.05] tracking-[-1.5px] sm:tracking-[-2px]">
                      {service.title}
                    </h3>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mx-auto w-full max-w-[850px] px-1 text-center">
                    <p className="text-sm font-medium leading-relaxed sm:text-lg md:text-[22px] md:leading-[1.4]">
                      {service.description}
                    </p>
                  </div>

                  {/* TAGS */}
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-4 md:gap-x-5">
                    {service.tags.map((tag, tagIndex) => (
                      <React.Fragment key={tag}>
                        <span className="text-xs font-semibold sm:text-base md:text-lg">
                          {tag}
                        </span>

                        {tagIndex !== service.tags.length - 1 && (
                          <span className="text-base font-bold opacity-80 sm:text-xl">
                            ✦
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
