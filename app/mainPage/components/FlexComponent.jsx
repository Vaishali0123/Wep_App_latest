import React from "react";

const FlexComponent = ({ image, heading, gridColReverse, para }) => {
  return (
    <div className={`grid sm:grid-cols-2 gap-5`}>
      <div
        className={`flex pn:max-sm:order-last ${
          gridColReverse ? "sm:order-last" : "sm:order-first"
        } justify-center items-center w-full`}
      >
        <div className="flex flex-col px-4 sm:w-[80%] gap-2 ">
          <div className="text-xl font-semibold">{heading}</div>
          <div className="text-[#A1A2A1] text-sm font-medium">{para}</div>
        </div>
      </div>

      <div
        className={`sm:h-[350px] pn:max-sm:order-first ${
          gridColReverse ? "sm:order-first" : "sm:order-last"
        } flex w-full`}
      >
        <div
          // data-aos="fade-left"
          className="w-full h-full 
   "
        >
          <img
            loading="lazy"
            alt="COMP"
            src={image}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default FlexComponent;
