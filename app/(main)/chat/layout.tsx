"use client";
import { useState } from "react";
import Link from "next/link";
import Chat from "./components/Chat";
import { useDispatch, useSelector } from "react-redux";
import { setChatHeader } from "@/app/redux/slices/comFeed";
import { RootState } from "@/app/redux/store";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [switcher, setSwitcher] = useState(1);
  const dispatch = useDispatch();
  const chatheader = useSelector(
    (state: RootState) => state.comFeed.chatheader
  );
  // const [requestData, setRequestData] = useState("");

  // const request = async () => {
  //   try {
  //     const res = await axios.get(`${API}/getRequest/${id}`);
  //     setRequestData(res?.data?.data);
  //     console.log(res?.data?.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   request();
  // }, []);

  return (
    <div className="h-full bg-slate-600 flex w-full pn:max-sm:border-none pn:max-sm:w-full">
      <div
        className={`${
          chatheader === true
            ? "pn:max-sm:hidden h-full border-r bg-black pn:max-sm:w-full sm:w-[25%] sm:min-w-[400px]"
            : "h-full border-r bg-black pn:max-sm:w-full sm:w-[25%] sm:min-w-[400px]"
        }`}
      >
        <div className="h-[50px] w-full  bg-white select-none border-b flex justify-between items-center px-2">
          <div
            onClick={() => setSwitcher(0)}
            className="font-semibold text-[25px] cursor-pointer active:bg-slate-100 hover:bg-slate-50 rounded-2xl"
          >
            Chats
          </div>
          <div
            onClick={() => setSwitcher(1)}
            className="text-[#483cf4] cursor-pointer active:bg-slate-100 hover:bg-slate-50 rounded-2xl p-2 text-[14px] font-medium"
          >
            Requests(0)
          </div>
        </div>
        {/* body  */}
        {switcher === 1 ? (
          <div
            style={{ height: "calc(100% - 50px)" }}
            className=" w-full pn:max-sm:h-full bg-red-600 overflow-auto"
          >
            <Link
              onClick={() => dispatch(setChatHeader(true))}
              href={"../chat"}
            >
              <Chat />
            </Link>
          </div>
        ) : (
          <div
            style={{ height: "calc(100% - 50px)" }}
            className=" w-full pn:max-sm:h-full bg-white overflow-auto"
          >
            <Link
              onClick={() => dispatch(setChatHeader(true))}
              href={"../chat"}
            >
              <Chat />
            </Link>
          </div>
        )}
      </div>
      <div
        className={`${
          chatheader === true
            ? "w-full"
            : "h-screen  sm:w-full bg-red-600 pn:max-sm:hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
