"use client";

import React, { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const firestore = getFirestore(app);

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPeerConnection(new RTCPeerConnection(servers));
      setRemoteStream(new window.MediaStream()); // Only initialize MediaStream on the client
    }
  }, []);

  const startWebcam = async () => {
    if (!navigator.mediaDevices || !peerConnection) {
      console.error("Webcam or PeerConnection is not supported in this environment.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setLocalStream(stream);

    // Add local tracks to the peer connection
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });

    // Listen for remote tracks and add them to the remote stream
    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    // Bind local and remote streams to the respective video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  };

  return (
    <div>
      <h1>WebRTC Demo</h1>

      <section>
        <h2>1. Start your Webcam</h2>
        <div>
          <div>
            <h3>Local Stream</h3>
            <video ref={localVideoRef} autoPlay playsInline style={{ width: "300px" }} />
          </div>
          <div>
            <h3>Remote Stream</h3>
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
          </div>
        </div>
        <button onClick={startWebcam}>Start Webcam</button>
      </section>

      <section>
        <h2>2. Create a Call</h2>
        <button>Create Call (offer)</button>
      </section>

      <section>
        <h2>3. Join a Call</h2>
        <input type="text" placeholder="Enter Call ID" />
        <button>Answer</button>
      </section>

      <section>
        <h2>4. Hang Up</h2>
        <button>Hang Up</button>
      </section>
    </div>
  );
}
