// import { useAuthContext } from "@/app/auth/components/auth";
import { useAuthContext } from "@/app/auth/components/auth";
import { setComjoined, setIsJoined } from "@/app/redux/slices/feedData";
import { RootState } from "@/app/redux/store";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ComData {
  dp: string;
  communityName: string;
  membersCount: number;
  desc: string;
  _id: string;
}

interface JoinPopupProps {
  comdata: ComData;
}

const JoinPopup = ({ comdata }: JoinPopupProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isJoinedPopup = useSelector(
    (state: RootState) => state.feedData.isjoined
  );
  const { data } = useAuthContext();
  const comjoined = useSelector((state: RootState) => state.feedData.comjoined);
  const joincom = async () => {
    try {
      const res = await axios.post(
        `${API}/joincom/${data?.id}/${comdata?._id}`
      );
      if (res?.data?.success) {
        router.push(
          `/home/insideCommunity?comId=${comdata?._id}&userId=${data?.id}&isJoined=subscribed`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const [load, setLoad] = useState(false);

  if (isJoinedPopup) return null;

  return (
    <div className="pn:max-sm:h-[calc(100%-100px)]  pn:max-sm:top-[50px]  h-full top-0 w-full duration-200 right-0 ease-in-out bg-[#ececec32] backdrop-blur-sm absolute ">
      <div className="w-full h-full bg-[#c1c1c132] md:bg-[#87878740] bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white text-black rounded-2xl shadow-lg p-2 w-[30%]  pn:max-sm:w-[80%]">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center ">
              <img
                loading="lazy"
                src={comdata?.dp}
                className="w-[50px] h-[50px] object-contain rounded-[20px]"
                alt="dp"
              />
              <div>
                <h2 className="text-[16px] font-semibold">
                  {comdata?.communityName}
                </h2>
                <p className="text-gray-600 text-sm">
                  {comdata?.membersCount} members
                </p>
              </div>
            </div>

            <p className="text-center bg-slate-50 p-2 rounded-lg text-black ">
              {comdata?.desc}
            </p>
            <button
              // disabled={load}
              onClick={() => {
                dispatch(setIsJoined(true));
                dispatch(setComjoined([...comjoined, comdata?._id]));
                joincom();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full font-semibold py-2 px-6 rounded-xl text-[14px]"
            >
              Join Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPopup;
