import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="h-full w-full bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Contact Us</h1>
        <p className="text-base text-gray-600 mt-2">
          We&apos;re here to help! Reach out to us through any of the channels
          below.
        </p>
      </div>

      {/* Contact Details Section */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <div className="space-y-6">
          {/* Phone Contact */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.5a6.5 6.5 0 016.5-6.5h4a6.5 6.5 0 016.5 6.5v4a6.5 6.5 0 01-6.5 6.5h-4a6.5 6.5 0 01-6.5-6.5v-4z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
              <p className="text-sm text-gray-600">+91 9532837959</p>
            </div>
          </div>

          {/* Email Contact */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500 text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.5 6L18 8M3 8l7.5 6m-7.5-6v9.5a2.5 2.5 0 002.5 2.5h11a2.5 2.5 0 002.5-2.5V8m-14 6.5l7.5 6"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Email</h2>
              <p className="text-sm text-gray-600">contact@grovyo.com</p>
            </div>
          </div>

          {/* Address Contact */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-500 text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12v-2.5a2.5 2.5 0 015 0V12a2.5 2.5 0 01-5 0zM7.5 10a2.5 2.5 0 00-2.5 2.5v4A2.5 2.5 0 007.5 19h9a2.5 2.5 0 002.5-2.5v-4a2.5 2.5 0 00-2.5-2.5h-9z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">LinkedIn</h2>
              {/* https://www.linkedin.com/company/grovyo/ */}
              <Link
                href={"https://www.linkedin.com/company/grovyo/"}
                className="text-sm text-gray-600"
              >
                https://www.linkedin.com/company/grovyo/
              </Link>
              {/* < <p className="text-sm text-gray-600">
                123 Grovyo Street, New York, NY 10001
              </p>> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8 text-center text-gray-500">
        <p className="text-sm">
          &copy; 2025 Grovyo Platforms. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Page;
