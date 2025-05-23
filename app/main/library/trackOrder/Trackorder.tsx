import Image from "next/image";
import React from "react";
import { CgTimelapse } from "react-icons/cg";
// import { IoStorefrontOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import Trackord from "../../../assets/trackord.png";
import Link from "next/link";

type Order = {
  timing: string;
  currentStatus?: string;
  data: {
    currentStatus: string;
    productId: {
      images: { content: string }[];
      name: string;
    };

    seller: { username: string; fullname: string };
  }[];
  totalamount: number;
};

const Trackorder = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="h-[100%] bg-white space-y-2 overflow-y-auto dark:bg-[#ffffff]">
      {/*-----------------tarck order box---------------*/}
      {/* /* arriving  */}
      {orders?.length > 0 ? (
        orders.map(
          (item: Order, index: number) =>
            item?.data?.length > 0 && (
              <div key={index} className=" w-full p-2 border-b ">
                <div className="h-full p-2 border bg-white w-full  rounded-3xl ">
                  <div className="flex pb-2 items-center border-b justify-between">
                    <div className="text-[12px] font-medium flex text-[#518a9c] items-center gap-2">
                      <CgTimelapse /> {item?.timing}
                    </div>
                    <div
                      className={`text-[10px] font-medium p-2 text-[#000] ${
                        item?.currentStatus === "pending" ||
                        item?.currentStatus === "processing"
                          ? "bg-green-400"
                          : item?.currentStatus === "cancelled" ||
                            item?.currentStatus === "failed"
                          ? "bg-red-500"
                          : "bg-green-500"
                      } bg-[#82DBF7] rounded-xl`}
                    >
                      {item?.currentStatus === "pending" ||
                      item?.currentStatus === "processing"
                        ? "Arriving"
                        : item?.currentStatus === "cancelled" ||
                          item?.currentStatus === "failed"
                        ? "Cancelled"
                        : "Arrived"}
                    </div>
                  </div>
                  <div className="flex py-2 items-center gap-2">
                    {item?.data[0]?.productId?.images[0]?.content && (
                      <div className="h-[60px] w-[60px]  border flex items-center justify-center rounded-xl">
                        <img
                          src={item?.data[0]?.productId?.images[0]?.content}
                          className="w-[100%] h-[100%] rounded-xl object-cover"
                        />
                      </div>
                    )}
                    <div className="text-[#171717]">
                      {item?.data[0]?.productId?.name ? (
                        <div className="text-[14px] font-semibold">
                          {item?.data[0]?.productId?.name}
                        </div>
                      ) : (
                        <div className="text-[14px] font-semibold ">
                          Product Deleted
                        </div>
                      )}
                      <div className="text-[12px] font-medium">
                        {" "}
                        by {item?.data[0]?.seller?.fullname}
                      </div>
                    </div>
                  </div>
                  <div className="flex pt-2 items-center border-t justify-between">
                    <div className="text-[14px] font-medium flex text-[#282828] items-center gap-2">
                      <div> Items: {item?.data?.length}</div>
                      {item?.totalamount && <div>| ₹ {item?.totalamount}</div>}
                    </div>
                    <Link
                      href={{
                        pathname: "../library/trackOrder",
                        query: {
                          orders: JSON.stringify(item), // pass individual order here
                        },
                      }}
                      className="text-[10px] cursor-pointer hover:bg-slate-100 flex items-center gap-2 font-semibold p-2 text-[#000] border border-dashed bg-[#ffffff] rounded-xl"
                    >
                      View <MdKeyboardArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            )
        )
      ) : (
        <div className="h-[100%] w-full flex items-center justify-center">
          {" "}
          <Image
            alt="order"
            src={Trackord}
            className="h-[140px] w-[140px] object-contain"
          />
        </div>
      )}
      {/* Arrived  */}
      {/* <div className=" w-full p-2 border-b ">
        <div className="h-full p-2 border bg-white w-full  rounded-3xl ">
          <div className="flex pb-2 items-center border-b justify-between">
            <div className="text-[14px] font-medium flex text-[#69ff44] items-center gap-2">
              <IoStorefrontOutline /> Delivered on 29.06.2022, 15:18
            </div>
            <div className="text-[10px] font-medium p-2 text-[#000] bg-[#69ff44] rounded-xl">
              Arrived
            </div>
          </div>
          <div className="flex py-2 items-center gap-2">
            <div className="h-[60px] w-[60px] border flex items-center justify-center rounded-lg">
              pro
            </div>
            <div className="text-[#171717]">
              <div className="text-[14px] font-semibold">Product Name</div>
              <div className="text-[12px] font-medium"> by User</div>
            </div>
          </div>
          <div className="flex pt-2 items-center border-t justify-between">
            <div className="text-[14px] font-medium flex text-[#282828] items-center gap-2">
              <div> Items: 1</div> | <div>₹ 50</div>
            </div>
            <div className="text-[10px] flex items-center gap-2 font-semibold p-2 text-[#000] border border-dashed bg-[#ffffff] rounded-xl">
              View <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div> */}
      {/* Cancelled  */}
      {/* <div className=" w-full p-2 border-b ">
        <div className="h-full p-2 border bg-white w-full  rounded-3xl ">
          <div className="flex pb-2 items-center border-b justify-between">
            <div className="text-[14px] font-semibold flex text-[#ff4848] items-center gap-2">
              <MdCancel /> Pickup was unsuccessful
            </div>
            <div className="text-[10px] font-semibold p-2 text-[#000] bg-[#ff4848] rounded-xl">
              Cancelled
            </div>
          </div>
          <div className="flex py-2 items-center gap-2">
            <div className="h-[60px] w-[60px] border flex items-center justify-center rounded-lg">
              pro
            </div>
            <div className="text-[#171717]">
              <div className="text-[14px] font-semibold">Product Name</div>
              <div className="text-[12px] font-medium"> by User</div>
            </div>
          </div>
          <div className="flex pt-2 items-center border-t justify-between">
            <div className="text-[14px] font-medium flex text-[#282828] items-center gap-2">
              <div> Items: 1</div> | <div>₹ 50</div>
            </div>
            <div className="text-[10px] flex items-center gap-2 font-semibold p-2 text-[#000] border border-dashed bg-[#ffffff] rounded-xl">
              View <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div>{" "} */}
    </div>
  );
};

export default Trackorder;
