# codevideo-frontend

<img src="https://img.shields.io/npm/v/@fullstackcraftllc/codevideo-frontend"/>

The frontend engine to create videos on codevideo.io

**_This package is about as unstable as you can get. Consider it even below alpha status. It is brand new and under considerable development._**

## CodeSandbox Example
 
View an example of `codeToVideo` in action [here on CodeSandbox]() 

## Get Started

Install this package:

```shell
npm install --save @fullstackcraftllc/codevideo-frontend
```

Given the following HTML / JSX markup:

```
<canvas id="canvas"/>
<video id="video"/>
```

Import and call `codeToVideo`:

```ts
import { codeToVideo, MimicTypos } from "@fullstackcraft/codevideo-frontend";

const { videoUrl, error } = await codeToVideo(
  document.getElementById("canvas") as HTMLCanvasElement,
  1920,
  1080,
  "print('hello world!')",
  "python",
  ["red", "blue"],
  MimicTypos.NEVER
);
if (error) {
  // handle error
}
// No error, do something with videoUrl, ex.
const video = document.getElementById("video") as HTMLVideoElement;
video.src = videoUrl;
```
