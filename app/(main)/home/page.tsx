"use client";
import Image from "next/image";
import React from "react";
import Insidecompic from "../../assets/Insidecom.png";

const Page = () => {
  return (
    <div className="w-full pn:max-sm:hidden  h-screen flex flex-col items-center justify-center">
      <Image
        alt="compic"
        src={Insidecompic}
        className="h-[200px] w-[200px] object-contain"
      />
      <div className="text-black text-md py-2">
        Click on any post to view whole community
      </div>
    </div>
  );
};

export default Page;
