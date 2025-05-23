import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Tracksub from "../../../assets/sub.png";

interface SubscriptionStatus {
  validity: string;
  dp: string;
  community: string;
  topic: string;
  topicmembers: number;
}

interface SubscriptionItem {
  status: SubscriptionStatus;
}

interface SubscriptionProps {
  subscriptions: SubscriptionItem[];
}

const Subscription: React.FC<SubscriptionProps> = ({ subscriptions }) => {
  return (
    <div className="h-[100%] bg-green-300 space-y-2 overflow-y-auto dark:bg-[#ffffff]">
      {/*-----------------Subscription---------------*/}
      {/* Active  */}
      {subscriptions?.length > 0 ? (
        subscriptions.map((item: SubscriptionItem, index: number) => (
          <div key={index} className=" w-full p-2 border-b ">
            <div className="h-full p-2 border bg-white w-full  rounded-3xl ">
              <div className="flex pb-2 items-center border-b justify-between">
                <div className="text-[14px] font-medium flex text-[#242424] items-center gap-2">
                  Active Paid Topics
                </div>
                <div
                  className={`text-[10px] font-medium p-2  ${
                    item?.status?.validity === "Expired"
                      ? "bg-red-500 text-[#fff]"
                      : "bg-[#28ff41] text-[#000]"
                  } bg-[#28ff41] rounded-xl`}
                >
                  {item?.status?.validity === "Expired" ? "Expired" : "Active"}
                </div>
              </div>
              <div className="flex py-2 items-center gap-2">
                <div className="h-[40px] w-[40px] border flex items-center justify-center rounded-2xl">
                  <img
                    src={item?.status?.dp}
                    className="w-[100%] h-[100%] object-contain rounded-2xl"
                  />
                </div>
                <div className="flex justify-between items-center w-[80%]">
                  <div className=" ">
                    <div className="text-[12px] text-[#171717] font-semibold">
                      {item?.status?.community}
                    </div>
                    <div className="flex gap-2 items-center text-[#a2a2a2]">
                      <div className="text-[12px]  font-medium">
                        Topic: {item?.status?.topic}
                      </div>
                      <div className="text-[10px] text-[#a2a2a2] flex items-center gap-1 font-medium">
                        <div className="h-1 w-1 rounded-full bg-[#a2a2a2]"></div>
                        <div>{item?.status?.topicmembers} members</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[14px]">₹ 499</div>
                </div>
              </div>
              <Link
                href={{
                  pathname: "/library/Subscription",
                  query: { subscription: JSON.stringify(item) }, // Pass the cart as a query parameter
                }}
                className="flex pt-2  items-center border-t justify-between"
              >
                <div className="text-[10px] font-medium flex text-[#282828] items-center gap-2">
                  Click here to View Details
                </div>
                <div className="text-[10px] flex items-center gap-2 font-semibold p-2 text-[#000] border border-dashed bg-[#ffffff] rounded-xl">
                  <MdKeyboardArrowRight />
                </div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="h-[100%] w-full flex items-center justify-center">
          {" "}
          <Image
            alt="cartpic"
            src={Tracksub}
            className="h-[140px] w-[140px] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Subscription;
