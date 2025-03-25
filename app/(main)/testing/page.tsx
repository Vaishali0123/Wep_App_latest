import React from "react";
import Image from "next/image";
import image from "../../assets/creator1.png";
import creatorImage from "../../assets/creator1.png";

const Page = () => {
  return (
    <div className="relative w-56 h-72 flex justify-center items-center">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-cover blur-lg opacity-50 p-2 brightness-105"
        style={{
          backgroundImage: `url(${creatorImage.src})`,
        }}
      />
      ;{/* Main sharp image */}
      <div className="rounded-md w-48 h-64 z-50">
        <Image
          src={image}
          width={192} // Ensure width
          height={256} // Ensure height
          alt="Displayed Image"
          className="object-cover w-full h-full rounded-md"
        />
      </div>
    </div>
  );
};

export default Page;
