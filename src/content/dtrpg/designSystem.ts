// Generated from the DriveThruRPG prototype (Figma: DriveThruRPG — UX/UI Redesign). Edit freely.
import type { DsGroup, DsTheme } from "./types";

export const DS_THEMES: Record<"light" | "dark", DsTheme> = {
  "light": {
    "label": "Light",
    "tokens": {
      "background": "#F6F5F3",
      "card": "#FFFFFF",
      "popover": "#FFFFFF",
      "muted": "#EDECE9",
      "foreground": "#17171B",
      "muted-foreground": "#5B5B63",
      "border": "#DAD8D3",
      "input": "#C9C7C1",
      "primary": "#D8413F",
      "primary-text": "#CA2B29",
      "primary-solid": "#D73A38",
      "success": "#1F7A4D",
      "warning": "#9A6700",
      "info": "#1F6FB2",
      "rating": "#B77900"
    },
    "notes": {
      "foreground": "17.9:1 on card",
      "muted-foreground": "6.7:1 on card",
      "primary": "fill · white text 4.42:1",
      "primary-text": "small red text · 5.4:1 on card",
      "primary-solid": "white text 4.6:1",
      "success": "5.3:1 on card",
      "warning": "4.9:1 on card",
      "info": "5.3:1 on card",
      "rating": "3.7:1 on card"
    },
    "contrast": [
      16.41,
      17.88,
      6.73,
      4.96,
      5.4,
      5.4,
      4.42,
      4.42,
      4.61
    ]
  },
  "dark": {
    "label": "Dark",
    "tokens": {
      "background": "#0F0F12",
      "card": "#17171B",
      "popover": "#1F1F24",
      "muted": "#26262C",
      "foreground": "#F4F4F5",
      "muted-foreground": "#A1A1AA",
      "border": "#34343B",
      "input": "#3D3D45",
      "primary": "#D8413F",
      "primary-text": "#E06765",
      "primary-solid": "#D73A38",
      "success": "#4CC38A",
      "warning": "#F0B94A",
      "info": "#6AA7E0",
      "rating": "#F2B01E"
    },
    "notes": {
      "foreground": "16.3:1 on card",
      "muted-foreground": "7.0:1 on card",
      "primary": "fill · white text 4.42:1",
      "primary-text": "small red text · 5.4:1 on card",
      "primary-solid": "white text 4.6:1",
      "success": "8.1:1 on card",
      "warning": "10.0:1 on card",
      "info": "7.0:1 on card",
      "rating": "9.4:1 on card"
    },
    "contrast": [
      17.41,
      16.26,
      6.97,
      5.74,
      5.36,
      4.92,
      4.04,
      4.42,
      4.61
    ]
  }
};

export const DS_GROUPS: DsGroup[] = [
  {
    "label": "Surfaces",
    "keys": [
      "background",
      "card",
      "popover",
      "muted"
    ]
  },
  {
    "label": "Text and lines",
    "keys": [
      "foreground",
      "muted-foreground",
      "border",
      "input"
    ]
  },
  {
    "label": "Brand",
    "keys": [
      "primary",
      "primary-text",
      "primary-solid"
    ]
  },
  {
    "label": "Status and rating",
    "keys": [
      "success",
      "warning",
      "info",
      "rating"
    ]
  }
];
