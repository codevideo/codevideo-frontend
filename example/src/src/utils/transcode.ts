import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { MimicTypos } from "../enums/MimicTypos";
import { recordCanvas } from "../canvas/recordCanvas";

export const transcode = async (
  canvas: HTMLCanvasElement,
  fps: number,
  mimeType: string,
  codec: string,
  code: string,
  language: string,
  mimicTypos: MimicTypos
): Promise<string> => {
  const ffmpeg = createFFmpeg({
    mainName: "main",
    corePath: "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
    log: true,
  });
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  const blob = await recordCanvas(
    canvas,
    fps,
    mimeType,
    codec,
    code,
    language,
    mimicTypos
  );
  const recording = new Uint8Array(await blob.arrayBuffer());
  const webMFile = "recording.webm";
  const outputFile = "output.mp4"
  console.log("start transcoding");
  ffmpeg.FS("writeFile", webMFile, recording);
  await ffmpeg.run(
    "-i",
    webMFile,
    "-c:v",
    "libx264",
    "-s",
    `${canvas.width}x${canvas.height}`,
    outputFile
  );
  console.log("Complete transcoding");
  const data = ffmpeg.FS("readFile", outputFile);
  return URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
};
