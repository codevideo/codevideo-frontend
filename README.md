# codevideo-frontend

<img src="https://img.shields.io/npm/v/@fullstackcraftllc/codevideo-frontend"/> <img src="https://img.shields.io/codecov/c/github/codevideo/codevideo-frontend"/>

The frontend engine used to create videos on [https://codevideo.io](https://codevideo.io)

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
// No error, so we can do something with videoUrl.

// In this example, create a video element, set its source, and append it to a container

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

The canvas doesn't even have to be visible on the page. It can be off-screen or in a hidden div.

Happy video making!

## For Developers

1. Clone this repository:

```bash
git clone https://github.com/codevideo/codevideo-frontend.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the tests:

```bash
npm test
```

4. Optionally, run the example site locally:

```bash
cd example
npm install
npm start
```

## Deploys

Deploys are run with Circle CI. Merging to the `mian` branch will trigger a test, packaging, and publishing to the `release` branch.