"use client";
import React, { useEffect, useState, ReactNode } from "react";
import Link from "next/link";

// Define the types for the props
interface UserLayoutProps {
  children: ReactNode;
}

interface Slide {
  msg: string;
  img: string;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const login1 = `${process.env.NEXT_PUBLIC_GURL}/login-1.png`;
  const login2 = `${process.env.NEXT_PUBLIC_GURL}/login-2.png`;
  const login3 = `${process.env.NEXT_PUBLIC_GURL}/login-3.png`;

  // Define the slides array with Slide type
  const slides: Slide[] = [
    {
      msg: "Community: A Comprehensive Guide",
      img: login1,
    },
    {
      msg: "Store: Your One-Stop Shop for All Your Needs",
      img: login2,
    },
    {
      msg: "Prosite: The Next Generation of Social Media",
      img: login3,
    },
  ];

  // Function to move to the next slide
  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Set an interval to change slides automatically
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-row pn:max-sm:flex-col">
      <div className="w-[50%] h-full pn:max-sm:hidden flex sm:py-20 justify-end items-center pn:max-sm:h-[30%] pn:max-sm:w-[100%] ">
        <div className="overflow-hidden w-[100%] flex justify-center items-center flex-col h-[100vh] pt-36">
          <div
            className="relative  flex transition-transform duration-500 transform"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="h-[50vh] w-full flex-col flex-shrink-0 flex items-center justify-center text-black text-2xl"
              >
                <div className="flex justify-center items-center">
                  <img
                    loading="lazy"
                    src={slide.img}
                    alt="hlo"
                    className={` h-[500px] w-[80%] object-contain `}
                  />
                </div>
                <div className="w-[60%] text-[16px] text-center">
                  {slide.msg}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-[130px]">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 duration-500 rounded-full mx-2 ${
                  index === activeSlide ? "bg-blue-500" : "bg-slate-100"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="sm:w-[50%] relative h-[100%]  pn:max-sm:w-[100%] ">
        {children}
        <div className="flex absolute pn:max-sm:hidden bottom-0 sm:bottom-2 w-[100%] flex-wrap md:justify-end justify-start items-center  text-[#414141] gap-4 text-[12px] select-none">
          <div className="flex sm:bottom-3 px-6 pn:max-sm:w-full flex-wrap justify-center items-center  text-[#414141] gap-4 text-[12px] select-none">
            <Link href={"../mainPage/terms"}>T&C</Link>
            <Link href={"../mainPage/privacy"}>Privacy</Link>
            <Link href={"../mainPage/contact"}>Contact Us</Link>
            <Link href={"../mainPage/about"}>About</Link>
            <Link href={"../mainPage/refund"}>Refund</Link>
            <Link href={"../mainPage/requestdata"}>Request Data</Link>
            <Link href={"../mainPage/deleterequest"}>Delete Request</Link>
            <Link href={"../mainPage/shipping"}>Shipping</Link>
            <div title="Coming soon ..." className="cursor-pointer">
              Request API Access
            </div>
            <Link href={"../mainPage/cancellation"}>Cancellation</Link>
            <Link href={"../mainPage/return"}>Return Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
