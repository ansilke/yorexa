
import React from "react";

function Ribbon() {
  const text = "YOREXA.IN — CREATIVE DIGITAL AGENCY";

  const Item = () => (
    <div className="flex shrink-0 items-center gap-7 px-5">
      <span className="whitespace-nowrap text-[25px] font-black uppercase leading-none tracking-[-0.04em] text-white md:text-[34px]">
        {text}
      </span>

      <img
        src="https://res.cloudinary.com/daadrhhk9/image/upload/v1792917311/Group_23_sbfwfp.png"
        alt="Yorexa logo"
        className="h-7 w-7 shrink-0 object-contain md:h-9 md:w-9"
      />
    </div>
  );

  return (
    <div className="relative flex h-9 w-full items-center overflow-hidden bg-black md:h-12">
      <div className="flex w-max animate-ribbon">
        <div className="flex shrink-0 items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <Item key={`first-${i}`} />
          ))}
        </div>

        <div className="flex shrink-0 items-center" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <Item key={`second-${i}`} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ribbon-infinite {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-ribbon {
          animation: ribbon-infinite 35s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-ribbon {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Ribbon;
