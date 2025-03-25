import React from "react";
// import Logo from "../assets/Logo.png";
import com from "../assets/com.png";
import com1 from "../assets/com-11.png";
import com2 from "../assets/com-1.png";
import com3 from "../assets/com-2.png";
import com4 from "../assets/com-3.png";
import com5 from "../assets/com-4.png";
import Image from "next/image";
const Page = () => {
  const logo = `${process.env.NEXT_PUBLIC_GURL}/Logo.png`;

  return (
    <>
      <div className="bg-[#222222] h-auto overflow-y-scroll select-none no-scrollbar grid grid-cols-1 w-full py-3 pb-[40px] px-2 sm:px-4">
        <div className=" justify-center  items-center w-[100%] flex ">
          <div className="h-[50px] w-full flex justify-between items-center px-2 ">
            <div className="h-[55px] flex text-[#fff] items-center justify-center rounded-3xl ">
              <div className="h-[55px] w-[55px]  rounded-3xl">
                <Image src={logo} className="rounded-3xl" />
              </div>
            </div>

            <div className="flex justify-center items-center px-5 gap-2 sm:gap-4">
              <a
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.grovyomain&hl=en_IN&gl=US"
                className="bg-[#0A7CFF] shadow-lg shadow-blue-500/50 text-white px-4 py-2 font-semibold rounded-full"
              >
                Download now
              </a>
            </div>
          </div>
        </div>

        {/* main */}
        <div className="flex  justify-center items-center w-full">
          <div className="flex sm:flex-row flex-col justify-center mt-6 w-[99%] bg-[#BFF9EA] rounded-2xl overflow-hidden sm:rounded-[30px] h-[80vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] items-center">
            <div className="sm:min-w-[50%]  w-full h-full">
              <Image src={com} className="w-full z-10 h-full object-cover" />
            </div>
            <div className="flex justify-center p-3 z-0 sm:min-w-[50%] items-center">
              <div className="flex gap-4 flex-col">
                <div className="lg:text-5xl text-2xl sm:text-3xl md:text-4xl max-w-[90%] leading-snug text-[#333] font-semibold">
                  Create Your Professional Presence: Introducing Grovyo
                  Prosites!
                </div>
                <div className="text-lg font-medium text-[#333]">
                  Showcase Yourself and Your Brand with a Stunning Website
                </div>
                <div className="bg-[#000] font-semibold text-white p-2 px-5 max-w-[170px] rounded-xl flex justify-center items-center">
                  Getting Started
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* main */}

        {/* desc */}
        <div className="flex flex-col justify-center  gap-[95px] items-center my-[20px] sm:my-[50px] w-full h-full">
          <div className="grid sm:grid-cols-2   gap-8 w-[90%] md:w-[80%]">
            <div className="flex sm:relative sm:top-[60px]">
              <div className="flex pn:max-sm:flex-col gap-3 min-w-[50%]">
                <div className="flex gap-3">
                  <div
                    className="min-w-[30px] min-h-[30px]  max-w-[30px] max-h-[30px] 
				  rounded-full text-sm font-semibold flex justify-center items-center  text-white bg-[#333]"
                  >
                    1.
                  </div>
                  <div className="text-2xl sm:hidden  text-white font-semibold">
                    Access Your Workspace :
                  </div>
                </div>
                <div className="sm:hidden text-white flex flex-col font-medium gap-2 leading-7 justify-center items-center max-w-[400px]">
                  <div>
                    You can access your Workspace either by opening the Grovyo
                    app and navigating to the "Workspace" section, or by going
                    directly to{" "}
                    <a
                      target="_blank"
                      className="text-blue-400 text-sm"
                      href="https://workspace.grovyo.com/"
                    >
                      workspace.grovyo.com
                    </a>{" "}
                    in your web browser.
                  </div>
                  <div>
                    Use your existing Grovyo account credentials to log in
                    seamlessly.
                  </div>
                </div>
                <div className="text-white pn:max-sm:hidden flex flex-col gap-2  ">
                  <div className="text-2xl text-white font-semibold">
                    Access Your Workspace :
                  </div>
                  <div className="flex flex-col font-medium gap-2 leading-7 justify-center items-center max-w-[400px]">
                    <div>
                      You can access your Workspace either by opening the Grovyo
                      app and navigating to the "Workspace" section, or by going
                      directly to{" "}
                      <a
                        target="_blank"
                        className="text-blue-400 text-sm"
                        href="https://workspace.grovyo.com/"
                      >
                        workspace.grovyo.com
                      </a>{" "}
                      in your web browser.
                    </div>
                    <div>
                      Use your existing Grovyo account credentials to log in
                      seamlessly.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[50%]   flex justify-center items-center">
              <Image
                alt="Access"
                loading="lazy"
                src={com1}
                className="sm:max-w-[50%] sm:min-w-[400px] max-h-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8  w-[90%] md:w-[80%]">
            <div className="flex sm:relative sm:top-[90px]">
              <div className="flex pn:max-sm:flex-col gap-3 min-w-[50%]">
                <div className="flex pn:max-sm:items-center gap-3">
                  <div
                    className="min-w-[30px] min-h-[30px]  max-w-[30px] max-h-[30px] bg-[#333]
				   rounded-full text-sm font-semibold flex justify-center items-center  "
                  >
                    2.
                  </div>
                  <div className="text-2xl sm:hidden text-white font-semibold">
                    Explore Prosites:{" "}
                  </div>
                </div>
                <div className="font-medium max-w-[80%] text-white sm:hidden leading-7">
                  Within your Workspace, locate the dedicated "Prosite" section.
                </div>
                <div className="text-white pn:max-sm:hidden flex flex-col gap-2  ">
                  <div className="text-2xl text-white font-semibold">
                    Explore Prosites:{" "}
                  </div>

                  <div className="font-medium max-w-[80%]  leading-7">
                    Within your Workspace, locate the dedicated "Prosite"
                    section.
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[50%] flex justify-center items-center">
              <Image
                alt="Explore"
                loading="lazy"
                src={com2}
                className="sm:max-w-[50%] sm:min-w-[400px] max-h-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8  w-[90%] md:w-[80%]">
            <div className="flex  sm:relative sm:top-[80px]">
              <div className="flex pn:max-sm:flex-col gap-3 min-w-[50%]">
                <div className="flex pn:max-sm:items-center gap-3">
                  <div
                    className="min-w-[30px] min-h-[30px]  max-w-[30px] max-h-[30px] bg-[#333]
				   rounded-full text-sm 
				  font-semibold flex justify-center items-center  "
                  >
                    3.
                  </div>
                  <div className="text-2xl text-white sm:hidden font-semibold">
                    Choose Your Layout:
                  </div>
                </div>
                <div className="font-medium max-w-[80%] text-white sm:hidden leading-7">
                  Grovyo offers a variety of pre-designed layouts to suit
                  different styles and needs. Browse the available options and
                  pick the one that best reflects your vision.
                </div>
                <div className="text-white pn:max-sm:hidden flex flex-col gap-2  ">
                  <div className="text-2xl text-white font-semibold">
                    Choose Your Layout:
                  </div>

                  <div className="font-medium max-w-[80%]  leading-7">
                    Grovyo offers a variety of pre-designed layouts to suit
                    different styles and needs. Browse the available options and
                    pick the one that best reflects your vision.
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[50%] flex justify-center items-center">
              <Image
                src={com3}
                alt="Choose layout"
                loading="lazy"
                className="sm:max-w-[50%] sm:min-w-[400px] max-h-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 w-[90%] md:w-[80%]">
            <div className="flex  sm:relative sm:top-[90px]">
              <div className="flex pn:max-sm:flex-col gap-3 min-w-[50%]">
                <div className="flex pn:max-sm:items-center gap-3">
                  <div
                    className="min-w-[30px] min-h-[30px]  max-w-[30px] max-h-[30px] bg-[#333]
				   rounded-full text-sm 
				  font-semibold flex justify-center items-center  "
                  >
                    4.
                  </div>
                  <div className="text-2xl sm:hidden text-white font-semibold">
                    {" "}
                    Edit and Customize:
                  </div>
                </div>
                <div className="font-medium max-w-[80%] text-white sm:hidden leading-7">
                  Unleash your creativity! Edit the chosen layout with your own
                  text, images, and branding elements. Make it your own!
                </div>
                <div className="text-white pn:max-sm:hidden flex flex-col gap-2  ">
                  <div className="text-2xl text-white font-semibold">
                    {" "}
                    Edit and Customize:
                  </div>

                  <div className="font-medium max-w-[80%]  leading-7">
                    Unleash your creativity! Edit the chosen layout with your
                    own text, images, and branding elements. Make it your own!
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[50%] flex justify-center items-center">
              <Image
                src={com4}
                alt="Edit"
                loading="lazy"
                className="sm:max-w-[50%] sm:min-w-[400px] max-h-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8  w-[90%] md:w-[80%]">
            <div className="flex sm:relative sm:top-[90px]">
              <div className="flex pn:max-sm:flex-col gap-3 min-w-[50%]">
                <div className="flex pn:max-sm:items-center gap-3">
                  <div
                    className="min-w-[30px] min-h-[30px]  max-w-[30px] max-h-[30px] bg-[#333]
				   rounded-full text-sm
				   font-semibold flex justify-center items-center  "
                  >
                    5.
                  </div>
                  <div className="text-2xl sm:hidden text-white font-semibold">
                    Go Live!
                  </div>
                </div>
                <div className="font-medium max-w-[80%] text-white sm:hidden leading-7">
                  Once you're happy with your Prosite, hit the "Set Live" button
                  to publish your prosite and make it visible to the world.
                </div>

                <div className="text-white pn:max-sm:hidden flex flex-col gap-2  ">
                  <div className="text-2xl text-white font-semibold">
                    Go Live!
                  </div>

                  <div className="font-medium max-w-[80%]  leading-7">
                    Once you're happy with your Prosite, hit the "Set Live"
                    button to publish your prosite and make it visible to the
                    world.
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[50%] flex justify-center items-center">
              <Image
                src={com5}
                alt="Go live"
                loading="lazy"
                className="sm:max-w-[50%] sm:min-w-[400px] max-h-full"
              />
            </div>
          </div>
        </div>
        {/* desc */}

        <div className="flex  justify-center  mt-[50px] items-center">
          <div
            className="flex flex-col md:flex-row sm:justify-center
		   py-4 px-6 rounded-xl text-white sm:items-center bg-[#333333] md:w-[90%]"
          >
            <div className="flex flex-col gap-2 min-w-[60%]">
              <div className=" text-md font-semibold">
                With Grovyo Prosites, take control of your online presence in a
                few simple steps.
              </div>
              <div className=" text-sm text-[#f2f2f2] ">
                Create your professional website today and elevate your brand!
              </div>
            </div>
            <div className="flex sm:justify-end  sm:mt-0 mt-4 sm:min-w-[40%] items-center">
              <a
                className="bg-[#0A7CFF] text-white py-2 px-5 font-semibold rounded-lg text-sm"
                target="_blank"
                href="https://workspace.grovyo.com/"
              >
                Create your prosite
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
