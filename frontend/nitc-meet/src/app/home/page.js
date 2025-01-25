
"use client";

import React from 'react';

const page = () => {
  return (
    <div className='font-productsans'>
      <div className="bg-cover bg-center h-screen w-full" style={{ backgroundImage: 'url(/Gradient.png)' }}>
        <div className="flex flex-col justify-center items-center h-full">
          {/* Title */}
          <div className="text-[128px] font-productsans text-white mb-4">
            NITCMeet.
          </div>

          {/* Sign-In Button */}
          <button className="bg-[#ffffff] text-[#111317] px-6 py-2 rounded-md mb-[60px] hover:bg-[#111317] hover:text-[#00E09A] transition duration-300">
            Sign In
          </button>

          {/* Paragraph */}
          <p className="text-white text-center text-lg w-[1280px]">
          NITCMeet is like Omegle, but exclusively for NITC students! 🎉 Meet new people, chat randomly, and make cool connections ✨ – all exclusively with your NITC fam! 😎👋 Just don't be surprised if someone's a little sus... 👀😂
            </p>
        </div>
      </div>
    </div>
  );
};

export default page;