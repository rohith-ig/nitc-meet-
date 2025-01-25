"use client";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaInfoCircle,
  FaSignOutAlt,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Webcam from "react-webcam";
import { IoSendSharp } from "react-icons/io5";
import { IoAirplane } from "react-icons/io5";


const page = () => {
  const [selected, setSelected] = useState("Chat");

  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);

  const handleStop = () => {
    setIsRunning(false); // Stop the stopwatch
    setTime(0); // Reset the timer to 0
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const [inputValue, setInputValue] = useState(""); // To store the input value
  const [tags, setTags] = useState([]); // To store the tags

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      // Add tag when enter is pressed
      setTags([...tags, inputValue.trim()]);
      setInputValue(""); // Clear input field
    }
  };

  const handleTagRemove = (tagToRemove) => {
    // Remove tag when 'x' is clicked
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const [isMuteActive, setIsMuteActive] = useState(false);
  const [isStopVideoActive, setIsStopVideoActive] = useState(false);

  // Toggle mute button state
  const handleMuteClick = () => {
    setIsMuteActive(!isMuteActive);
  };

  // Toggle stop video button state
  const handleStopVideoClick = () => {
    setIsStopVideoActive(!isStopVideoActive);
  };

  const [openPopup, setOpenPopup] = useState(false)

  
  const [responses, setResponses] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
    q7: 0,
    q8: 0,
    q9: 0,
    q10: 0,
  });

  const handleDiff = (e, question) => {
    setResponses({ ...responses, [question]: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Responses:', responses);
  };



  return (

    
    <div className="font-productsans font-bold">

{openPopup && (
  <div className="absolute inset-0 flex justify-center  items-center z-50">
    <div className=" p-4 h-[100%] w-[100%] bg-[#59cba70e] backdrop-blur-md flex flex-col items-center  justify-center">

      <div className="w-[80%] h-[90%] relative bg-[#111317] overflow-scroll overflow-x-hidden rounded-[20px] ring-1 ring-[#00E09A] box-border">
      <div className="bg-red-600 absolute   w-[20px] h-[20px] m-2 rounded-full flex text-center items-center justify-center top-[20px] left-[20px] cursor-pointer" onClick={() => setOpenPopup(false)} ><FaTimes  size={12}/></div>
      <div className="items-center relative text-[18px] justify-center text-center top-[10px]">Personality Finder</div>
      <form onSubmit={handleSubmit} className="flex flex-col  space-y-6">
        <div className="grid grid-cols-2 gap-3 m-5 p-[40px]">
          {[
            "On a scale from -5 to 5, how much do you believe that free speech should be limited to prevent harm to others?",
            "How much do you trust artificial intelligence to make ethical decisions?",
            "To what extent do you believe humans should pursue genetic engineering to enhance human capabilities?",
            "To what extent do you believe in 'cancel culture' as a form of accountability?",
            "On a scale from -5 to 5, how much do you think religious beliefs should influence laws and policies?",
            "How much do you value individual freedom over collective responsibility?",
            "To what extent do you think people should prioritize their career over personal relationships?",
            "How much would you support a law that requires everyone to donate 10% of their income to charity?",
            "On a scale from -5 to 5, how much do you believe it’s okay to harm one person to save many?",
            "To what extent do you believe people should be held accountable for past actions that were acceptable at the time but are now considered wrong?",
          ].map((question, index) => (
            <div key={index} className="flex flex-col w-1/2 h-[20vh] text-center justify-around ml-[25%]">
              <label htmlFor={`q${index + 1}`} className="text-[12px] font-mono font-thin">
                {question}
              </label>
              <input
                type="range"
                id={`q${index + 1}`}
                name={`q${index + 1}`}
                min="-5"
                max="5"
                value={responses[`q${index + 1}`]}
                onChange={(e) => handleDiff(e, `q${index + 1}`)}
                className="slider w-full"
              />
              <div className="text-center text-sm">Value: {responses[`q${index + 1}`]}</div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-[#00E09A] hover:bg-[#00e099ca] text-white py-2 px-4 rounded-lg self-center mb-4 "
        >
          Submit
        </button>
      </form>




      </div>
      
      <p className="text-xl text-black" onClick={() => setOpenPopup(false)}>PopupMessageHere</p>
    </div>
  </div>
)}


      <div className="bg-[#111317] w-full h-screen ">


        

      

        <div className="absolute w-[400px] h-[400px] bg-[#00E09A] left-[-5%] top-[80%] rounded-full filter blur-[128px] "></div>
        <div className="absolute w-[400px] h-[400px] bg-[#00E09A] left-[80%] top-[0%] rounded-full filter blur-[128px]"></div>
        <div className="absolute  h-full w-[80px] flex flex-col items-center justify-between py-6">
          {/* Grouped buttons for Home, About, and User in the middle */}
          <div className="flex flex-col items-center space-y-4 mt-11">
            {/* Home Button */}
            <a
              href="/.."
              className="text-white p-2 hover:bg-[#00E09A] rounded-full transition-colors duration-300 ease-in-out"
            >
              <FaHome size={24} />
            </a>

            {/* About Button */}
            <a
              href="/about"
              className="text-white p-2 hover:bg-[#00E09A] rounded-full transition-colors duration-300 ease-in-out"
            >
              <FaInfoCircle size={24} />
            </a>

            {/* User Button */}
            <a
              href="#"
              className="text-white p-2 hover:bg-[#00E09A] rounded-full transition-colors duration-300 ease-in-out" onClick={() => setOpenPopup(true)}>
              <FaUser size={24} />
            </a>
          </div>

          {/* Logout Button */}
          <a href="/hmm" className="text-white p-2 hover:bg-[#00E09A] rounded-full mt-auto transition-colors duration-300 ease-in-out">
            <IoAirplane size={24} />
          </a>
          <a href="#" className="text-white p-2 hover:bg-[#00E09A] rounded-full mt-auto transition-colors duration-300 ease-in-out">
            <FaSignOutAlt size={24} />
          </a>
        </div>
        <a href="/." className="absolute top-[2.6%] left-[85px] font-productsans font-bold text-[32px]">
          NITCMeet.
        </a>
        <div className="bg-gradient-to-tr from-[#111317c2] to-[#111317] absolute w-[71.5%] h-[90%] bottom-[0px] left-[80px] rounded-[20px] rounded-tr-none flex flex-col items-center">
          <div className=" w-[97%] h-[80px] flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <div className="w-[110px] h-[30px] mr-2 rounded-full bg-[#00E09A] text-[18px] text-center justify-center flex items-center">
                {formatTime(time)}
              </div>
              <div className="w-[140px] h-[30px] mr-2 rounded-full bg-[#E00004] text-[18px] text-center justify-center flex items-center">
                REPORT
              </div>
            </div>
            <div className="flex flex-row">

            <div className="w-[140px] h-[20px] mr-3 mt-2 text-[#191B1F] text-[14px] rounded-full bg-[#ffffff]  text-center justify-center flex items-center">
                Their Personality
              </div>


              <div className="font-productsans font-bold text-[26px]">
                Osama Bin Laden
              </div>
              </div>
          </div>
          <div className="relative bg-[#191B1F] w-[97%] h-[80%] mb-[4px] rounded-[15px]">
            VIDEO
            <div className="bg-red-600 w-[232px]  h-[128px] absolute right-[12px] bottom-[12px] rounded-[10px] ring-2 ring-[#00E09A]">
              <Webcam mirrored={true} />
            </div>
          </div>
          <div className="w-[97%] h-[20%] mt-[4px] rounded-[15px] flex flex-row">
          <div className="w-1/2 flex flex-col items-center">
  {/* First row with START, STOP, SKIP buttons */}
  <div className="flex flex-row justify-between mt-3 items-center mb-2">
    <button
      className="bg-[#00E09A] w-[158px] h-[35px] m-2 text-[20px] rounded-full text-center flex items-center justify-center"
      onClick={handleStart}
    >
      START
    </button>
    <button
      className="bg-[#E00004] w-[158px] h-[35px] m-2 text-[20px] rounded-full text-center flex items-center justify-center"
      onClick={handleStop}
    >
      STOP
    </button>
    <button
      className="bg-[#00C9BD] w-[158px] h-[35px] m-2 text-[20px] rounded-full text-center flex items-center justify-center"
    >
      SKIP
    </button>
  </div>

  {/* Second row with MUTE and STOP VIDEO buttons, taking up 50% width each */}
  <div className="flex flex-row w-full">
  <button
    className={` ring-1 ring-[#00E09A] w-1/2 h-[35px] m-2 mt-1 text-[20px] rounded-full text-center flex items-center justify-center ${isMuteActive ? 'bg-[#00E09A] text-[#191B1F]' : 'bg-[#191B1F] ring-1 ring-[#00E09A]'}`}
    onClick={handleMuteClick}
  >
    MUTE
  </button>
  <button
    className={` ring-1 ring-[#00E09A] w-1/2 h-[35px] m-2 mt-1 text-[20px] rounded-full text-center flex items-center justify-center ${isStopVideoActive ? 'bg-[#00E09A] text-[#191B1F]' : 'bg-[#191B1F] ring-1 ring-[#00E09A]'}`}
    onClick={handleStopVideoClick}
  >
    STOP VIDEO
  </button>
</div>
</div>
            <div className="bg-[#191B1F] w-1/2 m-2 rounded-[15px] flex flex-col items-center">
              <div className="w-[96%]  h-[100%] text-white"></div>

              {/* Display added tags */}
              <div className="w-[96%]   flex flex-wrap">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-[#00E09A] m-2 mt-0  text-black px-2 mb-[30px] rounded-full flex items-center justify-between text-[12px]"
                  >
                    {tag}
                    <button
                      className="m-2 text-red-500"
                      onClick={() => handleTagRemove(tag)}
                      aria-label="Remove tag"
                    >
                      <FaTimes size={8} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Input field */}
              <div className="relative h-full w-[97%] flex flex-row">
                <input
                  className="absolute bg-[#191B1F] p-2 w-[90%] right-[9.3%] h-[30px] bottom-3 mt-1 rounded-[10px] ring-1  ring-white focus:outline-none"
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
                {/* Send button */}
                <button
                  className="absolute right-0 bottom-1 bg-[#00E09A] text-white m-2 p-2 rounded-[5px] hover:bg-teal-600 focus:outline-none"
                  onClick={() => {
                    if (inputValue.trim() !== "") {
                      setTags([...tags, inputValue.trim()]);
                      setInputValue("");
                    }
                  }}
                  aria-label="Send"
                >
                  <IoSend size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#191B1F] rounded-[20px] rounded-tr-none absolute right-[0px] h-screen w-[23.8%] flex flex-col items-center">
          <div className="relative h-[41px] top-[32px] w-[96%] flex flex-row items-center">
            {/* Chat Button */}
            <button
              className={`rounded-[5px] h-full w-1/4 ${
                selected === "Chat"
                  ? "bg-[#212528] text-[#00E09A]"
                  : "bg-[#191B1F] text-gray-400"
              }`}
              onClick={() => setSelected("Chat")}
            >
              Chat
            </button>

            {/* Rizz Button */}
            <button
              className={`rounded-[5px] h-full w-1/4 ${
                selected === "Rizz"
                  ? "bg-[#212528] text-[#00E09A]"
                  : "bg-[#191B1F] text-gray-400"
              }`}
              onClick={() => setSelected("Rizz")}
            >
              Rizz
            </button>

            {/* Brainrot Button */}
            <button
              className={`rounded-[5px] h-full w-1/4 ${
                selected === "Brainrot"
                  ? "bg-[#212528] text-[#00E09A]"
                  : "bg-[#191B1F] text-gray-400"
              }`}
              onClick={() => setSelected("Brainrot")}
            >
              Brainrot
            </button>

            {/* Info Button */}
            <button
              className={`rounded-[5px] h-full w-1/4 ${
                selected === "Info"
                  ? "bg-[#212528] text-[#00E09A]"
                  : "bg-[#191B1F] text-gray-400"
              }`}
              onClick={() => setSelected("Info")}
            >
              Info
            </button>
          </div>

          <div className="bg-teal-300 w-[96%]">CHAT</div>
          <input className="absolute bg-[#191B1F] w-[96%] h-[82px] rounded-[10px] bottom-3 ring-1 p-2 ring-white focus:outline-none"></input>
        </div>
      </div>
    </div>
  );
};

export default page;
