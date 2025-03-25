"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Switcher = React.memo(() => {
  const path = usePathname();

  return (
    <div
      className="h-[50px] bg-white shadow-sm z-50 pn:max-sm:items-center 
    pn:max-sm:w-[100%] overflow-hidden sm:max-md:rounded-r-3xl md:px-2 pn:max-md:justify-start flex flex-row items-center"
    >
      {/* <div
        // href={"/home/newforyou"}
        // href="/home/test"
        className={`${
          path.startsWith("/home/newforyou")
            ? "text-[14px] pn:max-sm:text-[12px]  text-[#171717] p-3 bg-[#f5f5f5] rounded-xl font-semibold mx-2 hover:text-black transition-all duration-300"
            : "text-[14px] pn:max-sm:text-[12px] text-[#727272]  font-medium mx-2 hover:text-black border-b-0 transition-all duration-300"
        }`}
      >
        New for you
      </div>

      <div
        // href={"/home/community"}
        // href="/home/test"
        className={`${
          path.startsWith("/home/community")
            ? "text-[14px] pn:max-sm:text-[12px] p-3  bg-[#f5f5f5] rounded-xl text-[#171717] font-semibold mx-2 hover:text-black transition-all duration-300"
            : "text-[14px] pn:max-sm:text-[12px] text-[#727272] font-medium mx-2 hover:text-black border-b-0 transition-all duration-300"
        }`}
      >
        Community
      </div> */}
      <div className="grid grid-cols-1  border-2 border-slate-50 relative rounded-xl bg-slate-50 pn:max-sm:-mt-6 w-fit">
        <div className="flex rounded-xl text-[#303030] select-none text-[14px]">
          <div
            className={`  rounded-xl flex justify-center items-center h-[35px] w-[150px] z-10 ${
              path.startsWith("/home/newforyou")
                ? "font-bold "
                : "cursor-pointer"
            }`}
          >
            New for you
          </div>
          <div
            className={`absolute duration-100 h-[35px] w-[50%] rounded-xl bg-slate-100 ${
              path.startsWith("/home/newforyou") ? "left-[0px] " : " left-[50%]"
            }`}
          ></div>
          <div
            className={` rounded-xl flex justify-center items-center h-[35px] w-[150px] z-10 ${
              path.startsWith("/home/community")
                ? "font-bold "
                : "cursor-pointer"
            }`}
          >
            Community
          </div>
        </div>
      </div>
    </div>
  );
});
Switcher.displayName = "Switcher";
export default Switcher;
