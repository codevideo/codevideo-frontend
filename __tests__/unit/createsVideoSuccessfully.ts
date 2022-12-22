import { MimicTypos } from "../../src/enums/MimicTypos";
import { codeToVideo } from "../../src/codeToVideo";
import { describe, expect, test } from "@jest/globals";

describe("codeToVideo creates a video successfully", () => {
  test("codeToVideo creates a video successfully", async () => {
    // mock canvas
    const createElement = document.createElement.bind(document);
    document.createElement = (tagName: any) => {
      if (tagName === "canvas") {
        const element = createElement(tagName);
        element.captureStream = jest.fn();
        return element;
      }
      return createElement(tagName);
    };

    // mock MediaRecorder
    Object.defineProperty(window, "MediaRecorder", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        start: jest.fn(),
        ondataavailable: jest.fn(),
        onerror: jest.fn(),
        state: "",
        stop: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
      })),
    });
    Object.defineProperty(MediaRecorder, "isTypeSupported", {
      writable: true,
      value: () => true,
    });

    const fps = 60;
    const mimeType = "video/webm";
    const codec = "codecs=vp9";
    const canvas = document.createElement("canvas");

    const { videoUrl, error } = await codeToVideo(
      canvas,
      fps,
      mimeType,
      codec,
      1920,
      1080,
      "print('Hello World!')",
      "python",
      ["blue", "red"],
      MimicTypos.NEVER
    );

    expect(error).toBe(null);
    expect(videoUrl).not.toBe("");
  });
});
