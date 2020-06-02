import { blue, indigo, pink, red, green, cyan, lime } from '@material-ui/core/colors'

const lightPalette = {
    type: "light",
    primary: indigo,
    secondary: pink,
    error: pink,
    action: green,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
}

const darkPalette = {
    type: "dark",
    primary: cyan,
    secondary: pink,
    error: pink,
    action: green,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
}

const themeProps = {
    lightLineColors: ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'],
    darkLineColors: ['#ff9800', '#f44336', '#9c27b0', '#3f51b5', '#e91e63'],
    typography: {
        
    },
}

export const lightTheme = {
    palette: { ...lightPalette },
    ...themeProps
}

export const darkTheme = {
    palette: { ...darkPalette },
    ...themeProps
}