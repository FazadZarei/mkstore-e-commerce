"use client";

import React from "react";
import Marquee from "react-fast-marquee";

const TopSlider = () => {
  const messages = [
    "FREE UK SHIPPING ON ORDERS OVER £150",
    "SUPERWEIGHT RESTOCK OUT NOW",
    "ORDER BEFORE 2PM FOR NEXT DAY UK DELIVERY",
    "DOWNLOAD THE MKI APP",
    "FREE UK SHIPPING ON ORDERS OVER £150",
  ];

  const MessageComponent = ({ message }) => {
    return <p className="text-xs text-white bg-black mx-36 py-2">{message}</p>;
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <Marquee autoFill={true} className="bg-black gap-32 ">
        {messages.map((message, idx) => (
          <MessageComponent key={message + idx} message={message} />
        ))}
      </Marquee>
    </div>
  );
};

export default TopSlider;
