import { transcode } from "./utils/transcode";
import { prepareCanvas } from "./canvas/prepareCanvas";
import { ArrayOfTwoOrMore } from "./types/ArrayOfTwoOrMore";
import {MimicTypos} from "./enums/MimicTypos";

export const codeToVideo = async (
  canvas: HTMLCanvasElement,
  fps: number,
  mimeType: string,
  codec: string,
  width: number,
  height: number,
  code: string,
  language: "javascript" | "typescript" | "python" | "css" | "html",
  gradientColors: ArrayOfTwoOrMore<string>,
  mimicTypos: MimicTypos,
): Promise<{ videoUrl: string; error: Error | null }> => {
  try {
    await prepareCanvas(canvas, width, height, gradientColors);
    const videoUrl = await transcode(canvas, fps, mimeType, codec, code, language, mimicTypos);
    console.log(videoUrl, 'videoUrl')
    return { videoUrl, error: null };
  } catch (error) {
    return { videoUrl: "", error: error as Error };
  }
};
