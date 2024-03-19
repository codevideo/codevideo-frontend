import { prepareCanvas } from "./canvas/prepareCanvas";
import { ArrayOfTwoOrMore } from "./types/ArrayOfTwoOrMore";
import {MimicTypos} from "./enums/MimicTypos";
import { IAction } from "@fullstackcraftllc/codevideo-types";
import { transcodeActions } from "./utils/transcodeActions";

/**
 * Converts a series of CodeVideo actions (Array<IAction>) into a video.
 * @param {HTMLCanvasElement} canvas - The HTML canvas element to render the video onto.
 * @param {number} fps - The frames per second (FPS) of the resulting video.
 * @param {string} mimeType - The MIME type of the resulting video, e.g., 'video/webm'.
 * @param {string} codec - The codec used for encoding the video, e.g., 'codecs=vp9'.
 * @param {number} width - The width of the video in pixels.
 * @param {number} height - The height of the video in pixels.
 * @param {Array<IAction>} actions - An array of actions (IAction) to be converted into the video.
 * @param {"javascript" | "typescript" | "python" | "css" | "html"} language - The programming language used in the actions.
 * @param {ArrayOfTwoOrMore<string>} gradientColors - An array of two or more color strings defining the gradient colors of the canvas background.
 * @param {MimicTypos} mimicTypos - An object specifying whether to mimic typos in the actions.
 * @returns {Promise<{ videoUrl: string; error: Error | null }>} A promise that resolves with an object containing the URL of the generated video and any potential errors encountered during conversion.
 * @example
 * import { actionsToVideo, MimicTypos } from "@fullstackcraftllc/codevideo-frontend";
 *
 * // define video parameters
 * const fps = 60;
 * const mimeType = "video/webm";
 * const codec = "codecs=vp9";
 *
 * // get canvas and setup media recorder
 * const canvas = document.getElementById("canvas") as HTMLCanvasElement;
 *
 * const { videoUrl, error } = await actionsToVideo(
 *   canvas,
 *   fps,
 *   mimeType,
 *   codec,
 *   1920,
 *   1080,
 *   [{"name":"type-editor", "value": "console.log('Hello, world!');"}],
 *   "python",
 *   ["red", "blue"],
 *   MimicTypos.NEVER
 * );
 * if (error) {
 *   // handle error
 *   console.error(error);
 * }
 * // No error, so we can do something with videoUrl.
 *
 * // In this example, create a video element, set its source, and append it to a container
 *
 * // Create the video element
 * const video = document.createElement("video");
 *
 * // Set the video's src attribute to the URL of a video file
 * video.src = videoUrl;
 *
 * // Set other useful attributes
 * video.id = "video";
 * video.height = 960;
 * video.width = 540;
 * video.controls = true;
 * video.autoplay = true;
 *
 * // Append the video element to the container div
 * const container = document.getElementById("container");
 * if (container) {
 *   container.appendChild(video);
 * }
 */
export const actionsToVideo = async (
  canvas: HTMLCanvasElement,
  fps: number,
  mimeType: string,
  codec: string,
  width: number,
  height: number,
  actions: Array<IAction>,
  language: "javascript" | "typescript" | "python" | "css" | "html",
  gradientColors: ArrayOfTwoOrMore<string>,
  mimicTypos: MimicTypos,
): Promise<{ videoUrl: string; error: Error | null }> => {
  try {
    await prepareCanvas(canvas, width, height, gradientColors);
    const videoUrl = await transcodeActions(canvas, fps, mimeType, codec, actions, language, mimicTypos);
    console.log(videoUrl, 'videoUrl')
    return { videoUrl, error: null };
  } catch (error) {
    return { videoUrl: "", error: error as Error };
  }
};
