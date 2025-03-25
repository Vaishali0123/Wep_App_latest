"use client";
import React, { useState, useEffect } from "react";
import Cards from "./Cards";

const Featured = () => {
  const f1 = `${process.env.NEXT_PUBLIC_GURL}/f1.png`;
  const f2 = `${process.env.NEXT_PUBLIC_GURL}/f2.png`;
  const f3 = `${process.env.NEXT_PUBLIC_GURL}/f3.png`;
  const f4 = `${process.env.NEXT_PUBLIC_GURL}/f4.png`;
  const f5 = `${process.env.NEXT_PUBLIC_GURL}/f5.png`;
  const f6 = `${process.env.NEXT_PUBLIC_GURL}/f6.png`;
  const f7 = `${process.env.NEXT_PUBLIC_GURL}/f7.png`;
  const f8 = `${process.env.NEXT_PUBLIC_GURL}/f8.png`;

  const [activeStep, setActiveStep] = useState(0);
  const totalCards = 8;

  const sliderItems = [
    {
      id: 0,
      heading: "Build Your Community",
      para: "Set up a place where your audience can connect and interact with you.",
    },
    {
      id: 1,
      heading: "Community Ad Revenue",
      para: "Earn from ads displayed in your community after your community gets monetized.",
    },
    {
      id: 2,
      heading: "In-App Advertising",
      para: "Promote your brand directly within Grovyo app and web platform.",
    },
    {
      id: 3,
      heading: "Powerful Analytics",
      para: "Easily track demographics and gain insights into your audience.",
    },
    {
      id: 4,
      heading: "Custom ProSite",
      para: "ProSite combines your profile and website in one.",
    },
    {
      id: 5,
      heading: "Create Store",
      para: "Unlock the option to create your store after a single post in your community.",
    },
    {
      id: 6,
      heading: "Community Features",
      para: "Engage directly with your audience through community chat features.",
    },
    {
      id: 7,
      heading: "Paid Content Options",
      para: "Offer paid topics, chats, and posts for exclusive content.",
    },
  ];
  const imageSources = [f3, f5, f4, f1, f6, f7, f8, f2];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % totalCards);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  px-2 flex flex-col items-center justify-center text-white bg-[#0D0D0D]">
      {/* title & explain */}
      <div className="flex flex-col text-center justify-center items-center md:gap-4">
        <div className="md:text-3xl text-[18px] font-semibold py-2 px-4">
          Features Designed for Your Success
        </div>
        <div className="md:max-w-[70%]  text-sm text-[#A1A2A1] text-center">
          Unlock powerful features to grow your community and boost your
          success. Customize your profile, engage with your audience, and offer
          products and services directly to customers. Explore these features to
          start earning and building lasting connections.
        </div>
      </div>
      <div className="w-full  relative">
        {/* back space  */}
        <div className=" w-full mt-6 flex justify-center items-center">
          {/* outer line */}
          <div className="md:w-[800px] w-[100%] h-[100%] md:h-[800px] md:rounded-full md:border flex items-center justify-center md:border-[#222222]">
            {/* inner line  */}
            <div className="md:w-[600px] md:h-[600px] md:rounded-full md:border flex items-center justify-center md:border-[#222222]">
              {/* center box for images */}
              <div className="md:w-[300px] w-[100%] h-[100%] pn:max-md:hidden  md:h-[300px] shadow-[#2222] shadow-2xl flex items-center justify-center md:rounded-full ">
                <div className="relative md:w-[400px] w-[100%] h-[350px] md:h-[300px] flex justify-center items-center top-3 left-3">
                  <div className="transition-transform h-full w-full duration-700   ease-in-out opacity-100">
                    {activeStep === 0 ? (
                      <img
                        // loading="lazy"
                        alt="center"
                        src={f3}
                        className="w-full h-full object-contain  transition-transform ease-linear"
                      />
                    ) : activeStep === 1 ? (
                      <img
                        // loading="lazy"
                        alt="center"
                        src={f5}
                        className="w-full h-full object-contain  transition-transform ease-linear"
                      />
                    ) : (
                      activeStep === 2 && (
                        <img
                          // loading="lazy"
                          alt="center"
                          src={f4}
                          className="w-full h-full  object-contain"
                        />
                      )
                    )}

                    {activeStep === 3 && (
                      <img
                        // loading="lazy"
                        alt="center"
                        src={f1}
                        className="w-full h-full  object-contain"
                      />
                    )}

                    {activeStep === 4 && (
                      <img
                        // loading="lazy"
                        alt="center"
                        src={f6}
                        className="w-full h-full object-contain "
                      />
                    )}

                    {activeStep === 5 && (
                      <img
                        // loading="lazy"
                        alt="center"
                        src={f7}
                        className="w-full h-full object-contain "
                      />
                    )}

                    {activeStep === 6 && (
                      <img
                        // loading="lazy"
                        alt="center"
                        src={f8}
                        className="w-full h-full object-contain "
                      />
                    )}

                    {activeStep === 7 && (
                      <img
                        // loading="lazy"
                        alt="center"
                        src={f2}
                        className="w-full h-full object-contain "
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* front boxes for web */}
        <div className="h-[100%] w-[100%] pn:max-md:hidden md:grid flex top-0 md:grid-cols-2 md:absolute">
          {/* left box  */}
          <div className="h-full flex md:flex-col items-center w-[100%]">
            <div className="md:top-[5%] w-fit md:left-[10%] relative">
              <Cards
                // Imag={grovyo}
                heading="Build Your Community"
                isActive={activeStep === 0}
                setActiveStep={setActiveStep}
                id={0}
                isReversed={false}
                para="Set up a place where your audience can connect
and interact with you. Engage with them directly, 
share your ideas, and grow your community over time."
              />
            </div>
            <div className="md:top-[10%] w-fit md:right-[5%] relative">
              <Cards
                // Imag={f1}
                isActive={activeStep === 1}
                heading="Community Ad Revenue"
                isReversed={true}
                setActiveStep={setActiveStep}
                id={1}
                para="Earn from ads displayed in your community after 
your community gets monetized."
              />
            </div>
            <div className="md:top-[15%] w-fit md:right-[10%] relative">
              <Cards
                // Imag={grovyo}
                heading="In-App Advertising"
                setActiveStep={setActiveStep}
                id={2}
                isReversed={false}
                isActive={activeStep === 2}
                para="Promote your brand directly within Grovyo 
app and web platform. With Grovyo's built-in 
ad system, you can run targeted ads to reach a wider
 audience and boost your brand visibility."
              />
            </div>
            <div className="md:top-[20%] w-fit left-[10%] relative">
              <Cards
                // Imag={grovyo}
                isActive={activeStep === 3}
                setActiveStep={setActiveStep}
                id={3}
                isReversed={true}
                heading="Powerful Analytics"
                para="Easily track demographics and gain insights into your audience. Use this data to understand your followers better and refine your strategy to grow your brand and social presence."
              />
            </div>
          </div>
          {/* right boxes */}
          <div className="h-full  flex md:flex-col items-center md:pt-6 sm:w-[100%]">
            <div className="md:top-[7%] w-fit right-[15%] relative">
              <Cards
                // Imag={grovyo}
                isActive={activeStep === 4}
                setActiveStep={setActiveStep}
                id={4}
                isReversed={false}
                heading="Custom ProSite"
                para="ProSite combines your profile and website in one. Set it up in just a few clicks, customize it to reflect your brand, and grow your social presence."
              />
            </div>
            <div className="md:top-[13%] w-fit md:left-[0%] relative">
              <Cards
                // Imag={grovyo}
                heading="Create Store"
                isActive={activeStep === 5}
                setActiveStep={setActiveStep}
                id={5}
                isReversed={true}
                para="Unlock the option to create your store after a single post in your community. Set it up for free and start selling your products with the lowest commission fees."
              />
            </div>
            <div className="md:top-[17%] w-fit md:left-[5%] relative">
              <Cards
                // Imag={grovyo}
                isActive={activeStep === 6}
                heading="Community Features"
                setActiveStep={setActiveStep}
                id={6}
                isReversed={false}
                para="Engage directly with your audience through community chat feature, comments on posts, and easy sharing."
              />
            </div>
            <div className="md:top-[22%] right-[15%] w-fit relative">
              <Cards
                // Imag={grovyo}
                heading="Paid Content Options"
                isActive={activeStep === 7}
                setActiveStep={setActiveStep}
                id={7}
                isReversed={true}
                para="Offer paid topics, chats, and posts where you
 can share exclusive content, courses, services, 
and more. Monetize your expertise and earn directly 
from your audience."
              />
            </div>
          </div>
        </div>
        {/* Phone feature  */}
        <div className="w-full mt-10 overflow-hidden relative max-md:flex max-md:justify-center max-md:items-center">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              width: `${100 * sliderItems.length}%`,
            }}
          >
            {sliderItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full flex flex-col p-4 space-y-2 items-center justify-center"
              >
                <img
                  alt="slide"
                  src={imageSources[index]} // Ensure `imageSources` is an array that maps to `sliderItems`
                  className="w-[80%] h-[250px] object-contain transition-transform duration-1000 ease-in-out"
                />
                <div
                  className={`duration-500 flex flex-col md:w-fit w-[60%] rounded-lg justify-between space-y-2 p-4 md:hidden text-center ${
                    item.id === activeIndex ? "  scale-110" : "scale-90"
                  }`}
                >
                  <h2 className="text-[15px] font-bold ">{item.heading}</h2>
                  <p className="text-sm pn:max-md:text-[12px] text-[#aaa]">
                    {item.para}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
