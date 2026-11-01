
import React, { useEffect, useRef, useState } from "react";
import { ShapePhysics } from "../components/shape-physics";
import Ribbon from "./Ribbon";

function Contact() {
  const sectionRef = useRef(null);
  const messageRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [physicsReset, setPhysicsReset] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let revealTimer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          revealTimer = setTimeout(() => {
            setIsVisible(true);
          }, 1000);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearTimeout(revealTimer);
    };
  }, []);

  // Focus handling
  const handleFocus = (name) => {
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto expand message
    if (name === "message") {
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const mailSubject = encodeURIComponent(formData.subject);

    const mailBody = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

Message:
${formData.message}`
    );

    window.location.href =
      `mailto:your-email@example.com?subject=${mailSubject}&body=${mailBody}`;
  };

  const fields = [
    {
      name: "email",
      placeholder: "email",
      color: "#FF1725",
      type: "email",
    },
    {
      name: "subject",
      placeholder: "subject",
      color: "#FF2996",
      type: "text",
    },
    {
      name: "message",
      placeholder: "message",
      color: "#9650FF",
      type: "textarea",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate box-border flex min-h-screen min-h-[650px] w-full flex-col overflow-x-hidden bg-white px-[3.2%] pt-[clamp(28px,6vh,65px)] pb-0 font-[inherit] text-black"
    >
      {/* FULL CONTACT PHYSICS BACKGROUND */}
      <div className="pointer-events-auto absolute inset-0 z-0 overflow-hidden">
        <ShapePhysics
          key={physicsReset}
          height="100%"
          className="h-full w-full"
          count={6}
          size={38}
          gravity={1600}
          spawnRate={30}
          interactive={true}
          background="#ffffff"
        />
      </div>

      {/* REFRESH BUTTON */}
      <button
        type="button"
        onClick={() => setPhysicsReset((prev) => prev + 1)}
        aria-label="Reset shapes"
        title="Reset shapes"
        className="absolute right-[3.2%] top-20 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition-all duration-300 hover:rotate-[-45deg] hover:bg-black hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 7v5h-5" />
          <path d="M4 17v-5h5" />
          <path d="M5.64 9A8 8 0 0 1 19 7l1 5" />
          <path d="M4 12l1 5a8 8 0 0 0 13.36-2" />
        </svg>
      </button>

      <style>{`
        @keyframes placeholderRise {
          0% {
            transform: translateY(115%);
            opacity: 0;
          }

          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes subtitleReveal {
          0% {
            transform: translateY(18px);
            opacity: 0;
          }

          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .contact-placeholder {
          opacity: 0;
          transform: translateY(115%);
          font-family: inherit;

          transition:
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.45s ease;
        }

        .contact-field.reveal:not(.is-touched) .contact-placeholder {
          animation: placeholderRise 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .contact-subtitle {
          opacity: 0;
          font-family: inherit;
        }

        .contact-subtitle.reveal {
          animation: subtitleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .contact-field {
          isolation: isolate;
        }

        /* Underline stays on the actual bottom border */
        .contact-field::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #111;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 5;
          pointer-events: none;
        }

        .contact-field:focus-within::after {
          transform: scaleX(1);
        }

        /* Placeholder moves upward smoothly */
        .contact-field:focus-within .contact-placeholder,
        .contact-field.has-value .contact-placeholder {
          opacity: 0;
          transform: translateY(-115%);
          animation: none;
        }

        /* Placeholder returns when empty and blurred */
        .contact-field.is-touched:not(:focus-within):not(.has-value) .contact-placeholder {
          opacity: 1;
          transform: translateY(0);
          animation: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-field.reveal .contact-placeholder,
          .contact-subtitle.reveal {
            animation-duration: 0.01ms;
          }

          .contact-field::after,
          .contact-placeholder {
            transition-duration: 0.01ms;
          }
        }
      `}</style>

      {/* HEADING */}
      <p className="pointer-events-none mb-1 mt-8 z-10 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 sm:text-xs">
        Have a project in mind?
      </p>

      <h1 className="pointer-events-none relative z-10 mt-1 m-0 shrink-0 text-center font-extrabold tracking-tight text-zinc-950 text-4xl md:text-6xl lg:text-7xl">
        Let's Work Together
      </h1>

      {/* SUBTITLE */}
      <p className="pointer-events-none mx-auto mt-3 z-10 max-w-[580px] mb-7 text-center text-xs leading-6 text-[#555] sm:mt-4 sm:text-sm md:text-base md:leading-7">
        Have an idea or a project in mind? Let's connect and create something meaningful together.
      </p>

      {/* CONTACT FORM */}
      <form
        onSubmit={handleSubmit}
        className="pointer-events-none relative z-10 mt-[clamp(25px,4vh,5px)] flex min-h-0 w-full flex-1 flex-col"
      >
        {/* FIRST NAME & LAST NAME */}
        <div className="grid shrink-0 grid-cols-1 gap-[22px] md:grid-cols-2 md:gap-[clamp(40px,5.5vw,90px)]">

          {/* FIRST NAME */}
          <div
            className={`contact-field relative box-border h-[75px] w-full overflow-hidden border-b-2 border-[#737987] md:h-[clamp(68px,10vh,94px)] ${
              isVisible ? "reveal" : ""
            } ${touchedFields.firstName ? "is-touched" : ""} ${
              formData.firstName ? "has-value" : ""
            }`}
          >
            <span
              className="contact-placeholder pointer-events-none absolute bottom-0 left-0 z-[1] whitespace-nowrap font-[inherit] text-[clamp(32px,9vw,46px)] font-black leading-[1.15] tracking-[-1.5px] md:text-[clamp(27px,4.2vw,65px)] md:tracking-[-2px]"
              style={{
                color: "#00C76A",
                animationDelay: "0s",
              }}
            >
              first name
            </span>

            <input
              type="text"
              name="firstName"
              placeholder="first name"
              value={formData.firstName}
              onFocus={() => handleFocus("firstName")}
              onChange={handleChange}
              required
              className="pointer-events-auto absolute inset-0 z-[2] h-full w-full border-0 bg-transparent pt-3 font-[inherit] text-[clamp(32px,9vw,46px)] font-extrabold tracking-[-1.5px] text-[#111] outline-none placeholder:text-transparent md:text-[clamp(27px,4.2vw,65px)] md:tracking-[-2px]"
            />
          </div>

          {/* LAST NAME */}
          <div
            className={`contact-field relative box-border h-[75px] w-full overflow-hidden border-b-2 border-[#737987] md:h-[clamp(68px,10vh,94px)] ${
              isVisible ? "reveal" : ""
            } ${touchedFields.lastName ? "is-touched" : ""} ${
              formData.lastName ? "has-value" : ""
            }`}
          >
            <span
              className="contact-placeholder pointer-events-none absolute bottom-0 left-0 z-[1] whitespace-nowrap font-[inherit] text-[clamp(32px,9vw,46px)] font-black leading-[1.15] tracking-[-1.5px] md:text-[clamp(27px,4.2vw,65px)] md:tracking-[-2px]"
              style={{
                color: "#A16D3F",
                animationDelay: "0.15s",
              }}
            >
              last name
            </span>

            <input
              type="text"
              name="lastName"
              placeholder="last name"
              value={formData.lastName}
              onFocus={() => handleFocus("lastName")}
              onChange={handleChange}
              required
              className="pointer-events-auto absolute inset-0 z-[2] h-full w-full border-0 bg-transparent pt-3 font-[inherit] text-[clamp(32px,9vw,46px)] font-extrabold tracking-[-1.5px] text-[#111] outline-none placeholder:text-transparent md:text-[clamp(27px,4.2vw,65px)] md:tracking-[-2px]"
            />
          </div>
        </div>

        {/* EMAIL, SUBJECT & MESSAGE */}
        <div className="mt-[22px] flex flex-col gap-[22px] md:mt-[clamp(15px,2vh,22px)] md:gap-[clamp(13px,2.1vh,21px)]">
          {fields.map((field, index) => (
            <div
              key={field.name}
              className={`contact-field relative box-border w-full border-b-2 border-[#737987] ${
                field.type === "textarea"
                  ? "message-field min-h-[75px] overflow-visible md:min-h-[clamp(68px,10vh,94px)]"
                  : "h-[75px] overflow-hidden md:h-[clamp(68px,10vh,94px)]"
              } ${
                isVisible ? "reveal" : ""
              } ${
                touchedFields[field.name] ? "is-touched" : ""
              } ${
                formData[field.name] ? "has-value" : ""
              }`}
            >
              <span
                className="contact-placeholder pointer-events-none absolute bottom-0 left-0 z-[1] whitespace-nowrap font-[inherit] text-[clamp(32px,9vw,46px)] font-black leading-[1.15] tracking-[-1.5px] md:text-[clamp(27px,4.2vw,65px)] md:tracking-[-2px]"
                style={{
                  color: field.color,
                  animationDelay: `${0.3 + index * 0.15}s`,
                }}
              >
                {field.placeholder}
              </span>

              {field.type === "textarea" ? (
                <textarea
                  ref={messageRef}
                  name="message"
                  placeholder="message"
                  value={formData.message}
                  onFocus={() => handleFocus("message")}
                  onChange={handleChange}
                  required
                  rows="1"
                  className="pointer-events-auto relative z-[2] block min-h-[75px] w-full resize-none overflow-hidden border-0 bg-transparent px-0 pb-2 pt-3 font-[inherit] text-[clamp(32px,9vw,46px)] font-extrabold leading-[1.2] tracking-[-1.5px] text-[#111] outline-none placeholder:text-transparent md:min-h-[clamp(68px,10vh,94px)] md:text-[clamp(27px,4.2vw,65px)] md:tracking-[-2px]"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onFocus={() => handleFocus(field.name)}
                  onChange={handleChange}
                  required
                  className="pointer-events-auto absolute inset-0 z-[2] h-full w-full border-0 bg-transparent pt-3 font-[inherit] text-[clamp(32px,9vw,46px)] font-extrabold tracking-[-1.5px] text-[#111] outline-none placeholder:text-transparent md:text-[clamp(27px,4.2vw,65px)] md:tracking-[-2px]"
                />
              )}
            </div>
          ))}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-auto flex shrink-0 justify-end pt-1">
          <button
            type="submit"
            className="pointer-events-auto h-[55px] w-[180px] rounded-full border-0 bg-black font-[inherit] text-[18px] font-extrabold text-white transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#292929] md:h-[clamp(12px,5vh,52px)] md:w-[clamp(190px,10vw,315px)] md:text-[21px]"
          >
            submit
          </button>
        </div>
      </form>

      {/* BOTTOM RIBBON - OVER THE SHAPES */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full">
        <Ribbon />
      </div>

    </section>
  );
}

export default Contact;
