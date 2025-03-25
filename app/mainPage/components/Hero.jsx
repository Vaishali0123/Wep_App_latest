import React from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  const hero1 = `${process.env.NEXT_PUBLIC_GURL}/hero1.png`;

  return (
    <div className="bg-[#0D0D0D] h-screen w-full">
      <div className="grid sm:grid-cols-2 gap-5 h-auto sm:h-full w-full">
        <div className="pn:max-sm:order-2 flex justify-center items-center h-auto sm:h-full w-full">
          {/* box */}
          <div
            // data-aos="fade-right"
            className="flex flex-col gap-5 text-white w-[100%] px-3 sm:w-[85%] sm:h-[70%] md:w-[70%]"
          >
            {/* upper button */}
            <div>
              <button className="bg-[#FFFFFF]/10 rounded-2xl font-medium py-2 px-5 text-sm">
                #1 Social Commerce Platform
              </button>
            </div>
            {/* heading */}
            <div className="lg:text-5xl md:text-4xl pn:max-sm:text-[16px] text-3xl font-semibold pn:max-sm:leading-5 lg:leading-[55px]">
              India’s first peer to peer Social Commerce Platform
            </div>
            {/* description */}
            <div className="text-[15px] pn:max-sm:text-[12px] font-medium">
              Grovyo is your ultimate all-in-one platform where creators,
              businesses, and individuals can transform their passions into
              thriving online communities, stores, and brands. With Grovyo, you
              don’t just showcase your work—you can build an interactive
              community, connect directly with fans or customers, and gain
              powerful tools to grow your reach and revenue.
            </div>
            {/* buttons */}
            <div className="flex gap-3 pn:max-sm:flex-col ">
              <div className="flex gap-2 bg-white text-black py-3 px-3 pp:px-5 rounded-3xl items-center">
                <IoLogoGooglePlaystore className="text-xl" />
                <div className="text-[10px] pp:text-[14px] font-semibold">
                  Get it on Playstore
                </div>
              </div>

              <div className="flex gap-2 bg-transparent border border-white/50 py-3 px-3 pp:px-5 rounded-3xl items-center">
                <FaApple className="text-2xl" />
                <div className="text-[10px] pp:text-[14px] font-semibold">
                  Download On App Store
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pn:max-sm:order-1 sm:h-full h-auto flex items-center w-full">
          <div
            // data-aos="fade-left"
            className="w-full h-full sm:max-w-[80%] sm:max-h-[600px] flex justify-center items-center 
           "
          >
            <img
              loading="lazy"
              alt="MAIN"
              src={hero1}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
