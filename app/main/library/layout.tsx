"use client";
import { ReactNode, FC, memo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
// import { IoIosAdd, IoIosArrowRoundForward } from "react-icons/io";
// import { CgTimelapse } from "react-icons/cg";
// import { MdCancel, MdKeyboardArrowRight } from "react-icons/md";
// import { IoStorefrontOutline } from "react-icons/io5";
// import { RiSubtractLine } from "react-icons/ri";
import Cart from "./cart/Cart";
import Subscription from "./Subscription/Subscription";
import Trackorder from "./trackOrder/Trackorder";
import Link from "next/link";
import axios from "axios";
import { API, errorHandler } from "@/app/utils/helpers";
import { useAuthContext } from "@/app/auth/components/auth";

// import Header from "../components/header";
// import NavBar from "../components/navbar";
// import { useSelector } from "react-redux";
// // import Cookies from "js-cookie";
// import CookieConsent from "react-cookie-consent";
// import Dashboard from "../(main)/dashboard/page";
// import CreateAds from "../(main)/createAds/page";
// import Billing from "../(main)/billing/page";
// import Settings from "../(main)/settings/page";

// Define the type for component props
interface MainLayoutProps {
  children: ReactNode;
}
interface CartProps {
  data: CartItem[];
  totalprice: number;
  discount: number;
  delivery?: number;
}
export type CartItem = {
  product: {
    images: { content: string }[];
    name: string;
    brandname: string;
    discountedprice: number;
    price: number;
    discount: number;
  };
  quantity: number;
  discount?: number;
  totalprice?: number;
  delivery?: number;
};
type Order = {
  _id?: string;
  timing: string;
  discount?: number;
  data: {
    currentStatus: string;
    productId: {
      images: { content: string }[];
      name: string;
    };

    seller: { username: string; fullname: string };
  }[];
  totalamount: number;
};

interface SubscriptionStatus {
  validity: string;
  dp: string;
  community: string;
  topic: string;
  topicmembers: number;
}

interface SubscriptionItem {
  status: SubscriptionStatus;
}
const LibrayLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: authdata } = useAuthContext();
  const userId = authdata?.id;
  const [open, setOpen] = useState<number>(1);
  const MemorizedCart = memo(Cart);
  const MemorizedTrackorder = memo(Trackorder);
  const MemorizedSubscription = memo(Subscription);
  const [addressData, setAddressData] = useState([]);
  const [cart, setCart] = useState<CartProps>({
    data: [],
    totalprice: 0,
    discount: 0,
    delivery: 0,
  });
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [subscriptions, setSubscriptions] = useState<Array<SubscriptionItem>>(
    []
  );
  const [phone, setPhone] = useState("");

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/getCart/${userId}`);

      if (res?.data?.success) {
        setCart(res?.data?.data);
        setAddressData(res?.data?.address);
        setPhone(res?.data?.phone);
        // setCart({ data: res?.data?.data, totalprice: res?.data?.totalprice });
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/getOrder/${userId}`);
      console.log(res?.data, "orders");
      if (res?.data?.success) {
        setOrders(res?.data?.data);
      }
    } catch (e: unknown) {
      errorHandler(e);
    }
  };
  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(`${API}/fetchallsubscriptions/${userId}`);

      if (res?.data?.success) {
        setSubscriptions(res?.data?.merged || []);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);
  const path = usePathname();

  return (
    <>
      <div className="bg-black dark:bg-[#b3c8e6] font-nunito duration-75 h-screen w-screen fixed flex pn:max-sm:flex-col">
        <div className="w-[30%] pn:max-sm:w-full border-r  h-full bg-white">
          <div className="h-[50px] bg-slate-50 items-center flex justify-between px-2">
            <div className="text-[#000000] text-[20px] font-semibold">
              Library
            </div>
          </div>
          <div className="py-[1%] bg-slate-50 items-center flex gap-2 px-2">
            <Link
              href={{
                pathname: "./cart",
                query: {
                  cart: JSON.stringify(cart),
                  // addressData: JSON.stringify(addressData),
                }, // Pass the cart as a query parameter
              }}
              onClick={() => setOpen(1)}
              className={`p-1 px-4 border rounded-xl text-[14px] font-medium ${
                open === 1 ? "bg-[#000]  text-[#ffffff]" : "text-[#000000] "
              }`}
            >
              Cart
            </Link>
            <Link
              href={{
                pathname: "./trackOrder",
                query: { orders: JSON.stringify(orders) }, // Pass the cart as a query parameter
              }}
              // href="/main/library/trackOrder"
              onClick={() => (setOpen(2), fetchOrders())}
              className={`p-1 px-4 border rounded-xl text-[14px] font-medium ${
                open === 2 ? "bg-[#000]  text-[#ffffff]" : "text-[#000000] "
              }`}
            >
              Track Order
            </Link>
            <Link
              href="./Subscription"
              onClick={() => (setOpen(3), fetchSubscriptions())}
              className={`p-1 px-4 border rounded-xl text-[14px] font-medium ${
                open === 3 ? "bg-[#000]  text-[#ffffff]" : "text-[#000000] "
              }`}
            >
              Subscription
            </Link>
          </div>
          <div
            style={{ height: "calc(100% - 50px)" }}
            className="bg-white space-y-2 pn:max-sm:w-full w-[400px]  min-w-[25%] overflow-y-auto dark:bg-[#ffffff]"
          >
            {open === 1 ? (
              <MemorizedCart
                cart={cart}
                addressData={addressData}
                phone={phone}
              />
            ) : open === 2 ? (
              <MemorizedTrackorder orders={orders} />
            ) : open === 3 ? (
              <MemorizedSubscription subscriptions={subscriptions} />
            ) : null}
          </div>
        </div>
        <div className="w-full pn:max-sm:h-auto bg-gray-50 pn:max-sm:overflow-y-auto pn:max-sm:mb-14 no-scrollbar dark:bg-[#1b2431] ">
          <div
            className={`${
              path === "/main/community" ? "pn:max-sm:bg-red-700" : ""
            } flex flex-col h-full dark:bg-[#1b2431] `}
          >
            <div
              className={` dark:bg-[#1b2431] max-w-full h-full w-full  no-scrollbar pn:max-sm:hidden ${
                path === "/dashboard" ? "h-full" : "sm:overflow-y-auto"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibrayLayout;
