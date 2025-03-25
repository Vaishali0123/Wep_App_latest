import { useAuthContext } from "@/app/auth/components/auth";
import { setIsJoined } from "@/app/redux/slices/feedData";
import { RootState } from "@/app/redux/store";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { IoPlay } from "react-icons/io5";
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
  community?: {
    _id: string;
    communityName: string;
    members?: string[];
  };
}

export interface PostDataItem {
  ads?: AdDetails;
  id?: number;
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
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  // const [bulkPostIds, setBulkPostIds] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const dispatch = useDispatch();
  const comjoined = useSelector(
    (state: RootState) => state.feedData.comjoined
  ) as string[];
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (userId) {
      socketRef.current = io("http://localhost:7002", {
        transports: ["websocket"], // Ensure WebSocket is used
        withCredentials: true, // Required if using cookies
      });
      socketRef.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [userId]);

  const trackView = (postId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("trackView", { postId, userId });
    }
  };

  // Track clicks (when a post is clicked)
  const trackClick = (postId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("trackClick", { postId, userId });
    }
  };
  const [load, setLoad] = useState<boolean>(false);
  const handleLike = (postId: string) => {
    // Toggle the liked state locally
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));

    // Add or remove the post ID from the queue
    // setBulkPostIds((prevQueue) => {
    //   const updatedQueue = new Set(prevQueue);
    //   if (updatedQueue.has(postId)) {
    //     updatedQueue.delete(postId); // Remove if unliked
    //   } else {
    //     updatedQueue.add(postId); // Add if liked
    //   }
    //   return updatedQueue;
    // });
  };
  const handleCopyLink = (postId: string) => {
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
  };

  const joinedfunc = async (comId: string) => {
    setLoad(true);
    try {
      await axios.post(`${API}/joincom/${userId}/${comId}`);
    } catch (e) {
      console.log(e);
    }
    setLoad(false);
  };
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  //For not unique views

  // Set up the IntersectionObserver inside useEffect for each post
  useEffect(() => {
    postData.forEach((d, index) => {
      if (postRefs.current[index]) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  if (d?.type === "ad") {
                    console.log(
                      d?.ads?.postDetails?._id,
                      "d?.ads?.postDetails?._id"
                    );
                    trackView(d?.ads?.postDetails?._id as string);
                  } else {
                    console.log(d?.posts?._id, "d?.adsid");
                    trackView(d?.posts?._id as string);
                  } // Track after 2 seconds
                }, 1000);
              }
            });
          },
          { threshold: 0.8 }
        );

        observer.observe(postRefs.current[index]);
      }
    });
  }, [postData]);
  const viewedPosts = useRef<Set<string>>(new Set()); // Store viewed post IDs

  useEffect(() => {
    const observers: IntersectionObserver[] = []; // Store observers for cleanup
    const timeouts: NodeJS.Timeout[] = []; // Store timeouts to clear them later

    postData.forEach((d, index) => {
      if (postRefs.current[index]) {
        const postId = d?.posts?._id as string;

        if (viewedPosts.current.has(postId)) return; // ✅ Skip if already viewed

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // ✅ Ensure only one timeout per post
                const timeout = setTimeout(() => {
                  if (!viewedPosts.current.has(postId)) {
                    viewedPosts.current.add(postId);
                    trackView(postId);
                  }
                }, 1000);

                timeouts.push(timeout);
              }
            });
          },
          { threshold: 0.8 }
        );

        observer.observe(postRefs.current[index]!);
        observers.push(observer);
      }
    });

    return () => {
      // ✅ Properly clean up all observers and timeouts
      observers.forEach((observer) => observer.disconnect());
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [postData]);

  console.log(postData, "com");
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
            {d?.ads?.CTA && (
              <div className="bg-white relative flex justify-center items-center  ">
                <div className="bg-center w-full flex justify-center animate-pulse bg-[#0a77ff] items-center border rounded-xl p-2 ">
                  <Link
                    href={d?.ads?.clickURL}
                    className=" text-white font-semibold"
                  >
                    {d?.ads?.CTA}
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
            onClick={() => trackClick(d?.posts?._id as string)}
            ref={(el) => {
              postRefs.current[i] = el;
              if (isLastPost && el) lastPostRef.current = el;
            }}
            key={i}
            className="w-full p-2 border-b space-y-2"
          >
            {/* header  */}
            <div className="w-full h-full rounded-2xl flex items-center justify-between text-[14px]">
              <Link
                href={
                  switcher === 0
                    ? `../home/insideCommunity?comId=${d?.posts?.community?._id}&userId=${userId}&isJoined=${d?.subs}`
                    : `../home/insideCommunity?comId=${d?.id}&userId=${userId}&isJoined=${d?.subs}`
                }
                className="w-full flex gap-2 items-center rounded-2xl"
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
                      : ""}
                  </div>
                </div>
              </Link>
              {switcher === 0 &&
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
              ) : null}
            </div>
            {/* Image or Video section for post (new for you and community) */}
            {switcher === 0 ? (
              // new for you
              <div className=" pb-2 px-1 overflow-hidden bg-slate-50 rounded-2xl">
                <div className="w-full h-[280px] rounded-2xl bg-slate-50 ">
                  {d?.urls?.[d?.urls?.length - 1]?.type === "video/mp4" ? (
                    <>
                      <div className="relative w-full h-full flex justify-center items-center">
                        {/* Blurred background image */}
                        {/* <div
                          className="absolute inset-0 bg-center bg-cover blur-lg opacity-50 p-2 brightness-105"
                          style={{
                            backgroundImage: `url(${d?.urls?.[0]?.thumbnail})`,
                          }}
                        /> */}
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
                      <div className="relative w-full h-full flex justify-center items-center">
                        {/* Blurred background image */}
                        <div
                          className="absolute inset-0 bg-center bg-cover blur-lg opacity-50 p-2 brightness-105"
                          // style={{
                          //   backgroundImage: `url(${d?.urls?.[0]?.content})`,
                          // }}
                        />
                        {/* Main sharp image */}
                        <div className="rounded-t-xl flex justify-center  overflow-hidden items-center w-full h-full z-50">
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
            <div className="w-full h-full flex justify-between items-center">
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
                        <FaHandsClapping
                          className={`${
                            likedPosts[d?.posts?._id]
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        />
                        <div>
                          {d?.posts?.likes &&
                            d?.posts?.likes +
                              (likedPosts[d?.posts?._id] ? 1 : 0)}
                        </div>

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
                          likedPosts[d?.post?._id]
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                      />
                      <div>
                        {/* @ts-expect-error server */}
                        {d?.post?.likes + (likedPosts[d?.post?._id] ? 1 : 0)}
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
