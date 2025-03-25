"use client";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

const faqs = [
  {
    question: "What is Grovyo?",
    answer:
      "Grovyo is India's first peer-to-peer social commerce platform where creators, businesses, and individuals can build communities, sell products, and monetize content in multiple ways.",
  },
  {
    question: "What is this platform?",
    answer:
      "It's a unified ecosystem where you can learn new skills, earn revenue, monetize your content, and create engaging communities.",
  },
  {
    question: "Can I create my own store?",
    answer:
      "Yes! Our platform includes easy-to-use e-commerce features that let you set up and manage your online store effortlessly.",
  },
  {
    question: "How can I earn money on Grovyo?",
    answer:
      "You can earn by: Running ads on your community , Selling paid topics , Selling products through your store.",
  },
  {
    question: "How do I create my own ProSite?",
    answer:
      "With Grovyo's ProSite feature, you can build your own personal website in minutes to showcase your brand, sell products, and grow your online presence—all for free!",
  },
  {
    question: "What are paid topics, and how do they work?",
    answer:
      "Paid topics let you sell exclusive content in the form of posts, chats, events, or discussions within your community. You decide the price and who gets access!",
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-10 md:py-10 flex flex-col items-center justify-center bg-[#0d0d0d] select-none">
      {/* FAQ Header */}
      <div className="space-y-6 text-center">
        <div className="w-full flex items-center justify-center"></div>
        <h2 className="text-white text-xl md:text-4xl font-extrabold ">
          Frequently Asked Questions
        </h2>
        <h2 className="text-[#ddd] text- font-normal leading-relaxed">
          Some answers to some frequently asked questions.
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="w-full max-w-[90%] md:max-w-[50%] mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border px-4 rounded-2xl shadow-sm border-[#171717] bg-[#181818]"
          >
            <button
              className="w-full flex justify-between items-center py-4 text-left text-sm md:text-base font-semibold text-[#fff]"
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
            >
              {faq.question}
              <IoIosAdd
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
                aria-label="Toggle FAQ answer"
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-96 opacity-100" // Increased max-height for longer answers
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-[#ddd] text-sm md:text-base pb-4">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
