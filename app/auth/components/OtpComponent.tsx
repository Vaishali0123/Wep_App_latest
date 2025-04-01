import React from "react";
// import InputOTPPattern from "@/components/ui/InputOTPPattern";
// import { phoneAuth } from "../utils/otpUtils";
import toast from "react-hot-toast";
import useResendTimer from "../../hooks/useResendTimer";
import { phoneAuth } from "../../utils/otpUtils";
import InputOTPPattern from "./InputOTPPattern";
import { RiLoaderLine } from "react-icons/ri";

const OtpComponent = ({
  otp,
  setOtp,
  verificationOfPhone,
  loading,
  setShowOtp,
  phoneNumber,
}: {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  verificationOfPhone: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
  phoneNumber: string;
}) => {
  const { canResend, resendTimer, resetTimer } = useResendTimer(50);

  const handleResend = async () => {
    await resetTimer(async () => {
      await phoneAuth(phoneNumber);
      toast.success("OTP Sent Successfully!");
    });
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-center flex flex-col gap-6 text-sm text-[#717171]">
          <div className="flex flex-col gap-1">
            <div>OTP has been sent to</div>
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
                  Resend: 00:{resendTimer.toString().padStart(2, "0")}
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
          {loading ? (
            <RiLoaderLine size={20} className="animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
};

export default OtpComponent;
