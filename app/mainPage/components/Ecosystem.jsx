"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Background from "../../assets/Background.png";

const Ecosystem = () => {
  const Grovyo = `${process.env.NEXT_PUBLIC_GURL}/Grovyo.png`;
  const workspace = `${process.env.NEXT_PUBLIC_GURL}/workspace.png`;
  const flash = `${process.env.NEXT_PUBLIC_GURL}/flash.png`;
  const adspace = `${process.env.NEXT_PUBLIC_GURL}/adspace.png`;
  const Logo = `${process.env.NEXT_PUBLIC_GURL}/Logo.png`;

  return (
    <div className="w-full -top-10 text-white relative overflow-hidden">
      {/* Grid Section */}
      <div className="relative w-full pl-5 pt-10 h-[500px] flex justify-center items-center">
        {/* Central Logo */}
        <motion.div
          className="absolute w-[62px] p-1 h-[62px]  "
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <img
            alt="logo"
            loading="lazy"
            src={Logo}
            className="w-full h-full bg-black rounded-full object-contain"
          />
        </motion.div>

        {/* Top Left Section */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-2/3 flex justify-center items-center "
          initial={{ opacity: 0, x: -50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-[100px] h-[40px] sm:w-[170px] sm:h-[60px] flex justify-center items-center">
              <img
                loading="lazy"
                alt="web app"
                src={Grovyo}
                className="w-full "
              />
            </div>
            <div className="text-center space-y-2">
              <div className="sm:text-lg text-[13px] font-semibold">
                Web App
              </div>
              <div className="text-xs md:text-sm ss:text-[12px] w-[140px] md:w-full text-[#aaa]">
                Create, connect, market and sell.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Right Section */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-2/3 flex justify-center items-center"
          initial={{ opacity: 0, x: 50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-[100px] h-[40px] sm:w-[170px] sm:h-[60px] flex justify-center items-center">
              <img
                alt="workspace"
                src={workspace}
                className="w-[30px] h-[30px]"
              />
            </div>
            <div className="text-center space-y-2">
              <div className="sm:text-lg text-[13px] font-semibold">
                Workspace
              </div>
              <div className="text-xs ss:text-[12px] w-[150px] md:w-full md:text-sm text-[#aaa]">
                Manage, analyze and grow all in one place.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Left Section */}
        <motion.div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-[100px] h-[40px] sm:w-[170px] sm:h-[60px] flex justify-center">
              <img alt="delivery" src={flash} className="w-[35px] h-[35px] " />
            </div>
            <div className="text-center space-y-2">
              <div className="sm:text-lg text-[13px] font-semibold">
                Flash App
              </div>
              <div className="text-xs md:text-sm ss:text-[12px] w-[150px] md:w-full text-[#aaa]">
                App that connects you to reliable delivery partners.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Right Section */}
        <motion.div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: 50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-[100px] h-[40px] sm:w-[170px] sm:h-[60px]  flex justify-center">
              <img alt="ads" src={adspace} className="w-[30px] h-[30px]" />
            </div>
            <div className="text-center space-y-2">
              <div className="sm:text-lg text-[13px] font-semibold">
                ADS SPACE
              </div>
              <div className="text-xs md:text-sm ss:text-[12px] w-[150px] md:w-full text-[#aaa]">
                Reach the right people with Targeted ads.
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <Image
              alt="background"
              src={Background}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ecosystem;
