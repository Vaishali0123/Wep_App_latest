import React from "react";
// import SupportHeader from "../components/SupportHeader";
const page = () => {
  return (
    <>
      {/* <SupportHeader/> */}
      <div className="flex justify-center items-center select-none px-4 md:px-0 bg-white">
        <div className="grid pt-16 grid-cols-1 w-[85%]   text-black">
          <h1 className="text-3xl font-bold py-5 -ml-[3%] text-black flex justify-center underline">
            Cancellation & Refund Policy
          </h1>
          <div className="text-sm font-thin pp:text-[18px] ">
            At Grovyo, we understand that circumstances may arise where you need
            to cancel an order. Our cancellation policy is designed to ensure a
            fair and transparent process for both our customers and our
            business. By placing an order on our web application &quot;Web
            App&quot; or mobile application &quot;Mobile App&quot;, you agree to
            comply with the following cancellation terms:
          </div>
          <h1 className="text-2xl font-semibold py-4 sm:py-5 text-black">
            Order Cancellation
          </h1>
          <div className="text-[15px] pp:text-[18px] ">
            Cancellation Window: You may request to cancel an order within 12
            hours from the time of order placement. After this timeframe, we
            cannot guarantee that cancellation requests will be accommodated.
          </div>
          <div className="text-[15px] pp:text-[18px] ">
            No. Of days taken to process the refund to customer account is 5-7
            working days.
          </div>
          <div className="text-[15px] pp:text-[18px] ">
            Cancellation Process: To cancel an order, please contact our
            customer support team at grovyoventures@gmail.com. Please provide
            your order details and reasons for cancellation.
          </div>
          <div className="text-[15px] pp:text-[18px] ">
            Order Status: Orders that have already been processed and shipped
            cannot be canceled. Please refer to our Shipping Policy for further
            information.
          </div>
          <h1 className="text-2xl font-semibold py-4 sm:py-5 text-black">
            Refund Policy
          </h1>
          <div className="text-[15px] pp:text-[18px] ">
            At Grovyo, we are committed to providing high-quality products and
            services. Our refund policy outlines the terms and conditions for
            requesting a refund for orders made through our Web App or Mobile
            App. Please read this policy carefully before making a purchase:
          </div>
          <h1 className="text-2xl font-semibold py-4 sm:py-5 text-black">
            Eligibility for Refund
          </h1>
          <div className="text-[15px] pp:text-[18px] ">
            Product Condition: Refunds are only available for products that are
            damaged, defective, or significantly different from the product
            description on our platform.
          </div>
          <div className="text-[15px] pp:text-[18px] ">
            Refund Request: To request a refund, please contact our customer
            support team within 3 days of receiving the product. You will need
            to provide details of the issue, including clear photos of the
            product, if applicable.
          </div>
          <div className="text-[15px] pp:text-[18px] ">
            Refund Evaluation: All refund requests are subject to evaluation by
            our team. We reserve the right to determine the eligibility of the
            product for a refund based on the provided information and evidence.
          </div>
          <h1 className="text-2xl font-semibold py-4 sm:py-5 text-black">
            Refund Process
          </h1>
          <div className="text-[15px] pp:text-[18px] ">
            Refund Methods: Approved refunds will be processed using the
            original payment method or via store credit, as determined by our
            team.
          </div>
          <div className="text-[15px] pp:text-[18px] ">
            {/* Refund Timing: Refunds may take 5 business days to process. The
						timing of the refund may vary depending on factors such as payment
						method and financial institutions. */}
            Refund Processing Time: Refunds will be processed within 4 business
            days after the successful return of the product.
          </div>
          <h1 className="text-2xl font-semibold py-4 sm:py-5 text-black">
            Non-Refundable Items
          </h1>
          <div className="text-[15px] pp:text-[18px] ">
            Digital Products: Digital products, subscriptions, and downloadable
            content are non-refundable once the purchase is completed.
          </div>
          <div className="text-[15px] pp:text-[18px] ">
            Customized or Personalized Items: Items that have been customized or
            personalized according to your specifications are non-refundable.
          </div>
          <h1 className="text-2xl font-semibold py-4 sm:py-5 text-black">
            Contact Us
          </h1>
          <div className="text-[15px] pp:text-[18px] ">
            If you have any questions about our Cancellation and Refund Policy
            or need assistance with an order, please contact our customer
            support team at grovyoventures@gmail.com. We are here to assist you
            and provide the best possible experience.
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
