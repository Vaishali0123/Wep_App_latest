"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Emptycart from "../../../assets/emptycart.png";

const PageContent = () => {
  const searchParams = useSearchParams();
  const cart = searchParams.get("cart"); //
  const parsedCart = cart ? JSON.parse(cart) : null;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (cart) {
      setLoading(false);
    }
  }, [cart]);
  return (
    <div className="bg-white h-full w-full  flex flex-col items-center justify-center">
      {loading || parsedCart?.data?.length === 0 ? (
        <>
          <Image
            alt="compic"
            src={Emptycart}
            className="h-[200px] w-[200px] object-contain"
          />
          <div className="text-black text-[18px] my-4 font-semibold">
            Your Cart is Empty
          </div>
          <div className="text-[18px] text-slate-600  w-[45%] text-center">
            Your Cart is Empty Looks like you haven’t added anything to your
            cart yet
          </div>
        </>
      ) : (
        <>
          <div className=" border border-dotted rounded-2xl space-y-2 w-[60%] flex flex-col items-center p-4 ">
            {/* <div className="w-full ">Have a Coupon?</div>
       <div className="w-full flex items-center bg-[#ffffff] p-2 border border-dashed rounded-2xl">
         <div className="text-green-500 items-center flex justify-center h-[20px] w-[30px]">
           <TbRosetteDiscount />
         </div>
         <div />
         <input
           className="w-full outline-none"
           placeholder="Enter your coupon code"
         />
         <div className="text-[#3478ff] px-2 text-[14px]">Apply</div>
       </div> */}
            <div className="w-full ">
              PRICE DETAILS ({parsedCart?.data?.length} ITEMS)
            </div>
            <div className="w-full flex flex-col items-center bg-[#ffffff] p-2 border border-dashed rounded-2xl">
              <div className="flex w-full justify-between border-b p-2">
                <div className="text-[#000000] px-2 text-[14px]">Total MRP</div>
                <div className="text-[#3478ff] px-2 text-[14px]">
                  ₹ {parsedCart?.totalprice}
                </div>
              </div>
              <div className="flex w-full justify-between border-b p-2">
                <div className="text-[#000000] px-2 text-[14px]">
                  Discount on MRP
                </div>
                <div className="text-[#3478ff] px-2 text-[14px]">
                  -₹ {parsedCart?.discount}
                </div>
              </div>
              <div className="flex w-full justify-between border-b p-2">
                <div className="text-[#000000] px-2 text-[14px]">
                  Coupon Discount
                </div>
                <div className="text-[#3478ff] px-2 text-[14px]">₹ 0</div>
              </div>
              <div className="flex w-full justify-between border-b p-2">
                <div className="text-[#000000] px-2 text-[14px]">
                  Delivery Charge
                </div>
                <div className="text-[#3478ff] px-2 text-[14px]">
                  ₹ {parsedCart?.delivery ? parsedCart?.delivery : 0}
                </div>
              </div>
              <div className="flex w-full justify-between p-2">
                <div className="text-[#000000] px-2 text-[14px]">
                  Total Amount
                </div>
                <div className="text-[#3478ff] px-2 text-[14px]">
                  {" "}
                  ₹ {parsedCart?.totalprice}
                </div>
              </div>
            </div>
            <div className="w-full h-[40px]  flex items-center px-2 justify-between ">
              <div className="">Payment type</div>
              <div className="text-[#ffffff] px-2 bg-slate-800 rounded-2xl text-[14px]">
                COD
              </div>
            </div>
          </div>
          <div className="text-[#ffffff] mt-2 p-2 bg-slate-800 rounded-2xl text-[14px]">
            Place Order
          </div>
        </>
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
