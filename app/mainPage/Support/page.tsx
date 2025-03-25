"use client";
import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { API, errorHandler } from "../../utils/helpers";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [querySent, setQuerySent] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setQuerySent(localStorage.getItem("QOC") === "true");
    }
  }, []);
  const sendmsg = async () => {
    try {
      const res = await axios.post(`${API}/contactus`, {
        name,
        phone,
        email,
        message: msg,
        kind: "Query",
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setQuerySent(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("QOC", "true");
        }
      }
    } catch (e) {
      errorHandler(e as Error);
    }
  };
  return (
    <div className="w-[90%] mx-[5%] pn:max-sm:pt-[10%] bg-[#0d0d0d] text-white mt-[7%] flex flex-col gap-[50px] ">
      <Toaster />
      <div className="flex flex-col gap-6">
        {/* <div className="text-[#127DF7] font-semibold">Contact us on</div> */}
        <div className="text-3xl sm:text-5xl md:text-7xl font-bold">
          Get in touch with us. <br /> We&apos;re here to assist you.
        </div>
        {querySent ? null : (
          <p className="text-lg text-gray-600">
            Have a question or need support? Fill out the form below, or contact
            us directly via phone or email.
          </p>
        )}
      </div>
      {querySent ? (
        <div className="border rounded-2xl p-6">
          Your query has been sent. Our team will contact you soon.
        </div>
      ) : (
        <div className="border border-[#505050] rounded-2xl p-6">
          <div className="flex flex-col gap-[30px] min-w-[70%]">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between w-full">
              <div className="sm:w-[32%]">
                <label className="font-medium">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter your name"
                  className="border-b border-[#CACACA] outline-none bg-transparent w-full py-2"
                />
              </div>
              <div className="sm:w-[32%]">
                <label className="font-medium">Email Address (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  className="border-b border-[#CACACA] outline-none bg-transparent w-full py-2"
                />
              </div>
              <div className="sm:w-[32%]">
                <label className="font-medium">Phone Number (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  placeholder="Enter your phone number"
                  className="border-b border-[#CACACA] outline-none bg-transparent w-full py-2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-medium">Message</label>
              <textarea
                placeholder="Type your message here..."
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                className="border-b border-[#CACACA] outline-none bg-transparent w-full py-2 h-[100px]"
              />
            </div>

            <div onClick={sendmsg} className="flex flex-col gap-3">
              <button className="border-none rounded-3xl text-white bg-[#127DF7] px-6 py-3 text-lg font-semibold hover:bg-[#0e6ac9] transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 text-lg p-4 font-medium text-white">
        <p>Or reach out to us directly:</p>
        <div className="flex items-center gap-2">
          <Phone className="text-[#127DF7]" />
          <span>+91 9532837959</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="text-[#127DF7]" />
          <span>contact@grovyo.com</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
