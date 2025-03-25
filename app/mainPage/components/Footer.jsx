import React from "react";
import { FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoMdHelpCircle } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  const Logo = `${process.env.NEXT_PUBLIC_GURL}/Logo.png`;

  return (
    <footer className="w-full bg-[#0d0d0d] flex flex-col items-center mt-4 px-4 sm:px-6 py-4">
      {/* Social Media Icons */}
      <div className="w-full max-w-screen-lg py-4 flex  sm:flex-row justify-between items-center gap-4">
        <div className="w-16 sm:w-16 flex gap-4 items-center">
          <img loading="lazy" src={Logo} alt="Logo" className="w-full h-auto" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center text-white">
          <div className="text-sm sm:text-base">Follow us:</div>
          <div className="flex gap-4 text-xl text-white">
            <a
              href="https://www.instagram.com/grovyoplatforms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="cursor-pointer hover:text-[#ddd]" />
            </a>
            <a
              href="https://x.com/grovyoplatforms"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="cursor-pointer hover:text-[#ddd]" />
            </a>
            <a
              href="https://www.linkedin.com/company/grovyo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="cursor-pointer hover:text-[#ddd]" />
            </a>
            <a
              href="https://www.youtube.com/@GrovyoPlatforms"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="cursor-pointer hover:text-[#ddd]" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation & Help Section */}
      <div className="w-full max-w-screen-lg border-t border-[#171717] py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-white text-xs sm:text-base font-medium">
          <a href="#about" className="hover:text-[#aaa]">
            About
          </a>
          <a href="#ecosystem" className="hover:text-[#aaa]">
            Ecosystem
          </a>
          <a href="#" className="hover:text-[#aaa]">
            Privacy
          </a>
          <a href="#" className="hover:text-[#aaa]">
            Terms
          </a>
          {/* <a href="#" className="hover:text-[#aaa]">
            Contact us
          </a> */}
        </nav>

        {/* Help Icon */}
        <div className="flex gap-2 items-center text-white">
          <IoMdHelpCircle />
          <a href="#" className="hover:text-gray-600">
            Help
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full max-w-screen-lg border-t border-[#171717] py-4 flex justify-center sm:justify-between items-center text-white text-xs sm:text-sm">
        <p>Copyright © 2024 www.grovyo.com</p>
      </div>
    </footer>
  );
};

export default Footer;
