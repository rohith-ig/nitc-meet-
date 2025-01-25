import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const page = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io();

    // Initialize peer connection with STUN server
    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // Public STUN server
      ],
    });

    // 1. Get the local stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) =>
          peerConnection.current.addTrack(track, stream)
        );
      });

    // 2. Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit('signal', { candidate: event.candidate });
      }
    };

    // 3. Handle remote stream
    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // 4. Signal handling
    socket.current.on('signal', async (data) => {
      if (data.offer) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.current.emit('signal', { answer });
      } else if (data.answer) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      } else if (data.candidate) {
        await peerConnection.current.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    });

    // 5. Create and send an offer
    peerConnection.current.onnegotiationneeded = async () => {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.current.emit('signal', { offer });
    };

    return () => {
      // Cleanup socket connection when component is unmounted
      socket.current.disconnect();
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '20px' }}>WebRTC Video Chat</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          style={{ width: '45%', margin: '5px', backgroundColor: 'gray' }}
        ></video>
        <video
          ref={remoteVideoRef}
          autoPlay
          style={{ width: '45%', margin: '5px', backgroundColor: 'gray' }}
        ></video>
      </div>
    </div>
  );
};


export default page;
