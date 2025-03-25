"use client";
import Step from "./Step";
import { useEffect, useRef, useState } from "react";

export default function Works() {
  const SignUP = `${process.env.NEXT_PUBLIC_GURL}/SignUP&GetStarted.png`;
  const GotoProsite = `${process.env.NEXT_PUBLIC_GURL}/GotoProsite.png`;
  const LearnHowtoearn = `${process.env.NEXT_PUBLIC_GURL}/LearnHowtoearn.png`;
  const startEarning = `${process.env.NEXT_PUBLIC_GURL}/startEarning.png`;

  const steps = [
    {
      stepNumber: "01",
      title: "Sign Up and Get Started",
      description:
        "Start your journey on Grovyo by visiting (https://grovyo.com). Sign up easily, create your account, and explore the world’s first peer-to-peer social commerce platform!",
      image: SignUP,
    },
    {
      stepNumber: "02",
      title: "Go to Your ProSite (Profile + Website)",
      description:
        "Click on your profile picture on top let section to navigate to your prosite. Here, you'll find the 'Earn with Us' section. Click on it to access the workspace and explore earning opportunities.",
      image: GotoProsite,
    },
    {
      stepNumber: "03",
      title: "Learn How to Earn",
      description:
        "Earn with Us lets you create a store, set up paid topics, and monetize content—unlock features by meeting your targets.",
      image: LearnHowtoearn,
    },
    {
      stepNumber: "04",
      title: "Start Earning",
      description:
        "Once you’ve achieved your targets, you’re ready to start earning! Fulfill your goals and begin earning with Grovyo.",
      image: startEarning,
    },
  ];

  const handleScroll = (e) => {
    const stepHeight = 150;
    const scrollTop = e.target.scrollTop;
    const calculatedStep = Math.round(scrollTop / stepHeight);

    setActiveStep(Math.min(calculatedStep, steps.length - 1)); // Prevents overflow
  };

  // const handleScrolly = (e) => {
  //   const stepHeight = 75;
  //   const scrollTop = e.target.scrollTop;
  //   const calculatedStep = Math.round(scrollTop / stepHeight);

  //   setActiveStep(Math.min(calculatedStep, steps.length - 1)); // Prevents overflow
  // };
  const sliderRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveStep((prev) => (prev + 1) % steps.length);
  //   }, 3000); // Auto-scroll every 3 seconds

  //   return () => clearInterval(interval);
  // }, [steps.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: activeStep * sliderRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [activeStep]);

  const goForward = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const goBackward = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };
  return (
    <div className="flex flex-col h-auto text-white items-center">
      {/* Header */}
      <div className="text-center flex flex-col gap-2 py-4">
        <h2 className="text-2xl font-semibold">How it Works</h2>
        <p className="text-sm text-[#e7e7e7]">
          Step-by-Step Guide to Building and Monetizing Your Community
        </p>
      </div>

      {/* Main Content */}
      <div className="grid sm:grid-cols-2 pn:max-sm:h-screen font-sans mt-6 w-full">
        {/* Image Section */}
        <div className=" pn:max-sm:h-[300px] h-[400px] flex justify-center items-center w-full">
          <img
            loading="lazy"
            alt="feature"
            src={steps[activeStep].image}
            className="w-full min-w-[350px] object-contain h-full sm:h-[400px]"
          />
        </div>

        {/* Steps Section for web */}
        <div
          onScroll={handleScroll}
          className="flex pn:max-sm:hidden flex-col w-[80%] overflow-auto pt-[100px] pb-[100px] gap-[50px] h-[400px] "
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              isPrevious={activeStep - 1 === index}
              isNext={activeStep + 1 === index}
              isActive={activeStep === index}
            />
          ))}
        </div>

        {/* Steps Section for android */}
        <div className="sm:hidden w-full h-[200px] flex overflow-hidden">
          <button
            onClick={goBackward}
            className="px-4 py-2 active:bg-[#222] shadow-xl shadow-[#0d0d0d] rounded-r-full"
          >
            ←
          </button>
          <div
            ref={sliderRef}
            className="flex w-full h-full overflow-x-scroll scrollbar-hide scroll-smooth"
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex justify-center items-center p-4"
              >
                <Step
                  stepNumber={step.stepNumber}
                  title={step.title}
                  description={step.description}
                  isActive={activeStep === index}
                />
              </div>
            ))}
          </div>
          <button
            onClick={goForward}
            className="px-4 py-2 active:bg-[#222] shadow-xl shadow-[#0d0d0d] rounded-l-full"
          >
            →
          </button>
        </div>
        <div className=" h-[60px] w-full justify-center pt-10 flex gap-2">
          <div className="gap-2 flex">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`sm:w-2 w-1 sm:h-2 h-1 rounded-full ${
                  activeStep === index ? "bg-blue-500" : "bg-[#222]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
