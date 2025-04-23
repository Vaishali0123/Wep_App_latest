"use client";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(false);

  const send = () => {
    if (!email) return;
    setEmail("");
    setPage(true);
  };
  return (
    <>
      <div className="flex flex-col  w-[85%] justify-center px-[5%]  ">
        <h1 className="text-3xl font-semibold  pt-20 py-2">Data Deletion Request</h1>
        <div className="flex flex-col gap-4 pt-2">
          <div>
            Thank you for choosing Grovyo. If you wish to request the deletion
            of your data, please follow the steps below:
          </div>
          <div>
            <h1 className=" pb-2 font-bold">
              Enter email address associated with your account
            </h1>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={email}
                className="p-2 border-b  w-[90%] lg:w-[50%]  bg-transparent outline-none"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />

              <div className="flex items-center">
                <button
                  disabled={!email}
                  className=" px-4 py-2 sm:px-6 sm:py-3 md:px-[80px] md:py-4
			 text-white bg-[#127DF7] rounded-3xl cursor-pointer mt-4"
                  onClick={send}
                >
                  Verify &#8594;
                </button>
              </div>
            </div>
          </div>
          {page && (
            <div>Your Deletion request has been submiited successfully.</div>
          )}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">Data Removal:</h1>
              <div>
                Upon submitting your account deletion request, the following
                data will be removed:
              </div>
              <div>Personal Information: Name,Email, Number</div>
              <div>
                Usage Data: Activity and Preferences and Content Recommendation
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">Retention Period:</h1>
              <div>
                We retain certain data for a limited period to comply with legal
                obligations or for necessary business purposes. The retention{" "}
                <br />
                period is as follows:
              </div>
              <div>365 Days</div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">Additional Information:</h1>
              <div>
                For more details on our data handling practices, please refer to
                our Privacy Policy.
              </div>
              <div>
                If you encounter any issues or have questions about the account
                deletion process, please contact our support team at
                <a
                  href="mailto:contact@grovyo.com"
                  className="text-blue-500 underline"
                >
                  {" "}
                  contact@grovyo.com.
                </a>
              </div>
              <div>
                Note: Account deletion is irreversible, and you won&apos;t be
                able to recover your data once the process is complete.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
