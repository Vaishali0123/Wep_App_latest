"use client";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useAuthContext } from "@/app/auth/components/auth";
import { setIsJoined } from "@/app/redux/slices/feedData";
import { RootState } from "@/app/redux/store";
import { API, errorHandler } from "@/app/utils/helpers";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { IoPlay } from "react-icons/io5";
import toast from "react-hot-toast";
// import useTrackView from "@/app/utils/trackView";

interface PostMedia {
  _id: string;
  type: string;
  content: string;
  thumbnail?: string;
}

interface Post {
  _id?: string;
  title?: string;
  sender?: {
    fullname?: string;
  };
  media?: PostMedia[];
  likes: number;
  userName?: string;
  community?: {
    _id: string;
    communityName: string;
    members?: string[];
  };
}

export interface PostDataItem {
  ads?: AdDetails;
  id?: number | string;
  dps?: string;
  dp?: string;
  communityName?: string;
  post?: Post | string;
  community?: CommunityData;
  urls?: PostMedia[];
  memdps?: string[];
  subs?: string;
  memberCount?: number;
  posts?: Post;
  likes?: number;
  _id?: string;
  type?: string;
  clickURL?: string;
  userName?: string; // Add this line
  fullname?: string;
}
export interface CommunityData {
  _id: string;
  communityName: string;
  type: string;
  dp: string;
  members?: string[];
}
type PostData = PostDataItem[];

export interface AdPost {
  content: string;
  thumbnail?: string;
  type?: string;
}

export interface AdDetails {
  _id: string;
  adName: string;
  objective: string;
  clickURL: string;
  targetting: string[];
  communityDetails: CommunityId;
  postId?: {
    _id: string;
    title: string;
    kind: string;
    sender: {
      profilepic: string;
    };
    description: string;
    post: AdPost[];
    communityId: CommunityId;
    profilepic: string;
  };
  title: string;
  sender: {
    _id: string;
    profilepic: string;
    username: string;
    fullname: string;
  };
  postDetails: PostMedia;
  posts?: Post;
  memdps?: string[];
  memberCount?: number;
  post?: string | Post;
  CTA?: string;
}
export interface CommunityId {
  communityName: string;
  _id: string;
  type: string;
  dp: string;
}
// type AdDetailsArray = AdDetails[];

const Post = ({
  postData,
  switcher,
  // ads,
  lastPostRef,
}: // loading,
{
  postData: PostData;
  switcher: number;
  // ads: AdDetailsArray;
  lastPostRef: React.RefObject<HTMLElement>;
  // loading: boolean;
}) => {
  const { data } = useAuthContext();
  const userId = data?.id;
  // const [bulkPostIds, setBulkPostIds] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const dispatch = useDispatch();
  const comjoined = useSelector(
    (state: RootState) => state.feedData.comjoined
  ) as string[];
  const socketRef = useRef<Socket | null>(null);
  const viewedPosts = useRef<Set<string>>(new Set());
  const pendingTrackViews = useRef<Set<string>>(new Set());
  // const [postId, setPostId] = useState<string[]>([]);
  const [viewData, setViewData] = useState<string[]>([]);
  const [impressionData, setImpressionData] = useState<string[]>([]);
  // const viewDataRef = useRef<string[]>([]);
  const [comaction, setComaction] = useState("");
  const [load, setLoad] = useState<boolean>(false);
  const [likeData, setLikeData] = useState([]);
  const [shareData, setShareData] = useState<string[]>([]);

  const handleLike = (postId: string) => {
    // setLikedPosts([postId]);
    setLikeData((prev) => ({
      ...prev,
      postId,
      // [postId]: !prev[postId],
    }));

    if (!socketRef.current || likeData?.length === 0) return;

    socketRef.current.emit("trackLikes", { likeData });
    setLikeData([]);
  };
  const handleCopyLink = (postId: string) => {
    const newShares: string[] = [];
    newShares.push(postId);
    setShareData((prev) => [...prev, ...newShares]);

    const link = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Link copied to clipboard!");
        setShowPopup(false); // Close the popup after copying
      },
      (err) => {
        console.error("Failed to copy the link: ", err);
      }
    );
    trackShares(shareData);
  };

  const joinedfunc = async (comId: string) => {
    setLoad(true);
    try {
      await axios.post(`${API}/joincom/${userId}/${comId}`);
    } catch (e) {
      errorHandler(e);
    }
    setLoad(false);
  };

  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (userId) {
      socketRef.current = io("http://localhost:3348", {
        transports: ["websocket"],
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        // console.log("Connected to socket server");
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [userId]);
  // console.log(postData);
  const trackView = (viewData: Array<string>) => {
    if (!socketRef.current || viewData?.length === 0) return;

    socketRef.current.emit("trackView", { viewData, userId });
    setViewData([]);
  };
  const trackShares = (shareData: Array<string>) => {
    if (!socketRef.current || shareData?.length === 0) return;

    socketRef.current.emit("trackShares", { shareData });
    setShareData([]);
  };
  // const trackLikes = (likeData: Array<string>) => {
  //   if (!socketRef.current || likeData?.length === 0) return;

  //   socketRef.current.emit("trackLikes", { likeData });
  //   // setLikeData([]);
  // };
  const trackImpressions = (impressionData: Array<string>) => {
    if (!socketRef.current || impressionData?.length === 0) return;

    socketRef.current.emit("trackImpressions", { impressionData });
    setImpressionData([]);
  };
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     trackView(viewData); // use the latest viewData via ref
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     trackView(viewData); // flush when component unmounts
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // ✅ Handle Intersection and mark post as viewed
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const timeouts: NodeJS.Timeout[] = [];
    const newImpressions: string[] = [];
    postData.forEach((d: PostDataItem, index) => {
      if (d?.type === "ad") {
        newImpressions.push(d?.ads?.postDetails?._id as string);
      } else {
        if (switcher === 0) {
          newImpressions.push(d?.posts?._id as string);
        } else {
          if (d?.post !== "No posts available") {
            if (typeof d.post !== "string" && d.post?._id) {
              newImpressions.push(d.post._id);
            }
          }
        }
      }
      if (newImpressions.length > 0) {
        setImpressionData((prev) => [...prev, ...newImpressions]);

        trackImpressions(impressionData);
      }
      // let postId;
      if (!postRefs.current[index]) return;
      const postId =
        d?.type === "ad"
          ? (d?.ads?.postDetails?._id as string)
          : switcher === 0
          ? (d?.posts?._id as string)
          : typeof d.post !== "string" && (d?.post?._id as string);
      if (!postId) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const timeout = setTimeout(() => {
                if (!viewedPosts.current.has(postId)) {
                  viewedPosts.current.add(postId);
                  pendingTrackViews.current.add(postId);

                  // setPostId((prev) =>
                  //   prev.includes(postId) ? prev : [...prev, postId]
                  // );
                  setViewData((prev) =>
                    prev.includes(postId) ? prev : [...prev, postId]
                  );

                  if (viewData?.length > 0) {
                    trackView(viewData);
                  }
                  startTimer?.();
                }
              }, 1000);

              timeouts.push(timeout);
            }
          });
        },

        { threshold: 0.7 }
      );
      // console.log(postId, "postId");
      // trackView([postId]);
      // flushTrackedViews([postId]);
      // console.log(viewData, "viewData");
      observer.observe(postRefs.current[index]!);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [postData]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to send data to API

  // Function to start the timer
  const startTimer = () => {
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        // sendDataToAPI();
        timeoutRef.current = null;
      }, 10000);
    }
  };

  // const sendDataToAPI = async () => {
  //   if (viewData.length === 0) return;

  //   try {
  //     await axios.post(`${API}/analytics`, {
  //       viewData: viewData,

  //       userId: userId,
  //     });

  //     console.log("✅ Data sent:", { views: viewData, userId });

  //     setViewData([]);
  //     // setClickData([]);
  //   } catch (error) {
  //     console.error("❌ Error sending analytics data:", error);
  //   }
  // };

  // Track clicks
  const trackClick = (postId: string) => {
    if (!socketRef.current || viewData?.length === 0) return;
    const clickData = [postId];

    socketRef.current.emit("trackClicks", { clickData, userId });
  };

  // Handle session end
  // useEffect(() => {
  //   const handleSessionEnd = () => {
  //     sendDataToAPI();
  //   };

  //   window.addEventListener("beforeunload", handleSessionEnd);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleSessionEnd);
  //   };
  // }, []);
  const leavecom = async (communityId: string) => {
    if (!userId || !communityId) {
      toast.error("User or Community is missing.");
      return;
    }
    try {
      const res = await axios.post(`${API}/leavecom/${userId}/${communityId}`);
      if (res?.data?.success) {
        toast.success("Left the community successfully.");
        setComaction("");
      }
    } catch (e) {
      errorHandler(e);
    }
  };
  return (
    <>
      {/* load more .... */}
      {postData.map((d: PostDataItem, i: number) => {
        const isLastPost = i === postData.length - 1;
        return d?.type === "ad" ? (
          <div
            onClick={() => trackClick(d?.ads?.postDetails?._id as string)}
            ref={(el) => {
              postRefs.current[i] = el;
            }}
            key={d?.ads?.postDetails?._id}
            className="w-full p-2 border-b space-y-2"
          >
            <div className="w-full h-full  rounded-2xl flex items-center justify-between text-[14px]">
              <div
                // href={
                //   switcher === 0
                //     ? ../home/insideCommunity?comId=${d?.posts?.community?._id}&userId=${userId}&isJoined=${d?.subs}
                //     : ../home/insideCommunity?comId=${d?.id}&userId=${userId}&isJoined=${d?.subs}
                // }
                className="w-full flex gap-2  items-center rounded-2xl "
              >
                <div className="w-[40px] h-[40px] rounded-2xl bg-slate-50">
                  <img
                    className="w-[38px] h-[38px] rounded-2xl object-cover "
                    src={d?.ads?.communityDetails?.dp}
                    alt="Ad"
                  />
                </div>
                <div className=" ">
                  <div className="font-semibold">
                    {d?.ads?.communityDetails?.communityName}
                  </div>
                  <div className="text-[12px] text-[#0a77ff] font-semibold">
                    • Sponsored
                  </div>
                </div>
              </div>
            </div>
            {/* Image or Video section */}
            <div className="bg-slate-50 p-1 rounded-2xl">
              <div className="w-full h-[280px] rounded-2xl bg-slate-50 flex items-center justify-center ">
                {d?.ads?.postDetails?.type === "video/mp4" ? (
                  <div className="relative w-full h-full flex justify-center items-center">
                    {/* Blurred background image */}
                    {/* <div
                    className="absolute inset-0 bg-center bg-cover blur-lg opacity-50 p-2 brightness-105"
                    style={{
                      backgroundImage: url(${d?.postDetails?.content}),
                    }}
                  /> */}
                    <video
                      className="w-[100%] h-[100%] aspect-video rounded-2xl object-cover"
                      // ref={videoRef}
                      src={d?.ads?.postDetails?.content}
                      poster={d?.ads?.postDetails?.thumbnail}
                      controls
                      muted
                      playsInline
                      style={{ pointerEvents: "none" }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="relative w-full h-full flex justify-center items-center">
                      {/* Blurred background image */}
                      {/* <div
                      className="absolute inset-0 bg-center bg-cover blur-lg opacity-50 p-2 brightness-105"
                      style={{
                        backgroundImage: `url(${
                          d?.postId?.post?.[d?.postId?.post?.length - 1]
                            ?.content
                        })`,
                      }}
                    /> */}

                      <div className="rounded-t-xl flex justify-center  overflow-hidden items-center w-full h-full ">
                        {/* <div className="rounded-md w-full z-50"> */}
                        <img
                          className="w-[100%] h-[100%] rounded-2xl object-cover "
                          src={d?.ads?.postDetails?.content}
                          alt="Ad"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {d?.ads?.objective ? (
                <div className=" text-ellipsis truncate overflow-hidden">
                  <div className="">{d?.ads?.objective}</div>
                </div>
              ) : null}
            </div>

            {/* Call to action */}
            {d?.ads?.clickURL && (
              <div className="bg-white relative flex justify-center items-center  ">
                <div className="bg-center w-full flex justify-center animate-pulse bg-[#0a77ff] items-center border rounded-xl p-2 ">
                  <Link
                    href={d?.ads?.clickURL}
                    target="_blank"
                    className=" text-white font-semibold"
                  >
                    {d?.ads?.clickURL}
                  </Link>
                </div>
              </div>
            )}

            {/* Member section */}
            <div className="w-full h-full  flex justify-between items-center">
              {/* {switcher === 0 ? (
              <div>
                <div className="w-full rounded-2xl items-center flex">
                  <div className="h-[25px] w-[25px] bg-slate-600 rounded-[10px]">
                    <img
                      className="w-[100%] h-[100%] rounded-[10px]"
                      src={d?.memdps?.[0]}
                      alt="Grovyo user"
                    />
                  </div>
                  <div className="h-[25px] w-[25px] bg-slate-500 -ml-4 rounded-[10px]">
                    <img
                      className="w-[100%] h-[100%] rounded-[10px]"
                      src={d?.memdps?.[1]}
                      alt="Grovyo user"
                    />
                  </div>
                  <div className="h-[25px] w-[25px] bg-slate-400 -ml-4 rounded-[10px]">
                    <img
                      className="w-[100%] h-[100%] rounded-[10px]"
                      src={d?.memdps?.[2]}
                      alt="Grovyo user"
                    />
                  </div>
                  <div className="h-[25px] w-[25px] bg-slate-300 -ml-4 rounded-[10px]">
                    <img
                      className="w-[100%] h-[100%] rounded-[10px]"
                      src={d?.memdps?.[3]}
                      alt="Grovyo user"
                    />
                  </div>
                  <div className="ml-1 text-[12px]">
                    {d?.posts?.community?.members?.length ?? 0 > 1
                      ? ${d?.posts?.community?.members?.length} members
                      : ${d?.posts?.community?.members?.length} member}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-full rounded-2xl items-center flex">
                  <div className="h-[25px] w-[25px] bg-slate-600 rounded-[10px]">
                    <img
                      className="w-[100%] h-[100%] rounded-[10px]"
                      src={d?.memdps?.[0]}
                      alt="Grovyo user"
                    />
                  </div>
                  <div className="h-[25px] w-[25px] bg-slate-500 -ml-4 rounded-[10px]">
                    <img
                      className="w-[100%] h-[100%] rounded-[10px]"
                      src={d?.memdps?.[1]}
                      alt="Grovyo user"
                    />
                  </div>
                  <div className="h-[25px] w-[25px] bg-slate-400 -ml-4 rounded-[10px]">
                    <img
                      className="w-[100%] h-[100%] rounded-[10px] "
                      src={d?.memdps?.[2]}
                      alt="Grovyo user"
                    />
                  </div>
                  <div className="h-[25px] w-[25px] bg-slate-300 -ml-4 rounded-[10px]">
                    <img
                      className="w-[100%] h-[100%] rounded-[10px] object-contain"
                      src={d?.memdps?.[3]}
                      alt="Grovyo user"
                    />
                  </div>
                  {d?.memberCount && (
                    <div className="ml-1 text-[12px]">
                      {d?.memberCount > 1
                        ? ${d?.memberCount} members
                        : ${d?.memberCount} member}{" "}
                    </div>
                  )}
                </div>
              </div>
            )} */}
              {/* Likes & Share */}
              {/* {!d?.ads?.postDetails  ? (
              switcher === 0 ? (
                <div className="flex  items-center gap-2">
                  <div
                    onClick={() => d?.ads?.postDetails?._id && handleLike(d?.ads?.postDetails?._id)}
                    className={`flex px-2 py-1 border rounded-xl items-center gap-2 
hover:bg-slate-100
active:bg-slate-50 bg-slate-50 `}
                  >
                    <FaHandsClapping
                      className={`${
                        likedPosts[d?.posts?._id ?? ""]
                          ? "text-yellow-500"
                          : "text-gray-500"
                      }`}
                    />
                    <div>
                      {(d?.posts?.likes ?? 0) +
                        (d?.posts?._id && likedPosts[d?.posts?._id] ? 1 : 0)}
                    </div>
                  </div>
                  <div
                    onClick={() => setShowPopup(true)}
                    className="p-2 border rounded-xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-50 bg-slate-50 "
                  >
                    <FaRegShareSquare />
                  </div>
                 
                  {showPopup && (
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
                          onClick={() =>
                            d?.posts?._id && handleCopyLink(d.posts._id)
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Copy Link
                        </button>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="ml-2 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex  items-center gap-2">
                  <div
                   
                    onClick={() => handleLike(d?.post?._id)}
                    className={`flex p-2  border rounded-xl items-center gap-2 
              hover:bg-slate-100
            }`}
                  >
                    <FaHandsClapping
                      className={`${
                       
                        likedPosts[d?.post?._id]
                          ? "text-yellow-500"
                          : "text-gray-500"
                      }`}
                    />
                    <div>
                     
                      {d?.post?.likes + (likedPosts[d?.post?._id] ? 1 : 0)}
                    </div>

                    
                  </div>
                  <div
                    onClick={() => setShowPopup(true)}
                    className="p-2 border rounded-xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-50 bg-slate-50 "
                  >
                    <FaRegShareSquare />
                    
                  </div>
                
                  {showPopup && (
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
                        
                          onClick={() => handleCopyLink(d?.post?._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Copy Link
                        </button>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="ml-2 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : null} */}
            </div>
          </div>
        ) : (
          <div
            // onClick={() => {
            //   if (switcher === 0) {
            //     trackClick(d?.posts?._id as string);
            //   } else {
            //     trackClick(d?.post?._id as string);
            //   }
            // }}
            ref={(el) => {
              postRefs.current[i] = el;
              if (isLastPost && el) lastPostRef.current = el;
            }}
            key={i}
            className="w-full p-2 border-b  space-y-2 "
          >
            {/* header  */}
            <div className="w-full h-full   rounded-2xl flex items-center justify-between text-[14px]">
              <Link
                href={
                  switcher === 0
                    ? `./home/insideCommunity?comId=${d?.posts?.community?._id}&userId=${userId}&isJoined=${d?.subs}`
                    : `./home/insideCommunity?comId=${d?.id}&userId=${userId}&isJoined=${d?.subs}`
                }
                className="w-full flex gap-2 cursor-pointer items-center rounded-2xl"
              >
                <img
                  className="w-[40px] h-[40px] border rounded-[18px] "
                  src={switcher === 0 ? d?.dps : d?.dp}
                  alt="community dp"
                />

                <div className="">
                  <div className="font-semibold">
                    {switcher === 0
                      ? d?.posts?.community?.communityName
                      : d?.communityName}
                  </div>
                  <div className="text-[12px]">
                    by{" "}
                    {switcher === 0
                      ? d?.posts?.sender?.fullname
                      : typeof d.post !== "string"
                      ? d?.post?.sender?.fullname
                      : d?.userName}
                  </div>
                </div>
              </Link>
              {
                <div className="relative ">
                  {switcher === 0 ? (
                    !comjoined.includes(d?.posts?.community?._id ?? "") ? (
                      d?.subs === "unsubscribed" ? (
                        <div
                          onClick={() => {
                            dispatch(setIsJoined(true));
                            if (!load) {
                              if (d?.posts?.community?._id) {
                                joinedfunc(d.posts.community._id);
                              }
                            }
                          }}
                          className="p-2 px-4 rounded-2xl bg-slate-50 border "
                        >
                          {load ? "..." : "Join"}
                        </div>
                      ) : null
                    ) : null
                  ) : (
                    <div
                      onClick={() => {
                        setComaction(String(d?.id));
                      }}
                    >
                      <BsThreeDotsVertical
                        size={16}
                        className="text-black hover:text-slate-600 active:text-slate-700"
                      />
                    </div>
                  )}
                  {d?.id === comaction && d?.id != userId && (
                    <div
                      onClick={() => leavecom(String(d?.id))}
                      className="absolute p-2 rounded-xl z-500 top-10  bg-white flex flex-col"
                    >
                      <div>Leave Community</div>
                    </div>
                  )}
                </div>
              }
            </div>
            {/* Image or Video section for post (new for you and community) */}
            {switcher === 0 ? (
              // new for you
              <div className=" pb-2 px-1 overflow-hidden bg-slate-50 rounded-2xl">
                <div className="w-full h-[280px] rounded-2xl bg-slate-50 ">
                  {d?.urls?.[d?.urls?.length - 1]?.type === "video/mp4" ? (
                    <>
                      <div className="relative w-full h-full flex justify-center items-center">
                        {/* Main sharp image */}
                        <div className="rounded-md relative w-full flex justify-center items-center h-full ">
                          {/* <img
                                        className="w-[100%] h-[100%] rounded-2xl absolute object-contain"
                                        src={d?.urls?.[0]?.thumbnail}
                                        // alt="Video thumbnail"
                                      /> */}
                          <video
                            className="w-[100%] aspect-video h-[100%]  "
                            // ref={videoRef}
                            src={d?.urls?.[0]?.content}
                            muted
                            playsInline
                            style={{ pointerEvents: "none" }}
                          />
                          <IoPlay className="absolute text-white w-[50px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className=" w-full h-full flex justify-center items-center">
                        {/* Blurred background image */}
                        {/* <div
                          className="absolute inset-0 bg-center bg-cover blur-lg opacity-50 p-2 brightness-105"
                          style={{
                            backgroundImage: `url(${d?.urls?.[0]?.content})`,
                          }}
                        /> */}
                        {/* Main sharp image */}
                        <div className="rounded-t-xl flex justify-center  overflow-hidden items-center w-full h-full ">
                          <img
                            className="h-full bg-contain "
                            src={d?.urls?.[0]?.content}
                            alt="Webapp feed"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* title & desc  */}
                {switcher === 0 ? (
                  d?.posts?.title ? (
                    <div className=" text-ellipsis px-2 pt-2  truncate overflow-hidden">
                      <div className="text-[14px]">{d?.posts?.title}</div>
                    </div>
                  ) : null
                ) : typeof d.post !== "string" && d?.post?.title ? (
                  <div className=" text-ellipsis px-2 pt-2 truncate overflow-hidden">
                    {typeof d.post !== "string" && (
                      <div className="text-[14px]">{d?.post?.title}</div>
                    )}
                  </div>
                ) : null}
              </div>
            ) : // Community
            d?.post != "No posts available" ? (
              <div className="bg-slate-50 p-2 rounded-2xl">
                <div className="w-full h-[280px] rounded-2xl bg-slate-50">
                  {typeof d.post !== "string" &&
                  d?.post?.media?.[0]?.type === "video/mp4" ? (
                    <>
                      {/* <img
                                        className="w-[100%] h-[100%] rounded-2xl absolute"
                                        src={d?.post?.media?.[0]?.thumbnail}
                                        // alt="Video thumbnail"
                                      /> */}
                      <video
                        className="w-[100%] h-[100%] rounded-2xl"
                        // ref={videoRef}
                        src={
                          typeof d.post !== "string"
                            ? d?.post?.media?.[0]?.content
                            : ""
                        }
                        controls
                        muted
                        playsInline
                        style={{ pointerEvents: "none" }}
                      />
                    </>
                  ) : (
                    <img
                      className="w-[100%] h-[100%] rounded-2xl object-contain "
                      src={
                        typeof d.post !== "string"
                          ? d?.post?.media?.[0]?.content
                          : ""
                      }
                      alt="Webapp post"
                    />
                  )}
                </div>

                {typeof d.post !== "string" && d?.post?.title ? (
                  <div className=" text-ellipsis truncate overflow-hidden">
                    {typeof d.post !== "string" && (
                      <div className="">{d?.post?.title}</div>
                    )}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="bg-slate-200 p-2 rounded-2xl">{d?.post}</div>
            )}
            {/* Member section */}
            <div className="w-full h-full flex  justify-between items-center">
              {switcher === 0 ? (
                <div>
                  <div className="w-full rounded-2xl items-center flex">
                    <div className="h-[25px] w-[25px] bg-slate-600 rounded-[10px]">
                      <img
                        className="w-[100%] h-[100%] rounded-[10px]"
                        src={d?.memdps?.[0]}
                        alt="Grovyo user"
                      />
                    </div>
                    {d?.posts?.community?.members?.length &&
                      d?.posts?.community?.members?.length > 1 && (
                        <div className="h-[25px] w-[25px] bg-slate-500 -ml-4 rounded-[10px]">
                          <img
                            className="w-[100%] h-[100%] rounded-[10px]"
                            src={d?.memdps?.[1]}
                            alt="Grovyo user"
                          />
                        </div>
                      )}
                    {d?.posts?.community?.members?.length &&
                      d?.posts?.community?.members?.length > 2 && (
                        <div className="h-[25px] w-[25px] bg-slate-400 -ml-4 rounded-[10px]">
                          <img
                            className="w-[100%] h-[100%] rounded-[10px]"
                            src={d?.memdps?.[2]}
                            alt="Grovyo user"
                          />
                        </div>
                      )}
                    {d?.posts?.community?.members?.length &&
                      d?.posts?.community?.members?.length > 3 && (
                        <div className="h-[25px] w-[25px] bg-slate-300 -ml-4 rounded-[10px]">
                          <img
                            className="w-[100%] h-[100%] rounded-[10px]"
                            src={d?.memdps?.[3]}
                            alt="Grovyo user"
                          />
                        </div>
                      )}

                    <div className="ml-1 text-[12px]">
                      {d?.posts?.community?.members?.length &&
                      d?.posts?.community?.members?.length > 1
                        ? `${d?.posts?.community?.members?.length} members`
                        : `${d?.posts?.community?.members?.length} member`}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-full rounded-2xl items-center flex">
                    <div className="h-[25px] w-[25px] bg-slate-600 rounded-[10px]">
                      <img
                        className="w-[100%] h-[100%] rounded-[10px]"
                        src={d?.memdps?.[0]}
                        alt="Grovyo user"
                      />
                    </div>
                    {d?.memberCount && d?.memberCount > 1 && (
                      <div className="h-[25px] w-[25px] bg-slate-500 -ml-4 rounded-[10px]">
                        <img
                          className="w-[100%] h-[100%] rounded-[10px]"
                          src={d?.memdps?.[1]}
                          alt="Grovyo user"
                        />
                      </div>
                    )}
                    {d?.memberCount && d?.memberCount > 2 && (
                      <div className="h-[25px] w-[25px] bg-slate-400 -ml-4 rounded-[10px]">
                        <img
                          className="w-[100%] h-[100%] rounded-[10px] "
                          src={d?.memdps?.[2]}
                          alt="Grovyo user"
                        />
                      </div>
                    )}
                    {d?.memberCount && d?.memberCount >= 3 && (
                      <div className="h-[25px] w-[25px] bg-slate-300 -ml-4 rounded-[10px]">
                        <img
                          className="w-[100%] h-[100%] rounded-[10px] object-contain"
                          src={d?.memdps?.[3]}
                          alt="Grovyo user"
                        />
                      </div>
                    )}
                    {d?.memberCount && (
                      <div className="ml-1 text-[12px]">
                        {d?.memberCount > 1
                          ? `${d?.memberCount} members`
                          : `${d?.memberCount} member`}{" "}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Likes & Share */}
              {d?.post != "No posts available" ? (
                switcher === 0 ? (
                  <div className="flex  items-center gap-2">
                    {d?.posts?._id && (
                      <div
                        //   @ts-expect-error server

                        onClick={() => handleLike(d?.posts?._id)}
                        className={`flex px-2 py-1 border rounded-xl items-center gap-2
             hover:bg-slate-100 active:bg-slate-50 bg-slate-50
            `}
                      >
                        {/* <FaHandsClapping
                          className={`${
                            likeData[d?.posts?._id]
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        />
                        <div>
                          {d?.posts?.likes &&
                            d?.posts?.likes + (likeData[d?.posts?._id] ? 1 : 0)}
                        </div> */}

                        {/* <div>{post?.likes > 0 ? post?.likes : null}</div> */}
                      </div>
                    )}

                    <div
                      onClick={() => setShowPopup(true)}
                      className="p-2 border rounded-xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-50 bg-slate-50 "
                    >
                      <FaRegShareSquare />
                    </div>
                    {/* Popup */}
                    {showPopup && (
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
                            onClick={() => handleCopyLink(d?.posts?._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                          >
                            Copy Link
                          </button>
                          <button
                            onClick={() => setShowPopup(false)}
                            className="ml-2 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex  items-center gap-2">
                    <div
                      //@ts-expect-error server
                      onClick={() => handleLike(d?.post?._id)}
                      className={`flex p-2  border rounded-xl items-center gap-2
                                hover:bg-slate-100
                                active:bg-slate-50`}
                    >
                      <FaHandsClapping
                        className={`${
                          //@ts-expect-error server
                          likeData[d?.post?._id]
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                      />
                      <div>
                        {/* @ts-expect-error server */}
                        {d?.post?.likes + (likeData[d?.post?._id] ? 1 : 0)}
                      </div>

                      {/* <div>{post?.likes > 0 ? post?.likes : null}</div> */}
                    </div>
                    <div
                      onClick={() => setShowPopup(true)}
                      className="p-2 border rounded-xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-50 bg-slate-50 "
                    >
                      <FaRegShareSquare />
                      {/* <span className="ml-2 text-[14px]">Copy Link</span> */}
                    </div>
                    {/* Popup */}
                    {showPopup && (
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
                            //   @ts-expect-error server
                            onClick={() => handleCopyLink(d?.post?._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                          >
                            Copy Link
                          </button>
                          <button
                            onClick={() => setShowPopup(false)}
                            className="ml-2 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Post;
// const sendAnalytics = async () => {
//   if (!postid.length) return;

//   try {
//     await axios.post("http://192.168.1.9:7002/api/sendanalytics", {
//       userId,
//       viewData: postid, // send all at once
//     });

//     console.log("✅ Sent analytics:", postid);
//     setPostId([]); // clear after send
//   } catch (e) {
//     console.error("❌ Error sending analytics:", e);
//   }
// };

// useEffect(() => {
//   if (postid?.length > 0) {
//     console.log("jj");
//     // Timer send every 5 min
//     timerRef.current = setInterval(() => {
//       sendAnalytics();
//     }, 1 * 60 * 1000); // 5 minutes

//     // Send on page leave
//     window.addEventListener("beforeunload", sendAnalytics);

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//       window.removeEventListener("beforeunload", sendAnalytics);
//     };
//   }
// }, [postid, userId]);

//For not unique views

// Set up the IntersectionObserver inside useEffect for each post
// useEffect(() => {
//   postData.forEach((d, index) => {
//     if (postRefs.current[index]) {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               setTimeout(() => {
//                 if (d?.type === "ad") {

//                   trackView(d?.ads?.postDetails?._id as string);
//                 } else {

//                   trackView(d?.posts?._id as string);
//                 } // Track after 2 seconds
//               }, 1000);
//             }
//           });
//         },
//         { threshold: 0.8 }
//       );

//       observer.observe(postRefs.current[index]);
//     }
//   });
// }, [postData]);
// useEffect(() => {
//   if (userId) {
//     socketRef.current = io("http://localhost:9000", {
//       transports: ["websocket"], // Ensure WebSocket is used
//       withCredentials: true, // Required if using cookies
//     });
//     socketRef.current.on("connect", () => {
//       console.log("Connected to socket server");
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }
// }, [userId]);

// const trackView = (postId: string) => {
//   if (!socketRef.current || viewedPosts.current.has(postId)) return;
//   if (socketRef.current) {
//     socketRef.current.emit("trackView", { postId, userId });
//   }
// };

// Sending Analytics to Api after timeout
// useEffect(() => {
//   const observers: IntersectionObserver[] = []; // Store observers for cleanup
//   const timeouts: NodeJS.Timeout[] = []; // Store timeouts to clear them later

//   postData.forEach((d, index) => {
//     let postId: string;
//     if (postRefs.current[index]) {
//       if (d?.type === "ad") {
//         postId = d?.ads?.postDetails?._id as string;
//       } else {
//         postId = d?.posts?._id as string;
//       }
//       // ✅ Add to state
//       // if (viewedPosts.current.has(postId)) return; // ✅ Skip if already viewed

//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               // ✅ Ensure only one timeout per post
//               const timeout = setTimeout(() => {
//                 if (!viewedPosts.current.has(postId)) {
//                   setPostId((prev) => {
//                     if (prev.includes(postId)) return prev; // skip duplicates
//                     return [...prev, postId];
//                   }); // ✅ Add to state
//                   viewedPosts.current.add(postId);
//                   setViewData((prev) => [...prev, postId]); // ✅ Add to state
//                   startTimer(); // ✅ Start API timer
//                 }
//               }, 1000);

//               timeouts.push(timeout);
//             }
//           });
//         },
//         { threshold: 0.8 }
//       );

//       observer.observe(postRefs.current[index]!);
//       observers.push(observer);
//     }
//   });

//   return () => {
//     // ✅ Properly clean up all observers and timeouts
//     observers.forEach((observer) => observer.disconnect());
//     timeouts.forEach((timeout) => clearTimeout(timeout));
//   };
// }, [postData]);

// if (!viewedPosts.current.has(postId)) {
//   setPostId((prev) => {
//     if (prev.includes(postId)) return prev;
//     return [...prev, postId];
//   });
//   viewedPosts.current.add(postId);
//   pendingTrackViews.current.add(postId); // ✅ Mark for socket tracking
//   setViewData((prev) => [...prev, postId]);
//   startTimer();
// }

// const flushTrackedViews = () => {
//   if (!socketRef.current) return;

//   const postIds = Array.from(pendingTrackViews.current);
//   if (postIds.length > 0) {
//     socketRef.current.emit("bulkTrackView", { postIds, userId });
//     pendingTrackViews.current.clear();
//   }
// };

// useEffect(() => {
//   const interval = setInterval(flushTrackedViews, 10 * 60 * 1000); // every 10 min

//   const handleBeforeUnload = () => {
//     flushTrackedViews(); // send on page exit
//   };
//   window.addEventListener("beforeunload", handleBeforeUnload);

//   return () => {
//     clearInterval(interval);
//     flushTrackedViews(); // also send on cleanup
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, []);

// Track view API
// const { trackView } = useTrackView(userId);

// useEffect(() => {
//   if (postid && userId) {
//     postid.forEach((postId) => {
//       trackView(postId);
//     });
//   }
// }, [postid]);
