"use client";
import React, {useState} from 'react'
import { FaHome, FaUser, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import Webcam from 'react-webcam';
import { IoSendSharp } from "react-icons/io5";


const page = () => {

    const [selected, setSelected] = useState("Chat");
        
  return (
    <div className='font-productsans font-bold'>
            <div className='bg-[#111317] w-full h-screen'>
                <div className='absolute w-[400px] h-[400px] bg-[#00E09A] left-[-5%] top-[80%] rounded-full filter blur-[128px] '></div>
                <div className='absolute w-[400px] h-[400px] bg-[#00E09A] left-[80%] top-[0%] rounded-full filter blur-[128px]'></div>
                <div className='absolute  h-full w-[100px] flex flex-col items-center justify-between py-6'>

                    {/* Grouped buttons for Home, About, and User in the middle */}
      <div className="flex flex-col items-center space-y-4">
        {/* Home Button */}
        <a href="/home" className="text-white p-2 hover:bg-[#00E09A] rounded-full transition-colors duration-300 ease-in-out">
          <FaHome size={24} />
        </a>

        {/* About Button */}
        <a href="/about" className="text-white p-2 hover:bg-[#00E09A] rounded-full transition-colors duration-300 ease-in-out">
          <FaInfoCircle size={24} />
        </a>

        {/* User Button */}
        <a href='#' className="text-white p-2 hover:bg-[#00E09A] rounded-full transition-colors duration-300 ease-in-out">
          <FaUser size={24} />
        </a>
      </div>

      {/* Logout Button */}
      <a href='#' className="text-white p-2 hover:bg-[#00E09A] rounded-full mt-auto transition-colors duration-300 ease-in-out">
        <FaSignOutAlt size={24} />
      </a>

                </div>
                <div className='absolute top-[10px] left-[100px] font-productsans font-bold text-[32px]'>NITCMeet</div>
                <div className='bg-gradient-to-tr from-[#111317c2] to-[#111317] absolute w-[70%] h-[90%] bottom-[0px] left-[100px] rounded-[20px] rounded-tr-none flex flex-col items-center'>
                    <div className=' w-[97%] h-[80px] flex flex-row justify-between items-center'>
                        <div className='flex flex-row'>
                            <div className='w-[110px] h-[30px] mr-2 rounded-full bg-[#00E09A] text-[18px] text-center justify-center flex items-center'>time</div>
                            <div className='w-[140px] h-[30px] mr-2 rounded-full bg-[#E00004] text-[18px] text-center justify-center flex items-center'>REPORT</div>
                        </div>
                        
                        <div className='font-productsans font-bold text-[26px]'>Osama Bin Laden</div>
                    </div>
                    <div className='relative bg-[#191B1F] w-[97%] h-[80%] mb-[4px] rounded-[15px]'>VIDEO
                        
                        <div className='bg-red-600 w-[232px]  h-[128px] absolute right-[12px] bottom-[12px] rounded-[10px] ring-2 ring-[#00E09A]'>
                            <Webcam mirrored={true}/>
                        </div>

                    </div>
                    <div className='w-[97%] h-[20%] mt-[4px] rounded-[15px] flex flex-row'>
                        <div className='w-1/2 flex flex-row justify-between items-center'>
                        <button className='bg-[#00E09A] w-[158px] h-[60px] m-2 text-[24px] rounded-full text-center flex items-center justify-center'>START</button>
                        <button className='bg-[#E00004] w-[158px] h-[60px] m-2 text-[24px] rounded-full text-center flex items-center justify-center'>STOP</button>
                        <button className='bg-[#00C9BD] w-[158px] h-[60px] m-2 text-[24px] rounded-full text-center flex items-center justify-center'>SKIP</button>
                        </div>
                        <div className='bg-[#191B1F] w-1/2 m-2 rounded-[15px] flex flex-col items-center'>
                            <div className=' w-[96%] mb-4 h-[40%]'>TAGS</div>
                            <input className='bg-[#191B1F] w-[96%] h-[35%] rounded-[10px] ring-1 p-2 ring-white focus:outline-none'></input>
                        </div>
                    </div>


                </div>
                <div className='bg-[#191B1F] rounded-[20px] rounded-tr-none absolute right-[0px] h-screen w-[23.5%] flex flex-col items-center'>
                    <div className='relative h-[41px] top-[32px] w-[96%] flex flex-row items-center'>
                    <button
        className={`rounded-[5px] h-full w-1/2 ${
          selected === "Chat" ? "bg-[#212528] text-[#00E09A]" : "bg-[#191B1F] text-gray-400"
        }`}
        onClick={() => setSelected("Chat")}
      >
        Chat
      </button>

      {/* Rizz Button */}
      <button
        className={`rounded-[5px] h-full w-1/2 ${
          selected === "Rizz" ? "bg-[#212528] text-[#00E09A]" : "bg-[#191B1F] text-gray-400"
        }`}
        onClick={() => setSelected("Rizz")}
      >
        Rizz
      </button>
                    </div>

                    <div className='bg-teal-300 w-[96%]'>CHAT</div>
                    <input className='absolute bg-[#191B1F] w-[96%] h-[82px] rounded-[10px] bottom-3 ring-1 p-2 ring-white focus:outline-none'></input>

                </div>
            </div>
    </div>
  )
}



export default page
