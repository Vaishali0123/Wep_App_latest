"use client";
import React from "react";

const Page = () => {
  const redirectToAds = () => {
    window.location.href = "https://ads.grovyo.com";
  };
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-200 space-y-4">
      <h1 className="text-xl font-bold text-black">
        For creation of an ad, click below:
      </h1>
      <button
        onClick={redirectToAds}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 transition duration-300"
      >
        Go to Ads Creation
      </button>
    </div>
  );
};

export default Page;
