"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import Trackord from "../../../assets/trackord.png";
import { useSearchParams } from "next/navigation";

type Orderdata = {
  images?: { content: string }[];
  currentStatus: string;
  productId: {
    images: { content: string }[];
    name: string;
  };
  totalprice: number;
  seller: { username: string };
};

const PageContent = () => {
  const searchParams = useSearchParams();
  const orders = searchParams.get("orders"); //
  const parsedorders = orders ? JSON.parse(orders) : null;

  return (
    <div className="bg-white h-full w-full flex items-center justify-center">
      {parsedorders?.data?.length > 0 ? (
        <div className="bg-white border border-dotted rounded-2xl space-y-2 w-[60%] flex flex-col items-center p-4 ">
          <div className="w-full flex justify-between items-center">
            <div className="">Items in order</div>
            <div className=" font-bold">
              {parsedorders?.data?.length}{" "}
              {parsedorders?.data?.length > 1 ? "items" : "item"}
            </div>
          </div>
          {/* All Product with Details */}
          {parsedorders?.data?.map((item: Orderdata, index: number) => (
            <div
              key={index}
              className="flex py-2 bg-white items-center justify-between w-full gap-2"
            >
              <div className="flex py-2 items-center gap-2">
                <div className="h-[60px] w-[60px] border flex items-center justify-center rounded-xl">
                  <img
                    src={item?.productId?.images?.[0]?.content}
                    alt="pic"
                    className="object-cover w-[100%] h-[100%] rounded-xl"
                  />
                </div>
                <div className="text-[#171717]">
                  <div className="text-[14px] font-semibold">
                    {item?.productId?.name}
                  </div>
                  {/* <div className="text-[12px] font-medium"> by Brand or Seller</div> */}
                </div>
              </div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                ₹ {item?.totalprice}
              </div>
            </div>
          ))}

          <div className="w-full font-semibold ">Bill details</div>
          <div className="w-full flex flex-col items-center bg-[#ffffff] p-2 border border-dashed rounded-2xl">
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">
                Total Amount
              </div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                ₹ {parsedorders?.totalamount}
              </div>
            </div>
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">
                Handling Charges
              </div>
              <div className="text-[#3478ff] px-2 text-[14px]">₹ 0</div>
            </div>
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">
                Delivery Charges
              </div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                ₹{" "}
                {parsedorders?.deliverycharges
                  ? parsedorders?.deliverycharges
                  : 0}
              </div>
            </div>
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px] font-semibold">
                Paid
              </div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                ₹ {parsedorders?.totalamount}
              </div>
            </div>
          </div>
          <div className="w-full font-semibold">Order details</div>
          <div className="w-full flex flex-col items-center bg-[#ffffff] p-2 border border-dashed rounded-2xl">
            {/* <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">Order ID</div>
              <div className="text-[#000000] flex  px-2 text-[14px]">
                M2Z4-VVY2{" "}
                <div className="text-[#3478ff]  px-2 text-[14px]">Copy</div>
              </div>
            </div> */}
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">
                Order placed
              </div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                {`Placed on ${new Date(parsedorders?.createdAt)
                  .getDate()
                  .toString()
                  .padStart(2, "0")} ${new Date(
                  parsedorders?.createdAt
                ).toLocaleString("en-US", { month: "short" })}’${new Date(
                  parsedorders?.createdAt
                )
                  .getFullYear()
                  .toString()
                  .slice(-2)}, ${new Date(
                  parsedorders?.createdAt
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}`}
              </div>
            </div>
            <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">
                Payment Mode
              </div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                {parsedorders?.paymentMode
                  ? parsedorders?.paymentMode
                  : "Cash on Delivery"}
              </div>
            </div>
            {/* Address */}
            {/* <div className="flex w-full justify-between border-b p-2">
              <div className="text-[#000000] px-2 text-[14px]">Delivery at</div>
              <div className="text-[#3478ff] px-2 text-[14px]">
                {parsedorders?.address?.houseNo},{" "}
                {parsedorders?.address?.streetAddress},{" "}
                {parsedorders?.address?.city}, {parsedorders?.address?.state},{" "}
                {parsedorders?.address?.pincode}
              </div>
            </div> */}
          </div>
          {/* <div className="w-full h-[40px]  flex items-center px-2 justify-between ">
            <div className="">PRICE type</div>
            <div className="text-[#ffffff] px-2 bg-slate-800 rounded-2xl text-[14px]">
              Place Order
            </div>
          </div> */}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            alt="order"
            src={Trackord}
            className="h-[200px] w-[200px] object-contain"
          />
          <div className="text-black text-[18px] my-4 font-semibold">
            No Order Yet
          </div>
          <div className="text-[18px] text-slate-600  w-[60%] text-center">
            Your smile is our favorite purchase, even when there&apos;s No Order
            Yet.
          </div>
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
