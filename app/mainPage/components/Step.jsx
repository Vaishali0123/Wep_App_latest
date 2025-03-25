export default function Step({ stepNumber, title, description, isActive }) {
  return (
    <div
      className={`flex gap-4 items-center justify-center sm:w-[80%] sm:p-4 p-2 transition-all duration-500 ease-out transform 
        ${
          isActive
            ? "sm:scale-105 bg-[#222] rounded-2xl sm:border sm:border-[#0a0a0a] sm:translate-x-[40px] sm:text-lg sm:text-white"
            : "  sm:text-[#7d7c7c84] rounded-2xl sm:border sm:border-[#0a0a0a]"
        }`}
    >
      <div className="flex flex-col">
        <div className={isActive ? "text-white" : "text-[#7d7c7c84]"}>
          <div className="flex items-center pn:max-sm:justify-center gap-2">
            {/* {isActive && (
              <div className="w-[10px] pn:max-sm:hidden flex pn:max-sm:text-center h-[10px] border-2 border-[#1820ff] bg-white rounded-full"></div>
            )} */}
            <div
              className={`flex pn:max-sm:text-center text-[16px] gap-2 font-medium ${
                isActive ? "text-white" : "text-[#7d7c7c84]"
              }`}
            >
              {stepNumber}. <span className="underline">{title}</span>
            </div>
          </div>
        </div>
        <div
          className={`leading-5 font-regular w-[90%] pl-8 p-1 text-sm pn:max-sm:text-center  ${
            isActive ? "text-[#ffffffe5]" : "text-[#a1a2a154]"
          }`}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
