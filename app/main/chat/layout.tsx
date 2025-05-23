"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import axios from "axios";
import { API, encryptData } from "@/app/utils/helpers";
import { useAuthContext } from "@/app/auth/components/auth";
import toast, { Toaster } from "react-hot-toast";
interface RequestData {
  friends: { username: string; profilepic: string; _id: string }[];
  msgrequestsent: { username: string; _id: string }[];
  messagerequests: {
    username: string;
    _id: string;
    profilepic: string;
    fullname: string; // Also adding fullname since it's used in the template
  }[];
}
interface Friend {
  _id: string;
  username: string;
  profilepic: string;
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [switcher, setSwitcher] = useState(0);

  const chatheader = useSelector(
    (state: RootState) => state.comFeed.chatheader
  );
  const [requestData, setRequestData] = useState<RequestData>({
    friends: [],
    msgrequestsent: [],
    messagerequests: [],
  });
  // const [recId, setRecId] = useState();
  const { data: userData } = useAuthContext();
  const [friends, setFriends] = useState<Friend[]>([]);
  const id = userData?.id;
  const request = async () => {
    try {
      if (!id) return;
      const res = await axios.get(`${API}/getRequest/${id}`);
      const data = res?.data?.data;

      setRequestData({
        friends: data?.friends || [],
        msgrequestsent: data?.msgrequestsent || [],
        messagerequests: data?.messagerequests || [],
      });
      // setRecId(data?.messagerequests?.[0]?.id);
    } catch (e) {
      console.log(e);
    }
  };
  const acceptRequest = async (
    id: string,
    senderId: string,
    action: string
  ) => {
    try {
      await axios.post(`${API}/acceptRequest/${id}/${senderId}`, { action });
      toast.success("Request accepted successfully");
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };
  const getfriends = async () => {
    try {
      const res = await axios.get(`${API}/getfriends/${id}`);
      setFriends(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!id) return;
    getfriends();
  }, []);

  return (
    <div className="h-full bg-slate-900 flex w-full pn:max-sm:border-none pn:max-sm:w-full">
      <Toaster />
      <div
        className={`${
          chatheader === true
            ? "pn:max-sm:hidden h-full border-r bg-white pn:max-sm:w-full sm:w-[25%] sm:min-w-[400px]"
            : "h-full border-r bg-white pn:max-sm:w-full sm:w-[25%] sm:min-w-[400px]"
        }`}
      >
        {/* header  */}
        <div className="h-[50px] w-full  bg-white select-none border-b flex justify-between items-center px-2">
          <div
            onClick={() => setSwitcher(0)}
            className="font-semibold text-[25px] cursor-pointer active:bg-slate-100 hover:bg-slate-50 rounded-2xl"
          >
            Chats
          </div>
          <div
            onClick={() => {
              request();
              if (switcher !== 1) {
                setSwitcher(1);
              } else {
                setSwitcher(0);
              }
            }}
            className={`text-[#483cf4] cursor-pointer active:bg-slate-100 hover:bg-slate-50 ${
              switcher === 1 && "bg-slate-100"
            } rounded-2xl p-2 text-[14px] font-medium`}
          >
            Requests({requestData?.messagerequests?.length})
          </div>
        </div>
        {/* all requests  */}
        {switcher === 1 && requestData?.messagerequests?.length > 0
          ? Object.entries(requestData).map(
              ([section, array]) =>
                section === "messagerequests" && (
                  <div key={section}>
                    <div className="text-sm font-bold capitalize my-2 ml-2">
                      Requests
                    </div>
                    {array.map(
                      (
                        item: {
                          username: string;
                          _id: string;
                          profilepic: string;
                          fullname: string;
                        },
                        index: number
                      ) => (
                        <Link
                          // href={`../chat/username=${item?._id}`}
                          href={{
                            pathname: `/main/chat/messages`, // navigates to messages/page.tsx
                            query: {
                              id: item?._id,
                              // username: item?.username,
                              // profilepic: item?.profilepic,
                            },
                          }}
                          key={index}
                          className="flex h-[60px] items-center border-b justify-between hover:bg-slate-50 active:bg-slate-50 bg-slate-100 px-2 gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-[40px] w-[40px] border flex items-center justify-center rounded-[16px]">
                              <img
                                src={item?.profilepic}
                                alt="dp"
                                className="w-[100%] h-[100%] object-cover rounded-[16px]"
                              />
                            </div>
                            <div className="text-[#171717]">
                              <div className="text-[14px] font-semibold">
                                {item?.fullname}
                              </div>
                              <div className="text-[12px] font-medium">
                                {item?.username}
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              if (id && item?._id) {
                                acceptRequest(id, item?._id, "Accepted");
                              }
                            }}
                            className=" bg-blue-700 text-white cursor-pointer hover:bg-blue-600 active:bg-blue-800 text-[12px] p-1 px-2 rounded-2xl"
                          >
                            Accept
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                )
            )
          : switcher === 1 && (
              <div className="text-black bg-slate-100 py-2 text-[14px] font-semibold justify-center flex w-[100%]">
                No Requests Available
              </div>
            )}
        {/* all chats  */}
        {friends.length > 0
          ? friends?.map((item, index) => (
              <Link
                // href={`../chat/${
                //   item?.username
                // }?profilepic=${encodeURIComponent(item?.profilepic)}&id=${
                //   item?._id
                // }`}
                href={{
                  pathname: "/main/chat/messages",
                  query: {
                    xyz: encryptData({
                      id: item?._id,
                      username: item?.username,
                      profilepic: item?.profilepic,
                    }),
                  },
                }}
                // href={{
                //   pathname: `/chat/messages`, // navigates to messages/page.tsx
                //   query: {

                //     id: item?._id,
                //     username: item?.username,
                //     profilepic: item?.profilepic,
                //   },
                // }}
                key={index}
                className="flex h-[60px] items-center border-b justify-between hover:bg-slate-100 active:bg-slate-100 bg-white px-2 gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="h-[40px] w-[40px] border flex items-center justify-center rounded-2xl">
                    <img
                      src={item?.profilepic}
                      alt=""
                      className="h-full w-full rounded-[16px] object-cover"
                    />
                  </div>
                  <div className="text-[#171717]">
                    <div className="text-[14px] font-semibold">
                      {item?.username}
                    </div>
                    <div className="text-[12px] font-medium text-slate-600">
                      Start new conversation
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>
      {/* main  */}
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
