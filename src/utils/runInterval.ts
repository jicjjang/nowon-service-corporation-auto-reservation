import { countdown } from "./countdown";

export const runInterval = (callback: () => void) => {
  const interval = setInterval(() => {
    countdown(() => {
      clearInterval(interval);
      callback();
    });
  }, 1000);
};
