"use client";
import { API, errorHandler } from "@/app/utils/helpers";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { GrFormNextLink, GrTechnology } from "react-icons/gr";
import { IoIosMusicalNotes, IoMdArrowRoundBack } from "react-icons/io";
import { SiYoutubegaming } from "react-icons/si";
import { TbClothesRack, TbDeviceTv, TbPhotoHeart } from "react-icons/tb";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  emailAuth,
  initOTPless,
  phoneAuth,
  verifyEmailOTP,
  verifyOTP,
} from "@/app/utils/otpUtils";
import useResendTimer from "../../hooks/useResendTimer";
import InputOTPPattern from "../components/InputOTPPattern";
import { BiCameraMovie } from "react-icons/bi";
import Cookies from "js-cookie";
import {
  MdFamilyRestroom,
  MdOutlineCastForEducation,
  MdOutlinePets,
  MdOutlineScience,
  MdOutlineSportsTennis,
  MdTravelExplore,
} from "react-icons/md";
import { FaCarAlt, FaNimblr } from "react-icons/fa";
import { LuBriefcaseBusiness, LuPartyPopper } from "react-icons/lu";
import { RiMentalHealthLine } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";
import { FaPaintbrush } from "react-icons/fa6";
import { useAuthContext, UserData } from "../components/auth";
// import InputOTPPattern from "./InputOTPPattern";

interface Interest {
  topic: string;
  icons: React.ReactNode;
}
const Page = () => {
  const router = useRouter();
  const Logo = `${process.env.NEXT_PUBLIC_GURL}/Logo.png`;
  const [fullname, setFullname] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [next, setNext] = React.useState<number>(0);
  const [interest, setInterest] = React.useState<string[]>([]);
  const [dp, setDp] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [phone, setPhone] = useState<string>("");
  const [load, setLoad] = useState(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [change, setChange] = React.useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { setAuth, setData } = useAuthContext();
  const [dob, setDob] = useState("");
  // const [date, setDate] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("male");
  const interests = [
    { topic: "Movies & Entertainment", icons: <BiCameraMovie /> },
    { topic: "News", icons: <TbDeviceTv /> },
    { topic: "Gaming", icons: <SiYoutubegaming /> },
    { topic: "Career & Education", icons: <MdOutlineCastForEducation /> },
    { topic: "Anime & Manga", icons: <FaNimblr /> },
    { topic: "Family & Relationships", icons: <MdFamilyRestroom /> },
    { topic: "Sports", icons: <MdOutlineSportsTennis /> },
    { topic: "Science & Learning", icons: <MdOutlineScience /> },
    { topic: "DIY & Crafts", icons: <FaPaintbrush /> },
    { topic: "Music ", icons: <IoIosMusicalNotes /> },
    { topic: "Beauty & Fashion", icons: <TbClothesRack /> },
    { topic: "Health & Fitness", icons: <RiMentalHealthLine /> },
    { topic: "Food & Cooking", icons: <IoFastFood /> },
    { topic: "Business & Finance", icons: <LuBriefcaseBusiness /> },
    { topic: "Photography", icons: <TbPhotoHeart /> },
    { topic: "Travel & Outdoors", icons: <MdTravelExplore /> },
    { topic: "Art & Creativity", icons: <SiYoutubegaming /> },
    { topic: "Technology & Gadgets", icons: <GrTechnology /> },
    { topic: "Pop Culture", icons: <LuPartyPopper /> },
    { topic: "Automotives", icons: <FaCarAlt /> },
    { topic: "Pets & Animals", icons: <MdOutlinePets /> },
  ];
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
      console.log(error);
      errorHandler(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };

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
        setNext(1);
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      errorHandler(error as AxiosError | Error);
      console.log(error);
    } finally {
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
        setNext(1);
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      errorHandler(error as AxiosError | Error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const toggleInterest = (interest: string) => {
    setInterest((prev) => {
      const isSelected = prev.includes(interest);
      if (isSelected) {
        return prev.filter((item) => item !== interest); // Remove if already selected
      } else {
        return [...prev, interest]; // Add if not selected
      }
    });
  };

  const signup = useCallback(async () => {
    setLoad(true);
    if (interest.length < 3) {
      alert("Please select at least 3 interests.");
      alert("Please fill all the details");
      setLoad(false);
      return;
    } else if (!fullname || !username || !dob || !dp || !gender) {
      alert("Please fill all the details");
      setLoad(false);
      return;
    }
    try {
      const formData = new FormData();
      if (dp) {
        formData.append("profilepic", dp);
      }
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("bio", bio);

      if (phoneNumber) {
        formData.append("phone", phoneNumber);
      } else {
        formData.append("email", email);
      }
      formData.append("gender", gender);
      formData.append("DOB", dob);
      formData.append("platform", "Webapp");
      formData.append("interest", JSON.stringify(interest));

      const res = await axios.post(`${API}/createuser`, formData);
      if (res?.data?.success) {
        cookieSetter(res.data.data, res.data.access_token);
        // toast.success("Signup successful");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }

    setLoad(false);
  }, [fullname, username, bio, dp, gender, dob, interest, username]);
  const cookieSetter = (data: UserData, token: string) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 15);
      Cookies.set("token", token, { expires: expirationDate });
      setData(data);
      setAuth(true);
      toast.success("Signup successful!");
      router.push("../home");
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      setDp(file);
    }
  };
  const { canResend, resendTimer, resetTimer } = useResendTimer(50);

  const handleResend = async () => {
    await resetTimer(async () => {
      await phoneAuth(phoneNumber);
      toast.success("OTP Sent Successfully!");
    });
  };

  return (
    <div className="flex flex-col items-center sm:space-y-2 w-[100%] h-full justify-center">
      <Toaster />
      {/* phone  */}
      {next === 0 ? (
        <div className=" inset-0 w-full z-50 h-screen flex justify-center items-center ">
          <div className="sm:w-[50%] flex flex-col p-2 space-y-2 justify-center pn:max-sm:items-center">
            <div className="">
              <img
                src={Logo}
                className="h-[100px] w-[100px] sm:hidden bg-black rounded-[35px] border-2 border-black"
              />
            </div>
            {/* text  */}
            <div className="text-[40px] font-extrabold text-[#2c2c2c]">
              Sign up
            </div>
            <div className="flex pn:max-sm:justify-center w-full">
              <span className=" text-[16px] font-medium text-[#9095A0] bg-transparent ">
                Do you have an account?
                <span className="text-blue-500">
                  <Link className="cursor-pointer" href="../auth/login">
                    {" "}
                    Login Now
                  </Link>{" "}
                </span>
              </span>
            </div>

            {/* Switcher */}
            <div className="grid grid-cols-1  border-2 border-slate-50 relative rounded-xl bg-slate-50 pn:max-sm:-mt-6 w-fit">
              <div className="flex rounded-xl text-[#303030] select-none text-[14px]">
                <div
                  onClick={() => {
                    if (showOtp === true) {
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
                    if (showOtp === true) {
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

            {/* phone */}
            <div
              className={`${
                change === 1
                  ? "flex justify-start flex-col items-start  py-4"
                  : "hidden"
              } `}
            >
              {showOtp ? (
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="text-center flex flex-col gap-6 text-sm text-[#717171]">
                      <div className="flex flex-col gap-1">
                        <div>We’re sending an SMS to phone number </div>
                        <div>
                          +91 {phoneNumber}{" "}
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              setShowOtp(false);
                            }}
                            className="text-[#0075FF] cursor-pointer"
                          >
                            Wrong Number ?
                          </span>
                        </div>
                      </div>

                      <div>
                        <InputOTPPattern
                          className=" border border-[#363A3D] focus:border-[#9B9C9E] bg-[#1A1D21] text-white"
                          value={otp}
                          setValue={setOtp}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>
                          Don’t receive code?{" "}
                          {canResend ? (
                            <span
                              className="text-[#0075FF] cursor-pointer"
                              onClick={handleResend}
                            >
                              Request again
                            </span>
                          ) : (
                            <span>
                              Resend: 00:
                              {resendTimer.toString().padStart(2, "0")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      onClick={verificationOfPhone}
                      className="bg-black text-white w-full flex justify-center items-center h-12 font-medium rounded-xl"
                    >
                      {loading ? "Loading..." : "Continue"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full  px-2  gap-6">
                  <div className="flex flex-col gap-2 items-center">
                    <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
                      <div className="text-[#6a6a6a] text-[14px]">
                        Phone no.
                      </div>
                      <div className="flex">
                        <div className="text-[#999999]">+91</div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="px-2 outline-none w-full"
                          placeholder="XXXXXXXXXXX"
                        />
                      </div>
                    </div>
                    <div className="mt-1 text-[#6a6a6a]">
                      We will send you an OTP on this number
                    </div>
                    <button
                      disabled={loading}
                      onClick={sendPhoneOtp}
                      className="bg-black text-white w-full flex justify-center items-center h-12 font-medium rounded-2xl"
                    >
                      {loading ? "Loading..." : "Continue"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* email */}
            <div
              className={`${
                change === 2
                  ? "flex justify-start flex-col items-start  py-4"
                  : "hidden"
              } `}
            >
              {showOtp ? (
                // <EmailOtpComponent
                //   email={email}
                //   setShowOtp={setShowOtp}
                //   otp={otp}
                //   setOtp={setOtp}
                //   loading={loading}
                //   verifyEmailOTP={verificationOfEmail}
                // />
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="text-center flex flex-col gap-6 text-sm text-[#717171]">
                      <div className="flex flex-col ">
                        <div>We’re sending an SMS to email </div>
                        <div>
                          {email}
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              setShowOtp(false);
                            }}
                            className="text-[#0075FF] cursor-pointer"
                          >
                            Wrong Email ?
                          </span>
                        </div>
                      </div>

                      <div>
                        <InputOTPPattern
                          className=" border border-[#363A3D] focus:border-[#9B9C9E] bg-[#1A1D21] text-white"
                          value={otp}
                          setValue={setOtp}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>
                          Don’t receive code?{" "}
                          {canResend ? (
                            <span
                              className="text-[#0075FF] cursor-pointer"
                              onClick={handleResend}
                            >
                              Request again
                            </span>
                          ) : (
                            <span>
                              Resend: 00:
                              {resendTimer.toString().padStart(2, "0")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      onClick={(e) => verificationOfEmail(e)}
                      className="bg-black text-white w-full flex justify-center items-center h-12 font-medium rounded-xl"
                    >
                      {loading ? "Loading..." : "Continue"}
                    </button>
                  </div>
                </div>
              ) : (
                // <EmailInput
                //   email={email}
                //   setEmail={setEmail}
                //   loading={loading}
                //   sendEmailOtp={sendEmailOtp}
                // />
                <div className="flex flex-col w-full px-2 gap-6">
                  <div className="flex flex-col gap-2 items-center ">
                    <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
                      <div className="text-[#6a6a6a]">Email Address</div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-2 outline-none w-full"
                        placeholder="Enter your Email"
                      />
                    </div>
                    <div className="mt-1 text-[#6a6a6a]">
                      We will send you an OTP on this email
                    </div>
                    <button
                      disabled={loading}
                      onClick={sendEmailOtp}
                      className="bg-black text-white w-full flex justify-center items-center h-12 font-medium rounded-xl"
                    >
                      {loading ? "Loading..." : "Continue"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {/* <Detail />  */}
      {next === 1 ? (
        <div className="flex flex-col items-center space-y-2 w-[100%] h-full ">
          {/* header  */}
          <div className="flex items-center p-2 h-[60px] justify-center gap-2  w-[100%]">
            <div className="text-[#6a6a6a] font-semibold text-[20px]">
              Create Account
            </div>
          </div>
          {/* main  */}
          <div className=" h-[calc(100%-60px)] w-full items-center justify-between py-20 flex flex-col">
            <div className="flex flex-col items-center space-y-2 w-full">
              {/* dp  */}
              <div className="flex flex-col justify-center items-center space-y-2">
                <div
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="h-[75px] w-[75px] rounded-[30px] border bg-white justify-center items-center flex"
                >
                  {dp ? (
                    <img
                      src={URL.createObjectURL(dp)}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-[30px]"
                    />
                  ) : (
                    <span className="text-gray-500">+</span>
                  )}
                </div>
                <label
                  htmlFor="imageUpload"
                  className="text-[#3af] cursor-pointer"
                >
                  Add Picture
                </label>
                <div className="w-[100%] hidden  items-center justify-center">
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* <div className="text-[#3af]">Upload Picture</div> */}
              </div>
              {/* more detail */}
              <div className="space-y-2 px-2 w-full sm:w-[60%] flex flex-col">
                <div className="flex px-2 w-full gap-2 items-center">
                  <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
                    <div className="text-[#6a6a6a]">Full Name</div>
                    <input
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="px-2 outline-none w-full"
                      placeholder="Enter you fullname"
                    />
                  </div>
                </div>
                <div className="flex px-2 gap-2 items-center">
                  <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
                    <div className="text-[#6a6a6a]">Username</div>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="px-2 outline-none w-full"
                      placeholder="Enter your Username"
                    />
                  </div>
                </div>
                <div className="flex pn:max-sm:flex-col items-center gap-1 select-none w-full">
                  {/* gender  */}
                  <div className="flex px-2 gap-2 items-center w-full ">
                    <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
                      <div className="text-[#6a6a6a]">Gender</div>
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => setGender("male")}
                          className={`flex items-center justify-center border rounded-lg gap-1 p-1  ${
                            gender === "male"
                              ? "border-[#f1f1f1]"
                              : "border-[#fff]"
                          }`}
                        >
                          <div
                            className={` rounded-full h-2 w-2 border-2 ${
                              gender === "male"
                                ? "border-[#3af] bg-white"
                                : "border-gray-500"
                            }`}
                          />
                          <div>Male</div>
                        </div>
                        <div
                          onClick={() => setGender("Female")}
                          className={`flex items-center justify-center border rounded-lg gap-1 p-1  ${
                            gender === "Female"
                              ? "border-[#f1f1f1]"
                              : "border-[#fff]"
                          }`}
                        >
                          <div
                            className={` rounded-full h-2 w-2 border-2 ${
                              gender === "Female"
                                ? "border-[#3af] bg-white"
                                : "border-gray-500"
                            }`}
                          />
                          <div>Female</div>
                        </div>
                        <div
                          onClick={() => setGender("Other")}
                          className={`flex items-center justify-center border rounded-lg gap-1 p-1  ${
                            gender === "Other"
                              ? "border-[#f1f1f1]"
                              : "border-[#fff]"
                          }`}
                        >
                          <div
                            className={` rounded-full h-2 w-2 border-2 ${
                              gender === "Other"
                                ? "border-[#3af] bg-white"
                                : "border-gray-500"
                            }`}
                          />
                          <div>Other</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* dob  */}
                  <div className="flex px-2 gap-2 pn:max-sm:w-full items-center">
                    <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
                      <div className="text-[#6a6a6a] text-[14px]">DOB</div>
                      <div className="flex">
                        <div className="text-[#999999] flex items-center justify-center">
                          <CiCalendarDate />
                        </div>
                        <input
                          onChange={(e) => setDob(e.target.value)}
                          value={dob}
                          className="px-2 outline-none w-full"
                          placeholder="dd-mm-yyyy"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex px-2 gap-2 items-center">
                  <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
                    <div className="text-[#6a6a6a]">Bio</div>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="px-2 w-full outline-none"
                      placeholder="Add a creative bio to attract others"
                    />
                  </div>
                </div>
              </div>
              {/* button  */}
              <div className="flex px-2 gap-2  w-full sm:w-[60%] items-center justify-center select-none">
                <div
                  onClick={() => setNext(2)}
                  className="bg-black hover:bg-[#171717] active:bg-[#272727] cursor-pointer  rounded-2xl text-[14px] py-3 gap-2 flex items-center justify-center p-2 w-full"
                >
                  <div className="text-[#ffffff]">Next</div>
                  <GrFormNextLink className="text-[#ffffff]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* <Interest /> */}
      {next === 2 ? (
        <div className="h-full w-full flex flex-col px-2 items-center space-y-2 ">
          {/* header  */}
          <div className="flex items-center p-2  sm:h-[60px] justify-between gap-2  w-[100%]">
            <IoMdArrowRoundBack onClick={() => setNext(1)} />
            <div className="text-[#6a6a6a] font-semibold text-[20px]">
              Interest
            </div>
            <div></div>
          </div>
          {/* seconder header  */}
          <div className="flex px-2  items-center flex-col w-full justify-between">
            {interest.length < 3 && (
              <div className="text-[14px] h-[40px] text-blue-500">
                Select atleast 3 interests
              </div>
            )}

            <div />
          </div>
          {/* main  */}
          <div className="flex flex-col w-full relative md:w-[60%] sm:h-[calc(90%-100px)] items-center justify-center space-y-2">
            {/* interest  */}
            <div className="flex px-2 sm:max-h-[calc(100%-100px)] h-full overflow-auto gap-2 flex-wrap">
              {interests.map((item: Interest, index: number) => (
                <div
                  key={index}
                  className={`p-2 rounded-xl flex justify-center items-center gap-2 cursor-pointer select-none border
                    ${
                      interest.includes(item.topic)
                        ? "bg-[#3af] text-white"
                        : "bg-slate-50 hover:bg-slate-100 active:bg-[#3af] active:text-white"
                    }
                  `}
                  onClick={() => toggleInterest(item.topic)}
                  // className="bg-slate-50 border  p-2 rounded-xl flex hover:bg-slate-100 select-none cursor-pointer active:bg-[#3af] active:text-white  justify-center items-center gap-2"
                >
                  <div>{item.icons}</div>
                  <div>
                    <div>{item.topic}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* button  */}
            <div className="flex pt-4 pn:max-sm:absolute px-2 bottom-0 gap-2 w-full items-center justify-center select-none">
              <div
                onClick={signup}
                className="bg-black hover:bg-[#171717] active:bg-[#272727] cursor-pointer rounded-2xl text-[14px] py-3 gap-2 flex items-center justify-center p-2 w-full"
              >
                {!load ? (
                  <div className="text-[#ffffff]">Done</div>
                ) : (
                  <div className="text-[#ffffff]">...</div>
                )}
                <GrFormNextLink className="text-[#ffffff]" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
