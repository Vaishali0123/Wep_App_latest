import { API } from "@/app/utils/helpers";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Post, { PostDataItem } from "./Post";
import { useAuthContext } from "@/app/auth/components/auth";
import Link from "next/link";
import { RiLoaderLine } from "react-icons/ri";

type PostData = PostDataItem[];

const MemoCommunity = () => {
  const [postData, setPostData] = useState<Array<PostData>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useAuthContext();
  const userId = data?.id;
  // const lastPostRef = useRef<HTMLElement>(null!);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  // const observer = useRef<IntersectionObserver | null>(null);

  const getJoinedCommunities = useCallback(async () => {
    if (!userId || !hasMore) return;
    setLoading(true);
    try {
      console.log("hi");
      const res = await axios.get(`${API}/getJoinedCommunities/${userId}`, {
        params: { page: page },
      });

      if (res?.status === 200) {
        const newPosts = res.data.communities;
        setPostData((prev: PostData[]) => {
          const uniqueData = newPosts.filter(
            (item: PostData) =>
              //@ts-expect-error "Property 'id' does not exist on type 'PostData'."
              !prev.some((prevItem: PostData) => prevItem.id === item.id)
          );
          return [...prev, ...uniqueData];
        });
        // setPostData((prevPosts) => [...prevPosts, ...newPosts]);

        if (newPosts.length < 4) {
          setHasMore(false);
        }
        // else {
        //   setPage((prevPage) => prevPage + 1);
        // }
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  }, [userId, page, hasMore]);
  useEffect(() => {
    if (userId) {
      getJoinedCommunities();
    }
  }, [userId, page]);

  useEffect(() => {
    if (!lastPostRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // getJoinedCommunities();
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.8 }
    );

    // if (lastPostRef.current) {
    //   observer.observe(lastPostRef.current);
    // }

    // return () => {
    //   if (lastPostRef.current) {
    //     observer.unobserve(lastPostRef.current);
    //   }
    // };
    const currentRef = lastPostRef.current;
    observer.observe(currentRef);

    return () => observer.unobserve(currentRef);
  }, [loading, hasMore]);

  return (
    <>
      <div className="h-[200px] bg-white flex w-full items-center p-2 justify-center">
        <div className="h-full w-full bg-black bg-defaultprositedark bg-cover  rounded-3xl space-y-2 text-white flex items-center justify-center flex-col">
          <div className="font-bold text-[16px]">Don,t have Community ?</div>
          <div className="w-[80%] text-center">
            Create your own community and invite your friends and people .
          </div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`https://workspace.grovyo.com//main/CreateCommunity`}
            className="text-black cursor-pointer hover:bg-slate-50 active:bg-slate-200 select-none bg-white rounded-2xl font-semibold p-2 px-4 text-[12px]"
          >
            Create Now
          </Link>
        </div>
      </div>
      {/* {loading ? null : ( */}
      <Post
        // ads={[]}
        lastPostRef={lastPostRef as React.RefObject<HTMLElement>}
        postData={postData as PostData}
        switcher={1}
        // loading={loading}
      />
      {loading && (
        <div className="text-center my-4 text-gray-500">
          {" "}
          <RiLoaderLine
            size={30}
            className="animate-spin w-full flex self-center"
          />
        </div>
      )}

      {!hasMore && postData.length > 0 && (
        <div className="text-center my-4 text-gray-500">
          No more communities available.
        </div>
      )}
      {/* {hasMore ? (
        <div className="flex justify-center my-4">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      ) : (
        <div className="text-center my-4 text-gray-500">
          No more communities available.
        </div>
      )} */}
      {/* )} */}
    </>
  );
};
const Community = React.memo(MemoCommunity);
export default Community;
