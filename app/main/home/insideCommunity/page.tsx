"use client";
import { API, errorHandler } from "@/app/utils/helpers";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { BiHide } from "react-icons/bi";
// import Keyboard from "../components/Keyboard";
import { BsEmojiSmile, BsReplyAll, BsThreeDotsVertical } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegShareSquare } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaHandsClapping } from "react-icons/fa6";
import { TbSend2 } from "react-icons/tb";
import CommentsSection from "../components/Comments";
// import { useSelector } from "react-redux";
import JoinPopup from "../components/Joinmodal";
import Insidecompic from "../../../assets/Insidecom.png";
import Image from "next/image";
import Link from "next/link";
import { AdDetails } from "../components/Post";
import toast, { Toaster } from "react-hot-toast";
const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const comId = searchParams.get("comId");
  const userId = searchParams.get("userId");
  const isJoined = searchParams.get("isJoined");
  const [message, setMessage] = useState<string>("");
  const [topicindex, setTopicindex] = useState<number>(0);
  const [click, setClick] = useState<boolean>(true);
  const [popUp, setPopUp] = useState<boolean>(true);
  const [popOut, setPopOut] = useState<boolean>(true);
  const [switcher, setSwitcher] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  interface CommunityData {
    dp: string;
    communityName: string;
    creator: {
      fullname: string;
    };
    topics: {
      topicName: string;
      posts: Post[];
    }[];
    ads: AdDetails[];
  }
  // interface Comment {
  //   senderId: {
  //     profilepic: string;
  //     username: string;
  //   };
  //   comment: string;
  // }
  // type Commentdata=Comment[]
  interface Topic {
    topicName: string;
  }
  interface PostMedia {
    type: string;
    content: string;
    thumbnail?: string;
  }

  interface PostSender {
    profilepic: string;
    username: string;
  }

  interface Post {
    _id: string;
    sender: PostSender;
    post: PostMedia[];
    title?: string;
    description?: string;
    likes: number;
    comments: Comment[];
    // comments:
  }
  interface Comment {
    senderId: {
      profilepic: string;
      username: string;
    };
    comment: string;
  }

  interface member {
    username?: string;
    profilepic?: string;
    fullname?: string;
  }

  const [comdata, setComdata] = useState<CommunityData | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  // let debounceTimeout: NodeJS.Timeout | null = null;
  // const [bulkPostIds, setBulkPostIds] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const post = {
    _id: "examplePostId",
    comments: ["This is the first comment!", "Great post!"],
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const getMembers = async (communityId: string) => {
    try {
      const res = await axios.get(`${API}/getmembers/${communityId}`);
      if (res?.data?.success) {
        setMembers(res?.data?.data); // Assuming the response contains the members data
      }
    } catch (e) {
      errorHandler(e);
    }
  };
  const leavecom = async (communityId: string) => {
    if (!userId || !communityId) {
      toast.error("User or Community is missing.");
      return;
    }
    try {
      // const res = await axios.post(`${API}/leavecom/${userId}/${communityId}`);
      // if (res?.data?.success) {
      //   toast.success("Left the community successfully.");
      router.push(
        `/home/insideCommunity?comId=${comId}&userId=${userId}&isJoined=unsubscribed`
      );
      setIsPopupOpen(false);
      // }
    } catch (e) {
      errorHandler(e);
    }
  };
  // const handleAddComment = (comment: any) => {
  //   post.comments.push(comment);
  //   // You may want to update the server or state here
  //   console.log("New comment added:", comment);
  // };
  const fetchInsidecom = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API}/getInsideCommunity/${userId}/${comId}`
      );
      if (res?.data?.success) {
        setComdata(res?.data?.data);
      }
    } catch (e: unknown) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (userId) {
      fetchInsidecom();
    }
  }, [userId, comId]);

  // const togglePostInQueue = (postId: string) => {
  //   setBulkPostIds((prevQueue) => {
  //     const updatedQueue = new Set(prevQueue);
  //     if (updatedQueue.has(postId)) {
  //       updatedQueue.delete(postId); // Remove if it's already in the queue
  //     } else {
  //       updatedQueue.add(postId); // Add if it's not in the queue
  //     }
  //     return updatedQueue;
  //   });
  // };

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
  const handleCopyLink = () => {
    if (!post?._id || !comId || !userId) {
      toast.error("Missing required post, community, or user details");
      return;
    }
    const link = `${window.location.origin}/home/insideCommunity?comId=${comId}&userId=${userId}&isJoined=${isJoined}`;
    // const link = `${window.location.origin}/post/${post?._id}`;
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
  // const handleOpenInNewTab = () => {
  //   window.open(`/main/Community?userId=${userId}`, "_blank");
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = ` ${textareaRef.current.scrollHeight}px`;
    }
  };
  const textareaHeight = textareaRef.current
    ? textareaRef.current.offsetHeight - 40
    : 0;
  // console.log(textareaHeight, "textareaHeight");
  const dynamicHeight = `calc(100% - 152px - ${textareaHeight}px)`;

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="h-screen w-full relative">
      <Toaster />
      {loading ? (
        <>
          {/* header  */}
          <div className="h-[50px] w-full bg-white border-b px-2 flex items-center justify-between ">
            <div className="gap-2 flex items-center">
              <IoChevronBack className="h-[30px] w-[30px] rounded-2xl md:hidden " />
              <div className="h-[40px] w-[40px] rounded-2xl border">
                <div className="w-[100%] h-[100%] bg-slate-100 animate-pulse object-contain rounded-2xl" />
              </div>
              <div className="space-y-2">
                <div className="h-[10px] bg-slate-100 animate-pulse rounded-full w-[100px]"></div>
                <div className="h-[10px] bg-slate-100 animate-pulse rounded-full w-[200px]"></div>
              </div>
            </div>
            <div className="h-[40px] w-[40px] text-[#171717] bg-slate-50 animate-pulse hover:bg-slate-50 active:bg-slate-100 border border-dashed rounded-2xl flex items-center justify-center "></div>
          </div>
          {/* subheader  */}
          <div className="h-[50px] w-full bg-white border-b px-2 flex items-center gap-2 justify-center ">
            <div className="h-[10px] bg-slate-100 animate-pulse rounded-full w-[200px] "></div>
          </div>
          {/* main  */}
          <div
            style={{
              height: switcher === 1 ? `calc(100% - 100px)` : dynamicHeight,
            }}
            className="w-full overflow-auto bg-slate-50"
          >
            {/* post  */}

            <div className=" p-4 space-y-2 border-b">
              <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] border rounded-2xl">
                  <div className="w-[100%] bg-slate-100 animate-pulse h-[100%] object-contain rounded-2xl" />
                </div>
                <div className="h-[10px] bg-slate-100 animate-pulse rounded-full w-[100px]"></div>
              </div>
              <div className="h-[300px] border w-[60%] bg-slate-300 rounded-xl">
                <div className="w-[100%]  bg-slate-100 animate-pulse h-[100%] object-contain rounded-xl" />
              </div>
              <div className="font-semibold h-[10px] bg-slate-100 animate-pulse rounded-full w-[40%]"></div>
              <div className="text-[14px] h-[10px] bg-slate-100 animate-pulse rounded-full w-[60%]"></div>
              <div className="flex gap-2">
                {/* comments */}
                <div
                  className="flex p-2 w-[100%] h-[40px] border rounded-xl items-center gap-2 
                  bg-slate-100 animate-pulse"
                ></div>
                {/* Likes */}
                <div
                  className={`flex p-2 w-[60px] h-[40px] border rounded-xl items-center gap-2 
                  bg-slate-100 animate-pulse
                `}
                ></div>
                <div className="p-2 border w-[40px]  bg-slate-100 animate-pulse h-[40px] rounded-xl flex items-center justify-center "></div>
              </div>
            </div>
          </div>
        </>
      ) : comId ? (
        // ads?.length>0?():()
        <>
          {/* header  */}
          <div className="h-[50px] w-full bg-white border-b px-2 flex items-center justify-between ">
            <div className="gap-2 flex items-center">
              <IoChevronBack
                onClick={() => {
                  router.back();
                }}
                className="h-[30px] w-[30px] rounded-2xl   md:hidden "
              />
              <div className="h-[40px] w-[40px] rounded-2xl border">
                <img
                  loading="lazy"
                  src={comdata?.dp}
                  className="w-[100%] h-[100%] object-contain rounded-2xl"
                  alt="dp"
                />
              </div>
              <div className="">
                <div className="">{comdata?.communityName}</div>
                <div className="text-[12px]">
                  by {comdata?.creator?.fullname}
                </div>
              </div>
            </div>
            <div className="relative w-[10%] flex self-end">
              <button
                onClick={() => setIsPopupOpen(!isPopupOpen)}
                className="h-[40px] w-[40px]  border border-dashed rounded-2xl flex items-center justify-center text-black hover:bg-slate-100 active:bg-slate-50 transition-colors"
                aria-label="Community actions"
              >
                <BsThreeDotsVertical className="h-[20px] w-[20px]" />
              </button>
              {isPopupOpen && (
                <div className="absolute right-16 top-[50px] w-[150px] bg-white border rounded-2xl  z-10">
                  <ul className="text-black">
                    <li
                      onClick={() => {
                        setShowMembers(!showMembers);
                        // setIsPopupOpen(false);
                        getMembers(comId);
                      }}
                      className={`px-4 py- ${
                        showMembers && "bg-gray-200"
                      } hover:bg-gray-100 cursor-pointer flex items-center gap-2`}
                    >
                      <span className="text-[#B7F09C]">👥</span> Members
                    </li>
                    {showMembers && (
                      <div className="absolute top-[50px] right-40 bg-white border rounded-2xl z-10 max-h-[300px] overflow-y-auto">
                        {/* <div className="flex items-center justify-between px-4 py-2 border-b">
                          <h3 className="text-lg font-semibold">Members</h3>
                          <button onClick={() => setShowMembers(false)}>Close</button>
                        </div> */}
                        <div>
                          {members.map((member: member, index) => (
                            <div
                              key={index}
                              className="flex items-center text-black gap-3 px-4 py-2 border-b"
                            >
                              {/* DP */}
                              <div className="h-[40px] w-[40px] rounded-[16px] ">
                                <img
                                  src={member?.profilepic}
                                  alt="dp"
                                  className="object-cover rounded-[16px] h-full w-full"
                                />
                              </div>
                              <div>
                                <div className="flex text-black font-semibold items-center gap-1">
                                  <span>{member?.fullname}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  @{member?.username}
                                </div>
                                {/* {member?.lastVisit && (
                                <div className="text-xs text-gray-400">
                                  Last visit: {member?.lastVisit}
                                </div>
                              )} */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                      <span className="text-[#E57C37]">🚫</span> Report
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                      <span className="text-[#82DCF7]">🔇</span> Mute
                    </li>
                    <li
                      onClick={() => {
                        leavecom(comId);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-red-500">↩</span> Leave
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* subheader  */}
          <div className="h-[50px] w-full bg-white border-b px-2 flex items-center gap-2 justify-center ">
            {comdata?.topics?.map((d: Topic, i: number) => (
              <div
                key={i}
                onClick={() => (
                  d?.topicName === "Posts" ? setSwitcher(1) : null,
                  setTopicindex(i)
                )}
                className="text-[14px] px-2 "
              >
                {d?.topicName === "Posts" ? d?.topicName : null}
              </div>
            ))}
            {/* <div onClick={() => setSwitcher(1)} className="text-[14px] px-2">
          Post
        </div>
        <div onClick={() => setSwitcher(2)} className="text-[14px] px-2">
          All{" "}
        </div> */}
          </div>
          {/* main  */}
          <div
            style={{
              height: switcher === 1 ? `calc(100% - 100px)` : dynamicHeight,
            }}
            className="w-full overflow-auto bg-slate-50"
          >
            {/* post  */}
            {switcher === 1 ? (
              <>
                {comdata?.ads &&
                  comdata?.ads?.length > 0 &&
                  comdata?.ads.map((item, ind) => (
                    <div key={ind} className=" p-4 space-y-2 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-[40px] w-[40px] border rounded-2xl">
                          <img
                            loading="lazy"
                            src={item?.sender?.profilepic}
                            className="w-[100%] h-[100%] object-cover rounded-2xl"
                          />
                        </div>
                        <div>{item?.sender?.fullname}</div>
                      </div>
                      <div className="h-[300px] border w-[60%] bg-slate-50 rounded-xl">
                        {item?.postDetails?.type[0]?.startsWith("image") ? (
                          <img
                            loading="lazy"
                            src={item?.postDetails?.content}
                            className="w-[100%] h-[100%] object-cover rounded-xl"
                          />
                        ) : (
                          <video
                            src={item?.postDetails?.content}
                            poster={item?.postDetails?.thumbnail} // Add thumbnail here
                            controls
                            className="w-[100%] h-[100%] bg-slate-50 rounded-xl "
                          />
                        )}
                      </div>
                      <div className="font-semibold">{item?.title}</div>
                      {/* <div className="text-[14px]">{post?.description}</div> */}

                      <div className="flex gap-2">
                        {item?.CTA && (
                          <div className="bg-white relative flex w-[60%] justify-center items-center  ">
                            <div className="bg-center w-full flex justify-center animate-pulse bg-[#0a77ff] items-center border rounded-xl p-2 ">
                              <Link
                                href={item?.clickURL}
                                className=" text-white font-semibold"
                              >
                                CTA
                              </Link>
                            </div>
                          </div>
                        )}
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
                                onClick={handleCopyLink}
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
                    </div>
                  ))}
                {comdata?.topics?.[topicindex]?.posts?.map(
                  (post: Post, i: number) => (
                    <div key={i} className=" p-4 space-y-2 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-[40px] w-[40px] border rounded-2xl">
                          <img
                            loading="lazy"
                            src={post?.sender?.profilepic}
                            className="w-[100%] h-[100%] object-cover rounded-2xl"
                          />
                        </div>
                        <div>{post?.sender?.username}</div>
                      </div>
                      <div className="h-[300px] border w-[60%] bg-slate-50 rounded-xl">
                        {post?.post[0]?.type?.startsWith("image") ? (
                          <img
                            loading="lazy"
                            src={post?.post[0]?.content}
                            className="w-[100%] h-[100%] object-cover rounded-xl"
                          />
                        ) : (
                          <video
                            src={post?.post[0]?.content}
                            poster={post?.post[0]?.thumbnail} // Add thumbnail here
                            controls
                            className="w-[100%] h-[100%] bg-slate-50 rounded-xl "
                          />
                        )}
                      </div>
                      <div className="font-semibold">{post?.title}</div>
                      <div className="text-[14px]">{post?.description}</div>
                      <div className="flex gap-2">
                        <CommentsSection
                          post={post as Post}
                          // userId={userId}
                          postId={post?._id}
                          // onAddComment={handleAddComment}
                        />

                        {/* <div className="w-full flex items-center gap-2 border hover:bg-slate-100 active:bg-slate-50 bg-slate-50 rounded-xl p-2">
                      <BiCommentDetail />
                      {post?.comments?.length >= 1
                        ? post?.comments?.length
                        : null}
                      {post?.comments?.length > 1
                        ? " Comments"
                        : post?.comments?.length === 0
                        ? " No Comments"
                        : " Comment"}
                    </div> */}
                        {/* <div
              onClick={() => handleLike(post?._id)}
              className={`flex p-2 border rounded-xl items-center gap-2 ${
                likedPosts[post?._id] ? "bg-yellow-100" : "hover:bg-slate-100"
              }`}
            >
              <PiHandsClappingDuotone
                className={`${
                  likedPosts[post?._id] ? "text-yellow-500" : "text-gray-500"
                }`}
              />
              <div>{post?.likes + (likedPosts[post?._id] ? 1 : 0)}</div>
            </div> */}
                        {/* Likes */}
                        <div
                          onClick={() => handleLike(post?._id)}
                          className={`flex p-2  border rounded-xl items-center gap-2 
                    hover:bg-slate-100
                  }`}
                        >
                          <FaHandsClapping
                            className={`${
                              likedPosts[post?._id]
                                ? "text-yellow-500"
                                : "text-gray-500"
                            }`}
                          />
                          <div>
                            {post?.likes + (likedPosts[post?._id] ? 1 : 0)}
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
                                onClick={handleCopyLink}
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
                    </div>
                  )
                )}
              </>
            ) : (
              <div
                onClick={() => setPopUp(true)}
                className="flex mt-2 gap-2 pl-1"
              >
                <div className="text-center">
                  <div className="bg-slate-300 h-[40px] w-[40px] rounded-2xl"></div>
                  <div className="text-[12px]">01:50</div>
                </div>
                <div className="mt-[6px] relative">
                  <div className="text-[14px] font-semibold">Aryansh</div>
                  <div className="bg-blue-400 p-2 rounded-r-2xl min-w-[300px] relative max-w-[300px] rounded-bl-2xl">
                    hi ahsdugu aiudguhsa adhdsuhjasbd ajhdsuhash ahsgduhjashd
                    <div
                      onClick={() => setPopUp(false)}
                      className="bg-blue-400 absolute active:bg-blue-600 top-0 right-[4%] rotate-90 cursor-pointer"
                    >
                      {">"}
                    </div>
                  </div>

                  {/* pop UP  */}
                  <div
                    className={`absolute right-0 top-[20%] duration-150 ${
                      popUp === true
                        ? "p-0 border-0 bg-blue-400 rounded-none"
                        : "p-2 border  bg-white rounded-2xl"
                    }`}
                  >
                    <div
                      className={`flex duration-100 items-center ${
                        popUp === true
                          ? "gap-0 py-0 opacity-0 text-[0px]"
                          : "gap-2 py-1 opacity-100"
                      }`}
                    >
                      <TbSend2 />
                      Forword
                    </div>
                    <div
                      className={`flex duration-100 items-center ${
                        popUp === true
                          ? "gap-0 py-0 opacity-0  text-[0px]"
                          : "gap-2 py-1 opacity-100"
                      }`}
                    >
                      {" "}
                      <BiHide />
                      Hide
                    </div>
                    <div
                      className={`flex duration-100 items-center ${
                        popUp === true
                          ? "gap-0 py-0 opacity-0  text-[0px]"
                          : "gap-2 py-1 opacity-100"
                      }`}
                    >
                      <BsReplyAll />
                      Reply
                    </div>
                    <div
                      className={`flex text-red-600 duration-100 items-center ${
                        popUp === true
                          ? "gap-0 py-0 opacity-0  text-[0px]"
                          : "gap-2 py-1 opacity-100"
                      }`}
                    >
                      <MdDeleteOutline />
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Keyboard  */}
          {switcher === 1 ? null : (
            <div
              //  ref={textareaRef}
              className="w-[100%] p-[5px] bg-white  flex items-end gap-2 h-auto"
            >
              <div className="h-[40px] w-[40px] border-dashed border flex items-center justify-center rounded-2xl">
                <BsEmojiSmile className="h-[20px] w-[20px]" />
              </div>

              <div className="h-[40px] relative w-[40px] border-dashed border flex items-center justify-center rounded-2xl cursor-pointer">
                <HiOutlineViewGridAdd
                  onClick={() => {
                    setPopOut(false);
                  }}
                  className="h-[20px] w-[20px]"
                />
                {/* pop UP  */}
                <div
                  className={`absolute right-0 bottom-0 duration-150 rounded-2xl bg-white   ${
                    popOut === true ? "p-0 border-0" : "p-2 border"
                  }`}
                >
                  <div
                    className={`flex gap-2 py-1 duration-100 items-center ${
                      popOut === true
                        ? "gap-0 py-0 opacity-0 text-[0px]"
                        : "gap-2 py-1 opacity-100"
                    }`}
                  >
                    <TbSend2 />
                    Document
                  </div>
                  <div
                    className={`flex gap-2 py-1 duration-100 items-center ${
                      popOut === true
                        ? "gap-0 py-0 opacity-0  text-[0px]"
                        : "gap-2 py-1 opacity-100"
                    }`}
                  >
                    {" "}
                    <BiHide />
                    Photo & Video
                  </div>{" "}
                  <div
                    className={`flex gap-2 py-1 duration-100 items-center ${
                      popOut === true
                        ? "gap-0 py-0 opacity-0  text-[0px]"
                        : "gap-2 py-1 opacity-100"
                    }`}
                  >
                    <BsReplyAll />
                    Camera
                  </div>{" "}
                  <div
                    className={`flex gap-2 py-1 text-red-600 duration-100 items-center ${
                      popOut === true
                        ? "gap-0 py-0 opacity-0  text-[0px]"
                        : "gap-2 py-1 opacity-100"
                    }`}
                  >
                    <MdDeleteOutline />
                    Delete
                  </div>
                </div>
              </div>

              {/* <div
                   className={`absolute bottom-full mt-1 border rounded-lg bg-white shadow-lg w-[25%] transform transition-all duration-200 ease-in-out ${
                     open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                   }`}
                 >
                   <ul className="p-2">
                     <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                       Ad Option 1
                     </li>
                     <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                       Ad Option 2
                     </li>
                     <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                       Ad Option 3
                     </li>
                   </ul>
                 </div> */}
              {/* </div> */}

              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                rows={1}
                placeholder="Type your message here....."
                className="  w-[87%] bg-slate-50 outline-none rounded-2xl p-2 border-dashed border resize-none"
                style={{
                  minHeight: "40px",
                  maxHeight: "150px",
                  lineHeight: "1.5",
                  overflowY: "auto",
                }}
              />

              <div
                className="h-[40px] w-[40px] border-dashed border flex items-center justify-center rounded-2xl cursor-pointer"
                onClick={handleSend}
              >
                <CiLocationArrow1
                  className={`h-[20px] w-[20px] ${
                    message.trim() ? "text-black" : "text-black"
                  }`}
                />
              </div>
            </div>
          )}

          <div
            className={`h-full w-[40%] duration-200 right-[0%] ease-in-out bg-slate-400 absolute top-0  ${
              click === true ? "-mr-[100%]" : ""
            }`}
          >
            <div className="h-[50px] bg-white border-b flex items-center justify-between px-2">
              <div
                onClick={() => setClick(true)}
                className="h-[40px] w-[40px] text-[#171717] hover:bg-slate-50 active:bg-slate-100 bg-white border border-dashed rounded-2xl flex items-center justify-center "
              >
                <FiX />
              </div>
            </div>
          </div>
          {/* popup for join */}
          {isJoined === "unsubscribed" && (
            // <div className="h-full w-full duration-200 right-[0%] ease-in-out bg-[#ececec32] backdrop-blur absolute top-0">
            // @ts-expect-error Mismatch type
            <JoinPopup comdata={comdata} />
            // </div>
          )}
        </>
      ) : (
        <div className="bg-green-500 border-l-2 w-full overflow-auto h-screen  flex items-center justify-center">
          {/* <div className="   text-black text-md py-2">
            Click on any post to view whole community
          </div> */}

          <Image
            alt="compic"
            src={Insidecompic}
            className="h-[200px] hover:cursor-pointer w-[200px] object-contain"
          />
        </div>
      )}
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
