import { MimicTypos } from "../enums/MimicTypos";
import { animateCanvas } from "./animateCanvas";

export const recordCanvas = async (
  canvas: HTMLCanvasElement,
  fps: number,
  mimeType: string,
  codec: string,
  code: string,
  language: string,
  mimicTypos: MimicTypos
): Promise<Blob> => {
  
  // create mediaRecorder with all params passed
  const mediaRecorder = new MediaRecorder(canvas.captureStream(fps), {
    mimeType: [mimeType, codec].join("; "),
  });

  // collect chunks as canvas streams (all happens within animateCanvas)
  const recordedChunks: Array<Blob> = [];
  mediaRecorder.ondataavailable = function (e) {
    recordedChunks.push(e.data);
  };

  // start recording
  // NOTE - THIS 0 SEEMS INSIGNIFICANT BUT IF IT IS NOT SET FFMPEG EXPLODES
  mediaRecorder.start(0);

  // wait until animate text is done
  // TODO - create a @codevideo/core library and import animateCanvas from there
  await animateCanvas(canvas, code, language, mimicTypos);

  // stop the recording
  mediaRecorder.stop();

  // create a blob from the recorded chunk
  const blob = new Blob(recordedChunks, {
    type: mimeType,
  });

  return blob;
};
