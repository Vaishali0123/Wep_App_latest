import React from "react";

const Chat = () => {
  return (
    // <Link href="/feed" className=" w-full px-2 border-b bg-[#ff9090]">
    <>
      <div className="flex h-[60px] items-center border-b justify-between hover:bg-slate-50 active:bg-slate-100 bg-white px-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] border flex items-center justify-center rounded-2xl">
            Dp
          </div>
          <div className="text-[#171717]">
            <div className="text-[14px] font-semibold">Name</div>
            <div className="text-[12px] font-medium"> chat ...n.........</div>
          </div>
        </div>
        <div className=" bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-800 text-[12px] p-1 px-2 rounded-2xl">
          Accept
        </div>
      </div>
      {/* Loading */}
      <>
        <div className="flex h-[60px] items-center border-b bg-white px-2 gap-2">
          <div className="h-[40px] w-[40px] bg-slate-200 animate-pulse border flex items-center justify-center rounded-2xl"></div>
          <div className="text-[#171717] space-y-1">
            <div className="text-[14px] font-semibold w-[50px] p-2 bg-slate-200 animate-pulse rounded-2xl"></div>
            <div className="text-[12px] font-medium w-[80px] p-1 bg-slate-200 animate-pulse rounded-2xl"></div>
          </div>
        </div>
        <div className="flex h-[60px] items-center border-b bg-white px-2 gap-2">
          <div className="h-[40px] w-[40px] bg-slate-200 animate-pulse border flex items-center justify-center rounded-2xl"></div>
          <div className="text-[#171717] space-y-1">
            <div className="text-[14px] font-semibold w-[50px] p-2 bg-slate-200 animate-pulse rounded-2xl"></div>
            <div className="text-[12px] font-medium w-[80px] p-1 bg-slate-200 animate-pulse rounded-2xl"></div>
          </div>
        </div>{" "}
        <div className="flex h-[60px] items-center border-b bg-white px-2 gap-2">
          <div className="h-[40px] w-[40px] bg-slate-200 animate-pulse border flex items-center justify-center rounded-2xl"></div>
          <div className="text-[#171717] space-y-1">
            <div className="text-[14px] font-semibold w-[50px] p-2 bg-slate-200 animate-pulse rounded-2xl"></div>
            <div className="text-[12px] font-medium w-[80px] p-1 bg-slate-200 animate-pulse rounded-2xl"></div>
          </div>
        </div>{" "}
        <div className="flex h-[60px] items-center border-b bg-white px-2 gap-2">
          <div className="h-[40px] w-[40px] bg-slate-200 animate-pulse border flex items-center justify-center rounded-2xl"></div>
          <div className="text-[#171717] space-y-1">
            <div className="text-[14px] font-semibold w-[50px] p-2 bg-slate-200 animate-pulse rounded-2xl"></div>
            <div className="text-[12px] font-medium w-[80px] p-1 bg-slate-200 animate-pulse rounded-2xl"></div>
          </div>
        </div>
      </>
    </>
    // </Link>
  );
};

export default Chat;
