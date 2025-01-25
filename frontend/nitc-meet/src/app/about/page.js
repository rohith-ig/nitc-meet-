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
            <a href="/hmm" className="hover:underline cursor-pointer">
              9/11
            </a>
            <a href="/about" className="hover:underline cursor-pointer">
              About
            </a>
          </div>
        </div>

        <div className="text-center">
            <h1 className="text-[64px] font-productsans">About Us 🎉</h1>
            <h2 className="text-[32px] m-8">Welcome to Chat-chaos HQ!</h2>
            <p className="m-2 text-[18px]">We’re the masterminds behind this wild ride where you can:</p>
            <ul className="m-2">
                <li>💬 Chat with REAL humans (yes, actual people exist here!)</li>
                <li>🤖 Rizz it up with an AI that flirts like it’s in a rom-com.</li>
                <li>🧠 Brainrot your way through nonsense with chaotic AI chats.</li>
                <li>📚 Actually learn useful stuff (if that’s your vibe).</li>
            </ul>

            <h2 className="text-[32px] m-8">Meet the Team 🧑‍💻</h2>
            <ul className="m-2">
                <li>Adidev (Front-End Whiz):Makes the site pretty. If it’s broken, it’s "modern art." 🎨</li>
                <li>Rohith & Devadath (Backend Bros): The silent heroes making sure your chats don’t disappear into the void. 🛠️</li>
                <li>Omar (AI Wizard): The guy behind the AI that can Skibidi rizz you up or make you question life. 🚽🎶</li>
            </ul>

            <h2 className="text-[32px] m-8">Why We’re Here 💡</h2>
            <p className="">Because life is boring without chaos. Talk to someone new! Maybe it’s your soulmate… or someone who thinks Skibidi Toilets are high art. Either way, it’s better than scrolling aimlessly.</p>
        </div>
      </div>
    </div>
  );
};

export default page;
