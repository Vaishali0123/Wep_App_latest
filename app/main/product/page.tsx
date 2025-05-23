"use client";
import { useAuthContext } from "@/app/auth/components/auth";
import { API, errorHandler } from "@/app/utils/helpers";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsStar, BsStarFill } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRankingStar } from "react-icons/fa6";
import { GrSecure } from "react-icons/gr";
import { HiOutlineCash } from "react-icons/hi";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
interface ProductData {
  _id?: string;
  name?: string;
  desc?: string;
  brandname?: string;
  price?: number;
  discountedprice?: number;
  totalstars?: number;
  quantity?: number;
  images?: { content: string }[];
  producturl?: string;
  discount?: number;
  creator?: {
    fullname?: string;
    username?: string;
  };
}
interface ProductImage {
  content: string;
}
const PageContent = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [load, setLoad] = useState(false);
  const { data } = useAuthContext();
  // const productData = JSON.parse(productdata as string);
  // console.log(productData, "productData");
  const productId = searchParams.get("id");
  // const [active, setActive] = React.useState<boolean>(false);
  const [productData, setProductData] = useState<ProductData>({});
  const [quantity, setQuantity] = useState(1);
  // const quantity = 1;
  const active = false;

  const getProduct = async () => {
    try {
      const res = await axios.get(`${API}/getProduct/${userId}/${productId}`);
      if (res?.data?.success) {
        setProductData(res?.data?.data);
      }
    } catch (e) {
      errorHandler(e);
    }
  };
  const total = 5; // Assuming a 5-star rating system
  const filledStars = Math.round(productData?.totalstars || 0); // Round the

  const buynow = async (productId: string, quantity: number, price: number) => {
    try {
      setLoad(true);
      const res = await axios.post(`${API}/placeorder/${data?.id}`, {
        productId: productId,
        action: "add",
        quantity: quantity,
        paymentMode: "Cash",
        finalprice: price,
      });

      if (res?.data?.success) {
        toast?.success("Product added to cart");
      } else {
        toast.error("Something went wrong! Please try again later");
      }
      setLoad(false);
    } catch (e) {
      errorHandler(e);
    }
  };

  //ADD TO CART
  const UpdateCart = async () => {
    try {
      const res = await axios.post(`${API}/updateCart/${userId}/${productId}`, {
        action: "add",
        quantity: quantity,
      });
      console.log(res?.data, "updateCart");

      if (res?.data?.success) {
        toast.success("Product added to cart.");
      }
    } catch (e) {
      toast.error("Something went wrong!");
      console.log(e);
    }
  };
  const discountPercentage =
    productData?.price && productData?.discount
      ? (
          ((productData?.price - productData?.discount) / productData?.price) *
          100
        ).toFixed(0)
      : 0;
  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <div className="h-screen w-full flex pn:max-md:flex-col relative pn:max-md:fixed pn:max-md:overflow-auto bg-white">
      <Toaster />
      {/* first section  */}
      <div className="h-full w-[40%] pn:max-md:w-full flex pn:max-md:flex-col-reverse">
        <div className="pn:max-md:h-[100px]  pn:max-md:w-full border-t  md:border-r md:w-[100px] flex gap-2 items-center md:flex-col py-2">
          {productData?.images?.map((image: ProductImage, index: number) => (
            <div
              key={index}
              className="h-[60px] w-[60px] rounded-2xl border border-dashed"
            >
              <img
                key={index} // Add a unique key for each mapped element
                src={
                  productData.producturl + image?.content ||
                  "../../assets/members.png"
                } // Fallback to default image if content is not available
                alt={`Grovyo img ${index + 1}`} // Alt text with the index to differentiate images
                className="h-[60px] w-[60px] rounded-2xl border border-dashed"
              />
            </div>
          ))}
        </div>
        <div className="p-2 w-full md:h-full">
          <div className="md:h-full w-full">
            <div className="h-[calc(100%-100px)] pn:max-md:h-[400px] w-full p-2">
              <div className="h-full w-full  flex items-center justify-center p-2 border rounded-3xl">
                {/* {productData?.images} */}
                <div className="h-full w-full flex items-center justify-center rounded-2xl">
                  <img
                    src={
                      productData?.producturl &&
                      productData?.images?.[0]?.content
                        ? productData.producturl +
                          productData.images?.[0].content
                        : "../../assets/members.png" // Fallback image if URL or image content is not available
                    }
                    alt="img" // Fallback alt text if product name is not available
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="w-full pn:max-md:hidden pt-2 flex h-[100px] border-t items-center">
              <div className="w-full flex items-center justify-between">
                <div className="w-[60px] text-center flex flex-col items-center">
                  <div className="h-[40px] w-[40px] flex items-center justify-center bg-slate-100 rounded-2xl border border-dashed">
                    <HiOutlineCash className="w-5 h-5" />
                  </div>
                  <div className="text-[12px] text-blue-600">
                    Pay on delivery
                  </div>
                </div>
                <div className="w-[60px] text-center flex flex-col items-center">
                  <div className="h-[40px] w-[40px] flex items-center justify-center bg-slate-100 rounded-2xl border border-dashed">
                    <TbTruckReturn className="w-5 h-5" />
                  </div>
                  <div className="text-[12px] text-blue-600 ">
                    Non-Returnable
                  </div>
                </div>
                <div className="w-[60px] text-center flex flex-col items-center">
                  <div className="h-[40px] w-[40px] flex items-center justify-center bg-slate-100 rounded-2xl border border-dashed">
                    <MdDeliveryDining className="w-5 h-5" />
                  </div>
                  <div className="text-[12px] text-blue-600">
                    Grovyo delivery
                  </div>
                </div>
                <div className="w-[60px] text-center flex flex-col items-center">
                  <div className="h-[40px] w-[40px] flex items-center justify-center bg-slate-100 rounded-2xl border border-dashed">
                    <div>
                      <div className="text-[6px]">Free</div>
                      <CiDeliveryTruck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-[12px] text-blue-600">Free Delivery</div>
                </div>
                <div className="w-[60px] text-center flex flex-col items-center">
                  <div className="h-[40px] w-[40px] flex items-center justify-center bg-slate-100 rounded-2xl border border-dashed">
                    <FaRankingStar className="w-5 h-5" />
                  </div>
                  <div className="text-[12px] text-blue-600 w-[40px]">
                    Top Brand
                  </div>
                </div>
                <div className="w-[60px] text-center flex flex-col items-center">
                  <div className="h-[40px] w-[40px] flex items-center justify-center bg-slate-100 rounded-2xl border border-dashed">
                    <GrSecure className="w-5 h-5" />
                  </div>
                  <div className="text-[12px] text-blue-600">
                    Secure transaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* middle section */}
      <div className="h-full mb-[80px] pn:max-md:w-full pn:max-md:p-2 md:p-8 space-y-2 w-[calc(60%-300px)]">
        {/* Product Info  */}
        <div>
          <div className=" font-semibold text-[25px] ">{productData?.name}</div>
          <div className=" font-medium">
            <div className="text-slate-600 font-semibold">
              Product Description:
            </div>
            {productData?.desc}
          </div>
          <div className="text-slate-600  flex items-center gap-2 font-medium">
            <IoStorefrontOutline />
            by {productData?.brandname}
          </div>
        </div>
        {/* Rating  */}
        <div className="w-full flex items-center gap-2">
          <div>{productData?.totalstars}</div>
          {/* Loop through total 5 stars */}
          {[...Array(total)].map((_, index) => {
            // Check if the current index is less than the filledStars
            return index < filledStars ? (
              <BsStarFill
                key={index}
                className="text-orange-500 stroke-orange-500 stroke-[1px]"
              />
            ) : (
              <BsStar
                key={index}
                className="text-white stroke-orange-500 stroke-[1px]"
              />
            );
          })}

          {/* <div className="text-blue-700 text-[14px]"> 14 reviews</div> */}
        </div>
        {/* Size  */}
        {/* <div>
          <div className="font-semibold text-slate-600">Select Size</div>
          <div className="flex gap-2 flex-wrap">
            <div className="border items-center justify-center flex h-[40px] w-[40px] rounded-2xl border-dashed">
              S
            </div>
            <div className="border items-center justify-center flex h-[40px] w-[40px] rounded-2xl border-dashed">
              md
            </div>{" "}
            <div className="border items-center justify-center flex h-[40px] w-[40px] rounded-2xl border-dashed">
              xl
            </div>{" "}
            <div className="border items-center justify-center flex h-[40px] w-[40px] rounded-2xl border-dashed">
              2xl
            </div>
          </div>
        </div> */}
        {/* Color   */}
        {/* <div>
          <div className="font-semibold text-slate-600">Select Color</div>
          <div className="flex gap-2 flex-wrap">
            <div className="border items-center justify-center flex h-[40px] p-1 w-[40px] rounded-2xl border-dashed">
              <div className="h-full w-full rounded-xl bg-red-300"></div>
            </div>
            <div className="border items-center justify-center flex h-[40px] p-1 w-[40px] rounded-2xl border-dashed">
              <div className="h-full w-full rounded-xl bg-yellow-300"></div>
            </div>
            <div className="border items-center justify-center flex h-[40px] p-1 w-[40px] rounded-2xl border-dashed">
              <div className="h-full w-full rounded-xl bg-green-300"></div>
            </div>
            <div className="border items-center justify-center flex h-[40px] p-1 w-[40px] rounded-2xl border-dashed">
              <div className="h-full w-full rounded-xl bg-blue-300"></div>
            </div>
          </div>
        </div> */}
        {/* Pricing  */}
        <div>
          <div className="flex gap-2 items-center">
            {discountPercentage === 0 && (
              <div className="flex font-semibold text-[25px]">
                &#x20b9;{" "}
                {productData?.discountedprice
                  ? productData?.discountedprice
                  : productData?.price}
              </div>
            )}
            {productData?.discountedprice && productData?.price ? (
              <div className="text-red-600">
                {(
                  ((productData?.price - productData?.discountedprice) /
                    productData?.price) *
                  100
                ).toFixed(2)}
                % Off
              </div>
            ) : (
              <div className="text-red-600">0% Off</div>
            )}
          </div>
          <div className="text-[#464646] text-[14px] font-medium flex items-center gap-1">
            {" "}
            M.R.P:
            <div className="line-through">&#x20b9; {productData?.price}</div>
          </div>
        </div>
      </div>
      {/* last section  */}
      <div className="md:h-full pn:max-md:fixed relative pn:max-md:bottom-0 pn:max-md:w-full pn:max-md:p-0 md:p-8 space-y-2 w-[300px] bg-white">
        <div className="border w-full pn:max-md:rounded-t-2xl md:rounded-3xl space-y-2 md:p-4 text-[14px]">
          <div
            className={`pn:max-md:absolute z-0 bg-white pn:max-md:p-4 w-full space-y-2 pn:max-md:border-t rounded-t-2xl duration-150 ${
              active ? "pn:max-md:bottom-[50px]" : "-bottom-96 "
            }`}
          >
            <div className="">
              <span className="text-blue-600">FREE</span> delivery on orders
              dispatched by Grovyo over ₹999.
              <span className="text-blue-600 hover:underline">Details</span>
            </div>
            {/* <div>
              Or fastest delivery Tomorrow, 21 January. Order within 22 hrs 15
              mins.{" "}
              <span className="text-blue-600 hover:underline">Details</span>
            </div> */}
            {/* location  */}
            {/* <div className="flex gap-2  w-full p-2 bg-slate-100 rounded-2xl items-center">
              <MdOutlineLocationOn />
              <div className="text-blue-700">Address</div>
            </div> */}
            {/* stock  */}
            <div className="text-green-600 font-semibold text-[18px]">
              {productData?.quantity
                ? productData?.quantity > 1
                  ? "In stock"
                  : "Out of stock"
                : "Out of stock"}
            </div>
            {/* methord  */}
            <div>
              <div className="flex gap-1">
                {/* <div className="text-gray-600">Payment:</div>{" "} */}
                <div className="text-blue-600 font-semibold">
                  Cash On Delivery available
                </div>
              </div>
              {/* <div className="flex gap-1">
                <div className="text-gray-600">Ships from:</div>{" "}
                <div className="text-blue-600">cod</div>
              </div> */}
              {productData?.creator?.fullname && (
                <div className="flex gap-1">
                  <div className="text-gray-600">Sold by:</div>
                  <div className="text-blue-600">
                    {productData?.creator?.username}
                  </div>
                </div>
              )}
            </div>
            {/* order  */}
            <div className=" bg-slate-50 p-2 flex justify-between rounded-2xl">
              <label>Quantity:</label>
              <select
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          {/* button  */}
          <div className="pn:max-md:flex pn:max-md:gap-2 pn:max-md:p-2 z-20 md:space-y-2">
            <div
              onClick={() => UpdateCart()}
              className="bg-green-600 text-white flex z-0 items-center justify-center w-full p-2 rounded-2xl"
            >
              Add to cart
            </div>
            {/* <div
              className={`absolute bg-green-600 duration-500  text-white  flex items-center justify-center rounded-2xl ${
                active === true
                  ? "w-[10px] p-2 -left-[400%] top-[25%] "
                  : "  w-[140px] p-2 left-20 top-[48%] z-10"
              }`}
            ></div> */}
            <button
              disabled={load || !productData?._id || !productData?.price}
              onClick={() => {
                if (productData?._id && productData?.price) {
                  buynow(productData?._id, quantity, productData?.price);
                }
              }}
              className="border-2 cursor-pointer border-dashed flex items-center justify-center w-full p-2 rounded-2xl"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
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
