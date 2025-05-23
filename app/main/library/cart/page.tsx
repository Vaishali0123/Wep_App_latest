"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Emptycart from "../../../assets/emptycart.png";
import axios from "axios";
import { API, errorHandler } from "@/app/utils/helpers";
import { useAuthContext } from "@/app/auth/components/auth";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const PageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const cart = searchParams.get("cart");
  const raw = searchParams.get("cart");

  const parsedCart = JSON.parse(raw as string);
  const addressId = useSelector(
    (state: RootState) => state.user.userData.address._id
  );
  // const parsedCart = cart ? JSON.parse(cart) : null;
  const [loading, setLoading] = useState(true);

  const { data } = useAuthContext();
  const [load, setLoad] = useState(false);
  const buynow = async () => {
    try {
      setLoad(true);

      if (!data?.id) {
        toast.error("User not found! Please login or refresh the page.");
        setLoad(false);
        return;
      }
      if (!addressId) {
        toast.error("Please select or add an address");
        setLoad(false);

        return;
      }
      if (parsedCart?.data?.length === 0) {
        toast.error("Cart is empty!");
        setLoad(false);

        return;
      }

      const res = await axios.post(`${API}/placeorder/${data?.id}`, {
        cartId: parsedCart._id,
        paymentMode: "Cash",
        finalprice: parsedCart.totalprice,
        discount: parsedCart.discount,
        addressId: addressId,
      });

      if (res?.data?.success) {
        toast.success("Order placed successfully!");
        router.refresh();
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (e) {
      errorHandler(e);
    }
    setLoad(false);
  };

  useEffect(() => {
    if (parsedCart) {
      setLoading(false);
    }
  }, [parsedCart]);

  return (
    <div className="bg-white h-full w-full  flex flex-col items-center justify-center">
      <Toaster />
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
                <div className="text-black px-2 text-[14px]">
                  ₹ {parsedCart?.totalprice}
                </div>
              </div>
              {/* <div className="flex w-full justify-between p-2">
                <div className="text-[#000000] px-2 text-[14px]">Quantity</div>
                <div className="text-black px-2 text-[16px] font-semibold">
                  {parsedCart?.quantity}
                </div>
              </div> */}
              <div className="flex w-full justify-between border-b p-2">
                <div className="text-[#000000] px-2 text-[14px]">
                  Discount on MRP
                </div>
                <div className="text-black px-2 text-[14px]">
                  -₹ {parsedCart?.discount}
                </div>
              </div>
              {/* <div className="flex w-full justify-between border-b p-2">
                <div className="text-[#000000] px-2 text-[14px]">
                  Coupon Discount
                </div>
                <div className="text-[#3478ff] px-2 text-[14px]">₹ 0</div>
              </div> */}
              <div className="flex w-full justify-between border-b border-black p-2">
                <div className="text-[#000000] px-2 text-[14px]">
                  Delivery Charge
                </div>
                <div className="text-[#4BD58B] px-2 text-[14px]">
                  {parsedCart?.delivery ? "₹ " + parsedCart?.delivery : "Free"}
                </div>
              </div>
              <div className="flex w-full justify-between p-2">
                <div className="text-[#000000] px-2 text-[14px]">
                  Total Amount
                </div>
                <div className="text-black px-2 text-[16px] font-semibold">
                  {" "}
                  ₹ {parsedCart?.totalprice}
                </div>
              </div>
            </div>
            <div className="w-full border rounded-2xl p-4 bg-white shadow-md">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Payment Method
              </h3>
              <div className="flex gap-3">
                {/* UPI Option */}
                <div className="flex items-center gap-2 bg-[#3b82f6] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 17l6-6-6-6M14 17l6-6-6-6"
                    />
                  </svg>
                  UPI
                </div>

                {/* Cash on Delivery Option */}
                <div className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a4 4 0 00-8 0v2M5 13h14l1 9H4l1-9z"
                    />
                  </svg>
                  Cash on Delivery
                </div>
              </div>
            </div>
          </div>
          <button
            disabled={load}
            onClick={() => {
              buynow();
            }}
            className="text-[#ffffff] w-[60%]  flex items-center justify-center cursor-pointer hover:bg-slate-700 active:bg-slate-800 py-2 mt-4 bg-black rounded-xl text-[14px]"
          >
            Place Order
          </button>
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
