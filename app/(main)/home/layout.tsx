"use client";
import { useState } from "react";
import NewForYou from "./components/NewForYou";
import Community from "./components/Community";
import Link from "next/link";
// import { useAuthContext } from "@/app/auth/components/auth";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [switcher, setSwitcher] = useState<number>(1);

  return (
    <div className="h-full border-r flex w-full  pn:max-sm:border-none pn:max-sm:w-full">
      <div className="h-full border-r pn:max-sm:w-full sm:w-[25%] sm:min-w-[400px]">
        {/* switcher  */}
        <div className="grid grid-cols-1 h-[50px] relative p-2 rounded-xl w-fit">
          <div className="flex rounded-xl items-center h-[90%] text-[#303030] select-none text-[14px]">
            <Link
              href={"../home/insideCommunity"}
              onClick={() => {
                setSwitcher(1);
              }}
              className={`  rounded-xl flex justify-center items-center h-[35px] w-[100px] z-10 ${
                switcher === 1 ? "font-bold " : "cursor-pointer"
              }`}
            >
              New for you
            </Link>
            <div
              className={`absolute duration-100 h-[40px] w-[50%] rounded-xl bg-slate-100 ${
                switcher === 1 ? "left-[2px] " : " left-[49%]"
              }`}
            ></div>
            <Link
              href={"../home/insideCommunity"}
              onClick={() => {
                setSwitcher(2);
              }}
              className={` rounded-xl flex justify-center items-center h-[35px] w-[100px] z-10 ${
                switcher === 2 ? "font-bold " : "cursor-pointer"
              }`}
            >
              Community
            </Link>
          </div>
        </div>

        {/* body  */}
        <div
          style={{ height: "calc(100% - 50px)" }}
          className=" pn:max-sm:w-full w-[400px] min-w-[25%] border-r bg-white overflow-auto"
        >
          {switcher == 1 ? (
            <>
              <NewForYou />
            </>
          ) : (
            <>
              <Community />
            </>
          )}
        </div>
      </div>
      {/* main  */}
      <div className="h-screen pn:max-sm:hidden w-full bg-white">
        {children}
      </div>
    </div>
  );
}
