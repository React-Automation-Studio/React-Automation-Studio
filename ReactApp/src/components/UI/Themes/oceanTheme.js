/* eslint-disable no-unused-vars */
import { indigo, teal, lightBlue, blueGrey, pink, red, blue, green,lightGreen,  cyan, deepOrange, orange, amber, lime, grey } from '@mui/material/colors'
import { alpha } from '@mui/material/styles';

import defaultTheme from './defaultTheme'


const oceanPalette = () => {
    const type = "dark";
    const primary = { main: blueGrey[400] };
    const secondary = { main: lightBlue[100] };
    const error = pink;
    const major = red;
    const minor = deepOrange;
    const ok={main:lime[300]}
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
        light: alpha(alarm.major.light, 0.4),
        main: alpha(alarm.major.main, 0.4),
        dark: alpha(alarm.major.dark, 0.4),
    };
    alarm.minorAcked = {
        light: alpha(alarm.minor.light, 0.4),
        main: alpha(alarm.minor.main, 0.4),
        dark: alpha(alarm.minor.dark, 0.4)
    };
    const beamLineComponent={main:blueGrey[500]};
    const svgComponentPrimary={main:blueGrey[400]};
    const svgComponentSecondary={main:blueGrey[600]};
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
        ok:ok,
        major: major,
        minor: minor,
        alarm: alarm,
        contrastThreshold: contrastThreshold,
        tonalOffset: tonalOffset,
        paperElevation: paperElevation,
        background: background,
        reactVis:reactVis,
        beamLineComponent:beamLineComponent,
        svgComponentPrimary:svgComponentPrimary,
        svgComponentSecondary:svgComponentSecondary,
    })
}

const oceanTheme = {
    palette: { ...defaultTheme, ...oceanPalette() },
}

export default oceanTheme;