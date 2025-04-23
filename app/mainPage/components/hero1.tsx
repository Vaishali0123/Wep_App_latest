"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const Hero1: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const hero1 = `${process.env.NEXT_PUBLIC_GURL}/hero1.png`;
  const hero2 = `${process.env.NEXT_PUBLIC_GURL}/hero2.png`;
  const hero3 = `${process.env.NEXT_PUBLIC_GURL}/hero3.png`;
  const herom1 = `${process.env.NEXT_PUBLIC_GURL}/herom1.png`;
  const herom2 = `${process.env.NEXT_PUBLIC_GURL}/herom2.png`;
  const herom3 = `${process.env.NEXT_PUBLIC_GURL}/herom3.png`;
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  const answers = [
    "Connect & Build Your Communities",
    "Create Your Online Presence with Prosite",
    // "Convert Ideas into Reality",
    "Sell or Buy Products Easily",
    // "Deliver them by Grovyo",
  ];
  const description = [
    "Create & Connect with your audience and various communities to build your own network and grow your influence.",
    "Establish your personal or professional brand effortlessly with Prosite (Profile + Website) and expand your online presence.",
    // "Easily set up your own online store for free and start turning your ideas into a thriving business.",
    "Sell your products with minimal effort or shop from your favorite local stores on Grovyo for a seamless experience.",
    // "Ensure fast and reliable delivery of your products to customers with Grovyo's efficient logistics service.",
  ];

  const webImages = [hero1, hero3, hero2]; // Web images
  const mobileImages = [herom1, herom3, herom2]; // Mobile images

  // Words to highlight
  const highlightWords = ["Community", "Store", "ProSite"];
  useEffect(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Change text and background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % answers.length);
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % webImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [answers.length, webImages.length]);

  // Function to highlight specific words
  const renderHighlightedText = (text: string) => {
    return text.split(" ").map((word, index) => {
      const isHighlighted = highlightWords.includes(word);
      return (
        <span
          key={index}
          className={`relative ${isHighlighted ? "inline-block" : ""}`}
        >
          {word}
          {isHighlighted && (
            <>
              {/* Background Highlight */}
              {/* <motion.span
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[#CDDFDA] bg-opacity-20 rounded-lg"
              ></motion.span> */}
              {/* SVG Underline */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-2 left-0 w-full text-white"
              >
                <svg
                  width="100%"
                  height="18"
                  viewBox="0 0 330 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M370.63 2.62109C366.904 17.9836 182.651 8.51859 171.144 8.07109C173.372 9.32109 185.309 13.2986 177.761 15.9311C173.571 17.3936 168.215 17.3998 163.861 17.7023C150.936 18.6023 137.946 18.9061 124.993 19.0923C92.6613 19.5548 60.4925 17.6673 28.3512 14.7748C5.06 12.6786 -17.8212 10.3073 -41.25 10.4548"
                    stroke="#ffffff"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </>
          )}
          {index !== text.split(" ").length - 1 && " "}{" "}
          {/* Add space between words */}
        </span>
      );
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden md:top-5">
      {/* Background Image (Web Only) */}
      <div className="pn:max-sm:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            className="absolute w-full h-full bg-cover bg-center md:bg-bottom"
            style={{
              backgroundImage: `url(${webImages[currentBgIndex]})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          ></motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay to make text readable (optional) */}
      <div className="absolute h-full inset-0 bg-[#0D0D0D] opacity-40"></div>

      {/* Floating Boxes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-white opacity-10 rounded-sm"
          initial={{
            x: Math.random() * screenSize.width,
            y: Math.random() * screenSize.height,
            rotate: 0,
          }}
          animate={{
            x: [null, Math.random() * screenSize.width],
            y: [null, Math.random() * screenSize.height],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center w-full h-screen pt-5 px-4 text-center ">
        {/* Join Us Section */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.05,
            background: "linear-gradient(45deg, #18181a, #28282c)",
          }} // Gradient on hover
          className="h-10 sm:h-11 px-4 py-2 bg-[#202020] rounded-full border border-[#28282c] backdrop-blur-md flex items-center gap-2 mb-4 sm:mb-8 relative overflow-hidden"
        >
          {/* Gradient Background Animation */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r  from-transparent via-[#000] to-transparent opacity-20"
          ></motion.div>

          {/* Text */}
          <div className="text-white text-[11px] sm:text-sm md:text-base font-medium relative z-10">
            World&rsquo;s first peer-to-peer Social Commerce Platform
          </div>
        </motion.div>

        {/* Main Heading */}
        <div className="flex flex-col  space-y-2 items-center">
          <div className="text-[#aaaaaa] text-2xl sm:text-4xl md:text-[35px] lg:text-4xl ss:font-semibold sm:font-bold">
            Where you can
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#fff]  text-2xl sm:text-4xl md:text-[35px] lg:text-4xl ss:font-semibold sm:font-bold"
            >
              {renderHighlightedText(answers[currentTextIndex])}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sub Heading */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-[#94969d] text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-[80%] md:w-[60%] lg:w-[40%] mt-4 sm:mt-6"
        >
          The all-in-one platform to turn your passions into thriving
          communities, stores, and brands.
        </motion.div> */}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#94969d] text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-[80%] md:w-[60%] lg:w-[40%] mt-4 sm:mt-6"
          >
            {renderHighlightedText(description[currentTextIndex])}
          </motion.div>
        </AnimatePresence>
        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-4 sm:gap-6 mt-6 sm:mt-8"
        >
          <Link
            href="../auth/login"
            className="h-10 sm:h-12 px-4 sm:px-5 gap-2 flex justify-center bold items-center hover:bg-[#cecdcd]  text-black border border-[#1F1F22] hover:text-[#1F1F22] rounded-xl bg-white text-sm sm:text-lg font-normal"
          >
            {/* <PiLaptop /> */}
            Get Started
            <IoIosArrowRoundForward className="text-xl sm:text-2xl" />
          </Link>

          {/* <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-[#62646c] text-xs sm:text-base font-medium">
              Launching soon on
            </div>
            <div className="px-3 sm:px-5 py-1 sm:py-2 bg-[#0e0e10] rounded-full border border-[#1d1d20] flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                <img
                  className="w-full h-full rounded-sm"
                  src={Play.src}
                  alt="Play Store"
                  loading="lazy" 
                />
              </div>
              <div className="w-[2px] h-4 sm:h-6 bg-[#28282c]"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                <img
                  className="w-full h-full rounded-sm"
                  src={Appstore.src}
                  alt="App Store"
                  loading="lazy" 
                />
              </div>
            </div>
          </div> */}
        </motion.div>

        {/* Mobile Image (Below Text) */}
        <div className="sm:hidden h-full w-full ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBgIndex}
              className="w-full h-[250px] mt-8 bg-contain bg-no-repeat bg-center "
              style={{
                backgroundImage: `url(${mobileImages[currentBgIndex]})`,
              }}
              initial={{ opacity: 0, y: 20 }} // Slide in from bottom
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }} // Faster transition
            ></motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
