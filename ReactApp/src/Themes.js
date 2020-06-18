/* eslint-disable no-unused-vars */
import { indigo, teal, lightBlue, blueGrey, pink, red, blue, green, cyan, deepOrange, orange, amber, lime, grey } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator';

const lightPalette = () => {
    const type = "light";
    const primary = indigo;
    const secondary = { main: pink[500] };
    const error = pink;
    const major = red;
    const minor = deepOrange;
    const alarm = {
        major: {
            light: major['400'],
            main: major['600'],
            dark: major['800'],
        },
        minor: {
            light: minor['100'],
            main: minor['200'],
            dark: minor['300']
        },

    };


    alarm.majorAcked = {
        light: fade(alarm.major.light, 0.4),
        main: fade(alarm.major.main, 0.4),
        dark: fade(alarm.major.dark, 0.4),
    };
    alarm.minorAcked = {
        light: fade(alarm.minor.light, 0.4),
        main: fade(alarm.minor.main, 0.4),
        dark: fade(alarm.minor.dark, 0.4)
    };
    const contrastThreshold = 3;
    const tonalOffset = 0.2;
    const paperElevation = 10;
    const reactVis= {
        '.rv-xy-plot__axis__tick__line': { stroke: grey[600] },
        '.rv-xy-plot__axis__tick__text': { fill: grey[600], fontSize: '11px' },
        '.rv-xy-plot__axis__title text': { fill: grey[600], fontSize: '11px' },
        '.rv-xy-plot__grid-lines__line': { stroke: cyan[700] },
        '.rv-discrete-color-legend-item': {
            color: grey[600],
            borderRadius: '1px',
            padding: '9px 10px'
        },
        '.rv-xy-plot__axis__line': {
            fill: 'none',
            strokeWidth: '2px',
            stroke: grey[400]
          },
          lineColors: [indigo[400], pink[400], lime[400], '#FF9833', '#EF5D28'],
    }
    return ({
        type: type,
        primary: primary,
        secondary: secondary,
        error: error,
        major: major,
        minor: minor,
        alarm: alarm,
        contrastThreshold: contrastThreshold,
        tonalOffset: tonalOffset,
        paperElevation: paperElevation,
        reactVis:reactVis

    })
}

const lightBlueGreyPalette = () => {
    const type = "light";
    const primary = blueGrey;
    const secondary = pink;
    const error = pink;
    const major = red;
    const minor = deepOrange;
    const alarm = {
        major: {
            light: major['400'],
            main: major['600'],
            dark: major['800'],
        },
        minor: {
            light: minor['100'],
            main: minor['200'],
            dark: minor['300']
        },

    };

    alarm.majorAcked = {
        light: fade(alarm.major.light, 0.4),
        main: fade(alarm.major.main, 0.4),
        dark: fade(alarm.major.dark, 0.4),
    };
    alarm.minorAcked = {
        light: fade(alarm.minor.light, 0.4),
        main: fade(alarm.minor.main, 0.4),
        dark: fade(alarm.minor.dark, 0.4)
    };
    const contrastThreshold = 3;
    const tonalOffset = 0.2;
    const paperElevation = 10;
    const reactVis= {
        '.rv-xy-plot__axis__tick__line': { stroke: blueGrey[400] },
        '.rv-xy-plot__axis__tick__text': { fill: blueGrey[400], fontSize: '11px' },
        '.rv-xy-plot__axis__title text': { fill: blueGrey[400], fontSize: '11px' },
        '.rv-xy-plot__grid-lines__line': { stroke: blueGrey[400] },
        '.rv-discrete-color-legend-item': {
            color: blueGrey[500],
            borderRadius: '1px',
            padding: '9px 10px'
        },
        '.rv-xy-plot__axis__line': {
            fill: 'none',
            strokeWidth: '2px',
            stroke: blueGrey[400]
          },
          lineColors: ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'],
        }
    return ({
        type: type,
        primary: primary,
        secondary: secondary,
        error: error,
        major: major,
        minor: minor,
        alarm: alarm,
        contrastThreshold: contrastThreshold,
        tonalOffset: tonalOffset,
        paperElevation: paperElevation,
        reactVis:reactVis

    })
}

const darkOceanPalette = () => {
    const type = "dark";
    const primary = { main: blueGrey[400] };
    const secondary = { main: blueGrey[600] };
    const error = pink;
    const major = red;
    const minor = deepOrange;
    const alarm = {
        major: {
            light: major['400'],
            main: major['600'],
            dark: major['800'],
        },
        minor: {
            light: minor['100'],
            main: minor['200'],
            dark: minor['300']
        },

    };
    const background = {
        paper: blueGrey[800],
        default: blueGrey[900],
    }
    alarm.majorAcked = {
        light: fade(alarm.major.light, 0.4),
        main: fade(alarm.major.main, 0.4),
        dark: fade(alarm.major.dark, 0.4),
    };
    alarm.minorAcked = {
        light: fade(alarm.minor.light, 0.4),
        main: fade(alarm.minor.main, 0.4),
        dark: fade(alarm.minor.dark, 0.4)
    };
    const contrastThreshold = 3;
    const tonalOffset = 0.2;
    const paperElevation = 10;
    const reactVis= {
        '.rv-xy-plot__axis__tick__line': { stroke: grey[500] },
        '.rv-xy-plot__axis__tick__text': { fill: grey[500], fontSize: '11px' },
        '.rv-xy-plot__axis__title text': { fill: grey[500], fontSize: '11px' },
        '.rv-xy-plot__grid-lines__line': { stroke: blueGrey[600] },
        '.rv-discrete-color-legend-item': {
            color: "#FFFFFF",
            borderRadius: '1px',
            padding: '9px 10px'
        },
        '.rv-xy-plot__axis__line': {
            fill: 'none',
            strokeWidth: '2px',
            stroke: grey[500]
          },
          lineColors: [lightBlue[100], lime[300], pink[200], deepOrange[200], blue[200]],
        };
    return ({
        type: type,
        primary: primary,
        secondary: secondary,
        error: error,
        major: major,
        minor: minor,
        alarm: alarm,
        contrastThreshold: contrastThreshold,
        tonalOffset: tonalOffset,
        paperElevation: paperElevation,
        background: background,
        reactVis:reactVis,


    })
}

const darkPalette = () => {
    const type = "dark";
    const primary = cyan;
    const secondary = pink;
    const error = pink;
    const major = red;
    const minor = deepOrange;
    const alarm = {
        major: {
            light: major['400'],
            main: major['600'],
            dark: major['800'],
        },
        minor: {
            light: minor['100'],
            main: minor['200'],
            dark: minor['300']
        },

    };

    alarm.majorAcked = {
        light: fade(alarm.major.light, 0.4),
        main: fade(alarm.major.main, 0.4),
        dark: fade(alarm.major.dark, 0.4),
    };
    alarm.minorAcked = {
        light: fade(alarm.minor.light, 0.4),
        main: fade(alarm.minor.main, 0.4),
        dark: fade(alarm.minor.dark, 0.4)
    };
    const contrastThreshold = 3;
    const tonalOffset = 0.2;
    const paperElevation = 10;
    const reactVis= {
    '.rv-xy-plot__axis__tick__line': { stroke: grey[500] },
    '.rv-xy-plot__axis__tick__text': { fill: grey[500], fontSize: '11px' },
    '.rv-xy-plot__axis__title text': { fill: grey[500], fontSize: '11px' },
    '.rv-xy-plot__grid-lines__line': { stroke: cyan[700] },
    '.rv-discrete-color-legend-item': {
        color: "#FFFFFF",
        borderRadius: '1px',
        padding: '9px 10px'
    },
    '.rv-xy-plot__axis__line': {
        fill: 'none',
        strokeWidth: '2px',
        stroke: grey[500]
      },
      lineColors: [pink[500], lime[400], '#9c27b0', '#3f51b5', '#e91e63'],
    };
    return ({
        type: type,
        primary: primary,
        secondary: secondary,
        error: error,
        major: major,
        minor: minor,
        alarm: alarm,
        contrastThreshold: contrastThreshold,
        tonalOffset: tonalOffset,
        paperElevation: paperElevation,
        reactVis:reactVis,

    })
}

const reactVisDefault = {
    '.rv-xy-plot__axis__tick__line': { stroke: grey[600] },
    '.rv-xy-plot__axis__tick__text': { fill: grey[600], fontSize: '11px' },
    '.rv-xy-plot__axis__title text': { fill: grey[600], fontSize: '11px' },
    '.rv-xy-plot__grid-lines__line': { stroke: cyan[800] },
    '.rv-discrete-color-legend-item': {
        color: grey[600],
        borderRadius: '1px',
        padding: '9px 10px'
    },
    '.rv-xy-plot__axis__line': {
        fill: 'none',
        strokeWidth: '2px',
        stroke: grey[400]
      },
      lineColors: [indigo[400], pink[400], lime[400], '#FF9833', '#EF5D28'],
}
const themeProps = {

    typography: {

    },
   
}

export const lightTheme = {
    ...themeProps,
    palette: { reactVis:reactVisDefault,...lightPalette() },

}

export const darkTheme = {
    ...themeProps,
    palette: { reactVis:reactVisDefault,...darkPalette() },

}

export const lightBlueGrey = {
    ...themeProps,
    palette: { reactVis:reactVisDefault,...lightBlueGreyPalette() },

}

export const darkOcean = {
    ...themeProps,
    palette: {reactVis:reactVisDefault, ...darkOceanPalette() },




}
export const themes = { "Default Light": lightTheme, "Default Dark": darkTheme, "Light Blue-Grey": lightBlueGrey, 'Ocean': darkOcean }
