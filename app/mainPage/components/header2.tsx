"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track screen size
  const logo = `${process.env.NEXT_PUBLIC_GURL}/Logo.png`;

  // Function to check screen size
  // const checkScreenSize = () => {
  //   setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
  // };

  // // Run on mount and resize to check screen size
  // useEffect(() => {
  //   checkScreenSize();
  //   window.addEventListener("resize", checkScreenSize);
  //   return () => window.removeEventListener("resize", checkScreenSize);
  // }, []);

  return (
    <div className="fixed w-full z-50 backdrop-blur-sm">
      <header className="relative w-full h-[80px] flex items-center justify-center">
        {/* SVG Background */}
        <div className="absolute inset-0 w-full h-full z-0 -top-1.5 ">
          {/* // Mobile SVG */}
          <div className="sm:hidden" data-svg-wrapper>
            <svg
              width="100%"
              height="150"
              viewBox="0 0 430 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M405.862 -15.1454L24.349 -15.1454C10.8033 -15.1454 -0.177734 -4.16438 -0.177734 9.38139C-0.177734 22.9272 10.8033 33.9082 24.349 33.9082H41.1504H74.5195C91.4006 33.9082 107.701 40.0692 120.362 51.235C131.313 60.8926 145.412 66.2214 160.013 66.2214H260.542C274.509 66.2214 287.943 60.8565 298.067 51.235C309.773 40.1109 325.305 33.9082 341.453 33.9082H405.862C419.408 33.9082 430.389 22.9271 430.389 9.3814C430.389 -4.16435 419.408 -15.1454 405.862 -15.1454Z"
                fill="url(#paint0_linear_2196_14871)"
                fillOpacity="0.02"
              />
              <path
                d="M24.349 -14.5673L405.862 -14.5673C419.088 -14.5673 429.811 -3.84508 429.811 9.3814C429.811 22.6079 419.089 33.3301 405.862 33.3301H341.453C325.157 33.3301 309.483 39.5898 297.669 50.816C287.652 60.3353 274.361 65.6433 260.542 65.6433H160.013C145.553 65.6433 131.59 60.3659 120.745 50.8015C107.978 39.5425 91.5414 33.3301 74.5195 33.3301H41.1504H24.349C11.1225 33.3301 0.400354 22.6079 0.400354 9.38139C0.400354 -3.84511 11.1225 -14.5673 24.349 -14.5673Z"
                stroke="url(#paint1_radial_2196_14871)"
                strokeOpacity="0.2"
                strokeWidth="1.15618"
              />
              <path
                d="M24.349 -14.5673L405.862 -14.5673C419.088 -14.5673 429.811 -3.84508 429.811 9.3814C429.811 22.6079 419.089 33.3301 405.862 33.3301H341.453C325.157 33.3301 309.483 39.5898 297.669 50.816C287.652 60.3353 274.361 65.6433 260.542 65.6433H160.013C145.553 65.6433 131.59 60.3659 120.745 50.8015C107.978 39.5425 91.5414 33.3301 74.5195 33.3301H41.1504H24.349C11.1225 33.3301 0.400354 22.6079 0.400354 9.38139C0.400354 -3.84511 11.1225 -14.5673 24.349 -14.5673Z"
                stroke="url(#paint2_radial_2196_14871)"
                strokeOpacity="0.7"
                strokeWidth="1.15618"
                style={{ mixBlendMode: "plus-lighter" }}
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2196_14871"
                  x1="26.4812"
                  y1="60.1075"
                  x2="398.541"
                  y2="60.1075"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="0.475" stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <radialGradient
                  id="paint1_radial_2196_14871"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(212.511 60.1075) rotate(-90) scale(290.355 239.88)"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint2_radial_2196_14871"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(212.511 113.058) rotate(-90) scale(32.5849 39.1233)"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          {/* // Web SVG */}
          <div className="pn:max-sm:hidden" data-svg-wrapper>
            <svg
              width="100%"
              height="90"
              viewBox="0 0 1920 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1408.75 34.4728H1859.06C1863.93 34.4728 1868.56 32.3824 1871.78 28.7331C1881.44 17.782 1873.67 0.553467 1859.06 0.553467H953.141H17.2942C12.4279 0.553467 7.79601 2.64384 4.57656 6.29298C-5.08502 17.244 2.69036 34.4728 17.2942 34.4728H468.878C491.685 34.4728 512.546 47.3248 522.803 67.6954C533.06 88.066 553.921 100.918 576.729 100.918H953.14H1304.25C1326.64 100.918 1347 87.9681 1356.5 67.6954C1366 47.4227 1386.36 34.4728 1408.75 34.4728Z"
                fill="url(#paint0_linear_2227_3677)"
                fillOpacity="0.02"
              />
              <path
                d="M1859.06 33.9728H1408.75C1386.17 33.9728 1365.62 47.035 1356.05 67.4834C1346.63 87.5804 1326.45 100.418 1304.25 100.418H953.14H576.729C554.11 100.418 533.422 87.6725 523.25 67.4706C512.907 46.9313 491.874 33.9728 468.878 33.9728H17.2942C3.1209 33.9728 -4.42525 17.252 4.95149 6.62377C8.07604 3.08221 12.5714 1.05347 17.2942 1.05347H953.141H1859.06C1873.23 1.05347 1880.78 17.7741 1871.4 28.4023C1868.28 31.944 1863.78 33.9728 1859.06 33.9728Z"
                stroke="url(#paint1_radial_2227_3677)"
                strokeOpacity="0.2"
              />
              <path
                d="M1859.06 33.9728H1408.75C1386.17 33.9728 1365.62 47.035 1356.05 67.4834C1346.63 87.5804 1326.45 100.418 1304.25 100.418H953.14H576.729C554.11 100.418 533.422 87.6725 523.25 67.4706C512.907 46.9313 491.874 33.9728 468.878 33.9728H17.2942C3.1209 33.9728 -4.42525 17.252 4.95149 6.62377C8.07604 3.08221 12.5714 1.05347 17.2942 1.05347H953.141H1859.06C1873.23 1.05347 1880.78 17.7741 1871.4 28.4023C1868.28 31.944 1863.78 33.9728 1859.06 33.9728Z"
                stroke="url(#paint2_radial_2227_3677)"
                strokeOpacity="0.7"
                style={{ mixBlendMode: "plus-lighter" }}
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2227_3677"
                  x1="205.551"
                  y1="44.3383"
                  x2="1642.52"
                  y2="44.3383"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="0.475" stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <radialGradient
                  id="paint1_radial_2227_3677"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(924.037 44.3383) rotate(-90) scale(251.134 926.465)"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint2_radial_2227_3677"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(948.706 88.1232) rotate(-89.4045) scale(36.6332 158.201)"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="absolute right-4 mb-5 z-10 md:hidden">
          {isMenuOpen ? (
            <FiX
              className="text-white text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <CiMenuFries
              className="text-white text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="flex items-center md:mr-8 justify-center gap-20">
          <div className="hidden md:flex z-10 items-center gap-6">
            <a
              href="#about"
              className="text-white text-sm font-medium hover:text-gray-300"
            >
              About
            </a>
            <a
              href="#features"
              className="text-white text-sm font-medium hover:text-gray-300"
            >
              Earn With Us
            </a>
          </div>

          {/* Logo in the Center */}
          <motion.div
            className="rounded-full w-12 h-12 ss:mb-4 md:ss:mb-0 flex items-center justify-center z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={"/"}>
              <img src={logo} alt="Logo" className="w-14 h-auto" />
            </Link>
          </motion.div>

          <div className="hidden md:flex z-10 items-center gap-6">
            <a
              href="#earn"
              className="text-white text-sm font-medium hover:text-gray-300"
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-white text-sm font-medium hover:text-gray-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-[87px] left-0 w-full  bg-opacity-95 backdrop-blur-md flex flex-col items-center gap-4 py-4 z-20 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="#about"
                className="text-white text-sm font-medium hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#features"
                className="text-white text-sm font-medium hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#earn"
                className="text-white text-sm font-medium hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Earn With Us
              </a>
              <a
                href="#contact"
                className="text-white text-sm font-medium hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute h-full inset-0 bg-[#0D0D0D] opacity-20"></div>
      </header>
    </div>
  );
};

export default Header;
