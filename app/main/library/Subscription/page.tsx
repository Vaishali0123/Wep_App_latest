"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Tracksub from "../../../assets/sub.png";
const PageContent = () => {
  const searchParams = useSearchParams();
  const subscription = searchParams.get("subscription"); //
  const parsedsubscription = subscription ? JSON.parse(subscription) : null;
  return (
    <div className="bg-white h-full w-full flex items-center justify-center">
      {parsedsubscription === null ? (
        <div className="flex flex-col items-center">
          <Image
            alt="order"
            src={Tracksub}
            className="h-[200px] w-[200px] object-contain"
          />
          <div className="text-black text-[18px] my-4 font-semibold">
            No Subscription Yet
          </div>
          <div className="text-[18px] text-slate-600  w-[60%] text-center">
            Looks like you haven’t added anything to your cart yet
          </div>
        </div>
      ) : (
        <div className="bg-white border border-dotted rounded-2xl space-y-2 w-[60%] flex flex-col items-center p-4 ">
          {/* <div className="w-full flex justify-between items-center">
          <div>Items in order</div>
          <div>1 item</div>
        </div> */}
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-2">
              <div className="h-[40px] w-[40px] border flex items-center justify-center rounded-2xl">
                <img
                  src={parsedsubscription?.status?.dp}
                  className="w-[100%] h-[100%] object-contain rounded-2xl"
                />
              </div>
              <div className="flex justify-between items-center w-[80%]">
                <div className=" ">
                  <div className="text-[12px] text-[#171717] font-semibold">
                    {parsedsubscription?.status?.community}
                  </div>
                  <div className="flex gap-2 items-center text-[#a2a2a2]">
                    <div className="text-[12px]  font-medium">
                      Topic: {parsedsubscription?.status?.topic}
                    </div>
                    <div className="text-[10px] text-[#a2a2a2] flex items-center gap-1 font-medium">
                      <div className="h-1 w-1 rounded-full bg-[#a2a2a2]"></div>
                      <div>
                        {parsedsubscription?.status?.topicmembers} members
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[10px] flex items-center gap-2 font-semibold p-2 text-[#000] border border-dashed bg-[#ffffff] rounded-xl">
              View <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="w-full ">Topic details</div>
          <div className="w-full flex flex-col items-center bg-[#ffffff] p-2 border border-dashed rounded-2xl">
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]"> Name</div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                {parsedsubscription?.status?.topic}
              </div>
            </div>
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">type</div>
              <div className="text-[#3478ff] px-2 text-[14px]">Paid</div>
            </div>
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">Price</div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                Rs. {parsedsubscription?.subscription?.amount}
              </div>
            </div>
            <div className="flex w-full justify-between  p-2">
              <div className="text-[#000000] px-2 text-[14px]">Time period</div>
              <div className="text-[#3478ff] px-2 text-[14px]">monthly</div>
            </div>
          </div>
          {/* <div className="w-full ">Order details</div>
        <div className="w-full flex flex-col items-center bg-[#ffffff] p-2 border border-dashed rounded-2xl">
          <div className="flex w-full justify-between border-b p-2">
            <div className="text-[#000000] px-2 text-[14px]">Order ID</div>
            <div className="text-[#000000] flex  px-2 text-[14px]">
              M2Z4-VVY2{" "}
              <div className="text-[#3478ff]  px-2 text-[14px]">Copy</div>
            </div>
          </div>
          <div className="flex w-full justify-between border-b p-2">
            <div className="text-[#000000] px-2 text-[14px]">Order placed</div>
            <div className="text-[#3478ff] px-2 text-[14px]">
              placed on wed, 27 Dec’23, 11:22 PM
            </div>
          </div>
          <div className="flex w-full justify-between border-b p-2">
            <div className="text-[#000000] px-2 text-[14px]">Payment</div>
            <div className="text-[#3478ff] px-2 text-[14px]">Paid Online</div>
          </div>
          <div className="flex w-full justify-between p-2">
            <div className="text-[#000000] px-2 text-[14px]">Deliver to</div>
            <div className="text-[#3478ff] px-2 text-[14px]">
              37 rampuram, Shyam nagar , kanpur
            </div>
          </div>
        </div> */}
        </div>
      )}
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
