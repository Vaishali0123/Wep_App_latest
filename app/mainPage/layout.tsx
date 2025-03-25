import React from "react";
import Footer from "../mainPage/components/Footer";
import Header2 from "../mainPage/components/header2";
function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen overflow-auto fixed bg-[#0d0d0d] ">
      <Header2 />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
