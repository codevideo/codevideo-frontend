import { transcode } from "./transcode";
import { prepareCanvas } from "./prepareCanvas";
import { ArrayOfTwoOrMore } from "../types/ArrayOfTwoOrMore";
import {MimicTypos} from "../enums/MimicTypos";

export const codeToVideo = async (
  canvas: HTMLCanvasElement,
  height: number,
  width: number,
  code: "javascript" | "typescript" | "python" | "css" | "html",
  language: string,
  gradientColors: ArrayOfTwoOrMore<string>,
  mimicTypos: MimicTypos,
): Promise<{ videoUrl: string; error: Error | null }> => {
  try {
    await prepareCanvas(canvas, height, width, gradientColors);
    const videoUrl = await transcode(canvas, code, language, mimicTypos);
    return { videoUrl, error: null };
  } catch (error) {
    return { videoUrl: "", error: error as Error };
  }
};
