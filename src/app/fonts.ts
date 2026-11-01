import localFont from "next/font/local";

/**
 * Self-hosted variable fonts from @fontsource-variable. Files are read from
 * node_modules at build time and emitted as static assets, so Google Fonts is
 * never contacted at build or at runtime. All options must be plain literals:
 * next/font is evaluated by a compiler plugin, not at runtime.
 */

export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

// Latin Extended: covers ₹ (U+20B9) and accented characters. Downloaded only when used.
export const interExt = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-inter-ext",
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
});

export const jakarta = localFont({
  src: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-jakarta",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

// Devanagari: the unicode-range means the browser downloads it only when Hindi text appears.
export const notoDeva = localFont({
  src: "../../node_modules/@fontsource-variable/noto-sans-devanagari/files/noto-sans-devanagari-devanagari-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-noto-deva",
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09",
    },
  ],
});

export const jbMono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-jbmono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

/** Apply on `<html>` so every CSS variable is available app-wide. */
export const fontVariables = [
  inter.variable,
  interExt.variable,
  jakarta.variable,
  notoDeva.variable,
  jbMono.variable,
].join(" ");
