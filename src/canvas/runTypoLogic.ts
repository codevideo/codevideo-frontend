import { Constants } from "../constants/Constants";
import { MimicTypos } from "../enums/MimicTypos";
import { getRandomInt } from "../utils/getRandomInt";
import { sleep } from "../utils/sleep";

export const runTypoLogic = async (
  mimicTypos: MimicTypos,
  ctx: CanvasRenderingContext2D,
  lastX: number,
  lastY: number,
  xOffset: number
): Promise<void> => {
  if (mimicTypos === MimicTypos.NEVER) {
    return;
  }
  let typoProbability = 0;
  if (mimicTypos === MimicTypos.SOMETIMES) {
    typoProbability = 0.025;
  }
  if (mimicTypos === MimicTypos.OFTEN) {
    typoProbability = 0.1;
  }

  // now the actual logic
  if (Math.random() > typoProbability) {
    return;
  }

  // begin typo logic:

  // first save the current color
  const currentColor = ctx.fillStyle;

  // also generate a random for a length of typo to make - from 1 to 3 characters
  const typoLength = Math.floor(Math.random() * 3) + 1;
  // now type horizontally across the screen with a random character following the position
  for (let i = 1; i < typoLength + 1; i++) {
    const randomCharacter = Constants.chars[getRandomInt(0, 35)];
    ctx.fillText(randomCharacter, lastX + xOffset * i, lastY);
    await sleep(200);
  }
  // now do various fill rects with black to simulate "fixing" the typo
  for (let i = typoLength + 1; i > 0; i--) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(lastX + xOffset * i, lastY - 20, xOffset, 30);
    await sleep(200);
  }

  // typo done, restore fill color
  ctx.fillStyle = currentColor;
};
