"use client";
import { useAuthContext } from "@/app/auth/components/auth";
import { API, decryptData, errorHandler } from "@/app/utils/helpers";
import { sendMessage, socket } from "@/app/utils/socket";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BiHide } from "react-icons/bi";
// import Keyboard from "../components/Keyboard";
import { BsEmojiSmile, BsReplyAll } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
interface Chat {
  roomId: string;
  sender: string;
  text: string;
  date: number;
}

interface MessageData {
  roomId: string;
  sender: string;
  text: string;
  date: number;
}
const PageContent = () => {
  const [message, setMessage] = useState<string>("");
  // const [open, setOpen] = useState<boolean>(false);
  const [chat, setchat] = useState<Chat[]>([]);
  const [click, setClick] = useState<boolean>(true);
  const [popUp, setPopUp] = useState<boolean>(true);
  const [popOut, setPopOut] = useState<boolean>(true);
  // const [extractedUsername, setExtractedUsername] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data } = useAuthContext();

  const senderId = data?.id;
  const userdp = data?.dp;

  const searchParams = useSearchParams();
  const encrypted = searchParams.get("xyz"); //Encrypted data
  const msgdataencrypted = decryptData(encrypted || "");
  const id = msgdataencrypted.id;
  const profilepic = msgdataencrypted.profilepic;
  // const { username: extractedUsername } = useParams();
  const extractedUsername = msgdataencrypted.username;

  // useEffect(() => {
  //   // Extract username using regex from the full URL
  //   const extractUsernameFromUrl = () => {
  //     if (typeof window !== "undefined") {
  //       const url = window.location.href;
  //       const usernameRegex = /username=([^&/]+)/;
  //       const match = url.match(usernameRegex);

  //       if (match && match[1]) {
  //         setExtractedUsername(match[1]);
  //         console.log("Extracted username:", match[1]);
  //       } else {
  //         console.log("Username not found in URL");
  //       }
  //     }
  //   };

  //   extractUsernameFromUrl();
  // }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = ` ${textareaRef.current.scrollHeight}px`;
    }
  };
  const textareaHeight = textareaRef.current
    ? textareaRef.current.offsetHeight - 40
    : 0;
  // console.log(textareaHeight, "textareaHeight");
  const dynamicHeight = `calc(100% - 102px - ${textareaHeight}px)`;

  const handleSend = () => {
    if (message.trim() && extractedUsername) {
      if (!message.trim() || !extractedUsername || !id || !senderId) {
        return;
      }
      const msgData: MessageData = {
        roomId: id,
        sender: senderId,
        text: message,
        date: Date.now(),
      };

      // sendMessage(message, id);
      sendMessage(msgData);
      saveMessage(message);
      setMessage("");
      setchat([...chat, msgData]);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (data) => {
        setchat((prev) => [...prev, data]);
        console.log("Received message:", data);
      });
    }

    return () => {
      if (socket) {
        socket.off("receive-message");
      }
    };
  }, [socket]);

  const saveMessage = async (message: string) => {
    try {
      await axios.post(`${API}/saveMessage/${id}`, {
        senderId: senderId,
        text: message,
        type: "message",
        date: Date.now(),
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  const getmessages = async () => {
    try {
      const res = await axios.get(`${API}/getmessages/${senderId}/${id}`);

      setchat(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!senderId || !id) return;
    getmessages();
  }, [id]);

  return (
    <div className="h-screen w-full relative">
      <Toaster />
      {/* header  */}
      <div className="h-[50px] w-full bg-white border-b px-2 flex items-center justify-between ">
        <div className="gap-2 flex items-center">
          <IoChevronBack className="h-[30px] w-[30px] rounded-2xl md:hidden " />
          <div className="h-[40px] w-[40px] rounded-2xl bg-slate-100 ">
            <img
              src={profilepic ? profilepic : ""}
              alt="dp"
              className="h-full w-full rounded-[16px] object-cover"
            />
          </div>
          <div className="">
            <div className="">{extractedUsername || "Loading.."}</div>
            {/* <div className="text-[12px]">offline</div> */}
          </div>
        </div>
        {/* <div
          onClick={() => setClick(false)}
          className="h-[40px] w-[40px] text-[#171717] hover:bg-slate-50 active:bg-slate-100 bg-white border border-dashed rounded-2xl flex items-center justify-center "
        >
          <HiMenuAlt3 className="h-5 w-5" />
        </div> */}
      </div>
      {/* main  */}
      <div
        style={{ height: dynamicHeight }}
        className="w-full overflow-auto bg-slate-50"
      >
        {chat.map((item: Chat, index: number) => (
          <div
            key={index}
            onClick={() => setPopUp(true)}
            className={`flex  mt-2 gap-2 pl-1 ${
              item?.sender?.toString() === senderId?.toString()
                ? " flex-row-reverse jestify-end"
                : "justify-start"
            }`}
          >
            <div className="text-center">
              <div
                className={`bg-slate-300 h-[40px] ${
                  item?.sender?.toString() === senderId?.toString() && "mr-2"
                } w-[40px] rounded-[16px]`}
              >
                <img
                  src={userdp ? userdp : ""}
                  alt="dp"
                  className="h-full w-full rounded-[16px] object-cover"
                />
              </div>
              {/* Convert it into 1:50 */}
              <div className="text-[12px]">
                {new Date(item.date).getHours()}:
                {new Date(item.date).getMinutes().toString().padStart(2, "0")}
              </div>
            </div>
            <div className="mt-[6px] relative">
              <div className="text-[14px] text-end font-semibold">Aryansh</div>
              <div
                className={`bg-blue-400 p-2 ${
                  item?.sender?.toString() === senderId?.toString()
                    ? " rounded-br-2xl rounded-l-2xl"
                    : "rounded-r-2xl rounded-bl-2xl"
                }   min-w-fit relative max-w-[300px] `}
              >
                {item.text}
                {/* <div
                  onClick={() => setPopUp(false)}
                  className="bg-blue-400 absolute active:bg-blue-600 top-0 right-[4%] rotate-90 cursor-pointer"
                >
                  {">"}
                </div> */}
              </div>

              {/* pop UP  */}
              <div
                className={`absolute right-0 top-[20%] duration-150 ${
                  popUp === true
                    ? "p-0 border-0 bg-blue-400 rounded-none"
                    : "p-2 border  bg-white rounded-2xl"
                }`}
              >
                <div
                  className={`flex duration-100 items-center ${
                    popUp === true
                      ? "gap-0 py-0 opacity-0 text-[0px]"
                      : "gap-2 py-1 opacity-100"
                  }`}
                >
                  <TbSend2 />
                  Forword
                </div>
                <div
                  className={`flex duration-100 items-center ${
                    popUp === true
                      ? "gap-0 py-0 opacity-0  text-[0px]"
                      : "gap-2 py-1 opacity-100"
                  }`}
                >
                  {" "}
                  <BiHide />
                  Hide
                </div>
                <div
                  className={`flex duration-100 items-center ${
                    popUp === true
                      ? "gap-0 py-0 opacity-0  text-[0px]"
                      : "gap-2 py-1 opacity-100"
                  }`}
                >
                  <BsReplyAll />
                  Reply
                </div>
                <div
                  className={`flex text-red-600 duration-100 items-center ${
                    popUp === true
                      ? "gap-0 py-0 opacity-0  text-[0px]"
                      : "gap-2 py-1 opacity-100"
                  }`}
                >
                  <MdDeleteOutline />
                  Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Keyboard  */}
      <div
        //  ref={textareaRef}
        className="w-[100%] p-[5px] bg-white  flex items-end gap-2 h-auto"
      >
        <div className="h-[40px] w-[40px] border-dashed border flex items-center justify-center rounded-2xl">
          <BsEmojiSmile className="h-[20px] w-[20px]" />
        </div>

        <div className="h-[40px] relative w-[40px] border-dashed border flex items-center justify-center rounded-2xl cursor-pointer">
          <HiOutlineViewGridAdd
            onClick={() => {
              setPopOut(false);
            }}
            className="h-[20px] w-[20px]"
          />
          {/* pop UP  */}
          <div
            className={`absolute right-0 bottom-0 duration-150 rounded-2xl bg-white   ${
              popOut === true ? "p-0 border-0" : "p-2 border"
            }`}
          >
            <div
              className={`flex gap-2 py-1 duration-100 items-center ${
                popOut === true
                  ? "gap-0 py-0 opacity-0 text-[0px]"
                  : "gap-2 py-1 opacity-100"
              }`}
            >
              <TbSend2 />
              Document
            </div>
            <div
              className={`flex gap-2 py-1 duration-100 items-center ${
                popOut === true
                  ? "gap-0 py-0 opacity-0  text-[0px]"
                  : "gap-2 py-1 opacity-100"
              }`}
            >
              {" "}
              <BiHide />
              Photo & Video
            </div>{" "}
            <div
              className={`flex gap-2 py-1 duration-100 items-center ${
                popOut === true
                  ? "gap-0 py-0 opacity-0  text-[0px]"
                  : "gap-2 py-1 opacity-100"
              }`}
            >
              <BsReplyAll />
              Camera
            </div>{" "}
            <div
              className={`flex gap-2 py-1 text-red-600 duration-100 items-center ${
                popOut === true
                  ? "gap-0 py-0 opacity-0  text-[0px]"
                  : "gap-2 py-1 opacity-100"
              }`}
            >
              <MdDeleteOutline />
              Delete
            </div>
          </div>
        </div>

        {/* <div
                 className={`absolute bottom-full mt-1 border rounded-lg bg-white shadow-lg w-[25%] transform transition-all duration-200 ease-in-out ${
                   open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                 }`}
               >
                 <ul className="p-2">
                   <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                     Ad Option 1
                   </li>
                   <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                     Ad Option 2
                   </li>
                   <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                     Ad Option 3
                   </li>
                 </ul>
               </div>
        </div> */}

        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message here....."
          className="  w-[87%] bg-slate-50 outline-none rounded-2xl p-2 border-dashed border resize-none"
          style={{
            minHeight: "40px",
            maxHeight: "150px",
            lineHeight: "1.5",
            overflowY: "auto",
          }}
        />

        <div
          className="h-[40px] w-[40px] bg-slate-50 border-dashed border flex items-center justify-center rounded-2xl cursor-pointer"
          onClick={handleSend}
        >
          <CiLocationArrow1
            className={`h-[20px] w-[20px] ${
              message.trim() ? "text-black" : "text-black"
            }`}
          />
        </div>
      </div>
      <div
        className={`h-full w-[40%] duration-200 right-[0%] ease-in-out bg-slate-400 absolute top-0  ${
          click === true ? "-mr-[100%]" : ""
        }`}
      >
        <div className="h-[50px] bg-white border-b flex items-center justify-between px-2">
          <div></div>
          <div
            onClick={() => setClick(true)}
            className="h-[40px] w-[40px] text-[#171717] hover:bg-slate-50 active:bg-slate-100 bg-white border border-dashed rounded-2xl flex items-center justify-center "
          >
            <FiX />
          </div>
        </div>
      </div>
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
