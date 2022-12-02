import { blue, lightGreen, purple } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Inter } from "@next/font/google";

export const inter = Inter({
  variable: "--inter-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const colors = {
  primary: blue[700],
  neutral: purple.A200,
  secondary: lightGreen[500],
};

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
  interface TypographyVariants {
    question: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    question?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    question: true;
  }
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: colors.primary,
        light: blue[900],
        dark: blue[500],
      },
      secondary: {
        main: colors.secondary,
        light: lightGreen[700],
        dark: lightGreen[300],
      },
      neutral: {
        main: colors.neutral,
      },
    },
    typography: {
      fontFamily: inter.style.fontFamily,
      h1: {
        fontSize: "2.5rem",
        fontWeight: 900,
        color: colors.primary,
      },
      question: {
        fontSize: "1.1rem",
        fontWeight: "bold",
      },
    },
  })
);

export default theme;
