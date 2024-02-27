import React, { useEffect, useState } from "react";
import { codeToVideo } from "./src/codeToVideo";
import { MimicTypos } from "./src/enums/MimicTypos";

function App() {
  const [loading, setLoading] = useState(false);
  // async wrapper for codeToVideo with all needed setup
  const createVideo = async () => {
    setLoading(true);
    // define video parameters
    const fps = 60;
    const mimeType = "video/webm";
    const codec = "codecs=vp9";

    // get canvas and setup media recorder
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const { videoUrl, error } = await codeToVideo(
      canvas,
      fps,
      mimeType,
      codec,
      1920,
      1080,
      "print('hello world!')",
      "python",
      ["red", "blue"],
      MimicTypos.NEVER
    );
    if (error) {
      // handle error
      console.error(error);
    }
    // No error, do something with videoUrl, for example, create video element, set its source, and append it to container
    // Create the video element
    const video = document.createElement("video");

    // Set the video's src attribute to the URL of a video file
    video.src = videoUrl;

    // Set other useful attributes
    video.id = "video";
    video.height = 960;
    video.width = 540;
    video.controls = true;
    video.autoplay = true;

    // Append the video element to the container div
    const container = document.getElementById("container");
    if (container) {
      container.appendChild(video);
    }
    setLoading(false);
  };

  // on mount
  useEffect(() => {
    createVideo();
  }, []);

  return (
    <>
    {loading && <div>Running 'Hello World' <code>codeToVideo</code> example...</div>}
    <div id="container">
      <canvas id="canvas" style={{display: 'none'}}/>
    </div>
    </>
  );
}

export default App;
