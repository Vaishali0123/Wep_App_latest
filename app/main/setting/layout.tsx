"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiAccountBoxLine, RiAdvertisementLine } from "react-icons/ri";
import Cookies from "js-cookie";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Logout function: Deletes cookies & redirects to login page
  const handleLogout = () => {
    Cookies.remove("token");

    setIsOpen(false);
    router.push("/auth/login"); // Redirect to login page
  };
  const path = usePathname();
  return (
    <div className="h-full bg-slate-600 flex w-full pn:max-sm:border-none pn:max-sm:w-full">
      <div className="h-full border-r bg-black pn:max-sm:w-full sm:w-[25%] sm:min-w-[400px]">
        <div className="h-[50px] pn:max-sm:hidden w-full bg-white border-b flex justify-between items-center px-2">
          <div className="font-semibold text-[20px]">Settings</div>
        </div>
        {/* body  */}
        <div className=" w-full sm:h-[calc(100%-50px)] h-full bg-white overflow-auto sm:p-2 space-y-2">
          <Link
            href={"/main/setting"}
            className={`${
              path === "/main/setting"
                ? " bg-slate-100 rounded-xl flex w-full p-2 items-center gap-2"
                : "hover:bg-slate-50 active:bg-slate-100 rounded-xl flex w-full p-2 items-center gap-2"
            }`}
          >
            <RiAccountBoxLine className="w-6 h-6" /> <div>Account</div>
          </Link>
          {/* <Link
            href={"../setting/chats"}
            className="hover:bg-slate-50 active:bg-slate-100 rounded-xl flex w-full p-2 items-center gap-2"
          >
            <IoChatbubbleOutline className="w-6 h-6" /> <div>chats</div>
          </Link> */}
          <Link
            href={"/main/setting/prosite"}
            className={`${
              path === "/main/setting/prosite"
                ? " bg-slate-100 rounded-xl flex w-full p-2 items-center gap-2"
                : "hover:bg-slate-50 active:bg-slate-100  rounded-xl flex w-full p-2 items-center gap-2"
            }`}
          >
            <CgWebsite className="w-6 h-6" /> <div>Analytics</div>
          </Link>
          {/* <Link
            href={"../setting/communities"}
            className="hover:bg-slate-50 active:bg-slate-100 rounded-xl flex w-full p-2 items-center gap-2"
          >
            <HiOutlineUserGroup className="w-6 h-6" /> <div>Communities</div>
          </Link> */}
          <Link
            href={"/main/setting/createad"}
            className={`${
              path === "/main/setting/createad"
                ? " bg-slate-100 rounded-xl flex w-full p-2 items-center gap-2"
                : "hover:bg-slate-50 active:bg-slate-100  rounded-xl flex w-full p-2 items-center gap-2"
            }`}
          >
            <RiAdvertisementLine className="w-6 h-6" />{" "}
            <div>Create your ad</div>
          </Link>
          <Link
            href={"/main/setting"}
            className={`${
              path === "/main/setting"
                ? " bg-slate-100 rounded-xl flex w-full p-2 items-center gap-2"
                : "hover:bg-slate-50 active:bg-slate-100  rounded-xl flex w-full p-2 items-center gap-2"
            }`}
          >
            <BsCashCoin className="w-6 h-6" /> <div>Earn With Us</div>
          </Link>{" "}
          <Link
            href={"/main/setting/help"}
            className={`${
              path === "/main/setting/help"
                ? " bg-slate-100 rounded-xl flex w-full p-2 items-center gap-2"
                : "hover:bg-slate-50 active:bg-slate-100  rounded-xl flex w-full p-2 items-center gap-2"
            }`}
          >
            <IoIosHelpCircleOutline className="w-6 h-6" /> <div>Contact Us</div>
          </Link>
          <div
            onClick={() => setIsOpen(true)}
            className="hover:bg-slate-50 active:bg-slate-100 text-red-600 font-semibold rounded-xl flex w-full p-2 items-center gap-2"
          >
            Log Out
          </div>
          {isOpen && (
            <div className="fixed -top-2 left-0 h-screen w-screen  flex items-center justify-center bg-black bg-opacity-30 z-20">
              <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
                <h2 className="text-lg font-semibold">
                  Are you sure you want to log out?
                </h2>
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-screen w-full bg-red-600 pn:max-sm:hidden">
        {children}
      </div>
    </div>
  );
}
