"use client";
import { useAuthContext } from "@/app/auth/components/auth";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useState } from "react";
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
    _id: string;
  };
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
            }
            // else if (active === 'all') {
            //   const res = await axios.post(`${API}/searchall/${id}?query=${t}`);

            //   if (res?.data?.success) {
            //     const pro = res?.data?.mergedpros;
            //     const com = res?.data?.mergedcoms;
            //     const post = res?.data?.mergedposts;
            //     setData({pro, com, post});
            //     setLoad('done');
            //   } else {
            //     showErrorToast();
            //   }
            // }
            else {
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
              href={{
                pathname: "../../../prosite",
                query: {
                  id: d?.p?._id,
                },
              }}
              key={i}
              className="flex h-[60px] items-center border-b justify-between hover:bg-slate-50 active:bg-slate-100 bg-white px-2 gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] border flex items-center justify-center rounded-2xl">
                  <img
                    src={d?.dps}
                    alt="dp"
                    className="w-[100%] h-[100%] object-contain rounded-2xl"
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
                    className="w-[100%] h-[100%] object-contain rounded-2xl"
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
        className={`${active === "posts" ? "h-[calc(100%-150px)] " : "hidden"}`}
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
              className="flex h-[60px] items-center border-b justify-between hover:bg-slate-50 active:bg-slate-100 bg-white px-2 gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-[50px] w-[50px] border flex items-center justify-center rounded-sm">
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
              <div className="  hover:bg-slate-100 text-[12px] p-1 px-2 rounded-2xl">
                x
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
