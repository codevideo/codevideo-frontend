import { ArrayOfTwoOrMore } from "../types/ArrayOfTwoOrMore";
import { drawCircle } from "./utils/drawCircle";

export const prepareCanvas = async (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    gradientColors: ArrayOfTwoOrMore<string>
) => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
        // set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // before doing anything, ensure the canvas is completely clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // then, fill whole background with a nice gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        // for each gradient color, add the step
        gradientColors.forEach((color, index) => {
            gradient.addColorStop(index, color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // now draw a rounded rectangle with black background - padded by 20px on all sides
        // this is the area where the code will be displayed
        const paddingAmount = 100;
        const rectX = paddingAmount;
        const rectY = paddingAmount;
        const rectWidth = canvas.width - (paddingAmount * 2);
        const rectHeight = canvas.height - (paddingAmount * 2);
        const rectRadius = 10;
        ctx.fillStyle = "#000000";
        ctx.roundRect(rectX, rectY, rectWidth, rectHeight, rectRadius);
        ctx.fill();

        const buttonPaddingAmount = 30;

        // now draw the top corner close, minimize, and maximize buttons scaled to the size of the canvas
        // close button
        drawCircle(ctx, paddingAmount + buttonPaddingAmount, paddingAmount + buttonPaddingAmount, 10, "#FF5F56")

        // minimize button
        drawCircle(ctx, paddingAmount + buttonPaddingAmount*2, paddingAmount + buttonPaddingAmount, 10, "#FFBD2E")

        // close button
        drawCircle(ctx, paddingAmount + buttonPaddingAmount*3, paddingAmount + buttonPaddingAmount, 10, "#27C940")
    }
}