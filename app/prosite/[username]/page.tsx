"use client";
import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ImArrowRight2 } from "react-icons/im";
import { SlArrowRightCircle } from "react-icons/sl";
// import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
// import { getProsite } from "./components/Prositefunc";
import { useAuthContext } from "../../auth/components/auth";
import axios from "axios";
import { API } from "../../utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import { FaYoutube } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export const runtime = "edge";
export interface PrositeData {
  profilepic: string;
  fullname: string;
  username: string;
  bio: string;
  email?: string;
  phone?: string;
  communities: {
    type: string;
    dp: string;
    communityName: string;
    desc: string;
  }[];
  isStoreVerified: boolean;
  collections: {
    products: {
      name: string;
      brandname: string;
      discountedprice: number;
      price: number;
      _id: string;
    }[];
  }[];
  yt: string;
  linkdin: string;
  x: string;
  snap: string;
  insta: string;
  html?: string; // Add this line
  _id?: string;
}

export interface Community {
  dp: string;
  communityName: string;
  desc: string;
  type: string;
  topic?: Topic;
}

export interface Topic {
  nature: string;
  posts?: Post[];
  title?: string;
  description?: string;
}

export interface Post {
  content: string;
  title?: string;
  description?: string;
  post: { content: string }[];
}

export interface Collection {
  products: Product[];
}
// interface ProSiteData {
//   isStoreVerified: boolean;
//   collections: Collection[];
// }
// const prositeData: ProSiteData | undefined =...;x

export interface Product {
  name: string;
  brandname: string;
  price: number;
  discountedprice: number;
  images?: { content: string }[];
  discount?: number;
  _id?: string;
}

const PageContent = () => {
  const { data } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [prositeData, setPrositeData] = useState<PrositeData | null>(null);

  const { username } = useParams();

  const hasfetched = useRef(false);
  // const [htmlUrl, setHtmlUrl] = useState<string | null>(null);

  // const fetchHtml = async () => {
  //   try {
  //     const response = await fetch(`/api/s3-html`);
  //     const data = await response.json();
  //     if (data.url) {
  //       setHtmlUrl(data.url);
  //     } else {
  //       console.error("Failed to fetch HTML URL");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching HTML file:", error);
  //   }
  // };

  const addtocart = async (productId: string) => {
    if (!data?.id) {
      toast.error("Please Log In First");
      window.open("https://grovyo.com/auth/login", "_blank");
      return;
    }
    try {
      setLoad(true);
      const res = await axios.post(
        `${API}/updateCart/${data?.id}/${productId}`,
        {
          action: "add",
          quantity: 1,
        }
      );

      if (res?.data?.success) {
        toast?.success("Product added to cart");
      } else {
        toast.error("Something went wrong! Please try again later");
      }
      setLoad(false);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };

  const getProsite = async (username: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/getprositedata/${username}`);

      if (res?.data?.success) {
        setPrositeData(res?.data?.userDetails);
      }
    } catch (e: unknown) {
      console.log(e);
    }
    setLoading(false);
  };

  const postRequest = async () => {
    try {
      await axios.post(`${API}/sendRequest/${data?.id}/${prositeData?._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (username && !hasfetched.current && !loading) {
      hasfetched.current = true;
      getProsite(username as string);
    }
  }, [username]);
  console.log(prositeData, "prositeData");

  return (
    <div className=" bg-white overflow-auto h-screen w-screen ">
      <Toaster />
      {loading === true || !username ? (
        <div>
          <div className="w-full h-[calc(100%-50px)] bg-defaultprositelight  bg-center bg-cover">
            {/* header  */}
            <div className="flex justify-between items-center h-[50px]  ">
              <div className="p-1 bg-[#ffffffc7] border-2 rounded-r-2xl flex ">
                <div className="h-[40px] bg-slate-100 w-[40px] rounded-[16px] border border-dashed flex items-center justify-center"></div>
                <div className="px-2">
                  <div className="text-[14px]  h-[10px] bg-slate-100 animate-pulse rounded-full w-[230px] ">
                    {prositeData?.fullname}
                  </div>
                  <div className="text-[12px]  h-[10px] bg-slate-100 animate-pulse rounded-full w-[230px] ">
                    @{prositeData?.username}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen bg-white overflow-auto">
          {/* header  */}
          <div className="flex justify-between absolute w-full  items-center h-[50px]">
            <div className="p-1 bg-white border-2 rounded-r-2xl flex ">
              <div className="h-[40px] w-[40px] rounded-[16px] border border-dashed flex items-center justify-center">
                <img
                  loading="lazy"
                  src={prositeData?.profilepic}
                  className="h-[34px] w-[34px] rounded-[14px] object-cover"
                />
              </div>
              <div className="px-2">
                <div className="text-[14px]">{prositeData?.fullname}</div>
                <div className="text-[12px]">@{prositeData?.username}</div>
              </div>
            </div>
            <div
              onClick={() => postRequest()}
              className="p-1 px-4 bg-blue-500 text-white border select-none cursor-pointer -pr-4 rounded-2xl flex items-center"
            >
              chat
            </div>
          </div>
          {/* fetched html */}
          {prositeData?.html != "" ? (
            <div className="flex flex-col w-screen h-screen items-center">
              <object
                data={`https://d95e0jpum1wnk.cloudfront.net/${prositeData?.username}.html`}
                type="text/html"
                className="w-full h-full"
              ></object>
            </div>
          ) : (
            <div className="w-full h-[calc(100vh-50px)] flex flex-col bg-defaultprositelight bg-center bg-cover items-center space-y-2 justify-center">
              <div className="text-[25px]">Hi , {prositeData?.username}</div>
              <div className="bg-[#ffffff96] rounded-2xl border gap-2 space-y-2 p-8">
                <div>Be the first one to use the most unique feature</div>
                <div className="flex bg-black p-2 rounded-xl items-center justify-center text-white  gap-2">
                  <div>Customize your prosite</div>
                  <SlArrowRightCircle className="bg-white text-black rounded-full" />
                </div>
              </div>
            </div>
          )}

          {/* About  */}
          <div className="w-full py-20 flex flex-col items-center space-y-2 justify-center">
            <div className="font-semibold text-[18px]">About</div>
            <div className="w-[60%] pn:max-sm:w-[80%] bg-[#ffffffb3] border p-4 rounded-3xl">
              <div className="font-semibold ">Bio:</div>
              <div>{prositeData?.bio}</div>
              {(prositeData?.email || prositeData?.phone) && (
                <div className="font-semibold pt-2  ">Contact Information:</div>
              )}
              {prositeData?.email != "undefined" && prositeData?.email ? (
                <div>Email : {prositeData?.email}</div>
              ) : null}
              {prositeData?.phone ? (
                <div>Phone : {prositeData?.phone}</div>
              ) : null}

              <div className="flex gap-3">
                {prositeData?.yt && (
                  <a
                    href={
                      prositeData.yt.startsWith("http://") ||
                      prositeData.yt.startsWith("https://")
                        ? prositeData.yt
                        : `https://${prositeData.yt}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube size={18} color="red" />
                  </a>
                )}
                {prositeData?.snap && (
                  <a
                    href={
                      prositeData.snap.startsWith("http://") ||
                      prositeData.snap.startsWith("https://")
                        ? prositeData.snap
                        : `https://${prositeData.snap}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSnapchatGhost size={18} color="yellow" />
                  </a>
                )}
                {prositeData?.insta && (
                  <a
                    href={
                      prositeData.insta.startsWith("http://") ||
                      prositeData.insta.startsWith("https://")
                        ? prositeData.insta
                        : `https://${prositeData.insta}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={18} color="#962fbf" />
                  </a>
                )}
                {prositeData?.x && (
                  <a
                    href={
                      prositeData.x.startsWith("http://") ||
                      prositeData.x.startsWith("https://")
                        ? prositeData.x
                        : `https://${prositeData.x}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter size={18} color="black" />
                  </a>
                )}
                {prositeData?.linkdin && (
                  <a
                    href={
                      prositeData.linkdin.startsWith("http://") ||
                      prositeData.linkdin.startsWith("https://")
                        ? prositeData.linkdin
                        : `https://${prositeData.linkdin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={18} color="#0077B5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Community  */}
          <div className="w-full  flex flex-col  items-center space-y-2 justify-center">
            {(prositeData && prositeData?.communities?.length > 0) ||
            username === data?.username ? (
              <div className="font-semibold text-[18px]">Communities</div>
            ) : null}

            {prositeData?.communities.length === 0 &&
            username != data?.username ? null : prositeData?.communities
                .length === 0 && username === data?.username ? (
              <div className="w-full h-full  px-2  items-center justify-center flex flex-col gap-2 overflow-auto">
                Create your first community
              </div>
            ) : (
              <div className="w-full h-full sm:px-2 items-center  justify-center flex flex-col sm:gap-2 overflow-auto">
                {prositeData?.communities.map(
                  (item: Community, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex pn:max-sm:flex-col overflow-auto sm:max-w-[90%]  pn:max-sm:w-[95%]  min-w-[60%] duration-300 hover:bg-slate-50  sm:p-2 rounded-3xl h-full  flex-row"
                      >
                        <div className="sm:border p-2 sm:w-[230px] w-full items-center  bg-white sm:h-[230px] flex  pn:max-sm:flex sm:flex-col justify-evenly pn:max-sm:rounded-2xl sm:rounded-3xl">
                          <div className="pn:max-sm:flex border p-2 w-[210px] h-[210px]    flex flex-col justify-between rounded-3xl">
                            {/* Community Image  */}
                            <div className="bg-slate-300 rounded-[20px] h-[50px] w-[50px]">
                              <img
                                alt="dp"
                                loading="lazy"
                                src={item?.dp}
                                className="cover  rounded-[20px] w-full h-full"
                              />
                            </div>
                            <div className="px-2 flex flex-col">
                              <div className="sm:text-[18px] text-[16px] pn:max-sm:font-medium sm:font-semibold">
                                {item?.communityName}
                              </div>
                              <div className="">
                                {item?.desc?.length > 50
                                  ? `${item.desc.slice(0, 50)}...`
                                  : item?.desc}
                              </div>
                            </div>
                          </div>
                          {/* <div className="flex items-center gap-2 p-2 px-4 justify-between hover:bg-[#222] active:bg-[#333] sm:bg-black sm:text-white rounded-2xl ">
                            <div>View</div>
                            <ImArrowRight2 className="bg-white text-black pn:max-sm:hidden rounded-full p-1 border" />
                          </div> */}
                        </div>
                        {item?.topic &&
                        item?.topic?.posts &&
                        item?.topic?.posts?.length > 0 ? (
                          item?.topic?.posts?.map((t: Post, i: number) => {
                            return (
                              <div
                                key={i}
                                className="border p-2 px-2 h-[230px]  pn:max-sm:hidden flex justify-between rounded-3xl"
                              >
                                <div className="border p-2 w-[210px] h-[210px]    flex flex-col justify-between rounded-3xl">
                                  <div className="">
                                    <div className="bg-slate-300 rounded-[20px] h-[50px] w-[50px]">
                                      <img
                                        loading="lazy"
                                        src={t?.post?.[0]?.content}
                                        className="rounded-3xl"
                                      />
                                    </div>
                                    {t?.title && (
                                      <div className="text-[18px] font-medium">
                                        {t?.title}
                                      </div>
                                    )}

                                    {t?.description && (
                                      <div className="">
                                        ({" "}
                                        {t?.description?.length > 50
                                          ? `${t?.description.slice(0, 50)}...`
                                          : t?.description}
                                        )
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 p-2 px-4 justify-between sm:bg-black sm:text-white rounded-2xl ">
                                    <div>View</div>
                                    <ImArrowRight2 className="bg-white pn:max-sm:hidden text-black rounded-full p-1 border" />
                                  </div>
                                </div>
                              </div>
                            );
                            return null;
                          })
                        ) : (
                          <div className="pn:max-sm:hidden h-fu<ll w-full flex items-center justify-center font-semibold">
                            <div> + add posts to your community </div>
                            <div></div>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
          {/* Store  */}
          <div className="w-full flex flex-col bg-white py-5 items-center space-y-2 justify-center">
            <div className="font-semibold text-[18px]">Store</div>
            <div className="w-[90%] flex  pn:max-sm:w-[100%] pn:max-sm:grid pn:max-sm:grid-cols-2 flex-wrap gap-2 justify-center ">
              {prositeData?.isStoreVerified ? (
                prositeData?.collections.length > 0 ? (
                  prositeData?.collections.map(
                    (item: Collection) =>
                      item?.products.length > 0 &&
                      item?.products.map((d: Product, i: number) => (
                        <div
                          key={i}
                          className="border h-fit p-2 bg-white pn:max-sm: w-[230px] flex flex-col space-y-2 items-center rounded-3xl"
                        >
                          <Link
                            href={{
                              pathname: "../product",
                              query: {
                                userId: data?.id,
                                id: d?._id,
                              },
                            }}
                            className=" bg-white w-full flex flex-col space-y-2 items-center rounded-3xl"
                          >
                            <div className=" w-full h-[230px] rounded-[20px] ">
                              <img
                                loading="lazy"
                                alt="Product img"
                                src={d?.images?.[0]?.content}
                                className="object-cover w-full h-full rounded-[20px]"
                              />
                            </div>
                            <div className="text-[14px]  w-[230px] text-center  font-semibold">
                              {d?.name}
                            </div>

                            <div className="text-[12px] font-medium">
                              by{" "}
                              {d?.brandname != "N/A" && d?.brandname != ""
                                ? d?.brandname
                                : prositeData?.username}
                            </div>

                            {d?.discount && (
                              <div className="text-[14px]  text-end flex gap-2">
                                <div className="text-[16px] font-semibold">
                                  ₹ {d?.price - d?.discount}
                                </div>
                                {/* <div className="text-blue-600 text-[12px]">79% off</div> */}
                              </div>
                            )}
                            <div className="text-[12px] font-semibold flex">
                              M.R.P. :
                              <div className=" text-red-600">₹{d?.price}</div>
                            </div>
                          </Link>
                          <div className="flex flex-col items-center w-full font-semibold bg-blue-500 gap-2 p-2 px-4 justify-center text-white rounded-2xl ">
                            <Link
                              href={{
                                pathname: "../product",
                                query: {
                                  userId: data?.id,
                                  id: d?._id,
                                },
                              }}
                            >
                              View Product
                            </Link>

                            {/* <ImArrowRight2 className="bg-white text-black rounded-full p-1 border" /> */}
                          </div>
                          <button
                            disabled={load}
                            onClick={() => {
                              if (d?._id) {
                                addtocart(d?._id);
                              } else {
                                toast.error(
                                  "Some error occurred!Please refresh the page"
                                );
                              }
                            }}
                            className="flex flex-col items-center font-semibold w-full gap-2 p-2 px-4 justify-center bg-green-600 text-white rounded-2xl "
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))
                    //  : (
                    //   <div
                    //     key={index}
                    //     className="border p-2  bg-white  flex flex-col space-y-2 items-center rounded-3xl"
                    //   >
                    //     No products found yet
                    //   </div>
                    // )
                  )
                ) : (
                  <div className="border p-2  bg-white  flex flex-col space-y-2 items-center rounded-3xl">
                    No products found yet
                  </div>
                )
              ) : (
                <div>No Store created</div>
              )}
            </div>
          </div>
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
