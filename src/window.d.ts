// src/window.d.ts or src/types/window.d.ts
export {};

declare global {
  interface Window {
    env: {
      API_URL: string;
      IMAGES_URL: string;
    };
  }
}
