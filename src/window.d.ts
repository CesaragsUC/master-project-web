// src/window.d.ts or src/types/window.d.ts
export {};

declare global {
  interface Window {
    env: {
      API_URL: string;
      API_URL_BACKEND: string;
      API_URL_PROTOCOL: string;
      IMAGES_URL: string;
    };
  }
}
