import { useRef, useState } from "react";

export default function VideoStream() {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const skipStream = async () => {
    stopStream(); // Stop the current stream first
    startStream(); // Restart the stream
  };

  const stopStream = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Video Stream</h1>
      <div className="w-80 h-60 border border-gray-300 rounded mb-6">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        ></video>
      </div>
      <div className="flex gap-4">
        <button
          onClick={startStream}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          disabled={streaming}
        >
          Start
        </button>
        <button
          onClick={skipStream}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={!streaming}
        >
          Skip
        </button>
        <button
          onClick={stopStream}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          disabled={!streaming}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
