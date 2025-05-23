import axios from "axios";
import toast from "react-hot-toast";

export const API = process.env.NEXT_PUBLIC_API;
import CryptoJS from "crypto-js";

export const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPT_SECRET || "";

export const encryptData = (data: object): string => {
  const stringified = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Extract message from API response
      const message =
        error.response.data?.message ||
        error.response.data?.error || // Some APIs return 'error' instead of 'message'
        "Something went wrong";
      toast.error(message);
    } else if (error.request) {
      // Network error
      toast.error("Network error. Please check your connection and try again.");
    } else {
      // Unknown axios error
      toast.error("An unexpected error occurred. Please try again.");
    }
  } else if (error instanceof Error) {
    // Handle non-Axios errors
    toast.error(error.message || "An unknown error occurred.");
  } else {
    // Catch-all for any other errors
    toast.error("Unexpected error occurred.");
  }
};

export const formatNumber = (number: number) => {
  if (number >= 1000000000) {
    return Math.round(number / 1000000000) + "B";
  } else if (number >= 1000000) {
    return Math.round(number / 1000000) + "M";
  } else if (number >= 1000) {
    return Math.round(number / 1000) + "k";
  } else {
    return number.toString();
  }
};

// You can remove DateDifference if you don't need it or use it like below
// interface DateDifference {
//   years: number;
//   months: number;
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

export const formatDate = (dateString: string): string => {
  const dateNow: Date = new Date(); // Current date
  const createdAt: Date = new Date(dateString); // Date of post creation

  // Calculate the difference in milliseconds
  const differenceInMilliseconds: number =
    dateNow.getTime() - createdAt.getTime();

  // Convert milliseconds to seconds, minutes, hours, days, months, and years
  const seconds: number = Math.floor(differenceInMilliseconds / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const months: number = Math.floor(days / 30);
  const years: number = Math.floor(months / 12);

  // Create a human-readable string
  let dateStrings: string = "";
  if (years > 0) {
    dateStrings = years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    dateStrings = months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    dateStrings = days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    dateStrings = hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    dateStrings = minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    dateStrings = "just now";
  }

  return dateStrings;
};
