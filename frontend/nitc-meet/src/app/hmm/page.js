"use client";

import React from "react";

const page = () => {
  return (
    <div className="font-productsans overflow-scroll overflow-x-hidden">
      <div
        className="bg-cover bg-center h-screen w-full flex flex-col items-center"
        style={{ backgroundImage: "url(/gradient_login.png)" }}
      >
        <div className=" w-[97%] h-[80px] flex flex-row justify-between">
        <a href="/."className=" text-[42px] ml-2 mt-2">NITCMeet.</a>

          <div className="flex flex-row gap-6 mr-6 mt-6 text-[24px]">
            <a href="#contact" className="hover:underline cursor-pointer">
              9/11
            </a>
            <a href="#about" className="hover:underline cursor-pointer">
              About
            </a>
          </div>
        </div>

        <div className="ring-[5px] ring-[#00E09A] rounded-[20px]">
            <img src="/almaida.png"></img>
            
        </div>

        <div className="text-[28px] m-6">Al-Maida</div>
        <div className="text-[21px] m-6">Not affiliated with any terrorist groups.</div>
        
      </div>
    </div>
  );
};

export default page;
