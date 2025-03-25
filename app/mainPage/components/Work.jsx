import React from "react";
// import { motion } from "framer-motion";
import FlexComponent from "./FlexComponent";
// import Image from "next/image";

const Work = () => {
  const Monetization = `${process.env.NEXT_PUBLIC_GURL}/Monetization.png`;
  const Store = `${process.env.NEXT_PUBLIC_GURL}/Store.png`;
  const Topic = `${process.env.NEXT_PUBLIC_GURL}/Topic.png`;

  // // Animation variants for the sections
  // const sectionVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  // };

  return (
    <>
      <div className="flex flex-col py-4 text-center justify-center items-center gap-4">
        <div
          className="text-3xl text-white z-20 font-semibold"
          // initial={{ opacity: 0, y: -20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8 }}
          // viewport={{ once: true }}
        >
          Earn With Us
        </div>
        <div
          className="w-[90%] sm:w-[40%] sm:text-lg text-[13px] md:text-sm text-[#aaa] text-center"
          // initial={{ opacity: 0, y: -20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8, delay: 0.2 }}
          // viewport={{ once: true }}
        >
          Build your brand, engage with your audience, and earn through seamless
          monetization, premium content, and personalized services
        </div>
      </div>
      <div className="  flex h-auto justify-center items-center w-full text-white">
        <div className="w-full h-full  flex flex-col gap-5">
          {/* First Section */}
          <div
          // variants={sectionVariants}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true }}
          >
            <FlexComponent
              image={Monetization}
              gridColReverse={false}
              heading={"Earn from In-App Ads"}
              para={
                "As your community grows, so does your earning potential. Run targeted ads that match your community’s interests and watch your revenue rise."
              }
            />
          </div>

          {/* Second Section */}
          <div
          // variants={sectionVariants}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true }}
          // transition={{ delay: 0.2 }}
          >
            <FlexComponent
              image={Store}
              heading={"Instant Product Sales"}
              gridColReverse={true}
              para={
                "Set up a store within minutes and start selling directly to your audience. Grovyo makes it easy for your fans to buy your products, courses, or services."
              }
            />
          </div>

          {/* Third Section */}
          <div
          // variants={sectionVariants}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true }}
          // transition={{ delay: 0.4 }}
          >
            <FlexComponent
              image={Topic}
              gridColReverse={false}
              heading={"Sell Premium Content"}
              para={
                "Offer exclusive topics, chats, events, and posts to paid members. Give your most engaged followers a VIP experience while adding a new income stream."
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
