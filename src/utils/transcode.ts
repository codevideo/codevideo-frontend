import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { recordCanvas } from "./recordCanvas";
import { MimicTypos } from "../enums/MimicTypos";

export const transcode = async (
  canvas: HTMLCanvasElement,
  code: string,
  language: string,
  mimicTypos: MimicTypos
) => {
  const ffmpeg = createFFmpeg({
    log: true,
  });
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  const blob = await recordCanvas(canvas, code, language, mimicTypos);
  const recording = new Uint8Array(await blob.arrayBuffer());
  const name = "record.webm";
  console.log("start transcoding");
  ffmpeg.FS("writeFile", name, recording);
  await ffmpeg.run(
    "-i",
    name,
    "-c:v",
    "libx264",
    "-s",
    `${canvas.width}x${canvas.height}`,
    "output.mp4"
  );
  console.log("Complete transcoding");
  const data = ffmpeg.FS("readFile", "output.mp4");
  return URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
};
