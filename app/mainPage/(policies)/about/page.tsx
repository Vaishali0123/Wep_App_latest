import React from "react";

const Page = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full select-none px-4 sm:px-0 bg-gradient-to-r from-black via-[#111827] to-black">
        <div className="grid grid-cols-1 w-full sm:w-[85%] text-white rounded-lg shadow-md p-6 sm:py-5">
          <h1 className="text-3xl font-bold -ml-[3%] text-white py-5 flex justify-center underline">
            About Us
          </h1>
          <p className="text-sm font-thin leading-relaxed text-gray-300">
            Welcome to Grovyo, your ultimate platform for connecting, sharing,
            and discovering. At Grovyo, we&apos;re passionate about creating a
            vibrant community where people from all walks of life can come
            together to express themselves, engage with others, and explore a
            world of endless possibilities.
          </p>

          <h2 className="text-xl font-bold text-white py-4 underline">
            Our Vision
          </h2>
          <p className="text-sm font-thin leading-relaxed text-gray-300">
            Our vision is to provide a seamless and enjoyable experience for
            users to connect and share moments that matter. Whether you&apos;re
            an artist showcasing your creativity, an explorer sharing your
            travel adventures, or simply looking to connect with like-minded
            individuals, Grovyo is designed to be the place where your stories
            come to life.
          </p>

          <h2 className="text-xl font-bold  underline py-4">What We Offer</h2>
          <div className="space-y-3 text-gray-300 font-thin text-sm ">
            <div className="py-2">
              <span className="font-bold">Community:</span> Grovyo is a place
              where you can connect with friends, family, and new acquaintances.
              Share your experiences, exchange ideas, and build meaningful
              relationships in a safe and respectful environment.
            </div>
            <div className="py-2">
              <span className="font-bold  ">Creativity:</span> Express yourself
              through photos, videos, and other multimedia content. Our platform
              encourages artistic expression and allows you to showcase your
              unique perspective to the world.
            </div>
            <div className="py-2">
              <span className="font-bold  ">Discovery:</span> Discover new
              horizons and immerse yourself in a diverse array of interests.
              From art and culture to travel and lifestyle, Grovyo is your
              gateway to exploring a myriad of passions.
            </div>
            <div className="py-2">
              <span className="font-bold ">Custom Experience:</span> Our
              platform is designed to adapt to your preferences. Personalize
              your feed, discover content tailored to your interests, and engage
              with the content that resonates with you.
            </div>
          </div>

          <h2 className="text-xl font-bold underline  py-4">Our Commitment</h2>
          <p className="text-sm font-thin leading-relaxed text-gray-300">
            We are dedicated to providing a platform that fosters authenticity,
            respect, and positive interactions. Our commitment to your privacy
            and security is unwavering, and we strive to ensure that your
            experience on Grovyo remains enjoyable and fulfilling.
          </p>

          <h2 className="text-xl font-bold  underline py-4">Get in Touch</h2>
          <p className="text-sm font-thin leading-relaxed text-gray-300">
            We&apos;re excited to have you join us on this journey of connection
            and discovery. If you have any questions, suggestions, or feedback,
            please don&apos;t hesitate to reach out to us at{" "}
            <a
              href="mailto:grovyoventures@gmail.com"
              className="text-blue-500 underline"
            >
              grovyoventures@gmail.com
            </a>
            . Your input helps us continually improve and enhance the Grovyo
            experience.
          </p>
          <p className="text-sm font-bold leading-relaxed text-gray-300 mt-4">
            Thank you for being a part of the Grovyo community!
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
