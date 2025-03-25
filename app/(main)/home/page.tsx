"use client";
import Image from "next/image";
import React from "react";
import Insidecompic from "../../assets/Insidecom.png";

// import axios from "axios";
// import { API } from "@/app/utils/helpers";

const Page = () => {
  // const [postData, setPostData] = useState<Array<any>>([]);
  // let userId = "65926d7709fb86617923eed7";
  // const fetchfeed = async () => {
  //   try {
  //     const res = await axios.get(`${API}/getfeed/${userId}`);
  //     if (res?.data?.success) {
  //       setPostData(res?.data?.mergedData);
  //     }
  //   } catch (e) {}
  // };
  // useEffect(() => {
  //   fetchfeed();
  // }, [userId]);

  return (
    <div className="bg-white w-full overflow-auto h-screen flex items-center justify-center">
      <Image
        alt="compic"
        src={Insidecompic}
        className="h-[200px] w-[200px] object-contain"
      />
      {/* <div className="text-black text-md py-2">
        Click on any post to view whole community
      </div> */}
    </div>
  );
};

export default Page;
