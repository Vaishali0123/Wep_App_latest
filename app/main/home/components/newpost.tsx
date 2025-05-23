// import React, { useEffect, useRef, useState } from "react";
// import Post from "./Post";
// import { API } from "@/app/utils/helpers";
// import axios from "axios";
// import { useAuthContext } from "@/app/auth/components/auth";
// import { io, Socket } from "socket.io-client";
// interface PostDataItem {
//   id?: string;
//   dps?: string;
//   dp?: string;
//   communityName?: string;
//   post?: Post | string;
//   urls?: PostMedia[];
//   memdps?: string[];
//   subs?: string;
//   memberCount?: number;
//   posts?: Post;
// }
// interface PostMedia {
//   type: string;
//   content: string;
//   thumbnail?: string;
// }
// type PostData = PostDataItem[];
// const Page = () => {
//   const [postData, setPostData] = useState<Array<PostData>>([]);
//   const { data } = useAuthContext();
//   const userId = data?.id;

//   const socketRef = useRef<Socket | null>(null);

//   const fetchFeed = async () => {
//     try {
//       const res = await axios.get(`${API}/getfeed/${userId}`);
//       if (res?.data?.success) {
//         setPostData(res?.data?.mergedData);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchFeed();

//       socketRef.current = io(API);
//       socketRef.current.on("connect", () => {
//         console.log("Connected to socket server");
//       });

//       return () => {
//         socketRef.current?.disconnect();
//       };
//     }
//   }, [userId]);

//   // Track views (when a post is visible)
//   const trackView = (postId: string) => {
//     if (socketRef.current) {
//       socketRef.current.emit("trackView", { postId, userId });
//     }
//   };

//   // Track clicks (when a post is clicked)
//   const trackClick = (postId: string) => {
//     if (socketRef.current) {
//       socketRef.current.emit("trackClick", { postId, userId });
//     }
//   };

//   // Observe when posts are in view
//   const observePost = (postId: string) => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           trackView(postId); // Track view when post enters the viewport
//         }
//       });
//     });

//     const postElement = document.getElementById(postId);
//     if (postElement) {
//       observer.observe(postElement);
//     }
//   };

//   useEffect(() => {
//     postData.forEach((post) => observePost(post.id));
//   }, [postData]);

//   return (
//     <div>
//       {postData.map((post) => (
//         <div
//           key={post.id}
//           id={post.id.toString()} // Set ID for IntersectionObserver
//           onClick={() => trackClick(post.id)} // Track clicks on post
//         >
//           <Post postData={post} switcher={0} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Page;
