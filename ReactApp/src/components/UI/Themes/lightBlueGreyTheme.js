/* eslint-disable no-unused-vars */
import { indigo, teal, lightBlue, blueGrey, pink, red, blue, green,lightGreen,  cyan, deepOrange, orange, amber, lime, grey } from '@material-ui/core/colors'
import { alpha } from '@material-ui/core/styles/colorManipulator';

import defaultTheme from './defaultTheme'


const lightBlueGreyPalette = () => {
    const type = "light";
    const primary = blueGrey;
    const secondary = pink;
    const error = pink;
    const ok={main:lightGreen['400']}
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
        light: alpha(alarm.major.light, 0.4),
        main: alpha(alarm.major.main, 0.4),
        dark: alpha(alarm.major.dark, 0.4),
    };
    alarm.minorAcked = {
        light: alpha(alarm.minor.light, 0.4),
        main: alpha(alarm.minor.main, 0.4),
        dark: alpha(alarm.minor.dark, 0.4)
    };
    const beamLineComponent={main:blueGrey['500']};
    const svgComponentPrimary={main:primary['500']};
    const svgComponentSecondary={main:secondary['500']};
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
        ok:ok,
        major: major,
        minor: minor,
        alarm: alarm,
        contrastThreshold: contrastThreshold,
        tonalOffset: tonalOffset,
        paperElevation: paperElevation,
        reactVis:reactVis,
        beamLineComponent:beamLineComponent,
        svgComponentPrimary:svgComponentPrimary,
        svgComponentSecondary:svgComponentSecondary,

    })
}

 const lightBlueGrey = {
    
    palette: { ...defaultTheme, ...lightBlueGreyPalette() },

}

export default lightBlueGrey;