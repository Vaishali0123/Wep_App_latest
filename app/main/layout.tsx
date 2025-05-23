"use client";
import Search from "./search/page";
import Link from "next/link";
import { useState } from "react";
import {
  IoChatbubblesOutline,
  IoSearch,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
// import { useSelector } from "react-redux";
// import { RootState, store } from "../redux/store";
import { useSelector } from "react-redux";
import { useAuthContext } from "../auth/components/auth";
import { RootState } from "../redux/store";
import { usePathname } from "next/navigation";
import { TbHome } from "react-icons/tb";
import { MdOutlineLibraryAdd } from "react-icons/md";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  const [clicked, setClicked] = useState<boolean>(true);
  const chatheader = useSelector(
    (state: RootState) => state.comFeed.chatheader
  );
  const { data } = useAuthContext();

  return (
    <>
      <div className=" fixed h-screen w-screen pn:max-sm:flex-col flex flex-row-reverse">
        {/* header  */}
        <div
          className={`${
            chatheader === true || path === "/home/insideCommunity"
              ? "hidden"
              : "h-full w-[50px] bg-white border  sm:hidden border-dashed flex justify-between items-center px-2 pn:max-sm:w-full pn:max-sm:h-[50px] p-[2px]"
          }`}
        >
          <img
            loading="lazy"
            src={data?.dp}
            className="w-[40px] object-cover h-[40px] rounded-2xl "
          />
          <Link
            href={"../search"}
            className="flex h-[40px] w-[40px]  hover:bg-slate-50 cursor-pointer active:bg-slate-100 flex-col items-center justify-center rounded-2xl border border-dashed"
          >
            <LuSearch className="w-5 h-5" />
          </Link>
        </div>
        {/* main */}
        <div
          className={`sm:h-full w-full -z-10 ${
            chatheader === true ? "h-full" : "pn:max-sm:h-[calc(100%-100px)] "
          }`}
        >
          {children}
        </div>
        {/* navbar  */}
        <div
          className={`${
            chatheader === true || path.startsWith("/home/insideCommunity")
              ? "pn:max-md:hidden"
              : "flex  pn:max-sm:z-40 pn:max-sm:fixed pn:max-sm:bottom-0 pn:max-sm:w-full pn:max-sm:h-[50px]"
          }`}
        >
          <div className="h-full pn:max-sm:flex-row w-[60px] z-40 bg-white border-r cursor-pointer border-dashed flex flex-col items-center pn:max-sm:w-full pn:max-sm:h-[50px] py-1">
            <Link
              href={{
                pathname: `../../../prosite/${data?.username}`,
                // query: {
                //   id: data?.id,
                // },
              }}
              className="w-[40px] hover:opacity-[40%] cursor-pointer h-[40px] rounded-[16px] flex items-center justify-center pn:max-sm:hidden"
            >
              <img
                src={data?.dp} // Fallback to a default profile image
                alt="dp"
                className="h-[38px]  w-[38px] rounded-[14px] object-cover border border-dashed pointer-events-none"
              />
            </Link>
            <div className="w-full sm:py-6 items-center text-[12px] pn:max-sm:flex-row pn:max-sm:px-2  pn:max-sm:justify-between pn:max-sm: flex flex-col sm:gap-2">
              <Link
                href={"../../main/home"}
                onClick={() => {
                  setClicked(true);
                }}
                className="flex h-12 w-12 hover:bg-slate-50 active:bg-slate-100
                }  flex-col items-center justify-center rounded-2xl border-2 border-white"
              >
                <TbHome
                  className={`w-5 h-5 ${
                    path.startsWith("/main/home") ? "text-blue-500 " : ""
                  }`}
                />
                <div
                  className={`text-[12px] ${
                    path.startsWith("/home") ? "text-blue-500 " : "text-black"
                  }`}
                >
                  Home
                </div>
              </Link>
              <Link
                href={"../../main/chat"}
                onClick={() => setClicked(true)}
                className="flex h-12 w-12 hover:bg-slate-50 cursor-pointer active:bg-slate-100 flex-col items-center justify-center rounded-2xl border-2 border-white"
              >
                <IoChatbubblesOutline className="w-5 h-5" />
                <div>Chats</div>
              </Link>

              <Link
                href={"../../main/library"}
                onClick={() => {
                  setClicked(true);
                }}
                className="flex h-12 w-12  hover:bg-slate-50 cursor-pointer active:bg-slate-100 flex-col items-center justify-center rounded-2xl border-2 border-white"
              >
                <MdOutlineLibraryAdd
                  className={`w-5 h-5 ${
                    path.startsWith("/main/library") ? "text-blue-500 " : ""
                  }`}
                />
                <div
                  className={`text-[12px] ${
                    path.startsWith("/main/library")
                      ? "text-blue-500 "
                      : "text-black"
                  }`}
                >
                  Library
                </div>
              </Link>
              <div
                onClick={() => {
                  setClicked(!clicked);
                }}
                className="flex h-12 w-12 pn:max-sm:hidden hover:bg-slate-50 cursor-pointer active:bg-slate-100 flex-col items-center justify-center rounded-2xl border-2 border-white"
              >
                <IoSearch
                  className="w-5 h-5"
                  // className={`w-5 h-5 ${pageno === 3 ? "text-blue-500 " : ""}`}
                />
                <div
                // className={`${
                //   pageno === 3 ? "text-blue-500 " : "text-black"
                // }`}
                >
                  Search
                </div>
              </div>
              <Link
                href={"../../main/setting"}
                onClick={() => {
                  setClicked(true);
                }}
                className="flex h-12 w-12 hover:bg-slate-50 cursor-pointer active:bg-slate-100 flex-col items-center justify-center rounded-2xl border-2 border-white"
              >
                <IoSettingsOutline
                  className={`w-5 h-5 ${
                    path.startsWith("/main/setting") ? "text-blue-500 " : ""
                  }`}
                />
                <div
                  className={`text-[12px] ${
                    path.startsWith("/main/setting")
                      ? "text-blue-500 "
                      : "text-black"
                  }`}
                >
                  Settings
                </div>
              </Link>
            </div>
          </div>
          <div
            className={`h-full absolute  pn:max-sm:hidden z-0 w-[400px] duration-150 min-w-[25%] bg-white border border-dashed pn:max-sm:w-full pn:max-sm:h-[50px]   ${
              clicked === true ? "-ml-[450px]" : "ml-[60px]"
            }`}
          >
            <Search />
          </div>
        </div>
      </div>
    </>
  );
}
