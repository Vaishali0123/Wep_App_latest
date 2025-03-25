// src/utils/otpUtils.js

import { toast } from "react-hot-toast";
interface Identity {
  identityType: string;
  identityValue: string;
}

interface UserInfo {
  identities: Identity[];
  token: string;
}
declare global {
  interface Window {
    OTPlessSignin: OTPless | undefined; // Specify the type
    // ReactNativeWebView: any; // Keep as any if not used
  }
}

declare class OTPless {
  constructor(callback: (userinfo: UserInfo) => void);
  initiate(options: {
    channel: string;
    phone?: string;
    email?: string;
    countryCode: string;
  }): Promise<void>;
  verify(options: {
    channel: string;
    phone?: string;
    email?: string;
    otp: string;
    countryCode: string;
  }): Promise<boolean>;
}

// declare class OTPless {
//   constructor(callback: any);
//   initiate(options: any): any;
//   verify(options: any): any;
// }

// Initialize OTPless
export const initOTPless = (callback: (userinfo: UserInfo) => void) => {
  const otplessInit = Reflect.get(window, "otplessInit");

  const loadScript = () => {
    const isScriptLoaded = document.getElementById("otpless-sdk");
    if (isScriptLoaded) return;

    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v2/headless.js";
    script.setAttribute("data-appid", "CZ0C3TQLX7LM7L3R4D7D");
    script.onload = () => {
      console.log("OTPless SDK loaded successfully.");
      window.OTPlessSignin = new OTPless(callback);
      // window.OTPlessSignin = new window.OTPless(callback);
    };
    document.body.appendChild(script);
  };

  if (otplessInit) {
    otplessInit();
  } else {
    loadScript();
  }

  Reflect.set(window, "otpless", callback);
};

// Phone authentication
export const phoneAuth = (phoneNumber: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (phoneNumber.length !== 10) {
      reject(new Error("Please enter a 10-digit phone number"));
      return;
    }

    if (!window?.OTPlessSignin) {
      console.error("OTPlessSignin is not initialized.");
      toast.error("OTP service is not initialized.");
      reject(new Error("OTPlessSignin not initialized"));
      return;
    }

    window.OTPlessSignin.initiate({
      channel: "PHONE",
      phone: phoneNumber,
      countryCode: "+91",
    })
      .then(() => {
        resolve(true);
      })
      .catch((error: Error) => {
        console.error("OTP Send Error: ", error);
        reject(new Error(error.message || "Error sending OTP"));
      });
  });
};

// OTP verification
export const verifyOTP = async (
  number: string,
  otp: string
): Promise<boolean | undefined> => {
  try {
    if (!window?.OTPlessSignin) {
      console.error("OTPlessSignin is not initialized.");
      toast.error("OTP service is not initialized.");
      return;
    }

    const result = await window.OTPlessSignin.verify({
      channel: "PHONE",
      phone: number,
      otp: otp,
      countryCode: "+91",
    });

    if (result) {
      console.log("OTP Verified Successfully");
      return true;
    } else {
      console.error("OTP Verification Failed");
      toast.error("OTP Verification Failed");
      return false;
    }
  } catch (error: unknown) {
    console.error("OTP Verification Error: ", error);
    toast.error("An error occurred during OTP verification");
  } finally {
  }
};

export const emailAuth = (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!window?.OTPlessSignin) {
      console.error("OTPlessSignin is not initialized.");
      toast.error("OTP service is not initialized.");
      reject(new Error("OTPlessSignin not initialized"));
      return;
    }

    window.OTPlessSignin.initiate({
      channel: "EMAIL",
      email: email,
      countryCode: "+91",
    })
      .then(() => {
        resolve(true);
      })
      .catch((error: Error) => {
        console.error("OTP Send Error: ", error);
        reject(new Error(error.message || "Error sending OTP"));
      });
  });
};

// OTP verification
export const verifyEmailOTP = async (email: string, otp: string) => {
  try {
    if (!window?.OTPlessSignin) {
      console.error("OTPlessSignin is not initialized.");
      toast.error("OTP service is not initialized.");
      return;
    }

    const result = await window.OTPlessSignin.verify({
      channel: "EMAIL",
      email: email,
      otp: otp,
      countryCode: "+91",
    });

    if (result) {
      console.log("OTP Verified Successfully");
      return true;
    } else {
      console.error("OTP Verification Failed");
      toast.error("OTP Verification Failed");
      return false;
    }
  } catch (error: unknown) {
    console.error("OTP Verification Error: ", error);
    toast.error("An error occurred during OTP verification");
  } finally {
  }
};

// Callback function for OTPless
export const callback = (userinfo: UserInfo) => {
  const mobileMap = userinfo?.identities.find(
    (item: Identity) => item.identityType === "MOBILE"
  )?.identityValue;

  const token = userinfo?.token;
  console.log("User Mobile:", mobileMap);
  console.log("User Token:", token);
};
