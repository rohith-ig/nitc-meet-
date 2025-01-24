"use client";
import React from 'react'

const videochat = () => {
  return (
    <div className='bg-[#16161E] w-[100%] h-[100vh]'>
      {/* Header */}
      <header className="bg-blue-600 h-[60px] flex justify-between items-center px-5">
        <h1 className="text-white font-bold text-lg">NITCMEET</h1>
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
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Video Section */}
        <section className="flex-1 bg-black relative">
          {/* Main Video */}
          <div className="w-full h-full flex justify-center items-center">
            <video
              className="w-[90%] h-[70%] bg-gray-800"
              autoPlay
              muted
            ></video>
          </div>

          {/* Sub Video */}
          <div className="absolute bottom-5 right-5 w-[200px] h-[120px] bg-gray-800 border-2 border-white">
            <video className="w-full h-full" autoPlay muted></video>
          </div>

          {/* Report Button */}
          <button className="absolute bottom-5 left-5 bg-red-500 text-white px-4 py-2 rounded-md">
            REPORT
          </button>
        </section>

        {/* Chat Section */}
        <aside className="w-[25%] bg-gray-800 p-4 flex flex-col space-y-3">
          <div className="bg-blue-500 p-2 rounded-md h-10"></div>
          <div className="bg-blue-500 p-2 rounded-md h-10"></div>
          <div className="bg-blue-500 p-2 rounded-md h-10"></div>
          <div className="bg-gray-700 p-2 rounded-md h-10"></div>
          <div className="bg-gray-700 p-2 rounded-md h-10"></div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 h-[70px] flex justify-center items-center space-x-5">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">START</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">STOP</button>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-md">SKIP</button>
      </footer>
    </div>
  )
}

export default videochat
