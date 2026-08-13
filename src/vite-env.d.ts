/// <reference types="vite/client" />
/// <reference types="vite-imagetools" />

// vite-imagetools ships no ambient declarations for its query imports, so TypeScript
// can't resolve `foo.png?w=800&quality=75&format=webp`. Keeping `format` as the last
// query param means these two patterns cover every width/quality we use — and any new
// one — without touching this file again.
declare module '*&format=webp' {
  const src: string;
  export default src;
}

declare module '*&format=jpeg' {
  const src: string;
  export default src;
}
