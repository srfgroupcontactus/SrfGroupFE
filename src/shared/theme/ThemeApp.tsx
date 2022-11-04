import React from "react";
// import { createTheme } from '@mui/material/styles';

// const isDark = false;
// export const ThemeApp = createTheme({
//   palette: {
//     mode: isDark ? 'dark' : 'light',
//     neutral: {
//       main: 'rgb(63 63 64)',
//       contrastText: '#fff',
//     },
//   },
// });

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    brown: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    brown?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    brown: true;
  }
}
