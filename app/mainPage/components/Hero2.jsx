import React from "react";
import Image from "next/image";

const Hero2 = () => {
  const hero1 = `${process.env.NEXT_PUBLIC_GURL}/hero1.png`;

  return (
    <div className="bg-[#0D0D0D] w-full py-4">
      <div className="grid sm:grid-cols-2 gap-5 h-auto sm:h-full w-full">
        <div className=" flex pn:max-sm:order-2 justify-center items-center h-auto sm:h-full w-full">
          <div
            // data-aos="fade-right"
            className="flex flex-col gap-5 text-white w-[100%] px-3 sm:w-[85%] md:w-[70%]"
          >
            <div className="md:text-4xl sm:text-3xl text-2xl leading-snug font-semibold md:leading-[55px]">
              Start Building Your Dream Community Today!
            </div>

            <div className="text-[15px] font-medium">
              Create, connect, and earn on Grovyo—where your passion meets
              endless possibilities. From selling products to engaging fans with
              exclusive content, Grovyo empowers you to grow your brand and
              income, all in one place.
            </div>

            <div className="flex gap-3 ">
              <div className="flex gap-2 bg-white text-black py-3 px-6 sm:py-4 sm:px-16 rounded-3xl items-center">
                <div className="text-[10px] pp:text-[14px] font-semibold">
                  Get Started
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:h-full pn:max-sm:order-1 h-auto flex w-full">
          <div
            // data-aos="fade-left"
            className="w-full h-full 
           "
          >
            <img
              loading="lazy"
              alt="hero2"
              src={hero1}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
