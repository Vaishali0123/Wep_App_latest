import React from "react";

const page = () => {
  return (
    <div className="w-[90%] mx-[5%]  flex flex-col gap-[50px] ">
      <div className="flex flex-col gap-6 pt-20">
        <div>Get Started</div>
        <div className=" text-3xl sm:text-5xl md:text-7xl font-bold">
          Get in touch with us. <br />
          We&apos;re here to assist you.
        </div>
      </div>
      <div className="flex flex-col gap-[30px] min-w-[70%]">
        <div className="flex flex-col gap-4 sm:flex sm:flex-row sm:justify-between w-full">
          <div className="sm:w-[32%]">
            <div className="">Your Name</div>

            <input
              type="text"
              className=" border-b border-[#CACACA] outline-none bg-transparent  w-full"
            />
          </div>
          <div className="sm:w-[32%]">
            <div className="">Email Address</div>
            <div>
              <input
                type="email"
                className=" border-b border-[#CACACA] outline-none bg-transparent w-full "
              />
            </div>
          </div>
          <div className="sm:w-[32%]">
            <div className="">Phone Number (optional)</div>
            <div>
              <input
                type="tel"
                className="border-b border-[#CACACA] outline-none bg-transparent w-full "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div>Message</div>
          <div>
            {" "}
            <input
              type="text"
              className="  border-b border-[#CACACA] outline-none bg-transparent w-full "
            />
          </div>
        </div>
        <div>
          <button className="border-none rounded-3xl bg-[#127DF7] text-white px-5 py-3 pp:px-[32px] pp:py-5">
            Leave us a Message &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
