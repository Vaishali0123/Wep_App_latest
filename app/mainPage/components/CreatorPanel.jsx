import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatorPanel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="sm:flex hidden justify-center w-full h-[200px] bg-[#0d0d0d] items-center relative">
        <div className="flex justify-between absolute items-center w-full h-full">
          <div className="bg-creator1 w-[200px] h-full bg-contain bg-center bg-no-repeat"></div>
          <div className="bg-creator2 w-[150px] h-full bg-contain bg-center bg-no-repeat"></div>
        </div>
        <div className="text-white w-[90%] z-20 flex justify-center items-center">
          <div className="flex flex-col w-full gap-2">
            <div className="sm:text-2xl  font-semibold">
              Register Now as a Creator on grovyo
            </div>
            <div className="text-sm text-[#B3B3B3] w-[80%] md:max-w-[60%]">
              Join us at Creator Fest to show off your work, meet amazing
              people, and grow your brand. It’s your time to connect, inspire,
              and be seen.
            </div>
          </div>
          <div className="w-full flex justify-end items-end">
            <button
              disabled={loading}
              onClick={() => {
                router.push("/home");
                setLoading(true);
              }}
              className="py-3 px-6 bg-[#387FF5] text-white rounded-full font-semibold text-sm"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden justify-center w-full bg-[#0D0D0D] items-center">
        <div className="flex justify-center  relative items-center">
          <div className="bg-creator1 w-[80px] h-[80px] absolute top-0 left-0 bg-contain bg-center bg-no-repeat"></div>
          <div className="bg-creator2 w-[35px] h-[50px] absolute bottom-0 right-0 bg-contain bg-center bg-no-repeat"></div>
          <div className="text-center py-6 flex justify-center w-[80%] items-center gap-3 flex-col ">
            <div className="text-center text-white font-semibold">
              Register Now as a Creator on grovyo
            </div>
            <div className="text-xs text-[#B3B3B3] ">
              Join us at Creator Fest to show off your work, meet amazing
              people, and grow your brand. It’s your time to connect, inspire,
              and be seen.
            </div>
            <div>
              <button
                onClick={() => {
                  router.push("/auth/login");
                }}
                className="py-2 px-4 bg-[#387FF5] text-white rounded-full font-semibold text-xs"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorPanel;
