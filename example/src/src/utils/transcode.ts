import { FFmpeg } from "@ffmpeg/ffmpeg";
import { MimicTypos } from "../enums/MimicTypos";
import { recordCanvas } from "../canvas/recordCanvas";
import { toBlobURL } from "@ffmpeg/util";

export const transcode = async (
  canvas: HTMLCanvasElement,
  fps: number,
  mimeType: string,
  codec: string,
  code: string,
  language: string,
  mimicTypos: MimicTypos
): Promise<string> => {
  const ffmpeg = new FFmpeg();
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
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
  const outputFile = "output.mp4";
  console.log("start transcoding");
  await ffmpeg.writeFile(webMFile, recording);
  console.log("wrote file")
  await ffmpeg.exec([
    "-i",
    webMFile,
    "-c:v",
    "libx264",
    "-s",
    `${canvas.width}x${canvas.height}`,
    outputFile,
  ]);
  console.log("Complete transcoding");
  const data = await ffmpeg.readFile(outputFile);
  return URL.createObjectURL(new Blob([data], { type: "video/mp4" }));
};
