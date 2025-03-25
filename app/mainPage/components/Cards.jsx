import React, { useEffect, useState } from "react";

const Cards = ({
  heading,
  para,
  isActive,
  isReversed,
  setActiveStep,
  id,
  Imag,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      setProgress(100); // Start animation when active
    } else {
      setProgress(0); // Reset instantly when inactive
    }
  }, [isActive]);

  return (
    <div className="p-6">
      <div
        onClick={() => setActiveStep(id)}
        className={`md:w-[400px] w-[90%] bg-[#171717]/80 flex flex-col gap-1 items-center justify-center text-white p-4 px-6 rounded-xl h-full relative overflow-hidden`}
      >
        {/* Background progress animation */}
        <div
          className={`absolute top-0  ${
            isReversed ? "right-0" : "left-0"
          } bg-[#1645ff]/80 transition-all duration-1000`}
          style={{
            width: `${progress}%`,
            height: "100%",
            transition: isActive ? "width 4s linear" : "none", // Animate only when active
          }}
        ></div>

        <div className="relative z-10 flex gap-2 items-center">
          <div className="text-[14px] font-semibold underline">{heading}</div>
        </div>
        <div className="relative text-[#f3f3f3]  text-center z-10 text-xs">
          {para}
        </div>
      </div>
    </div>
  );
};

export default Cards;
