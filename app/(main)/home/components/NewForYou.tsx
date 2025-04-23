"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Post, { PostDataItem } from "./Post";
import { API } from "@/app/utils/helpers";
import axios from "axios";
// import { FixedSizeList as List } from "react-window";
import { useAuthContext } from "@/app/auth/components/auth";

type PostData = PostDataItem[];
const Page = () => {
  const [postData, setPostData] = useState<Array<PostData>>([]);
  const lastPostRef = useRef<HTMLElement | null>(null);
  // const lastPostRef = useRef<HTMLDivElement | null>(null);
  const { data } = useAuthContext();
  const userId = data?.id;
  const [page, setPage] = useState(1);
  // const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Track if more posts are available
  const isFetching = useRef(false);

  //Get feed API
  const fetchfeed = useCallback(async () => {
    if (!userId || isFetching.current || !hasMore) return;
    isFetching.current = true;
    setLoading(true);
    try {
      const res = await axios.get(`${API}/getfeed/${userId}`, {
        params: { page: page },
      });

      if (res?.data?.success) {
        setPostData((prevPosts) => [...prevPosts, ...res?.data?.mergedData]);
        setPage((prevPage) => prevPage + 1); // Increment the page
        setHasMore(res?.data?.mergedData.length > 0);
        setLoading(false);
      }
    } catch (e: unknown) {
      console.log(e);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [userId, page]);
  useEffect(() => {
    if (userId) {
      fetchfeed();
    }
  }, [userId]);

  useEffect(() => {
    if (!lastPostRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchfeed();
        }
      },
      { threshold: 0.8 }
    );

    const currentRef = lastPostRef.current;
    observer.observe(currentRef);

    return () => observer.unobserve(currentRef);
  }, [loading, hasMore]);

  // const trackViewAPI = async (postId: string) => {
  //   try {
  //     setPostId((prev) => [...(prev as string[]), postId]);
  //     const res = await axios.post(
  //       "http://192.168.1.9:7001/api/sendanalytics",
  //       {
  //         userId: userId,
  //         postId: postId,
  //       }
  //     );

  //     console.log(`✅ View tracked for post: ${postId}`);
  //   } catch (e) {
  //     console.error("❌ Error tracking view:", e);
  //   }
  // };
  // useEffect(() => {
  //   if (postid) {
  //     postid.forEach((postId) => {
  //       trackViewAPI(postId);
  //     });
  //   }
  // }, [postid]);
  return (
    <>
      {postData.length > 0 ? (
        <>
          {" "}
          <Post
            postData={postData as PostData}
            switcher={0}
            // ads={ads}
            lastPostRef={lastPostRef as React.RefObject<HTMLElement>}
            // loading={loading}
          />
          {/* {loading && (
            <p className="text-center py-4 text-black flex items-center justify-center">
              <RiLoaderLine
                size={30}
                className="animate-spin w-full flex self-center"
              />
            </p>
          )} */}
        </>
      ) : postData.length === 0 && !loading ? (
        <div className="w-full flex items-center justify-center">
          No Post available
        </div>
      ) : (
        <>
          {" "}
          <div className="w-full border-b flex flex-col items-center space-y-2 justify-between text-[14px] p-2">
            {/* header  */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-[40px] w-[40px] bg-slate-500 animate-pulse rounded-[16px] "></div>
                <div className="text-black text-md py-2 px-6 rounded-xl animate-pulse bg-slate-400"></div>
              </div>
              <div className="text-black text-md px-6 bg-slate-400 animate-pulse rounded-xl py-4"></div>
            </div>
            {/* post  */}
            <div className="p-2 h-[280px] w-full overflow-hidden bg-slate-50 rounded-2xl">
              <div className="w-full h-full rounded-2xl animate-pulse bg-slate-500 "></div>
            </div>
            {/* Member section */}
            <div className="w-full h-full flex justify-between items-center">
              <div>
                <div className="w-full rounded-2xl items-center flex">
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-600 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-500 -ml-4 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-400 -ml-4 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-300 -ml-4 rounded-[10px]"></div>
                  <div className="ml-1 text-[12px]"></div>
                </div>
              </div>

              {/* Likes & Share */}

              <div className="flex  items-center gap-2">
                <div
                  className={`flex p-4  px-6 border rounded-xl animate-pulse items-center gap-2
                                bg-slate-100
                                    active:bg-slate-50`}
                >
                  <div></div>
                </div>
                <div className="p-4 px-6 border rounded-xl animate-pulse flex items-center justify-center bg-slate-100 active:bg-slate-50 "></div>
              </div>
            </div>
          </div>{" "}
          <div className="w-full border-b flex flex-col items-center space-y-2 justify-between text-[14px] p-2">
            {/* header  */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-[40px] w-[40px] bg-slate-500 animate-pulse rounded-[16px] "></div>
                <div className="text-black text-md py-2 px-6 rounded-xl animate-pulse bg-slate-400"></div>
              </div>
              <div className="text-black text-md px-6 bg-slate-400 animate-pulse rounded-xl py-4"></div>
            </div>
            {/* post  */}
            <div className="p-2 h-[280px] w-full overflow-hidden bg-slate-50 rounded-2xl">
              <div className="w-full h-full rounded-2xl animate-pulse bg-slate-500 "></div>
            </div>
            {/* Member section */}
            <div className="w-full h-full flex justify-between items-center">
              <div>
                <div className="w-full rounded-2xl items-center flex">
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-600 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-500 -ml-4 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-400 -ml-4 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-300 -ml-4 rounded-[10px]"></div>
                  <div className="ml-1 text-[12px]"></div>
                </div>
              </div>

              {/* Likes & Share */}

              <div className="flex  items-center gap-2">
                <div
                  className={`flex p-4  px-6 border rounded-xl animate-pulse items-center gap-2
                                  bg-slate-100
                                      active:bg-slate-50`}
                >
                  <div></div>
                </div>
                <div className="p-4 px-6 border rounded-xl animate-pulse flex items-center justify-center bg-slate-100 active:bg-slate-50 "></div>
              </div>
            </div>
          </div>{" "}
          <div className="w-full border-b flex flex-col items-center space-y-2 justify-between text-[14px] p-2">
            {/* header  */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-[40px] w-[40px] bg-slate-500 animate-pulse rounded-[16px] "></div>
                <div className="text-black text-md py-2 px-6 rounded-xl animate-pulse bg-slate-400"></div>
              </div>
              <div className="text-black text-md px-6 bg-slate-400 animate-pulse rounded-xl py-4"></div>
            </div>
            {/* post  */}
            <div className="p-2 h-[280px] w-full overflow-hidden bg-slate-50 rounded-2xl">
              <div className="w-full h-full rounded-2xl animate-pulse bg-slate-500 "></div>
            </div>
            {/* Member section */}
            <div className="w-full h-full flex justify-between items-center">
              <div>
                <div className="w-full rounded-2xl items-center flex">
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-600 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-500 -ml-4 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-400 -ml-4 rounded-[10px]"></div>
                  <div className="h-[25px] w-[25px] animate-pulse bg-slate-300 -ml-4 rounded-[10px]"></div>
                  <div className="ml-1 text-[12px]"></div>
                </div>
              </div>

              {/* Likes & Share */}

              <div className="flex  items-center gap-2">
                <div
                  className={`flex p-4  px-6 border rounded-xl animate-pulse items-center gap-2
                                  bg-slate-100
                                      active:bg-slate-50`}
                >
                  <div></div>
                </div>
                <div className="p-4 px-6 border rounded-xl animate-pulse flex items-center justify-center bg-slate-100 active:bg-slate-50 "></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
