"use client";
import { useAuthContext } from "@/app/auth/components/auth";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { RiLoaderLine } from "react-icons/ri";

interface Community {
  dps: string; // URL of the image
  community: {
    communityName: string;
    createdBy: {
      fullname: string;
    };
    dp?: string;
  };
  coms: {
    communityName: string;
    createdBy: {
      fullname: string;
    };
    dp?: string;
  };
  sender?: {
    fullname: string;
    username: string;
    _id: string;
  };
  _id?: string;
  price: number;
  name: string;
  brandname: string;
  discountedprice: number;
  images?: { content: string }[];
  content: string;
  discount?: number;
}
interface Prosite {
  dps: string; // URL of the image
  community: {
    communityName: string;
    createdBy: {
      fullname: string;
    };
  };
  sender?: {
    fullname: string;
    username: string;
    _id: string;
  };
  p?: {
    fullname: string;
    username: string;
    _id?: string;
  };
}

interface Product {
  _id?: string;
  price: number;
  name: string;
  brandname: string;
  discountedprice: number;
  images?: { content: string }[];
  content: string;
  discount?: number;
}

// interface Post {
//   title: string;
//   description: string;
//   post: { content: string }[];
//   content: string;
//   imgs: { content: string }[];
//   dp: string;
//   username: string;
//   _id: string;
// }

const Page = () => {
  // const [change, setChange] = useState<number>(2);
  const [text, setText] = useState<string>("");
  const [load, setLoad] = useState<string>("");
  const [active, setActive] = useState<string>("prosites"); // What is been searched
  const [data, setData] = useState<Community[]>([]);
  const { data: userData } = useAuthContext();
  const id = userData?.id;
  const [productimgs, setProductimgs] = useState([]);
  let debounceTimer: ReturnType<typeof setTimeout>;
  const handleSearch = useCallback(
    (trimmedText: string) => {
      const t = trimmedText.trim();

      // If the text is empty after trimming, return early to avoid unnecessary operations
      if (t === "") {
        setText(t); // Set empty text for cases where user deletes all text
        return;
      }

      setText(trimmedText);
      setLoad("load");
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        try {
          if (t) {
            if (active === "prosites") {
              const res = await axios.post(`${API}/searchprosite?query=${t}`);

              if (res?.status === 200) {
                const pros = res?.data?.data?.prosite;
                const dp = res?.data?.data?.dps;

                // ts-expect-error Type mismatch
                const merge = pros?.map((p: Prosite, i: number) => ({
                  p,
                  dps: dp[i],
                }));

                setData(merge);
                setLoad("done");
              } else {
                setLoad("done");
              }
            } else if (active === "community") {
              const res = await axios.post(`${API}/searchcom/${id}?query=${t}`);

              if (res?.status === 200) {
                const pros = res?.data?.data?.coms;
                const dp = res?.data?.data?.dps;
                // const c = res?.data?.data?.creatordps;

                // ts-expect-error  Type mismatch
                const merge = pros?.map((p: Prosite, i: number) => ({
                  dps: dp[i],
                  // creatordps: c[i],
                  coms: pros[i],
                }));

                setData(merge);
                setLoad("done");
              } else {
                // showErrorToast();
                setLoad("done");
              }
            } else if (active === "all") {
              const res = await axios.post(`${API}/searchproducts?query=${t}`);
              if (res?.data?.success) {
                setData(res?.data?.products);
                setProductimgs(res?.data?.imgs);
                setLoad("done");
              }
            } else {
              const res = await axios.post(`${API}/searchpost?query=${t}`);

              if (res?.data?.success) {
                // const pro = res?.data?.posts;
                // const imgs = res?.data?.imgs;
                // ts-expect-error  Type mismatch
                // const merge = pro?.map((p: Post, i: number) => ({
                //   p,
                //   imgs: imgs[i],
                //   dp: res?.data?.dp[i],
                // }));
                setData(res?.data?.posts);
                setLoad("done");
              } else {
                setLoad("done");
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    [active, API, id]
  );

  // const getDummyAnalyticsData = () => {
  //   const today = new Date();
  //   const analytics = [];

  //   for (let i = 6; i >= 0; i--) {
  //     const date = new Date(today);
  //     date.setDate(today.getDate() - i); // Previous 7 days

  //     analytics.push({
  //       date: date.toISOString().slice(0, 10), // YYYY-MM-DD
  //       visitors: Math.floor(Math.random() * 20) + 5, // Random between 5-25
  //       addedtocart: Math.floor(Math.random() * 10),
  //       totalorders: Math.floor(Math.random() * 5),
  //       cancelledorders: Math.floor(Math.random() * 3),
  //     });
  //   }

  //   return analytics;
  // };
  // const updateStoreAnlalyitcs = async (userId: string) => {
  //   try {
  //     const customAnalyticsData = getDummyAnalyticsData();

  //     const res = await axios.post(`${API}/updateStoreAnalytics`, {
  //       userId: userId,
  //       analytics: customAnalyticsData, // sending dummy data
  //     });

  //     console.log(res?.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const updateStoreAnlalyitcs = async (userId: string) => {
    try {
      await axios.post(`${API}/updateStoreAnalytics`, {
        userId: userId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-white w-full  h-full">
      <div className="text-[20px] font-semibold px-2 flex items-center h-[50px] bg-whtie border-b bg-white">
        Search
      </div>

      <div className="h-[60px] flex items-center p-2">
        <input
          value={text}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
          className="w-full h-full outline-none p-2 rounded-xl border"
        />
      </div>
      {/* Sections */}
      <div className="h-[40px] w-full flex items-center text-[14px] flex-wrap px-2 gap-2">
        <div
          onClick={() => (
            setActive("prosites"), setText(""), setData([]), setLoad("")
          )}
          className={`p-1 px-4 ${
            active === "prosites"
              ? "bg-black text-white hover:bg-[#888]"
              : "bg-white  border border-dashed hover:bg-slate-50"
          }  active:bg-slate-100  border border-dashed rounded-xl`}
        >
          Prosite
        </div>
        <div
          onClick={() => (
            setActive("community"), setText(""), setData([]), setLoad("")
          )}
          className={`p-1 px-4 ${
            active === "community"
              ? "bg-black text-white hover:bg-[#888]"
              : "bg-white   hover:bg-slate-50"
          }  active:bg-slate-100 border border-dashed rounded-xl`}
        >
          Community
        </div>
        {/* Posts */}
        <div
          onClick={() => (
            setActive("posts"), setText(""), setData([]), setLoad("")
          )}
          className={`p-1 px-4 ${
            active === "posts"
              ? "bg-black text-white hover:bg-[#888]"
              : "bg-white   hover:bg-slate-50"
          } active:bg-slate-100 border border-dashed rounded-xl`}
        >
          Post
        </div>
        <div
          onClick={() => (
            setActive("all"), setText(""), setData([]), setLoad("")
          )}
          className={`p-1 px-4 ${
            active === "all"
              ? "bg-black text-white hover:bg-[#222]"
              : "bg-white   hover:bg-slate-50"
          } active:bg-[#333] border border-dashed rounded-xl`}
        >
          Products
        </div>
      </div>

      {/* Prosite Data */}
      <div
        className={`${
          active === "prosites" ? "h-[calc(100%-150px)] bg-white" : "hidden"
        }`}
      >
        {load === "load" ? (
          <RiLoaderLine
            size={20}
            className="animate-spin w-full flex self-center"
          />
        ) : (
          data.map((d: Prosite, i) => (
            <Link
              onClick={() => {
                if (d?.p?._id) {
                  updateStoreAnlalyitcs(d?.p?._id);
                }
              }}
              href={{
                pathname: `../../../prosite/${d?.p?.username}`,
                // query: {
                //   id: d?.p?._id,
                // },
              }}
              key={i}
              className="flex h-[60px] items-center border-b justify-between hover:bg-slate-50 active:bg-slate-100 bg-white px-2 gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] border flex items-center justify-center rounded-2xl">
                  <img
                    src={d?.dps}
                    alt="dp"
                    className="w-[100%] h-[100%] object-cover rounded-2xl"
                  />
                </div>
                <div className="text-[#171717]">
                  <div className="text-[14px] font-semibold">
                    {d?.p?.fullname}
                  </div>
                  <div className="text-[12px] font-medium">
                    {d?.p?.username}
                  </div>
                </div>
              </div>
              {/* <div className="  hover:bg-slate-100 text-[12px] p-1 px-2 rounded-2xl">
                x
              </div> */}
            </Link>
          ))
        )}
      </div>
      {/* Community Data */}
      <div
        className={`${
          active === "community" ? "h-[calc(100%-150px)] bg-white" : "hidden"
        }`}
      >
        {load === "load" ? (
          <RiLoaderLine
            size={20}
            className="animate-spin w-full flex self-center"
          />
        ) : (
          data?.map((d: Community, i: number) => (
            <div
              key={i}
              className="flex h-[60px] items-center border-b justify-between hover:bg-slate-50 active:bg-slate-100 bg-white px-2 gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] border flex items-center justify-center rounded-2xl">
                  <img
                    src={d?.dps}
                    className="w-[100%] h-[100%] object-cover rounded-2xl"
                  />
                </div>
                <div className="text-[#171717]">
                  <div className="text-[14px] font-semibold">
                    {d?.coms?.communityName}
                  </div>
                  <div className="text-[12px] font-medium">
                    by {d?.coms?.createdBy?.fullname}
                  </div>
                </div>
              </div>
              {/* <div className="   hover:bg-slate-100 text-[12px] p-1 px-2 rounded-2xl">
              x
            </div> */}
            </div>
          ))
        )}
      </div>
      {/* Posts Data */}
      <div
        className={`${
          active === "posts"
            ? "h-[calc(100%-150px)] overflow-y-scroll"
            : "hidden"
        }`}
      >
        {load === "load" ? (
          <RiLoaderLine
            size={20}
            className="animate-spin w-full flex self-center"
          />
        ) : (
          data.map((d: Community, i) => (
            <div
              key={i}
              className="flex flex-col select-none cursor-pointer border-b py-2 hover:bg-slate-50 active:bg-slate-100 bg-white px-2 gap-2"
            >
              <div className="h-[50px] w-full flex  rounded-sm">
                <div className="flex items-center gap-2">
                  <div className="w-[40px] h-[40px] rounded-2xl bg-slate-50 border flex items-center justify-center">
                    <img
                      src={d?.community?.dp}
                      alt="post"
                      className="w-[100%] h-[100%] object-cover rounded-2xl"
                    />
                  </div>
                  <div className="text-[#171717]">
                    <div className="text-[14px] font-semibold">
                      {d?.community?.communityName}
                    </div>
                    <div className="text-[12px] font-medium">
                      {" "}
                      {d?.sender?.fullname}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-1 rounded-2xl">
                <div className="w-full h-[280px] rounded-2xl bg-slate-500 flex items-center justify-center "></div>
                {/* title  */}
                <div className=" text-ellipsis px-1  truncate overflow-hidden">
                  <div className="text-[14px]">y8yiuyiyu</div>
                  <div className=" text-ellipsis px-2 pt-2 truncate overflow-hidden">
                    fyfyfytftyf
                  </div>
                </div>
              </div>
              {/* Member section */}
              <div className="w-full h-full flex justify-between items-center">
                <div>
                  <div className="w-full rounded-2xl items-center flex">
                    <div className="h-[25px] w-[25px] bg-slate-600 rounded-[10px]"></div>
                    <div className="h-[25px] w-[25px] bg-slate-500 -ml-4 rounded-[10px]"></div>
                    <div className="h-[25px] w-[25px] bg-slate-400 -ml-4 rounded-[10px]"></div>
                    <div className="h-[25px] w-[25px] bg-slate-300 -ml-4 rounded-[10px]"></div>
                    <div className="ml-1 text-[12px]">20 members</div>
                  </div>
                </div>
                <div className="flex  items-center gap-2">
                  <div
                    // onClick={() => handleLike(d?.posts?._id)}
                    className={`flex px-2 py-1 border rounded-xl items-center gap-2
                             hover:bg-slate-100 active:bg-slate-50 bg-slate-50
                            `}
                  >
                    <FaHandsClapping
                    // className={`${
                    // likedPosts[d?.posts?._id]
                    // ? "text-yellow-500"
                    // : "text-gray-500"
                    // }`}
                    />
                    <div>45</div>
                  </div>

                  <div
                    // onClick={() => setShowPopup(true)}
                    className="p-2 border rounded-xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-50 bg-slate-50 "
                  >
                    <FaRegShareSquare />
                  </div>
                  {/* Popup */}
                  {/* {showPopup && (
                                      <div
                                        className="fixed inset-0 flex items-center justify-center z-50"
                                        style={{
                                          backdropFilter: "blur(8px)", // Background blur effect
                                          WebkitBackdropFilter: "blur(8px)",
                                        }}
                                      >
                                        <div className="bg-white p-4 rounded-xl shadow-md w-[300px] text-center">
                                          <h2 className="text-lg font-semibold mb-2">
                                            Copy Link
                                          </h2>
                                          <p className="text-sm mb-4">
                                            Copy the link to share this post with others.
                                          </p>
                                          <button
                                            //@ts-expect-error server
                                            // onClick={() => handleCopyLink(d?.posts?._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                          >
                                            Copy Link
                                          </button>
                                          <button
                                            // onClick={() => setShowPopup(false)}
                                            className="ml-2 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    )} */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Product data */}

      <div
        className={`${
          active === "all" ? "h-[calc(100%-150px)] bg-white " : "hidden"
        }`}
      >
        {load === "load" ? (
          <RiLoaderLine
            size={20}
            className="animate-spin w-full flex self-center"
          />
        ) : (
          data.map((d: Product, i) => (
            <Link
              key={i}
              href={{
                pathname: "../product",
                query: {
                  userId: id,
                  id: d?._id,
                },
              }}
              className="flex h-[60px] items-center
               border-b justify-between hover:bg-slate-50 
               ctive:bg-slate-100 bg-white px-2 gap-2 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2  w-[100%]">
                {/* DP */}
                <div className="h-[40px]  w-[40px] border flex items-center justify-center rounded-2xl">
                  <img
                    src={productimgs[i]}
                    alt="dp"
                    className="w-[100%] h-[100%] object-cover rounded-2xl"
                  />
                </div>
                {/* Product name */}
                <div className="text-[#171717] w-[70%]  ">
                  <div className="text-[14px] font-semibold   min-w-0 truncate max-w-[100%] ">
                    {d?.name}
                  </div>
                  <div className="text-[12px] font-medium">
                    by {d?.brandname}
                  </div>
                </div>
                {/* Price and discounted price */}
                <div className="px-2 flex flex-col items-center self-end  justify-center">
                  <div className="text-[12px] text-green-500 font-semibold">
                    ₹ {d?.discountedprice ? d?.discountedprice : d?.price}
                  </div>
                  <div className="text-[#171717] text-[12px] line-through ">
                    ₹ {d?.price}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
