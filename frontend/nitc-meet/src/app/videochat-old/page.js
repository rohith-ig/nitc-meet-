"use client";
import React from 'react'
import Webcam from 'react-webcam';


const videochat = () => {
  return (
    <div className='bg-[#16161E] w-[100%] h-[100vh] flex flex-col overflow-hidden font-mono'>
      {/* Header */}
      <div className='flex justify-center items-center h-20'>
        <div className="bg-[#5865F2] w-[98%] flex justify-between items-center gap-16 py-3 px-10 left-1/2 top-[20px], rounded-[10px]">
          <h1 className="text-white font-black text-lg">NITCsssMEET</h1>
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-white hover:underline">IDonno</a>
            <a href="#" className="text-white hover:underline">Omegle</a>
            <a href="#" className="text-white hover:underline">About</a>
            <img
              src="https://via.placeholder.com/32" // Replace with user avatar URL
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </nav>
        </div>
      </div>

        <div className='flex flex-row h-full m-[8px] mt-[0px]' >
          <div className='h-full w-[70%] flex flex-col m-[6px] rounded-[10px]'>
            <div className='flex-grow h-[80%] bg-[#2B2B3E] rounded-lg flex justify-center items-center'>
              
            </div>
            <div className='mt-4 h-[20%]  m-[0px] rounded-[10px] flex flex-row items-start p-2'>
              <div className='flex flex-row w-[40%] h-full'>
                <button className='w-full h-full mr-[10px] bg-[#1A1B26] ring-2 ring-green-600 text-white rounded-md flex justify-center items-center'>Start</button>
                <button className='w-full h-full mr-[10px] bg-[#1A1B26] ring-2 ring-red-600 text-white rounded-md flex justify-center items-center'>Stop</button>
                <button className='w-full h-full mr-[10px] bg-[#1A1B26] ring-2 ring-yellow-600 text-white rounded-md flex justify-center items-center'>Skip</button>
              </div>
              <div className='w-[60%] m-0 bg-[#1A1B26] h-full rounded-[10px] items-center flex flex-col'>
                <div className=' w-[97%] m-2 mb-0 rounded-[10px]  h-1/2 '></div>
                <input className='bg-[#313338] w-[97%] m-2 rounded-[10px] h-1/2 focus:outline-none focus:ring-0'/>
              </div>
              
             </div>
          </div>

          <div className='h-full w-[30%]  bg-[#1A1B26] m-[6px] rounded-[10px] flex flex-col justify-between'>
            <div className=' h-[85%] m-2 rounded-[10px]'>texts

            </div>

            <input className='bg-[#313338] h-[8%] m-2 rounded-[10px] focus:outline-none focus:ring-0'/>

            


          </div>
        </div>


              
    </div>
  )
}

export default videochat
