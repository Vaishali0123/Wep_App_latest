import Image from "next/image";
import React from "react";
import { CgTimelapse } from "react-icons/cg";
// import { IoStorefrontOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import Trackord from "../../../assets/trackord.png";

type Order = {
  data: {
    currentStatus: string;
    productId: {
      images: { content: string }[];
      name: string;
    };
    seller: { username: string };
  }[];
  totalamount: number;
};

const Trackorder = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="h-[100%] bg-green-300 space-y-2 overflow-y-auto dark:bg-[#ffffff]">
      {/*-----------------tarck order box---------------*/}
      {/* /* arriving  */}
      {orders?.length > 0 ? (
        orders.map((item: Order, index: number) => (
          <div key={index} className=" w-full p-2 border-b ">
            <div className="h-full p-2 border bg-white w-full  rounded-3xl ">
              <div className="flex pb-2 items-center border-b justify-between">
                <div className="text-[14px] font-medium flex text-[#82DBF7] items-center gap-2">
                  <CgTimelapse /> Estimated arrival by tomorrow
                </div>
                <div className="text-[10px] font-medium p-2 text-[#000] bg-[#82DBF7] rounded-xl">
                  {item?.data[0]?.currentStatus === "success" ||
                  item?.data[0]?.currentStatus === "pending" ||
                  item?.data[0]?.currentStatus === "processing"
                    ? "Arriving"
                    : item?.data[0]?.currentStatus === "cancelled" ||
                      item?.data[0]?.currentStatus === "failed"
                    ? "Cancelled"
                    : "Returned"}
                </div>
              </div>
              <div className="flex py-2 items-center gap-2">
                <div className="h-[60px] w-[60px]  border flex items-center justify-center rounded-lg">
                  <img
                    src={item?.data[0]?.productId?.images[0]?.content}
                    className="w-[100%] h-[100%] rounded-lg object-cover"
                  />
                </div>
                <div className="text-[#171717]">
                  <div className="text-[14px] font-semibold">
                    {item?.data[0]?.productId?.name}
                  </div>
                  <div className="text-[12px] font-medium">
                    {" "}
                    by {item?.data[0]?.seller?.username}
                  </div>
                </div>
              </div>
              <div className="flex pt-2 items-center border-t justify-between">
                <div className="text-[14px] font-medium flex text-[#282828] items-center gap-2">
                  <div> Items: {item?.data?.length}</div> |{" "}
                  <div>₹ {item?.totalamount}</div>
                </div>
                <div className="text-[10px] flex items-center gap-2 font-semibold p-2 text-[#000] border border-dashed bg-[#ffffff] rounded-xl">
                  View <MdKeyboardArrowRight />
                </div>
              </div>
            </div>
          </div>
        ))
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
