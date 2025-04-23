"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosAdd, IoIosArrowForward } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import Emptycart from "../../../assets/emptycart.png";
import { CartItem } from "../layout";
import { IoLocationSharp } from "react-icons/io5";
import axios, { AxiosError } from "axios";
import { API, errorHandler } from "@/app/utils/helpers";
import { TbBrandGoogleHome } from "react-icons/tb";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BiHomeAlt2 } from "react-icons/bi";
import { useAuthContext } from "@/app/auth/components/auth";
import InputOTPPattern from "@/app/auth/components/InputOTPPattern";
import { initOTPless, phoneAuth, verifyOTP } from "@/app/utils/otpUtils";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setUserData } from "@/app/redux/slices/userCreationSlice";

// type CartItem = {
//   product: {
//     images: { content: string }[];
//     name: string;
//     brandname: string;
//     discountedprice: number;
//     price: number;
//     discount: number;
//   };
//   quantity: number;
// };
type LocationType = GeolocationCoordinates;
export interface Address {
  _id: "";
  houseNo: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  phone: string;
  addressType: string;
  streetAddress: string;
}

interface PincodeResponse {
  Status: string;
  PostOffice: Array<{
    District: string;
    State: string;
  }>;
}

const Cart = ({
  cart,
  addressData,
  phone,
}: {
  cart: { data: Array<CartItem>; totalprice: number };
  addressData: Address[];
  phone: string;
}) => {
  const { data } = useAuthContext();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({
    houseNo: "",
    streetAddress: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    phone: "",
    addressType: "",
  });
  const [verifiedno, setVerifiedno] = useState(false);
  const parsedAddressData = addressData;
  const [openadd, setOpenadd] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<Address>({
    _id: "",
    houseNo: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    phone: "",
    addressType: "",
    streetAddress: "",
  });
  let verified;

  const [loading, setLoading] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  // const [addresstype, setAddresstype] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [location, setLocation] = useState<LocationType>();

  // Add new address
  const addAddress = async () => {
    try {
      if (!data?.id) return;
      if (
        !address?.streetAddress ||
        !address?.houseNo ||
        !address?.landmark ||
        !address?.pincode ||
        !address?.city ||
        !address?.state
      )
        return toast.error("Please fill all the fields.");
      if (!phone) {
        if (!address?.phone && !verifiedno) {
          return toast.error("Please Verify Phone Number");
        } else {
          address.phone = phoneNumber;
        }
      }
      address.phone = phone;
      console.log(address, "Address");
      const res = await axios.post(` ${API}/saveAddress/${data?.id}`, address);
      if (res?.data?.success) {
        toast.success("Address saved.");
        setOpenadd(false);
        setAddress({
          houseNo: "",
          streetAddress: "",
          landmark: "",
          pincode: "",
          city: "",
          state: "",
          phone: "",
          addressType: "",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Fetch pincode details
  const fetchPincodeDetails = async (pincode: string): Promise<void> => {
    if (pincode.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data: PincodeResponse[] = await response.json();
        if (data[0].Status === "Success") {
          setAddress((prev) => ({
            ...prev,
            city: data[0].PostOffice[0].District,
            state: data[0].PostOffice[0].State,
          }));
        }
      } catch (error) {
        console.error("Error fetching pincode details", error);
      }
    }
  };

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
      verified = await verifyOTP(phoneNumber, otp);
      console.log(verified, "verf");
      if (verified) {
        toast.success("OTP Verified Successfully");
        setShowOtp(false);
        setVerifiedno(true);
        // setNext(1);
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
  // const {  resetTimer } = useResendTimer(50);
  // const handleResend = async () => {
  //   await resetTimer(async () => {
  //     await phoneAuth(phoneNumber);
  //     toast.success("OTP Sent Successfully!");
  //   });
  // };
  useEffect(() => {
    initOTPless(() => {
      console.log("otpless initiated!");
    });
  }, []);
  useEffect(() => {
    if (location) {
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position?.coords);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
    }
  }, []);

  return (
    <div className="h-[100%] flex flex-col items-center w-full space-y-2 overflow-y-auto  dark:bg-[#ffffff] bg-white">
      <div className="py-2 w-[95%] flex flex-col gap-2 ">
        <div className="font-semibold text-[14px]">Shipping Details</div>

        {/* Selected or Enter Address */}
        {selectedAddress?._id ? (
          <div className="w-full  border border-[#E4E4E4] rounded-[12px] flex ">
            <div className="h-full w-[80%] flex items-center gap-2">
              <div className="h-full flex justify-center p-2">
                <IoLocationSharp size={25} color="#00DE6F" />{" "}
              </div>
              <div className="h-full w-[50%] flex flex-col py-2">
                <div className="text-[#343438]">To</div>
                <div className="text-[#393939] text-[12px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {selectedAddress?.houseNo}
                  {selectedAddress?.streetAddress}
                  {selectedAddress?.landmark}
                  {selectedAddress?.pincode}
                </div>
                <div className="text-[#393939] text-[12px]">
                  {selectedAddress?.city}, {selectedAddress?.state}
                </div>
              </div>
            </div>
            <div
              onClick={() => setOpen(true)}
              className="h-full w-[20%] text-[#3392FF] flex cursor-pointer hover:text-[#68acfa]  items-center text-[14px] font-semibold"
            >
              Change{" "}
              <IoIosArrowForward
                size={20}
                color="#3392FF"
                className=" cursor-pointer hover:text-[#68acfa]"
              />
            </div>
          </div>
        ) : (
          <div
            onClick={() => setOpen(true)}
            className="w-full  border border-[#E4E4E4] rounded-[12px] flex "
          >
            <div className="h-full w-[80%] flex items-center gap-2">
              <div className="h-full flex justify-center p-2">
                <IoLocationSharp size={25} color="#00DE6F" />{" "}
              </div>
              <div className="h-full w-[50%] flex flex-col py-2">
                <div className="text-[#343438]">Select Address</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* popup for address edit */}
      <div
        // onClick={() => setOpen(false)}
        className={`${
          open === true
            ? "flex absolute sm:h-[100%] overflow-auto h-[calc(100%-100px)] justify-center pn:max-sm:items-end items-center pn:max-sm:w-[100%] sm:w-[calc(100%-60px)] left-0 right-0 -top-2 border bg-[#1f1f1f25] "
            : "hidden"
        }`}
      >
        <div className="p-4 space-y-2 w-[100%] sm:w-[50%] bg-white rounded-t-2xl sm:rounded-2xl border">
          <div>
            <div className="text-[14px] font-semibold text-[#171717] flex flex-col ">
              <div className="flex gap-2 items-center">
                <TbBrandGoogleHome size={20} />
                <div>Address</div>
              </div>
              <div className="text-[12px] font-medium text-[#7f7f7f]">
                Please add/select your address so we can deliver your product to
                you.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            {parsedAddressData?.map((add: Address, i: number) => (
              <div key={i} className="w-full gap-1 flex flex-col">
                <div className="w-full text-[12px] font-semibold">
                  Address {i + 1}
                </div>
                <div
                  onClick={() => {
                    setSelectedAddress({
                      _id: add?._id ? add?._id : "",
                      houseNo: add?.houseNo,
                      streetAddress: add?.streetAddress,
                      city: add?.city,
                      state: add?.state,
                      pincode: add?.pincode,
                      addressType: add?.addressType,
                      landmark: add?.landmark,
                      phone: add?.phone ? add?.phone : "",
                    });
                    dispatch(setUserData({ address: add }));
                    setOpen(false);
                  }}
                  className={`w-full ${
                    selectedAddress?._id === add?._id
                      ? "border-blue-500"
                      : "border-[#E4E4E4]"
                  }  border cursor-pointer border-[#E4E4E4] rounded-[12px] flex `}
                >
                  <div className="h-full w-[80%]  flex items-center gap-2">
                    <div className="h-full w-[100%] px-2 flex flex-col py-2">
                      <div className="text-[#393939] text-[12px] text-ellipsis overflow-hidden whitespace-nowrap">
                        {add?.houseNo},{add?.streetAddress},{add?.landmark},{" "}
                        {add?.pincode}
                      </div>
                      <div className="text-[#393939] text-[12px]">
                        {add?.city}, {add?.state}
                      </div>
                    </div>
                  </div>
                  <div className=" w-[20%] justify-center flex items-center">
                    <div className="py-2 px-4 bg-slate-100 text-[12px] rounded-lg text-center ">
                      {add?.addressType}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => setOpenadd(true)}
            className="text-[14px] font-bold bg-slate-200 cursor-pointer hover:bg-slate-100 rounded-md px-4 py-2 text-center text-[#6096ee]"
          >
            + Add new address
          </div>
          {openadd && (
            <>
              <div className="flex gap-2 items-center">
                <div className=" w-full border rounded-2xl p-2">
                  <div className="text-[14px] text-[#7f7f7f]">
                    House No./Flat No.
                  </div>
                  <input
                    value={address?.houseNo}
                    name="houseNo"
                    onChange={(e) => {
                      setAddress({ ...address, houseNo: e.target.value });
                    }}
                    placeholder="Enter House No./Flat No."
                    className="px-2 h-[40px] outline-none w-full"
                  />
                </div>
                <div className=" w-full border rounded-2xl p-2">
                  <div className="text-[14px] text-[#7f7f7f]">
                    {" "}
                    Street Address
                  </div>
                  <input
                    value={address?.streetAddress}
                    name="streetAddress"
                    onChange={(e) => {
                      setAddress({ ...address, streetAddress: e.target.value });
                    }}
                    placeholder="Street Address"
                    className="px-2 h-[40px] outline-none w-full"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className=" w-full border rounded-2xl p-2">
                  <div className="text-[14px] text-[#7f7f7f]">
                    {" "}
                    Famous Landmark
                  </div>
                  <input
                    value={address?.landmark}
                    name="landmark"
                    onChange={(e) => {
                      setAddress({ ...address, landmark: e.target.value });
                    }}
                    placeholder="Enter Landmark"
                    className="px-2 h-[40px] outline-none w-full"
                  />
                </div>
                <div className=" w-full border rounded-2xl p-2">
                  <div className="text-[14px] text-[#7f7f7f]"> Postal Code</div>

                  <input
                    className="px-2 h-[40px] outline-none w-full"
                    name="pincode"
                    placeholder="Pincode"
                    value={address?.pincode}
                    onChange={(e) => {
                      setAddress({ ...address, pincode: e.target.value });
                      fetchPincodeDetails(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className=" w-full border rounded-2xl p-2">
                  <div className="text-[14px] text-[#7f7f7f]"> City</div>
                  <input
                    className="px-2 h-[40px] outline-none w-full"
                    name="city"
                    placeholder="City"
                    value={address?.city}
                    readOnly
                  />
                </div>
                <div className=" w-full border rounded-2xl p-2">
                  <div className="text-[14px] text-[#7f7f7f]"> State</div>

                  <input
                    className="px-2 h-[40px] outline-none w-full"
                    name="state"
                    placeholder="State"
                    value={address?.state}
                    readOnly
                  />
                </div>
              </div>
              {/* If phone number already present then dont take another contact number */}
              {!phone &&
                (showOtp ? (
                  <div className="flex  flex-col gap-6">
                    <div>
                      <div className="text-center flex flex-col gap-6 text-sm text-[#717171]">
                        <div className=" w-full border rounded-2xl p-2">
                          <div className="text-[14px] w-full flex text-[#7f7f7f]">
                            {" "}
                            Otp
                          </div>
                          {/* <div className="flex flex-col gap-1">
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
                    </div> */}
                          <div className="flex pt-2 h-[40px] justify-between items-center">
                            <div>
                              <InputOTPPattern
                                className=" border border-[#363A3D] focus:border-[#9B9C9E] bg-[#1A1D21] text-white"
                                value={otp}
                                setValue={setOtp}
                              />
                            </div>
                            <div className="text-[14px] cursor-pointer select-none hover:bg-slate-100 p-2 rounded-2xl text-[#4b87ff]">
                              <button
                                disabled={loading}
                                onClick={verificationOfPhone}
                                className=" w-full flex justify-center items-center h-12 font-medium rounded-xl"
                              >
                                {loading ? "Loading..." : "Verify"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex  flex-col w-full  gap-6">
                    <div className="flex flex-col gap-2 items-center">
                      <div className=" w-full border rounded-2xl p-2">
                        <div className="text-[14px] text-[#7f7f7f]"> Phone</div>
                        <div className="flex gap-2 items-center">
                          <input
                            value={phoneNumber}
                            name="phone"
                            maxLength={10}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            className="px-2 h-[40px] outline-none w-full"
                          />
                          {!verifiedno && (
                            <div className="text-[14px] cursor-pointer select-none hover:bg-slate-100 p-2 rounded-2xl text-[#4b87ff]">
                              <button
                                disabled={loading}
                                onClick={sendPhoneOtp}
                                className="w-full flex justify-center items-center font-medium rounded-2xl"
                              >
                                {loading ? "Loading..." : "   OTP"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div className=" w-full border rounded-2xl p-2">
                <div className="text-[14px] text-[#7f7f7f]"> Address Type</div>
                <div className="flex h-[40px] pt-1 gap-2">
                  <div
                    onClick={() => {
                      setAddress((prev) => ({ ...prev, addressType: "Home" }));
                    }}
                    className={`flex gap-1 hover:bg-slate-100 text-[14px] ${
                      address.addressType === "Home" ? "bg-slate-200" : ""
                    } cursor-pointer select-text px-2 rounded-2xl border items-center`}
                  >
                    <BiHomeAlt2 />
                    Home
                  </div>
                  <div
                    onClick={() => {
                      setAddress((prev) => ({ ...prev, addressType: "Work" }));
                    }}
                    className={`flex gap-1 hover:bg-slate-100 ${
                      address.addressType === "Work" ? "bg-slate-200" : ""
                    } text-[14px] cursor-pointer select-text px-2 rounded-2xl border items-center `}
                  >
                    <HiOutlineOfficeBuilding />
                    Work
                  </div>
                </div>
              </div>
              <div className="flex  gap-2">
                <div
                  onClick={() => setOpen(false)}
                  className={` ${
                    showOtp ? "bg-blue-400" : "hover:bg-slate-100"
                  } w-full border h-[40px] flex  justify-center items-center rounded-2xl p-2`}
                >
                  <div className="text-[14px] "> Cancel</div>
                </div>
                <div
                  onClick={addAddress}
                  className={` ${
                    showOtp ? "bg-blue-400" : "bg-blue-600"
                  } w-full border h-[40px] flex justify-center items-center rounded-2xl p-2`}
                >
                  <div className="text-[14px] text-white"> Save</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {cart?.data?.length > 0 ? (
        cart?.data?.map((item: CartItem, index: number) => (
          <div key={index} className=" w-full  px-2 border-b ">
            <div className="h-full min-w-[196px] w-full  rounded-3xl ">
              <div className="flex py-2 items-center gap-2">
                <div className="h-[90px] w-[90px] border flex items-center justify-center rounded-lg">
                  <img
                    src={item?.product?.images[0]?.content}
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
                <div className="text-[#171717]">
                  <div className="text-[14px] font-semibold">
                    {" "}
                    {item?.product?.name}
                  </div>
                  <div className="text-[12px] font-medium">
                    {" "}
                    by {item?.product?.brandname}
                  </div>
                  <div className="gap-2 flex items-center">
                    <div className="text-[12px] font-medium">
                      ₹{item?.product?.price - item?.product?.discount}
                    </div>
                    <div className="text-[10px] text-[#4e4e4e] font-medium">
                      <s>₹{item?.product?.price}</s>
                    </div>
                    <div className="text-[12px] text-green-500 font-medium">
                      {(
                        (item?.product?.discount / item?.product?.price) *
                        100
                      ).toFixed(0)}
                      % off
                    </div>
                  </div>
                  <div className="text-[12px] border p-1 m-1  rounded-xl justify-between flex items-center gap-2 font-medium">
                    <div className="h-[20px] w-[20px] text-[14px] flex items-center justify-center border rounded-lg">
                      <RiSubtractLine />
                    </div>
                    <div> {item?.quantity}</div>
                    <div className="h-[20px] w-[20px] text-[14px] flex items-center justify-center border rounded-lg">
                      <IoIosAdd />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-[100%] w-full flex items-center justify-center">
          {" "}
          <Image
            alt="cartpic"
            src={Emptycart}
            className="h-[140px] w-[140px] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
