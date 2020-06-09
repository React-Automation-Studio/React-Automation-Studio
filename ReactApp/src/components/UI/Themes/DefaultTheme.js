import { indigo,teal,lightBlue, blueGrey, pink, red,blue, green, cyan, deepOrange, orange,amber,lime,grey } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator';

const lightPalette =()=> {
    const type= "light";
    const primary= indigo;
    const secondary= {main:pink[500]};
    const error= pink;
    const major= red;
    const minor= deepOrange;
    const alarm= {
        major: {
            light:major['400'],
            main: major['600'],
            dark: major['800'],
        },
        minor: {
            light:minor['100'],
            main: minor['200'],
            dark: minor['300']
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
        paperElevation:paperElevation,
        
    })
}

const lightBlueGreyPalette =()=> {
    const type= "light";
    const primary= blueGrey;
    const secondary= pink;
    const error= pink;
    const major= red;
    const minor= deepOrange;
    const alarm= {
        major: {
            light:major['400'],
            main: major['500'],
            dark: major['800'],
        },
        minor: {
            light:minor['100'],
            main: minor['200'],
            dark: minor['300']
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

const darkOceanPalette =()=> {
    const type= "dark";
    const primary= {main:blueGrey[400]};
    const secondary= {main:blueGrey[600]};
    const error= pink;
    const major= red;
    const minor= deepOrange;
    const alarm= {
        major: {
            light:major['400'],
            main: major['600'],
            dark: major['800'],
        },
        minor: {
            light:minor['100'],
            main: minor['200'],
            dark: minor['300']
        },
     
    };
    const background={
        paper:blueGrey[800],
        default:blueGrey[900],
    }
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
        paperElevation:paperElevation,
        background:background


    })
}

const darkPalette =()=> {
    const type= "dark";
    const primary= cyan;
    const secondary= pink;
    const error= pink;
    const major= red;
    const minor= deepOrange;
    const alarm= {
        major: {
            light:major['400'],
            main: major['700'],
            dark: major['800'],
        },
        minor: {
            light:minor['100'],
            main: minor['200'],
            dark: minor['300']
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


const themeProps = {
    lightLineColors: ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'],
    darkLineColors: [pink[500], lime[400], '#9c27b0', '#3f51b5', '#e91e63'],
    typography: {

    },
}

export const lightTheme = {
    palette: { ...lightPalette() },
    ...themeProps,
    lineColors: [indigo[400], pink[400], lime[400], '#FF9833', '#EF5D28'],
}

export const darkTheme = {
    palette: { ...darkPalette() },
    ...themeProps,
    lineColors: [pink[500], lime[400], '#9c27b0', '#3f51b5', '#e91e63'],
}

export const lightBlueGrey={
    palette: { ...lightBlueGreyPalette() },
    ...themeProps,
    lineColors: ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'],
}

export const darkOcean={
    palette: { ...darkOceanPalette() },
    ...themeProps,

    lineColors: [lightBlue[100], lime[300],pink[200], deepOrange[200], blue[200]],
    
}
export const themes={"Default Light":lightTheme,"Default Dark":darkTheme,"Light Blue-Grey":lightBlueGrey,'Ocean':darkOcean}
