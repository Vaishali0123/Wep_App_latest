"use client";
import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ImArrowRight2 } from "react-icons/im";
import { SlArrowRightCircle } from "react-icons/sl";
// import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
// import { getProsite } from "./components/Prositefunc";
import { useAuthContext } from "../auth/components/auth";
import axios from "axios";
import { API } from "../utils/helpers";
import toast, { Toaster } from "react-hot-toast";

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
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
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

  const getProsite = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/getprositedata/${id}`);
      console.log(res?.data);

      if (res?.data?.success) {
        setPrositeData(res?.data?.userDetails);
      }
    } catch (e: unknown) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id && !hasfetched.current && !loading) {
      hasfetched.current = true;
      getProsite(id);
    }
  }, [id]);

  return (
    <div className=" bg-white overflow-auto h-screen w-full ">
      <Toaster />
      {loading === true || !id ? (
        <div>
          <div className="w-full h-[calc(100%-50px)] bg-defaultprositelight  bg-center bg-cover">
            <div className="flex justify-between items-center h-[50px]  ">
              {/* header  */}
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
            {/* prosite  */}
            {/* <div className="flex flex-col  items-center p-4">
              <button
                onClick={fetchHtml}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              ></button>

              {htmlUrl && (
                <iframe
                  src={htmlUrl}
                  className="mt-4 w-full max-w-3xl h-[500px] border rounded-md"
                />
              )}
            </div> */}
            {/* <div className="w-full h-[calc(100%-50px)] flex flex-col  items-center space-y-2 justify-center">
              <div className="text-[25px]">Hi , {prositeData?.username}</div>
              <div className="bg-[#ffffff96] rounded-2xl border gap-2 space-y-2 p-8">
                <div>Be the first one to use the most unique feature</div>
                <div className="flex bg-black p-2 rounded-xl items-center justify-center text-white  gap-2">
                  <div>Customize your prosite</div>
                  <SlArrowRightCircle className="bg-white text-black rounded-full" />
                </div>
              </div>
            </div> */}
          </div>
          {/* About  */}
          <div className="w-full   py-20 flex flex-col items-center space-y-2 justify-center">
            <div className="font-semibold text-[18px]">About</div>
            <div className="w-[60%] bg-[#ffffffb3] border p-4 rounded-3xl">
              <div className="font-semibold">Bio:</div>
              <div>{prositeData?.bio}</div>
              {(prositeData?.email || prositeData?.phone) && (
                <div className="font-semibold pt-2">Contact Information:</div>
              )}
              {prositeData?.email ? (
                <div>Email : {prositeData?.email}</div>
              ) : null}
              {prositeData?.phone ? (
                <div>Phone : {prositeData?.phone}</div>
              ) : null}
              {/* <div>Links:</div>
      <div className="flex">
        <div className="bg-slate-50 rounded-xl p-2 border">Youtube</div>
      </div> */}
            </div>
          </div>
          {/* Community  */}
          {/* <div className="w-full flex flex-col  items-center space-y-2 justify-center">
            <div className="font-semibold text-[18px]">Communities</div>
            <div className="w-full h-full  px-2  items-center justify-center flex flex-col gap-2 overflow-auto">
              {prositeData?.communities
                ?.filter((item: Community) => item?.type === "public")
                .map((item: Community, index: number) => {
                  return (
                    <div key={index} className="flex flex-row">
                      <div className="border p-2 w-[230px] h-[230px]    flex flex-col justify-between rounded-3xl">
                        <div className="">
                          <div className="bg-slate-300 rounded-[20px] h-[50px] w-[50px]">
                            <img
                              loading="lazy"
                              src={item?.dp}
                              className="rounded-3xl"
                            />
                          </div>
                          <div className="text-[18px]  font-semibold">
                            {item?.communityName}
                          </div>

                          <div className="">
                            {item?.desc?.length > 50
                              ? `${item.desc.slice(0, 50)}...`
                              : item?.desc}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 px-4 justify-between bg-black text-white rounded-2xl ">
                          <div>View</div>
                          <ImArrowRight2 className="bg-white text-black rounded-full p-1 border" />
                        </div>
                      </div>
                      {item?.topics &&
                        item?.topics
                          // ?.filter((d: any) => d?.nature === "post")
                          .map((t: Topic, i: number) => {
                            if (t?.nature === "post") {
                              if (t?.posts?.length > 0) {
                                return (
                                  <div
                                    key={i}
                                    className="border p-2 px-2 h-[230px]   flex justify-between rounded-3xl"
                                  >
                                    <div className="border p-2 w-[210px] h-[210px]    flex flex-col justify-between rounded-3xl">
                                      <div className="">
                                        <div className="bg-slate-300 rounded-[20px] h-[50px] w-[50px]">
                                          <img
                                            loading="lazy"
                                            src={t?.posts[0]?.post[0]?.content}
                                            className="rounded-3xl"
                                          />
                                        </div>
                                        <div className="text-[18px]  font-semibold">
                                          {t?.posts[0]?.title}
                                        </div>

                                        <div className="">
                                          {t?.posts[0]?.description?.length > 50
                                            ? `${t?.posts[0]?.description.slice(
                                                0,
                                                50
                                              )}...`
                                            : t?.posts[0]?.description}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 p-2 px-4 justify-between bg-black text-white rounded-2xl ">
                                        <div>View</div>
                                        <ImArrowRight2 className="bg-white text-black rounded-full p-1 border" />
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            }
                            return null;
                          })}
                    </div>
                  );
                })}
            </div>
          </div> */}
          {/* Store  */}
          {/* <div className="w-full flex flex-col py-5 items-center space-y-2 justify-center">
            <div className="font-semibold text-[18px]">Store</div>
            <div className="w-[90%]  flex flex-wrap gap-2 justify-center ">
              <div className="border p-2  bg-white w-[230px] flex flex-col space-y-2 items-center rounded-3xl">
                <div className=" w-full h-[230px] rounded-[20px] ">
                  <div className="object-cover  w-full h-full rounded-[20px]" />
                </div>
                <div className="text-[14px] h-[10px] bg-slate-100 animate-pulse rounded-full w-[230px] text-center  font-semibold"></div>
                <div className="text-[12px]  h-[10px] bg-slate-100 animate-pulse rounded-full w-[230px]  font-medium"></div>
                <div className="text-[14px] text-end flex gap-2">
                  <div className="text-[16px]  h-[10px] bg-slate-100 animate-pulse rounded-full w-[230px]  font-semibold"></div>
                </div>
                <div className="text-[12px] h-[10px] bg-slate-100 animate-pulse rounded-full w-[230px] font-semibold flex">
                  M.R.P. :
                  <div className=" text-red-600  h-[10px] bg-slate-100 animate-pulse rounded-full w-[230px] "></div>
                </div>

                <div className="flex items-center w-full gap-2 p-2 px-4 justify-center bg-black text-white rounded-2xl ">
                  <div className=" h-[10px] bg-slate-100 animate-pulse rounded-full w-[230px] "></div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        <>
          {/* header  */}
          <div className="flex justify-between absolute  items-center h-[50px]">
            <div className="p-1 bg-[#ffffffc7] border-2 rounded-r-2xl flex ">
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
          </div>
          {/* fetched html */}
          <div className="flex flex-col w-screen h-screen items-center¯">
            <object
              data={`https://d95e0jpum1wnk.cloudfront.net/${prositeData?.username}.html`}
              type="text/html"
              className="w-full h-full"
            ></object>
          </div>
          {/* default  */}
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

          {/* About  */}
          <div className="w-full   py-20 flex flex-col items-center space-y-2 justify-center">
            <div className="font-semibold text-[18px]">About</div>
            <div className="w-[60%] bg-[#ffffffb3] border p-4 rounded-3xl">
              <div className="font-semibold">Bio:</div>
              <div>{prositeData?.bio}</div>
              {(prositeData?.email || prositeData?.phone) && (
                <div className="font-semibold pt-2">Contact Information:</div>
              )}
              {prositeData?.email != "undefined" && prositeData?.email ? (
                <div>Email : {prositeData?.email}</div>
              ) : null}
              {prositeData?.phone ? (
                <div>Phone : {prositeData?.phone}</div>
              ) : null}
              {/* <div>Links:</div>
          <div className="flex">
            <div className="bg-slate-50 rounded-xl p-2 border">Youtube</div>
          </div> */}
            </div>
          </div>
          {/* Community  */}
          <div className="w-full flex flex-col  items-center space-y-2 justify-center">
            <div className="font-semibold text-[18px]">Communities</div>
            <div className="w-full h-full  px-2  items-center justify-center flex flex-col gap-2 overflow-auto">
              {prositeData?.communities.map(
                (item: Community, index: number) => {
                  return (
                    <div key={index} className="flex flex-row">
                      <div className="border p-2 w-[230px] h-[230px]    flex flex-col justify-between rounded-3xl">
                        <div className="">
                          <div className="bg-slate-300 rounded-[20px] h-[50px] w-[50px]">
                            <img
                              alt="dp"
                              loading="lazy"
                              src={item?.dp}
                              className="cover  rounded-[20px] w-full h-full"
                            />
                          </div>
                          <div className="text-[18px]  font-semibold">
                            {item?.communityName}
                          </div>

                          <div className="">
                            {item?.desc?.length > 50
                              ? `${item.desc.slice(0, 50)}...`
                              : item?.desc}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 px-4 justify-between bg-black text-white rounded-2xl ">
                          <div>View</div>
                          <ImArrowRight2 className="bg-white text-black rounded-full p-1 border" />
                        </div>
                      </div>
                      {item?.topic &&
                      item?.topic?.posts &&
                      item?.topic?.posts?.length > 0 ? (
                        item?.topic?.posts?.map((t: Post, i: number) => {
                          return (
                            <div
                              key={i}
                              className="border p-2 px-2 h-[230px]   flex justify-between rounded-3xl"
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
                                    <div className="text-[18px]  font-semibold">
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
                                <div className="flex items-center gap-2 p-2 px-4 justify-between bg-black text-white rounded-2xl ">
                                  <div>View</div>
                                  <ImArrowRight2 className="bg-white text-black rounded-full p-1 border" />
                                </div>
                              </div>
                            </div>
                          );

                          return null;
                        })
                      ) : (
                        <div>No Posts Available</div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {/* Store  */}
          <div className="w-full flex flex-col py-5 items-center space-y-2 justify-center">
            <div className="font-semibold text-[18px]">Store</div>
            <div className="w-[90%]  flex flex-wrap gap-2 justify-center ">
              {prositeData?.isStoreVerified ? (
                prositeData?.collections.length > 0 ? (
                  prositeData?.collections.map(
                    (item: Collection, index: number) =>
                      item?.products.length > 0 ? (
                        item?.products.map((d: Product, i: number) => (
                          <div
                            key={i}
                            className="border p-2  bg-white w-[230px] flex flex-col space-y-2 items-center rounded-3xl"
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
                              {d?.brandname != "N/A" &&
                                d?.brandname != "N/A" && (
                                  <div className="text-[12px] font-medium">
                                    by {d?.brandname}
                                  </div>
                                )}

                              {d?.discount && d?.discount > 0 && (
                                <div className="text-[14px] text-end flex gap-2">
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
                            <div
                              // href={{
                              //   pathname: "../product",
                              //   query: {
                              //     userId: data?.id,
                              //     id: d?._id,
                              //   },
                              // }}
                              className="flex flex-col items-center w-full font-semibold bg-blue-500 gap-2 p-2 px-4 justify-center text-white rounded-2xl "
                            >
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
                      ) : (
                        <div
                          key={index}
                          className="border p-2  bg-white  flex flex-col space-y-2 items-center rounded-3xl"
                        >
                          No products found yet
                        </div>
                      )
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
        </>
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
