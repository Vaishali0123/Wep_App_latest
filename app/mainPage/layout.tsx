import React from "react";
import Footer from "./components/Footerterms";
import Header2 from "../mainPage/components/header2";
function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#ffffff] h-screen">
      <Header2 />
      {children}
      <Footer />
    </div>
  );
}

export default layout;

// import React from "react";

// function layout() {
//   return <div>layout</div>;
// }

// export default layout;
