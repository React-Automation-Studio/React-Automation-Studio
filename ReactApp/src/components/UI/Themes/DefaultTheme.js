import { blue, indigo, pink, red, green, cyan, lime,deepOrange,orange } from '@material-ui/core/colors'

const lightPalette = {
    type: "light",
    primary: indigo,
    secondary: pink,
    error:pink,
    alarm:{
        major:{
            light: red['400'],
            main: red['600'],
            dark: red['800'],
        },
        minor:{
             light:orange['200'],
             main:orange['400'],             
             dark:orange['800']
            },
            
        ok:{light:green['200'],
            dark:green['500']},
    },
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
    error:pink,
    action: green,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    alarm:{
        major:{
            light: red['400'],
            main: red['600'],
            dark: red['800'],
        },
        minor:{
             light:deepOrange['200'], 
             main:deepOrange['300'],              
             dark:deepOrange['400']
            },
            
        ok:{light:green['200'],
            dark:green['500']},
    },
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