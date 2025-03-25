"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Post, { PostDataItem } from "./Post";
import { API } from "@/app/utils/helpers";
import axios from "axios";
// import { FixedSizeList as List } from "react-window";
import { useAuthContext } from "@/app/auth/components/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type PostData = PostDataItem[];
const Page = () => {
  const [postData, setPostData] = useState<Array<PostData>>([]);
  const lastPostRef = useRef<HTMLElement | null>(null);
  // const lastPostRef = useRef<HTMLDivElement | null>(null);
  const { data } = useAuthContext();
  const userId = data?.id;
  const [page, setPage] = useState(1);
  // const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more posts are available
  const isFetching = useRef(false);

  //Get feed API
  const fetchfeed = useCallback(async () => {
    if (!userId || loading || isFetching.current || !hasMore) return;
    isFetching.current = true;

    try {
      setLoading(true);

      const res = await axios.get(`${API}/getfeed/${userId}`, {
        params: { page: page },
      });

      if (res?.data?.success) {
        // if (page === 1) {
        //   // Initial load
        //   setPostData(res?.data?.mergedData);
        // setAds(res?.data?.ads);
        // } else {
        // Load more
        setPostData((prevPosts) => [...prevPosts, ...res?.data?.mergedData]);
        // }
        console.log(res?.data?.mergedData, "res?.data?.mergedData");
        setPage((prevPage) => prevPage + 1); // Increment the page
        setHasMore(res?.data?.mergedData.length > 0);
      }
    } catch (e: unknown) {
      console.log(e);
    }
    setLoading(false);
    isFetching.current = false;
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

  return (
    <>
      {postData?.length > 0 ? (
        <>
          {" "}
          <Post
            postData={postData as PostData}
            switcher={0}
            // ads={ads}
            lastPostRef={lastPostRef as React.RefObject<HTMLElement>}
            // loading={loading}
          />
          {loading && (
            <p className="text-center py-4 text-black flex items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin h-[35px] w-[35px]" />
            </p>
          )}
        </>
      ) : (
        <div className="w-full flex items-center justify-center">
          No Post available
        </div>
      )}
    </>
  );
};

export default Page;
