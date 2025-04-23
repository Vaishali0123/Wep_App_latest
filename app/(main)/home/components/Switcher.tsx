// "use client";
// import React from "react";
// import { usePathname } from "next/navigation";

// const Switcher = React.memo(() => {
//   const path = usePathname();

//   return (
//     <div
//       className="h-[50px] bg-white shadow-sm z-50 pn:max-sm:items-center
//     pn:max-sm:w-[100%] overflow-hidden sm:max-md:rounded-r-3xl md:px-2 pn:max-md:justify-start flex flex-row items-center"
//     >
//       {/* <div
//         // href={"/home/newforyou"}
//         // href="/home/test"
//         className={`${
//           path.startsWith("/home/newforyou")
//             ? "text-[14px] pn:max-sm:text-[12px]  text-[#171717] p-3 bg-[#f5f5f5] rounded-xl font-semibold mx-2 hover:text-black transition-all duration-300"
//             : "text-[14px] pn:max-sm:text-[12px] text-[#727272]  font-medium mx-2 hover:text-black border-b-0 transition-all duration-300"
//         }`}
//       >
//         New for you
//       </div>

//       <div
//         // href={"/home/community"}
//         // href="/home/test"
//         className={`${
//           path.startsWith("/home/community")
//             ? "text-[14px] pn:max-sm:text-[12px] p-3  bg-[#f5f5f5] rounded-xl text-[#171717] font-semibold mx-2 hover:text-black transition-all duration-300"
//             : "text-[14px] pn:max-sm:text-[12px] text-[#727272] font-medium mx-2 hover:text-black border-b-0 transition-all duration-300"
//         }`}
//       >
//         Community
//       </div> */}
//       <div className="grid grid-cols-1  border-2 border-slate-50 relative rounded-xl bg-slate-50 pn:max-sm:-mt-6 w-fit">
//         <div className="flex rounded-xl text-[#303030] select-none text-[14px]">
//           <div
//             className={`  rounded-xl flex justify-center items-center h-[35px] w-[150px] z-10 ${
//               path.startsWith("/home/newforyou")
//                 ? "font-bold "
//                 : "cursor-pointer"
//             }`}
//           >
//             New for you
//           </div>
//           <div
//             className={`absolute duration-100 h-[35px] w-[50%] rounded-xl bg-slate-100 ${
//               path.startsWith("/home/newforyou") ? "left-[0px] " : " left-[50%]"
//             }`}
//           ></div>
//           <div
//             className={` rounded-xl flex justify-center items-center h-[35px] w-[150px] z-10 ${
//               path.startsWith("/home/community")
//                 ? "font-bold "
//                 : "cursor-pointer"
//             }`}
//           >
//             Community
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });
// Switcher.displayName = "Switcher";
// export default Switcher;
"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const tabs = [
  { label: "New for you", href: "/home/newforyou" },
  { label: "Community", href: "/home/community" },
];

const Switcher = React.memo(() => {
  const path = usePathname();
  const router = useRouter();

  const selectedIndex = path.startsWith("/home/community") ? 1 : 0;

  return (
    <div className="h-[50px] bg-white shadow-sm z-50 w-full flex items-center px-2">
      <div className="relative flex bg-slate-50 rounded-xl overflow-hidden">
        {/* Animated Background Indicator */}
        <div
          className="absolute h-full w-1/2 bg-slate-100 rounded-xl transition-all duration-300 ease-in-out"
          style={{
            transform: `translateX(${selectedIndex * 100}%)`,
          }}
        />

        {/* Tabs */}
        {tabs.map((tab) => {
          const isActive = path.startsWith(tab.href);
          return (
            <button
              key={tab.label}
              onClick={() => router.push(tab.href)}
              className={clsx(
                "relative z-10 w-[150px] h-[35px] text-sm font-medium transition-colors duration-300",
                isActive
                  ? "font-semibold text-[#171717]"
                  : "text-[#727272] hover:text-black cursor-pointer"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});

Switcher.displayName = "Switcher";
export default Switcher;
