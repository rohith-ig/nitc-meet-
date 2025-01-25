"use client";

import React from 'react'

const page = () => {
  return (
    <div className='font-productsans'>
      <div className="bg-cover bg-center h-screen w-full flex flex-col items-center" style={{ backgroundImage: 'url(/gradient_login.png)' }}>
        <div className=' w-[97%] h-[80px] flex flex-row justify-between'>
          <div className=' text-[42px] ml-2 mt-2'>NITCMeet.</div>
          
          <div className="flex flex-row gap-6 mr-6 mt-6 text-[24px]">
          <a href="#contact" className="hover:underline cursor-pointer">9/11</a>
          <a href="#about" className="hover:underline cursor-pointer">About</a>
    
  </div>


        </div>
        <div className=' w-[97%] h-full flex flex-row justify-between'>
            <div className=' w-[40%] h-[80%] m-[5%] rounded-[20px]' style={{ backgroundImage: 'url(/person.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>

            <div className=' w-[30%] h-[60%] m-[12.5%] flex flex-col items-center'>
                <div className='text-[64px]'>NITCMeet.</div>
                <div className='m-4'>Login with your
                NITC ID to continue</div>
                <a href='#' className='bg-[#0000007b] w-[192px] h-[56px] rounded-[15px] m-4 backdrop-blur-md shadow-lg shadow-black text-center items-center flex justify-center hover:bg-white hover:text-[#111317] transition-colors duration-300 ease-in-out'>Login with Google</a>
            </div>
        </div>


      </div>
    </div>
  )
}

export default page
