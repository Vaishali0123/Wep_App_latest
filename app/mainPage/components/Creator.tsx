"use client";
import React, { useState } from "react";
import Link from "next/link";

const Creator = () => {
  const [creator, setCreator] = useState({
    name: "",
    email: "",
  });
  const [check, setCheck] = useState(false);

  return (
    <div className="relative  p-8 sm:p-7">
      <div className="mt-20 px-4 sm:px-24 flex flex-col gap-6">
        <div className="flex flex-row gap-x-80">
          <div className="flex flex-col gap-6">
            <div className="text-white font-bold text-3xl font-[Montserrat Alternates]">
              Creators Invite
            </div>

            <div className="text-[#FFF5EA] leading-5 text-sm">
              Enter your email for an exclusive invite. Join the next big thing
              in social <br />
              commerce. Let&apos;s create something extraordinary!
            </div>
            <div className="text-[#FFF5EA] w-full flex flex-col gap-2">
              Name
              <div>
                <input
                  type="text"
                  value={creator.name}
                  onChange={(e) =>
                    setCreator({ ...creator, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="outline-none bg-inherit w-full sm:w-[450px] text-[#F5F5F5] text-xs border-b-2 border-[#F5F5F5] p-2"
                />
              </div>
            </div>
            <div className="text-[#FFF5EA] w-full flex flex-col gap-2">
              Email Address
              <div>
                <input
                  type="email"
                  value={creator.email}
                  onChange={(e) =>
                    setCreator({ ...creator, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="outline-none bg-inherit w-full sm:w-[450px] text-[#F5F5F5] text-xs border-b-2 border-[#F5F5F5] p-2"
                />
              </div>
            </div>
            <div className="flex gap-2 text-[#FFF5EA] text-xs items-center mt-2">
              {/* <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.81354 2.1748C3.22965 2.1748 1.92578 3.47867 1.92578 5.06256V18.5388C1.92578 20.1226 3.22965 21.4265 4.81354 21.4265H18.2897C19.8736 21.4265 21.1775 20.1226 21.1775 18.5388V10.8381H19.2523V18.5388C19.2523 19.0725 18.8235 19.5013 18.2897 19.5013H4.81354C4.27974 19.5013 3.85095 19.0725 3.85095 18.5388V5.06256C3.85095 4.52876 4.27974 4.09997 4.81354 4.09997H13.4768V2.1748H4.81354ZM19.7073 4.01725L10.762 13.5002L7.22752 9.96573L5.86636 11.3269L10.8015 16.262L21.1079 5.33893L19.7073 4.01725Z"
                  fill="white"
                />
              </svg> */}
              <input
                type="checkbox"
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
                style={{
                  transform: "scale(1.5)",
                  marginRight: "1px",
                  cursor: "pointer",
                }}
              />
              Privacy matters.Check out our
              <Link href={"/privacy"} className="text-[#0066FF]">
                Privacy Policy
              </Link>
            </div>
            <div className="mt-2">
              <button
                // onClick={checkpage}
                className="text-sm font-semibold bg-white text-black rounded-lg py-1.5 px-12"
              >
                Continue
              </button>
            </div>
          </div>
          <div className="w-[30%] h-[40%] -mt-10 hidden md:block ">
            {/* <Image src={group} alt="group" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
