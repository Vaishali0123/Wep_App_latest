import Image from "next/image";
import React from "react";

const EcosystemComponent = ({ image, heading, para, width = "w-[40px]" }) => {
  return (
    <div className="h-full flex justify-center items-center w-full">
      <div className=" flex flex-col w-[80%] pn:max-sm:w-full h-[80%] sm:h-full  justify-center gap-7 items-center">
        <div className={`h-[40px] ${width}`}>
          <Image alt="sync" src={image} className="w-full h-full" />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="sm:text-lg pn:max-sm:text-md font-semibold">{heading}</div>
          <div className="max-w-[90%] text-xs pp:text-sm text-center">
            {para}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcosystemComponent;
