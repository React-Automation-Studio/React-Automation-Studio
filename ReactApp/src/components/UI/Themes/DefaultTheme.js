import { indigo, blueGrey, pink, red, green, cyan, deepOrange, orange } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator';

const lightPalette =()=> {
    const type= "light";
    const primary= blueGrey;
    const secondary= pink;
    const error= pink;
    const major= red;
    const minor= orange;
    const alarm= {
        major: {
            light:major['400'],
            main: major['600'],
            dark: major['800'],
        },
        minor: {
            light:minor['100'],
            main: minor['300'],
            dark: minor['400']
        },
     
    };

    alarm.majorAcked= {
        light: fade(alarm.major.light, 0.4),
        main:  fade(alarm.major.main, 0.4),
        dark:  fade(alarm.major.dark, 0.4),
    };
    alarm.minorAcked= {
        light: fade(alarm.minor.light, 0.4),
        main: fade(alarm.minor.main, 0.4),
        dark: fade(alarm.minor.dark, 0.4)
    };
    const contrastThreshold= 3;
    const tonalOffset= 0.2;
    const paperElevation= 10;
    return({
        type:type,
        primary:primary,
        secondary:secondary,
        error:error,
        major:major,
        minor:minor,
        alarm:alarm,
        contrastThreshold:contrastThreshold,
        tonalOffset:tonalOffset,
        paperElevation:paperElevation

    })
}

const darkPalette =()=> {
    const type= "dark";
    const primary= cyan;
    const secondary= pink;
    const error= pink;
    const major= red;
    const minor= orange;
    const alarm= {
        major: {
            light:major['400'],
            main: major['600'],
            dark: major['800'],
        },
        minor: {
            light:minor['100'],
            main: minor['300'],
            dark: minor['400']
        },
     
    };

    alarm.majorAcked= {
        light: fade(alarm.major.light, 0.4),
        main:  fade(alarm.major.main, 0.4),
        dark:  fade(alarm.major.dark, 0.4),
    };
    alarm.minorAcked= {
        light: fade(alarm.minor.light, 0.4),
        main: fade(alarm.minor.main, 0.4),
        dark: fade(alarm.minor.dark, 0.4)
    };
    const contrastThreshold= 3;
    const tonalOffset= 0.2;
    const paperElevation= 10;
    return({
        type:type,
        primary:primary,
        secondary:secondary,
        error:error,
        major:major,
        minor:minor,
        alarm:alarm,
        contrastThreshold:contrastThreshold,
        tonalOffset:tonalOffset,
        paperElevation:paperElevation

    })
}
// const darkPalette = {
//     type: "dark",
//     primary: cyan,
//     secondary: pink,
//     error: pink,
//     action: green,
//     // Used by `getContrastText()` to maximize the contrast between the background and
//     // the text.
//     contrastThreshold: 3,
//     alarm: {
//         major: {
//             light: red['400'],
//             main: red['600'],
//             dark: red['800'],
//         },
//         majorAcked: {
//             light: fade(red['400'], 0.4),
//             main: fade(red['600'], 0.4),
//             dark: fade(red['800'], 0.4),
//         },
//         minor: {
//             light: deepOrange['200'],
//             main: deepOrange['400'],
//             dark: deepOrange['500']
//         },
//         minorAcked: {
//             light: fade(deepOrange['200'], 0.4),
//             main: fade(deepOrange['400'], 0.4),
//             dark: fade(deepOrange['500'], 0.4)
//         },
//         ok: {
//             light: green['200'],
//             dark: green['500']
//         },
//     },
//     // Used to shift a color's luminance by approximately
//     // two indexes within its tonal palette.
//     // E.g., shift from Red 500 to Red 300 or Red 700.
//     tonalOffset: 0.2,
//     paperElevation: 1,
// }

const themeProps = {
    lightLineColors: ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'],
    darkLineColors: ['#ff9800', '#f44336', '#9c27b0', '#3f51b5', '#e91e63'],
    typography: {

    },
}

export const lightTheme = {
    palette: { ...lightPalette() },
    ...themeProps
}

export const darkTheme = {
    palette: { ...darkPalette() },
    ...themeProps
}