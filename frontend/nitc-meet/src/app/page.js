"use client";

import React, { useEffect, useRef, useState } from "react";
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
import "./app.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvZ2I3NeTQIVR1rfBCXKJfvw_h7om0CSo",
  authDomain: "nitcmeet-e3541.firebaseapp.com",
  projectId: "nitcmeet-e3541",
  storageBucket: "nitcmeet-e3541.firebasestorage.app",
  messagingSenderId: "197061917705",
  appId: "1:197061917705:web:239ad34cbda69a4f498cd8",
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

let userID = Math.floor(Math.random() * 1000000);

export default function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [pc, setpc] = useState(null);
  const [callId, setCallId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pc = new RTCPeerConnection(servers);
      setpc(pc);
      setRemoteStream(new MediaStream());
    }
  }, []);

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
  };

  
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
    await setDoc(waitroom,{callId:callDoc.id,userID:userID});
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


  return (
    <div>
      <h1>WebRTC Demo</h1>

      <section className="">
        <h2>1. Start your Webcam</h2>
        <div>
          <div className="videos">
            <span>
            <h3>Local Stream</h3>
            <video className='videos' ref={localVideoRef} autoPlay playsInline style={{ width: "300px" }} />
            </span>
            <span>
            <h3>Remote Stream</h3>
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
            </span>
          </div>          
        </div>
        <button onClick={startWebcam}>Start Webcam</button>
      </section>

      <section>
        <h2>2. Create a Call</h2>
        <button onClick={call}>Create Call</button>
        <p>Call ID: {callId}</p>
      </section>

      <section>
        <h2>3. Join a Call</h2>
        <input
          type="text"
          placeholder="Enter Call ID"
          value={callId}
          onChange={(e) => setCallId(e.target.value)}
        />
        <button onClick={answerBut}>Answer Call</button>
      </section>
    </div>
  );
}
