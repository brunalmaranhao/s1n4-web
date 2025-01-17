import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/util/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // keyframes: {
      //   hide: {
      //     from: {
      //       opacity: "1",
      //     },
      //     to: {
      //       opacity: "0",
      //     },
      //   },
      //   slideDownAndFade: {
      //     from: {
      //       opacity: "0",
      //       transform: "translateY(-6px)",
      //     },
      //     to: {
      //       opacity: "1",
      //       transform: "translateY(0)",
      //     },
      //   },
      //   slideLeftAndFade: {
      //     from: {
      //       opacity: "0",
      //       transform: "translateX(6px)",
      //     },
      //     to: {
      //       opacity: "1",
      //       transform: "translateX(0)",
      //     },
      //   },
      //   slideUpAndFade: {
      //     from: {
      //       opacity: "0",
      //       transform: "translateY(6px)",
      //     },
      //     to: {
      //       opacity: "1",
      //       transform: "translateY(0)",
      //     },
      //   },
      //   slideRightAndFade: {
      //     from: {
      //       opacity: "0",
      //       transform: "translateX(-6px)",
      //     },
      //     to: {
      //       opacity: "1",
      //       transform: "translateX(0)",
      //     },
      //   },
      //   accordionOpen: {
      //     from: {
      //       height: "0px",
      //     },
      //     to: {
      //       height: "var(--radix-accordion-content-height)",
      //     },
      //   },
      //   accordionClose: {
      //     from: {
      //       height: "var(--radix-accordion-content-height)",
      //     },
      //     to: {
      //       height: "0px",
      //     },
      //   },
      //   dialogOverlayShow: {
      //     from: {
      //       opacity: "0",
      //     },
      //     to: {
      //       opacity: "1",
      //     },
      //   },
      //   dialogContentShow: {
      //     from: {
      //       opacity: "0",
      //       transform: "translate(-50%, -45%) scale(0.95)",
      //     },
      //     to: {
      //       opacity: "1",
      //       transform: "translate(-50%, -50%) scale(1)",
      //     },
      //   },
      //   drawerSlideLeftAndFade: {
      //     from: {
      //       opacity: "0",
      //       transform: "translateX(100%)",
      //     },
      //     to: {
      //       opacity: "1",
      //       transform: "translateX(0)",
      //     },
      //   },
      //   drawerSlideRightAndFade: {
      //     from: {
      //       opacity: "1",
      //       transform: "translateX(0)",
      //     },
      //     to: {
      //       opacity: "0",
      //       transform: "translateX(100%)",
      //     },
      //   },
      // },
      // animation: {
      //   hide: "hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      //   slideDownAndFade:
      //     "slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      //   slideLeftAndFade:
      //     "slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      //   slideUpAndFade: "slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      //   slideRightAndFade:
      //     "slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      //   accordionOpen: "accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)",
      //   accordionClose: "accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)",
      //   dialogOverlayShow:
      //     "dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      //   dialogContentShow:
      //     "dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      //   drawerSlideLeftAndFade:
      //     "drawerSlideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      //   drawerSlideRightAndFade: "drawerSlideRightAndFade 150ms ease-in",
      // },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
      colors: {},
    },
  },
  darkMode: ["class"],
  plugins: [
    nextui(),
    require("tailwind-scrollbar"),
    // require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
};
export default config;
