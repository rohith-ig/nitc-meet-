"use client";
import { useSession } from "next-auth/react";
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


import React, { act, useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvZ2I3NeTQIVR1rfBCXKJfvw_h7om0CSo",
  authDomain: "nitcmeet-e3541.firebaseapp.com",
  projectId: "nitcmeet-e3541",
  storageBucket: "nitcmeet-e3541.firebasestorage.app",
  messagingSenderId: "197061917705",
  appId: "1:197061917705:web:239ad34cbda69a4f498cd8",
};
const ReloadButton = () => {
  window.location.href = window.location.href;
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};



const page = () => {
  const { data: session } = useSession();
  let userID = 1234;
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

//rohithinte avaratham
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [pc, setpc] = useState(null);
  const [callId, setCallId] = useState("");
  const [dc,setdc] = useState(null);
  const [rec,setrec] = useState("initial");
  const [hh,sethh] = useState("");
  const [active,setactive] = useState(false);
  const [skipstate,setskip] = useState(false);


  const init = () => {
    if (typeof window !== "undefined") {
      const pc = new RTCPeerConnection(servers);
      setpc(pc);
      setRemoteStream(new MediaStream());
      const dataChannel = pc.createDataChannel("chat");
      dataChannel.onopen = () => console.log("Data channel is open!");
      dataChannel.onclose = () => console.log("Data channel is closed.");
      setdc(dataChannel);
      pc.ondatachannel = (event) => {
        const incomingDataChannel = event.channel;
        console.log("Data channel received!");
        setdc(incomingDataChannel); // Update state with the received data channel

        // Handle message from incoming data channel
        incomingDataChannel.onmessage = async (event) => {
          if (event.data === "dc1234x") {
            setRemoteStream(null);
            alert("Stranger Disconnected!");
            setTimeout(() => {
              ReloadButton();
            }, 1500);
          }
          setrec((prevrec) => prevrec + "Stranger: " + event.data + "\n\n");
          console.log("Message received from remote peer:", event.data);
        };
      };

      // Handle messages on the created data channel
      dataChannel.onmessage = (event) => { 
        console.log("Message received:", event.data);
        setrec((prevrec) => prevrec + "Stranger: " + event.data + "\n\n");
      }
    }
  }
  useEffect(() => {
    init();
    setactive(true);
  }, []);
  const refresh = async () => {
    init();
    startWebcam();
    call();
    setskip(0);}
  useEffect(()=>{
    if (skipstate) {
      refresh();
    }
  },[skipstate]);


  useEffect(()=> {
    if (active) startWebcam();
    console.log("toggle")
  }, [active]);


  const startWebcam = async () => {
    if (!navigator.mediaDevices || !pc) {
      console.error("Webcam or pc is not supported in this environment.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    
    // Mute the audio track to prevent feedback
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = true; // Disables the audio track
    }
    
    setLocalStream(stream);

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.muted = true;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  };
  const answerBut = async (callIdx) => {
    const callDoc = doc(db, "calls", callIdx);

    // Reference to the subcollections
    const answerCandidatesCollection = collection(callDoc, "answerCandidates");
    const offerCandidatesCollection = collection(callDoc, "offerCandidates");
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(answerCandidatesCollection, event.candidate.toJSON());
      }
    };

    const callSnapshot = await getDoc(callDoc);
    if (!callSnapshot.exists()) {
      console.error("Call document does not exist!");
      return;
    }

    const callData = callSnapshot.data(); // Correctly define callData here
    console.log("Call Data:", callData);

    if (callData?.offer) {
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await setDoc(callDoc, { ...callData, answer }); // Preserve existing callData
    } else {
      console.error("No offer found in the call document.");
      return;
    }

    onSnapshot(offerCandidatesCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidateData = change.doc.data();
          const candidate = new RTCIceCandidate(candidateData);
          pc.addIceCandidate(candidate);
        }
      });
    });
    pc.ondatachannel = (event) => {
      const dataChannel = event.channel; // Accept the incoming Data Channel
      console.log(event.data);
    };
  };

  const hangup = () => {
    dc.send("dc1234x");
    ReloadButton();
  }

  const call = async () => {
    if (!pc) return;
    let flag = 0;
    const waitroom = doc(collection(db,"waitroom"));
    const waitref = collection(db, "waitroom");
    const q = query(waitref);
    await getDocs(q).then(async (querySnapshot) => {
      console.log(querySnapshot.size); 
      const length = querySnapshot.size; 
      if (length && length != 0) {
        console.log("Other User Found with ID:", querySnapshot.docs[0].data().callId);
        const otherUser = querySnapshot.docs[0].data().userID;
        console.log("Other User ID:", otherUser);
        await answerBut(querySnapshot.docs[0].data().callId);
        const docref = doc(db, "waitroom", querySnapshot.docs[0].id);
        await deleteDoc(docref);
        console.log("found docs");
        querySnapshot.forEach(doc => {console.log(doc.id,"=>",doc.data)});
        flag = 1;
      } 
    }).catch((error) => {
      console.error("Error getting documents: ", error);
    });
    console.log("flag",flag); 
    if (flag) return;
    const callDoc = doc(collection(db, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");
    await setDoc(waitroom,{callId:callDoc.id,userID:userID,token:""});
    setCallId(callDoc.id);
    console.log("creating call with id: ", callDoc.id);
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(offerCandidates, event.candidate.toJSON());
      }
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (data?.answer && !pc.currentRemoteDescription) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };
  const ht = (e) => {
    sethh(e.target.value)
  }
  const sendidk = () => {
    document.getElementById("textbox").value = ""
    console.log("sending msg",dc)
    dc.send(hh);
    setrec(rec + "You:" + hh + "\n\n")
    sethh("");
  }























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
              <button className="w-[140px] h-[30px] mr-2 rounded-full bg-[#E00004] text-[18px] text-center justify-center flex items-center hover:bg-[#e00004c1]">
                REPORT
              </button>
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
            <video className='videos w-full' ref={remoteVideoRef} autoPlay playsInline  />
            <div className="bg-red-600 w-[232px]  h-[128px] absolute right-[12px] bottom-[12px] rounded-[10px] ring-2 ring-[#00E09A]">
              <video className='videos' ref={localVideoRef} autoPlay playsInline  />
            </div>
          </div>
          <div className="w-[97%] h-[20%] mt-[4px] rounded-[15px] flex flex-row">
          <div className="w-1/2 flex flex-col items-center">
  {/* First row with START, STOP, SKIP buttons */}
  <div className="flex flex-row justify-between mt-3 items-center mb-2">
    <button
      className="bg-[#00E09A] w-[158px] h-[35px] m-2 text-[20px] rounded-full text-center flex items-center justify-center hover:bg-[#00e099b5]"
      onClick={call}
    >
      START
    </button>
    <button
      className="bg-[#E00004] w-[158px] h-[35px] m-2 text-[20px] rounded-full text-center flex items-center justify-center hover:bg-[#e00004b9]"
      onClick={hangup}  
    >
      STOP
    </button>
    <button
      onClick={sendidk}
      className="bg-[#00C9BD] w-[158px] h-[35px] m-2 text-[20px] rounded-full text-center flex items-center justify-center hover:bg-[#00c9bcb6]"
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
              className={`rounded-[5px] h-full w-1/2 ${
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
              className={`rounded-[5px] h-full w-1/2 ${
                selected === "Advice"
                  ? "bg-[#212528] text-[#00E09A]"
                  : "bg-[#191B1F] text-gray-400"
              }`}
              onClick={() => setSelected("Advice")}
            >
              Advice
            </button>

            
          </div>
                
          <div className="absolute overflow-scroll overflow-x-hidden top-[90px] w-[96%] h-[75%] pr-[50%] border-2 border-white">{rec}</div>
          
          <div className="absolute text-[#9ca3af] bottom-[100px] h-[35px] m-2  w-[96%] flex justify-between">

            {selected === "Advice" && (
              <div className="w-[100%] flex flex-row justify-center">
                  <button className="rounded-[5px] h-full w-[30%] mx-2 bg-[#212528] hover:bg-[#00E09A] hover:text-[#191B1F] active:bg-[#2fb88dda]">
                Rizz
              </button>
              <button className="rounded-[5px] h-full w-[30%] mx-2 bg-[#212528] hover:bg-[#00E09A] hover:text-[#191B1F] active:bg-[#2fb88dda]">
                BrainRot
              </button>
              <button className="rounded-[5px] h-full w-[30%] mx-2 bg-[#212528] hover:bg-[#00E09A] hover:text-[#191B1F] active:bg-[#2fb88dda]">
                Info
              </button>

              </div>
          
          )}
              
          </div>
          <input onChange={ht} id="textbox" className="absolute bg-[#191B1F] w-[96%] h-[82px] rounded-[10px] bottom-3 ring-1 p-2 ring-white focus:outline-none"></input>
        </div>
      </div>
    </div>
  );
};

export default page;
