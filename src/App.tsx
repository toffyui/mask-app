import { useRef } from "react";
import "./App.css";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/types";
import { draw } from "./mask";

function App() {
  const webcam = useRef<Webcam>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const useFaceDetect = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
    detect(model);
  };

  const detect = async (model: MediaPipeFaceMesh) => {
    if (!webcam.current || !canvas.current) return;
    const webcamCurrent = webcam.current as any;
    const video = webcamCurrent.video;
    const videoWidth = webcamCurrent.video.videoWidth;
    const videoHeight = webcamCurrent.video.videoHeight;
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    const predictions = await model.estimateFaces({
      input: video,
    });
    const ctx = canvas.current.getContext("2d") as CanvasRenderingContext2D;
    requestAnimationFrame(() => {
      draw(predictions, ctx, videoWidth, videoHeight);
    });
    detect(model);
  };

  useFaceDetect();

  return (
    <div className="App">
      <header className="header">
        <div className="title">face mask App</div>
      </header>
      <Webcam
        audio={false}
        ref={webcam}
        style={{
          position: "absolute",
          margin: "auto",
          textAlign: "center",
          top: 100,
          left: 0,
          right: 0,
          zIndex: 9,
        }}
      />
      <canvas
        ref={canvas}
        style={{
          position: "absolute",
          margin: "auto",
          textAlign: "center",
          top: 100,
          left: 0,
          right: 0,
          zIndex: 9,
        }}
      />
    </div>
  );
}

export default App;
