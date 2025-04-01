import React from "react";
import useResendTimer from "../../hooks/useResendTimer";

import toast from "react-hot-toast";
import { emailAuth } from "../../utils/otpUtils";
import InputOTPPattern from "./InputOTPPattern";
import { RiLoaderLine } from "react-icons/ri";

const EmailOtpComponent = ({
  email,
  setShowOtp,
  otp,
  setOtp,
  loading,
  verifyEmailOTP,
}: {
  email: string;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  verifyEmailOTP: (e: React.FormEvent) => Promise<void>;
}) => {
  const { canResend, resendTimer, resetTimer } = useResendTimer(50);

  const handleResend = async () => {
    await resetTimer(async () => {
      await emailAuth(email);
      toast.success("OTP Sent Successfully!");
    });
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-center flex flex-col gap-6 text-sm text-[#717171]">
          <div className="flex flex-col ">
            <div>OTP has been sent to</div>
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
          onClick={verifyEmailOTP}
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

export default EmailOtpComponent;
