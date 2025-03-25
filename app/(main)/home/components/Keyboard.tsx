"use client";
import React, { useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const Keyboard = () => {
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = ` ${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const toggleDropdown = () => {
    setOpen(!open);
    console.log("Dropdown toggled", !open);
  };

  return (
    <div
      className="min-h-[8%] w-[100%] px-2 py-2  flex items-end justify-between  bg-red-500  relative"
      style={{
        minHeight: "55px",
        lineHeight: "1.5",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="h-[40px] w-[40px] border-dashed border flex items-center justify-center rounded-2xl">
          <BsEmojiSmile className="h-[20px] w-[20px]" />
        </div>

        <div className="h-[40px] w-[40px] border-dashed border flex items-center justify-center rounded-2xl cursor-pointer">
          <HiOutlineViewGridAdd
            onClick={toggleDropdown}
            className="h-[20px] w-[20px]"
          />
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
        </div> */}
      </div>

      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        rows={1}
        placeholder="Type your message here....."
        className=" scrollbar-hide w-[87%] bg-yellow-300 outline-none rounded-2xl p-2 border-dashed border resize-none"
        style={{
          minHeight: "40px",
          maxHeight: "150px",
          lineHeight: "1.5",
          overflowY: "auto",
        }}
      />

      <div
        className="h-[40px] w-[40px] border-dashed border flex items-center justify-center rounded-2xl cursor-pointer"
        onClick={handleSend}
      >
        <CiLocationArrow1
          className={`h-[20px] w-[20px] ${
            message.trim() ? "text-blue-500" : "text-gray-500"
          }`}
        />
      </div>
    </div>
  );
};

export default Keyboard;
