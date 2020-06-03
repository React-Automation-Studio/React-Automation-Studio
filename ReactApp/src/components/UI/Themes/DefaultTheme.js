import { blue, indigo, pink, red, green, cyan, lime, deepOrange, orange } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator';

const lightPalette = {
    type: "light",
    primary: indigo,
    secondary: pink,
    error: pink,
    alarm: {
        major: {
            light: red['400'],
            main: red['600'],
            dark: red['800'],
        },
        majorAcked: {
            light: fade(red['400'], 0.4),
            main: fade(red['600'], 0.4),
            dark: fade(red['800'], 0.4),
        },
        minor: {
            light: orange['100'],
            main: orange['400'],
            dark: orange['800']
        },
        minorAcked: {
            light: fade(orange['100'], 0.4),
            main: fade(orange['300'], 0.4),
            dark: fade(orange['800'], 0.4)
        },

        ok: {
            light: green['200'],
            dark: green['500']
        },
    },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    paperElevation: 10,
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
    alarm: {
        major: {
            light: red['400'],
            main: red['600'],
            dark: red['800'],
        },
        majorAcked: {
            light: fade(red['400'], 0.4),
            main: fade(red['600'], 0.4),
            dark: fade(red['800'], 0.4),
        },
        minor: {
            light: deepOrange['200'],
            main: deepOrange['400'],
            dark: deepOrange['500']
        },
        minorAcked: {
            light: fade(deepOrange['200'], 0.4),
            main: fade(deepOrange['400'], 0.4),
            dark: fade(deepOrange['500'], 0.4)
        },
        ok: {
            light: green['200'],
            dark: green['500']
        },
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    paperElevation: 1,
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