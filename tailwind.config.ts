import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      pn: "0px",
      vs: "200px",
      ss: "360px",
      pp: "500px",
      sm: "821px",
      md: "1180px",
      lg: "1440px",
      xl: "1536px",
      xxl: "1900px",
    },
    extend: {
      backgroundImage: {
        // chats: "url('./assets/Header.png')",
        // mobilechats: "url('./assets/mobilechat.png')",
        // "com-image": "url('./assets/comimage.png')",
        backgrounds: "url('./assets/Background.png')",
        loginbg: "url('./assets/backlogin.png')",
        piclogin: "url('./assets/piclogin.png')",
        chatslightbg: "url('./assets/bgchatlightmode.png')",
        chatsdarkbg: "url('./assets/bgchatdarkmode.png')",
        lightlogin: "url('./assets/lightlogin.png')",
        lightpiclogin: "url('./assets/lightpiclogin.png')",
        defaultprositelight: "url('./assets/lightProsite.png')",
        defaultprositedark: "url('./assets/darkProsite.png')",
        background: "url('./assets/Background.png')",
        "custom-gradient":
          "linear-gradient(90deg, #E59CFF 0%, #BA9CFF 50%, #9CB2FF 100%)",
        creator1: "url('./assets/creator1.png')",
        creator2: "url('./assets/creator2.png')",
        // 'creator': "url('./assets/backgrounds.png')",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        bluedark: "hsl(var(--bluedark))",
        selectlight: "hsl(var(--selectlight))",
        graylight: "hsl(var(--graylight))",
        bluelight: "hsl(var(--bluelight))",
        navdark: "hsl(var(--navdark))",
        selectdark: "hsl(var(--selectdark))",
        graydark: "hsl(var(--graydark))",
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
