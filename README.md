# codevideo-frontend

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/codevideo/codevideo-frontend/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/codevideo/codevideo-frontend/tree/main)

<img src="https://img.shields.io/npm/v/@fullstackcraftllc/codevideo-frontend"/>

The frontend engine to create videos on codevideo.io

**_This package is about as unstable as you can get. Consider it even below alpha status. It is brand new and under considerable development._**

## GitHub Pages Example

View a React example of `codeToVideo` in action [on the example site](https://codevideo.github.io/codevideo-frontend).

## Get Started

Install this package:

```shell
npm install --save @fullstackcraftllc/codevideo-frontend
```

This will also install the required dependency @fullstackcraftllc/codevideo-core

Given the following HTML / JSX markup:

```html
<canvas id="canvas" />
```

Import and call `codeToVideo`:

```ts
import { codeToVideo, MimicTypos } from "@fullstackcraftllc/codevideo-frontend";

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
```
