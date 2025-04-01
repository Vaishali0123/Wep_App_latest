import Image from "next/image";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import Emptycart from "../../../assets/emptycart.png";

import { CartItem } from "../layout";

// type CartItem = {
//   product: {
//     images: { content: string }[];
//     name: string;
//     brandname: string;
//     discountedprice: number;
//     price: number;
//     discount: number;
//   };
//   quantity: number;
// };

const Cart = ({
  cart,
}: {
  cart: { data: Array<CartItem>; totalprice: number };
}) => {
  // const [cart, setCart] = useState([]);
  // const discountPercentage =
  //   cart?.product?.price && cart?.product?.discountedprice
  //     ? (
  //         ((cart?.product?.price - cart?.product?.discountedprice) /
  //           cart?.product?.price) *
  //         100
  //       ).toFixed(0)
  //     : 0;

  return (
    <div className="h-[100%] flex flex-col items-center w-full space-y-2 overflow-y-auto  dark:bg-[#ffffff]">
      {/*-----------------cart box--------------------- */}
      {cart?.data?.length > 0 ? (
        cart?.data?.map((item: CartItem, index: number) => (
          <div key={index} className=" w-full  px-2 border-b ">
            <div className="h-full min-w-[196px] w-full  rounded-3xl ">
              <div className="flex py-2 items-center gap-2">
                <div className="h-[90px] w-[90px] border flex items-center justify-center rounded-lg">
                  <img
                    src={item?.product?.images[0]?.content}
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
                <div className="text-[#171717]">
                  <div className="text-[14px] font-semibold">
                    {" "}
                    {item?.product?.name}
                  </div>
                  <div className="text-[12px] font-medium">
                    {" "}
                    by {item?.product?.brandname}
                  </div>
                  <div className="gap-2 flex items-center">
                    <div className="text-[12px] font-medium">
                      ₹{item?.product?.price - item?.product?.discount}
                    </div>
                    <div className="text-[10px] text-[#4e4e4e] font-medium">
                      <s>₹{item?.product?.price}</s>
                    </div>
                    <div className="text-[12px] text-green-500 font-medium">
                      {(
                        (item?.product?.discount / item?.product?.price) *
                        100
                      ).toFixed(0)}
                      % off
                    </div>
                  </div>
                  <div className="text-[12px] border p-1 m-1  rounded-xl justify-between flex items-center gap-2 font-medium">
                    <div className="h-[20px] w-[20px] text-[14px] flex items-center justify-center border rounded-lg">
                      <RiSubtractLine />
                    </div>
                    <div> {item?.quantity}</div>
                    <div className="h-[20px] w-[20px] text-[14px] flex items-center justify-center border rounded-lg">
                      <IoIosAdd />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-[100%] w-full flex items-center justify-center">
          {" "}
          <Image
            alt="cartpic"
            src={Emptycart}
            className="h-[140px] w-[140px] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
