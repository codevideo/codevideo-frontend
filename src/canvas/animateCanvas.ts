import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor-core";
import { colorCodeCharacter } from "./colorCodeCharacter";
import { MimicTypos } from "../enums/MimicTypos";
import { runTypoLogic } from "../canvas/runTypoLogic";
import { sleep } from "../utils/sleep";

export const animateCanvas = async (
  canvas: HTMLCanvasElement | null,
  code: string,
  language: string,
  mimicTypos: MimicTypos
): Promise<boolean> => {
  // type guards
  if (!canvas) {
    return false;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return false;
  }
  if (typeof window === "undefined") {
    return false;
  }

  // font stuff
  const paddingAmountX = 120;
  const paddingAmountY = 170;
  const fontSize = 20;
  const characterOffset = fontSize / 1.7;
  const lineHeight = fontSize * 1.5;
  ctx.font = `bold ${fontSize}px Fira Code`;

  const codeLines = code.split("\n");

  const initializeMonaco = new Promise((res) =>
    setTimeout(() => {
      monaco.editor.tokenize(
        `export const dummy = () => {
    console.log('hello world')
  }`,
        "typescript"
      );
      res("");
    }, 1000)
  );
  await initializeMonaco;

  const tokens = monaco.editor.tokenize(code, language);

  // add a sleep for a smooth start
  await sleep(500);

  // now loop at each line and each character
  // and color code it based on the token type
  for (let lineIndex = 0; lineIndex < tokens.length; lineIndex++) {
    const sleepAmount = 50;
    // calculate a sleep amount randomly anywhere between 50 - 100 - but this seems to make ffmpeg go haywire
    // const sleepAmount = Math.floor(Math.random() * 50) + 50;
    const lineCharacters = codeLines[lineIndex];
    for (
      let characterIndex = 0;
      characterIndex < lineCharacters.length;
      characterIndex++
    ) {
      console.log("characterIndex", characterIndex);
      // TODO: theme should also come from redux
      const tokenStyle = colorCodeCharacter(
        lineIndex,
        characterIndex,
        tokens,
        Monokai as monaco.editor.IStandaloneThemeData,
        codeLines[lineIndex][characterIndex]
      );
      // TODO: fallback should come from redux
      // TODO: would be also cool to use background color
      // only change if foreground was foreground
      if (tokenStyle.foreground) {
        ctx.fillStyle = tokenStyle.foreground;
      }
      // fill text of character at proper coordinates
      ctx.fillText(
        codeLines[lineIndex][characterIndex],
        characterIndex * characterOffset + paddingAmountX,
        lineIndex * lineHeight + paddingAmountY
      );

      // run typo logic
      await runTypoLogic(
        mimicTypos,
        ctx,
        characterIndex * characterOffset + paddingAmountX,
        lineIndex * lineHeight + paddingAmountY,
        characterOffset
      );

      console.log({
        color: tokenStyle.foreground,
        character: codeLines[lineIndex][characterIndex],
        x: characterIndex * characterOffset + paddingAmountX,
        y: lineIndex * lineHeight + paddingAmountY,
      });
      // lil' checky sleep to make it look like it's typing
      await sleep(sleepAmount);
    }
    await sleep(sleepAmount);
  }

  // all was well
  console.log("returning true!");
  return true;
};
