import * as React from "react";
// import CreatorPanel from "./mainPage/components/CreatorPanel";
import Footer from "./mainPage/components/Footer";
import Ecosystem from "./mainPage/components/Ecosystem";
import Work from "./mainPage/components/Work";
import Works from "./mainPage/components/Works";
import Features from "./mainPage/components/Featured";
import Header2 from "./mainPage/components/header2";
import Hero1 from "./mainPage/components/hero1";
import Faq from "./mainPage/components/Faq";

const Page = () => {
  return (
    <div className="w-screen h-screen overflow-auto fixed bg-[#0d0d0d] ">
      <Header2 />
      {/* <CreatorPanel /> */}
      <section id="about" className=" pn:max-sm:pt-16">
        <Hero1 />
      </section>
      <section id="ecosystem">
        <Ecosystem />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="earnwithus">
        <Work />
      </section>
      <Works />
      <Faq />
      <Footer />
    </div>
  );
};

export default Page;
