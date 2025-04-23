"use client";
import { useRouter } from "next/navigation";
import EmailInput from "@/app/auth/components/EmailInput";
import EmailOtpComponent from "@/app/auth/components/EmailOtpComponent";
import { API, errorHandler } from "@/app/utils/helpers";
import {
  emailAuth,
  initOTPless,
  phoneAuth,
  verifyEmailOTP,
  verifyOTP,
} from "@/app/utils/otpUtils";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MobileInput from "@/app/auth/components/MobileInput";
import OtpComponent from "@/app/auth/components/OtpComponent";
import Cookies from "js-cookie";
import { useAuthContext } from "../components/auth";

import Link from "next/link";
interface UserData {
  userId: string;
  username: string;
  email: string;
  phone?: string;
  dp: string; // Display picture
  fullname: string; // Full name
  id: string; // User's unique ID
  isverified: boolean; // Verification timestamp or flag
}

const Page = () => {
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [change, setChange] = React.useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { setAuth, setData } = useAuthContext();
  const router = useRouter();
  const Logo = `${process.env.NEXT_PUBLIC_GURL}/Logo.png`;

  const sendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);

    if (!isValidPhoneNumber) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      setLoading(true);
      await phoneAuth(phoneNumber);
      setLoading(false);
      setShowOtp(true);
      toast.success("Otp Sent Successfully!");
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const cookieSetter = (data: UserData, token: string) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 15);
      Cookies.set("token", token, { expires: expirationDate });
      setData(data);
      setAuth(true);
      router.push("../home");
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithPhoneNumber = async () => {
    try {
      setLoading(true);

      // Make the axios POST request to login with phone number
      const response = await axios.post(`${API}/loginwithnumber`, {
        phone: "91" + phoneNumber,
      });

      // Check if the response is successful
      if (response.data.success) {
        // console.log(response.data);
        cookieSetter(response.data.data, response.data.access_token);
      } else {
        // Handle case when login fails, like user not found
        toast.error("Seems like you don't have an account in the app.");
        router.push("/auth/signup");
      }
    } catch (error) {
      errorHandler(error);
      router.push("/auth/signup");
      setLoading(false);
    }
  };

  useEffect(() => {
    initOTPless(() => {
      console.log("otpless initiated!");
    });
  }, []);

  const verificationOfPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    try {
      setLoading(true);
      const verified = await verifyOTP(phoneNumber, otp);
      if (verified) {
        toast.success("OTP Verified Successfully");
        await loginWithPhoneNumber();
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  // for email
  const sendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      await emailAuth(email);
      setLoading(false);
      setShowOtp(true);
      toast.success("Otp Sent Successfully!");
    } catch (error) {
      console.log(error);
      errorHandler(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API}/loginWithEmail`, {
        email: email,
      });
      if (response.data.success) {
        cookieSetter(response.data.data, response.data.access_token);
      } else {
        toast.error("Seems like you don't have an account.");
        router.push("/auth/signup");
      }
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    initOTPless(() => {
      console.log("otpless initiated!");
    });
  }, []);

  const verificationOfEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    try {
      setLoading(true);
      const verified = await verifyEmailOTP(email, otp);
      if (verified) {
        toast.success("OTP Verified Successfully");
        await loginWithEmail();
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  return (
    <div className=" inset-0 w-full z-50 h-screen pn:max-sm:-top-[100px] pn:max-sm:fixed flex justify-center items-center ">
      <Toaster />
      <div className="sm:w-[50%] flex flex-col p-2 space-y-2 justify-center pn:max-sm:items-center">
        {/* text  */}
        <div className="">
          <img
            src={Logo}
            className="h-[100px] w-[100px] sm:hidden bg-black rounded-[35px] border-2 border-black"
          />
        </div>
        <div className="text-[40px] font-extrabold text-[#2c2c2c]">Login</div>
        {!showOtp && (
          <div className="flex text-center pn:max-sm:justify-center w-full">
            <span className=" text-[16px] font-medium text-[#9095A0] bg-transparent ">
              Don&apos;t have an account?
              <span className="text-blue-500">
                <Link className="cursor-pointer" href="../auth/signup">
                  {" "}
                  Sign up here
                </Link>{" "}
              </span>
            </span>
          </div>
        )}

        {/* Switcher */}
        {!showOtp && (
          <div className="grid grid-cols-1  border-2 border-slate-50 relative rounded-xl bg-slate-50 pn:max-sm:-mt-6 w-fit">
            <div className="flex rounded-xl text-[#303030] select-none text-[14px]">
              <div
                onClick={() => {
                  if (showOtp) {
                    return;
                  }
                  setChange(1);
                }}
                className={`  rounded-xl flex justify-center items-center h-[35px] w-[150px] z-10 ${
                  change === 1 ? "font-bold " : "cursor-pointer"
                }`}
              >
                Phone no.
              </div>
              <div
                className={`absolute duration-100 h-[35px] w-[50%] rounded-xl bg-slate-100 ${
                  change === 1 ? "left-[0px] " : " left-[50%]"
                }`}
              ></div>
              <div
                onClick={() => {
                  if (showOtp) {
                    return;
                  }
                  setChange(2);
                }}
                className={` rounded-xl flex justify-center items-center h-[35px] w-[150px] z-10 ${
                  change === 2 ? "font-bold " : "cursor-pointer"
                }`}
              >
                Email
              </div>
            </div>
          </div>
        )}

        {/* phone */}
        <div
          className={`${
            change === 1
              ? "flex justify-start flex-col items-start w-full py-4"
              : "hidden"
          } `}
        >
          {showOtp ? (
            <OtpComponent
              otp={otp}
              setOtp={setOtp}
              verificationOfPhone={verificationOfPhone}
              loading={loading}
              setShowOtp={setShowOtp}
              phoneNumber={phoneNumber}
            />
          ) : (
            <MobileInput
              sendPhoneOtp={sendPhoneOtp}
              // sendPhoneOtp={loginWithPhoneNumber}
              number={phoneNumber}
              loading={loading}
              setPhoneNumber={setPhoneNumber}
            />
          )}
        </div>
        {/* email */}
        <div
          className={`${
            change === 2
              ? "flex justify-start flex-col items-start w-full py-4"
              : "hidden"
          } `}
        >
          {showOtp ? (
            <EmailOtpComponent
              email={email}
              setShowOtp={setShowOtp}
              otp={otp}
              setOtp={setOtp}
              loading={loading}
              verifyEmailOTP={verificationOfEmail}
            />
          ) : (
            <EmailInput
              email={email}
              setEmail={setEmail}
              loading={loading}
              sendEmailOtp={sendEmailOtp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
