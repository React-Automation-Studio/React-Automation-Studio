import React from 'react';
import { useTheme } from '@material-ui/core/styles';

const sevFill = (severity, darkTheme, major, minor) => {
    let fillColor = ""
    if (severity === 2) fillColor = major
    else if (severity === 1) fillColor = minor
    else fillColor = darkTheme ? "#FFF" : "#000"
    return fillColor
}


const Floor = (props) => {

    const darkTheme = props.type === 'dark'
    const theme = useTheme()

    const major = theme.palette.alarm.major.dark
    const minor = theme.palette.alarm.minor.dark

    const { alarmDict } = props

    const { building_fire, building_security } = alarmDict

    const { building_airtemp_sev, building_airtemp_val } = alarmDict
    const building_airtemp_fil = sevFill(building_airtemp_sev, darkTheme, major, minor)

    const { building_airhumidity_sev, building_airhumidity_val } = alarmDict
    const building_airhumidity_fil = sevFill(building_airhumidity_sev, darkTheme, major, minor)

    const { building_airpressure_diff_sev, building_airpressure_diff_val } = alarmDict
    const building_airpressure_diff_fil = sevFill(building_airpressure_diff_sev, darkTheme, major, minor)

    const { vault_door } = alarmDict

    const { vault_radiation_sev, vault_radiation_val } = alarmDict
    const vault_radiation_fil = sevFill(vault_radiation_sev, darkTheme, major, minor)

    const { cyclotron_interlocks, cyclotron_safety, cyclotron_RF1, cyclotron_RF2 } = alarmDict
    const { cyclotron_RF_pickup, cyclotron_RF_pickup_sev } = alarmDict
    const cyclotron_RF_pickup_fil = sevFill(cyclotron_RF_pickup_sev, darkTheme, major, minor)

    return (
        <g transform='translate(30,30)'>
            <defs id='defs8232'>
                <linearGradient id='linearGradient6075'>
                    <stop
                        id='stop6071'
                        offset='0'
                        stopColor='#000'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop6073'
                        offset='1'
                        stopColor='#000'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient id='linearGradient2630'>
                    <stop
                        id='stop2626'
                        offset='0'
                        stopColor='#00f'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop2628'
                        offset='1'
                        stopColor='#00f'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient id='linearGradient2614'>
                    <stop
                        id='stop2610'
                        offset='0'
                        stopColor='#00f'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop2612'
                        offset='1'
                        stopColor='#00f'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient id='linearGradient2588'>
                    <stop
                        id='stop2584'
                        offset='0'
                        stopColor='#00f'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop2586'
                        offset='1'
                        stopColor='#00f'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient id='linearGradient2572'>
                    <stop
                        id='stop2568'
                        offset='0'
                        stopColor='#00f'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop2570'
                        offset='1'
                        stopColor='#00f'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient id='linearGradient2540'>
                    <stop
                        id='stop2536'
                        offset='0'
                        stopColor='#00f'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop2538'
                        offset='1'
                        stopColor='#00f'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient id='linearGradient2400'>
                    <stop
                        id='stop2396'
                        offset='0'
                        stopColor='#00f'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop2398'
                        offset='1'
                        stopColor='#00f'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient id='linearGradient1200'>
                    <stop
                        id='stop1196'
                        offset='0'
                        stopColor='#00f'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop1198'
                        offset='1'
                        stopColor='#00f'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient id='linearGradient1176'>
                    <stop
                        id='stop1172'
                        offset='0'
                        stopColor='#00f'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop1174'
                        offset='1'
                        stopColor='#00f'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient
                    id='linearGradient2993'
                    x1='274.19'
                    x2='398.515'
                    y1='513.86'
                    y2='480.626'
                    gradientTransform='rotate(180 380.003 478.901)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2989'
                ></linearGradient>
                <linearGradient id='linearGradient2989'>
                    <stop
                        id='stop2985'
                        offset='0'
                        stopColor='#b3b3b3'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop2987'
                        offset='1'
                        stopColor='#b3b3b3'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient
                    id='linearGradient2947'
                    x1='211.948'
                    x2='313.929'
                    y1='431.109'
                    y2='484.87'
                    gradientTransform='translate(.426 -8.217)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2989'
                ></linearGradient>
                <linearGradient
                    id='linearGradient3092'
                    x1='-233.218'
                    x2='-183.943'
                    y1='-290.561'
                    y2='-290.561'
                    gradientTransform='translate(-132.302 -268.061)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient3078'
                ></linearGradient>
                <linearGradient id='linearGradient3078'>
                    <stop
                        id='stop3074'
                        offset='0'
                        stopColor={cyclotron_RF_pickup ? cyclotron_RF_pickup_fil : cyclotron_RF1 ? major : '#ffb380'}
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop3076'
                        offset='1'
                        stopColor={cyclotron_RF_pickup ? cyclotron_RF_pickup_fil : cyclotron_RF1 ? major : '#ffb380'}
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient
                    id='linearGradient2844'
                    x1='382.581'
                    x2='339.805'
                    y1='354.602'
                    y2='445.509'
                    gradientTransform='rotate(180 340.707 480.918)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2571'
                ></linearGradient>
                <linearGradient id='linearGradient2571'>
                    <stop
                        id='stop2567'
                        offset='0'
                        stopColor='#999'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop2569'
                        offset='1'
                        stopColor='#999'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient
                    id='linearGradient3064'
                    x1='311.756'
                    x2='407.911'
                    y1='309.398'
                    y2='410.079'
                    gradientTransform='translate(132.302 268.061)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient3062'
                ></linearGradient>
                <linearGradient id='linearGradient3062'>
                    <stop
                        id='stop3058'
                        offset='0'
                        stopColor='#ff0'
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop3060'
                        offset='1'
                        stopColor='#ff0'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient
                    id='linearGradient3042'
                    x1='105.864'
                    x2='7.2'
                    y1='316.144'
                    y2='408.198'
                    gradientTransform='translate(132.302 268.061)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient3062'
                ></linearGradient>
                <linearGradient
                    id='linearGradient3084'
                    x1='184.019'
                    x2='233.294'
                    y1='126.935'
                    y2='126.935'
                    gradientTransform='translate(132.302 268.061)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient3099'
                ></linearGradient>
                <linearGradient id='linearGradient3099'>
                    <stop
                        id='stop3074'
                        offset='0'
                        stopColor={cyclotron_RF_pickup ? cyclotron_RF_pickup_fil : cyclotron_RF2 ? major : '#ffb380'}
                        stopOpacity='1'
                    ></stop>
                    <stop
                        id='stop3076'
                        offset='1'
                        stopColor={cyclotron_RF_pickup ? cyclotron_RF_pickup_fil : cyclotron_RF2 ? major : '#ffb380'}
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient
                    id='linearGradient2573'
                    x1='311.225'
                    x2='339.805'
                    y1='359.49'
                    y2='456.261'
                    gradientTransform='translate(.426 -8.217)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2571'
                ></linearGradient>
                <linearGradient
                    id='linearGradient3034'
                    x1='102.636'
                    x2='8.797'
                    y1='103.643'
                    y2='8.827'
                    gradientTransform='translate(132.302 268.061)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient3048'
                ></linearGradient>
                <linearGradient id='linearGradient3048'>
                    <stop
                        id='stop3044'
                        offset='0'
                        stopColor='#ff0'
                        stopOpacity='0.999'
                    ></stop>
                    <stop
                        id='stop3046'
                        offset='1'
                        stopColor='#ff0'
                        stopOpacity='0'
                    ></stop>
                </linearGradient>
                <linearGradient
                    id='linearGradient3056'
                    x1='304.999'
                    x2='407.555'
                    y1='115.035'
                    y2='8.489'
                    gradientTransform='translate(132.302 268.061)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient3062'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1128-8'
                    x1='136.247'
                    x2='147.128'
                    y1='465.25'
                    y2='465.5'
                    gradientTransform='translate(-85.826 27.099)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient1200'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1192-1'
                    x1='23.497'
                    x2='31.503'
                    y1='504.938'
                    y2='504.938'
                    gradientTransform='translate(.495 -7.735)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient1200'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1682'
                    x1='46.372'
                    x2='64.003'
                    y1='503.438'
                    y2='503.938'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient1176'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1128-88'
                    x1='136.247'
                    x2='147.128'
                    y1='465.25'
                    y2='465.5'
                    gradientTransform='translate(-36.739 30.079)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient1200'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1128-88-9'
                    x1='136.247'
                    x2='147.128'
                    y1='465.25'
                    y2='465.5'
                    gradientTransform='translate(-22.053 29.85)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient1200'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1128-88-3'
                    x1='136.247'
                    x2='147.128'
                    y1='465.25'
                    y2='465.5'
                    gradientTransform='translate(-7.742 29.6)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient1200'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1128-1'
                    x1='136.247'
                    x2='147.128'
                    y1='465.25'
                    y2='465.5'
                    gradientTransform='matrix(1.1341 0 0 1.13408 625.49 -545.643)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient1200'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1202-3'
                    x1='442.891'
                    x2='467.47'
                    y1='845.776'
                    y2='862.136'
                    gradientTransform='translate(-105.424 -21.516)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient1200'
                ></linearGradient>
                <linearGradient
                    id='linearGradient2402'
                    x1='758.151'
                    x2='779.586'
                    y1='616.136'
                    y2='615.105'
                    gradientTransform='translate(-1.303 -7.924)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2400'
                ></linearGradient>
                <linearGradient
                    id='linearGradient1128-2'
                    x1='136.247'
                    x2='147.128'
                    y1='465.25'
                    y2='465.5'
                    gradientTransform='matrix(.89794 0 0 1.24342 -934.936 40.315)'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2400'
                ></linearGradient>
                <linearGradient
                    id='linearGradient2542'
                    x1='26.229'
                    x2='32.695'
                    y1='497.883'
                    y2='497.748'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2540'
                ></linearGradient>
                <linearGradient
                    id='linearGradient2560'
                    x1='51.695'
                    x2='58.21'
                    y1='498.046'
                    y2='498.014'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2572'
                ></linearGradient>
                <linearGradient
                    id='linearGradient2590'
                    x1='159.877'
                    x2='165.859'
                    y1='497.589'
                    y2='497.729'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2588'
                ></linearGradient>
                <linearGradient
                    id='linearGradient2608'
                    x1='-696.866'
                    x2='-690.366'
                    y1='619.297'
                    y2='618.813'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2614'
                ></linearGradient>
                <linearGradient
                    id='linearGradient2632'
                    x1='-780.435'
                    x2='-772.034'
                    y1='618.957'
                    y2='618.832'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient2630'
                ></linearGradient>
                <linearGradient
                    id='linearGradient6077'
                    x1='70.913'
                    x2='148.074'
                    y1='33.451'
                    y2='33.451'
                    gradientUnits='userSpaceOnUse'
                    xlinkHref='#linearGradient6075'
                ></linearGradient>
            </defs>
            <path
                id='dee1'
                fill='url(#linearGradient3056)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M469.131 269.39l79.177 79.176-39.1 40.566-139.78 73.311c-3.658 1.203-6.889 3.47-13.197-1.955-3.163-5.18-2.743-11.032 1.467-17.594l71.356-134.405z'
            ></path>
            <path
                id='dee4'
                fill='url(#linearGradient3034)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M133.63 349.35l79.176-79.176 40.566 39.1 73.312 139.78c1.203 3.658 3.469 6.89-1.955 13.197-5.18 3.163-11.032 2.743-17.595-1.466L172.73 389.428z'
            ></path>
            <path
                id='path2507'
                fill='url(#linearGradient2573)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M263.37 324.129l154.474.733-68.582 129.805-16.98-.044z'
            ></path>
            <path
                id='path2575'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.002'
                d='M280.965 335.248l14.296 32.746 91.028-.245 14.48-32.929z'
            ></path>
            <path
                id='path2577'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M327.518 446.07l26.514-.366'
            ></path>
            <ellipse
                id='rfwest'
                cx='340.958'
                cy='394.997'
                fill='url(#linearGradient3084)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.134'
                opacity='1'
                rx='24.071'
                ry='24.437'
            ></ellipse>
            <path
                id='dee3'
                fill='url(#linearGradient3042)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M213.24 684.398l-79.177-79.177 39.1-40.565 139.78-73.312c3.658-1.203 6.89-3.469 13.197 1.955 3.163 5.18 2.743 11.032-1.466 17.595l-71.357 134.404z'
            ></path>
            <path
                id='dee2'
                fill='url(#linearGradient3064)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M548.66 605.909l-79.177 79.176-40.566-39.1-73.312-139.78c-1.202-3.657-3.469-6.889 1.955-13.196 5.18-3.164 11.033-2.743 17.595 1.466l134.405 71.357z'
            ></path>
            <path
                id='path2507-4'
                fill='url(#linearGradient2844)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M418.47 629.49l-154.474-.733 68.582-129.804 16.98.043z'
            ></path>
            <path
                id='path2575-0'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.002'
                d='M400.875 618.372l-14.295-32.746-91.029.244-14.48 32.93z'
            ></path>
            <path
                id='path2577-3'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M354.322 507.549l-26.514.366'
            ></path>
            <ellipse
                id='rfeast'
                cx='-340.882'
                cy='-558.623'
                fill='url(#linearGradient3092)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.134'
                opacity='1'
                rx='24.071'
                ry='24.437'
                transform='scale(-1)'
            ></ellipse>
            <path
                id='path2860'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M194.457 402.328l61.582 32.501 61.582 32.502'
            ></path>
            <path
                id='path2862'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M315.003 466.005l.13 22.377'
            ></path>
            <path
                id='path2864'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M194.946 550.906l122.675-64.27'
            ></path>
            <path
                id='path2866'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M201.788 405.016l-.244 142.958'
            ></path>
            <path
                id='path2917'
                fill='url(#linearGradient2947)'
                fillOpacity='1'
                stroke='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                d='M202.642 407.642l-.044 138.022 111.757-58.319-.173-20.995z'
            ></path>
            <path
                id='path2870'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M310.29 463.42l-.245 27.126'
            ></path>
            <path
                id='path2872'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M341.873 487.431l7.257-4.838 8.43 10.416-8.003 5.987z'
            ></path>
            <path
                id='path2874'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M487.714 402.07L363.99 466.35'
            ></path>
            <path
                id='path2876'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M369.427 462.443l.785 15.657-11.75 5.184 128.906 68.428'
            ></path>
            <path
                id='path2878'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M484.949 402.588l11.75 75.34-12.96 4.32.346 67.909'
            ></path>
            <path
                id='path2868'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M198.611 484.926l133.672-9.775 21.993-6.11c4.055.285 7.83 1.779 10.508 9.042l1.711 13.93'
            ></path>
            <path
                id='path2973'
                fill='url(#linearGradient2993)'
                fillOpacity='1'
                stroke='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                d='M371.42 464.898l.519 14.478-10.447 4.582 122.43 64.942-.183-66.652 12.83-4.338-11.425-72.456z'
            ></path>
            <path
                id='path2995'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M475.963 462.894l3.456 9.677'
            ></path>
            <path
                id='path1130'
                fill='none'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M324.163 469.056h6.717l3.359 10.606-.354 3.182-9.192.884z'
            ></path>
            <path
                id='path1140'
                fill='none'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M347.32 465.874l1.591 8.131-5.303 3.006 10.253 10.253 12.905-12.021c-.943-3.418-3.064-6.128-6.364-8.132-3.573-1.594-7.634-2.456-13.082-1.237z'
            ></path>
            <path
                id='path1158'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M492.183 465.202l-21.75 10.875-.625 7.5 14.75 23.875 24.25-13.75z'
            ></path>
            <g
                id='g1222'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                transform='translate(.396 -7.606)'
            >
                <path id='path1208' d='M607.294 724.79h9.303'></path>
                <path id='path1210' d='M616.53 721.895v5.701'></path>
                <path id='path1214' d='M620.376 724.812h9.126'></path>
                <path id='path1216' d='M620.42 721.983v5.547'></path>
            </g>
            <path
                id='beam2'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M198.611 484.926L50.558 495.452'
            ></path>
            <path
                id='beam1'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M.058 494.952l24.5 1.5'
            ></path>
            <path
                id='path1213beam3'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M493.515 502.29l109.248 117.38'
            ></path>
            <path
                id='beam4'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M618.673 657.853l.353 99.702'
            ></path>
            <path
                id='beam5'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M616.905 765.333l-24.042 52.326'
            ></path>
            <path
                id='beam6'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.89'
                d='M619.026 768.515l-.353 40.66'
            ></path>
            <path
                id='quad1'
                fill='url(#linearGradient1128-8)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M45.674 478.724H58.424V505.974H45.674z'
                opacity='1'
                transform='rotate(5)'
            ></path>
            <path
                id='bend1'
                fill='url(#linearGradient1192-1)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M19.87 489.14H29.745V504.765H19.87z'
                opacity='1'
            ></path>
            <g
                id='bunch1'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                transform='rotate(-4 -69.634 477.746)'
            >
                <path
                    id='rect1160-0'
                    fill='none'
                    d='M32 485.375H51.25V521.5H32z'
                    opacity='1'
                ></path>
                <path
                    id='rect1162-3'
                    fill='url(#linearGradient1682)'
                    d='M29.875 492.063H53.375V514.813H29.875z'
                    opacity='1'
                ></path>
            </g>
            <g
                id='steer1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
            >
                <path
                    id='path8995-4'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.846'
                    d='M57.039 489.424l.156 2.225a5.472 4.12 86 00-.717 3.579 5.472 4.12 86 001.207 3.434l.158 2.26 6.293-.44-.157-2.249a5.472 4.12 86 00.719-3.58 5.472 4.12 86 00-1.21-3.438l-.156-2.23z'
                    opacity='1'
                ></path>
                <path
                    id='rect8993-4'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.756'
                    d='M23.747 491.202H28.082V504.746H23.747z'
                    opacity='1'
                    transform='rotate(-4)'
                ></path>
                <path
                    id='rect1042-4'
                    fill='url(#linearGradient2542)'
                    fillOpacity='1'
                    strokeWidth='0.749'
                    d='M22.744 492.16H29.115000000000002V503.774H22.744z'
                    opacity='1'
                    transform='rotate(-4)'
                ></path>
                <path
                    id='path1044-4'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeWidth='0.756'
                    d='M57.374 495.17l6.502-.455'
                ></path>
            </g>
            <g
                id='harp1'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='rotate(-4 96.816 1797.846)'
            >
                <path id='path1056-6' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-3' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-1' d='M160.75 488.906v13.188'></path>
                <path id='path1079-7' d='M157.563 491.625h13'></path>
                <path id='path1079-3-5' d='M157.563 495.688h13'></path>
                <path id='path1079-9-9' d='M157.563 499.688h13'></path>
            </g>
            <g
                id='steer2'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
            >
                <path
                    id='path8995-4-2'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.846'
                    d='M81.7 487.568l.156 2.225a5.472 4.12 86 00-.717 3.579 5.472 4.12 86 001.207 3.433l.158 2.26 6.293-.44-.157-2.248a5.472 4.12 86 00.72-3.58 5.472 4.12 86 00-1.21-3.438l-.156-2.23z'
                    opacity='1'
                ></path>
                <path
                    id='rect8993-4-1'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.756'
                    d='M48.478 491.071H52.813V504.615H48.478z'
                    opacity='1'
                    transform='rotate(-4)'
                ></path>
                <path
                    id='rect1042-4-7'
                    fill='url(#linearGradient2560)'
                    fillOpacity='1'
                    strokeWidth='0.749'
                    d='M47.474 492.029H53.845V503.643H47.474z'
                    opacity='1'
                    transform='rotate(-4)'
                ></path>
                <path
                    id='path1044-4-8'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeWidth='0.756'
                    d='M82.035 493.314l6.503-.455'
                ></path>
            </g>
            <g
                id='harp2'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='rotate(-4 77.485 1430.506)'
            >
                <path id='path1056-6-7' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-3-4' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-1-1' d='M160.75 488.906v13.188'></path>
                <path id='path1079-7-8' d='M157.563 491.625h13'></path>
                <path id='path1079-3-5-5' d='M157.563 495.688h13'></path>
                <path id='path1079-9-9-9' d='M157.563 499.688h13'></path>
            </g>
            <g
                id='slit1'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                transform='translate(.176 -7.792)'
            >
                <path id='path1114-5' d='M106.625 490.875l9.438 17'></path>
                <path id='path1116-3' d='M107.5 507.688l7.375-17.313'></path>
            </g>
            <path
                id='quad2'
                fill='url(#linearGradient1128-88)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M94.761 481.704H107.511V508.954H94.761z'
                opacity='1'
                transform='rotate(-2.5)'
            ></path>
            <path
                id='quad3'
                fill='url(#linearGradient1128-88-9)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M109.447 481.476H122.197V508.726H109.447z'
                opacity='1'
                transform='rotate(-2.5)'
            ></path>
            <path
                id='quad4'
                fill='url(#linearGradient1128-88-3)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M123.758 481.225H136.50799999999998V508.475H123.758z'
                opacity='1'
                transform='rotate(-2.5)'
            ></path>
            <g
                id='harp3'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='rotate(-4 47.63 479.115)'
            >
                <path id='path1056-6-7-4' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-3-4-8' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-1-1-8' d='M160.75 488.906v13.188'></path>
                <path id='path1079-7-8-8' d='M157.563 491.625h13'></path>
                <path id='path1079-3-5-5-9' d='M157.563 495.688h13'></path>
                <path id='path1079-9-9-9-7' d='M157.563 499.688h13'></path>
            </g>
            <g
                id='steer3'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
            >
                <path
                    id='path8995-4-2-6'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.846'
                    d='M190.404 479.767l.155 2.225a5.472 4.12 86 00-.717 3.579 5.472 4.12 86 001.208 3.433l.158 2.26 6.293-.44-.157-2.248a5.472 4.12 86 00.719-3.58 5.472 4.12 86 00-1.21-3.438l-.156-2.23z'
                    opacity='1'
                ></path>
                <path
                    id='rect8993-4-1-4'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.756'
                    d='M157.46 490.872H161.79500000000002V504.416H157.46z'
                    opacity='1'
                    transform='rotate(-4)'
                ></path>
                <path
                    id='rect1042-4-7-3'
                    fill='url(#linearGradient2590)'
                    fillOpacity='1'
                    strokeWidth='0.749'
                    d='M156.457 491.83H162.828V503.44399999999996H156.457z'
                    opacity='1'
                    transform='rotate(-4)'
                ></path>
                <path
                    id='path1044-4-8-0'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeWidth='0.756'
                    d='M190.739 485.513l6.502-.455'
                ></path>
            </g>
            <path
                id='valve1'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M178.642 479.69l6.733-.354-5.92 14.786 6.553-.343z'
            ></path>
            <path
                id='fcup1'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M171.144 480.324l4.619-.242.7 13.357-4.556.238'
            ></path>
            <path
                id='valve2'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M501.024 499.912l4.598 4.931-15.131 4.97 4.475 4.8z'
            ></path>
            <g
                id='steer4'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                transform='rotate(-43 479.159 646.416)'
            >
                <g
                    id='g1193-5'
                    fill='#00f'
                    fillOpacity='1'
                    transform='translate(1.442 -1.364)'
                >
                    <g id='g1185-4'>
                        <path
                            id='rect1157-0'
                            d='M588.625 571.31H591.313V582.25H588.625z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-5'
                            d='M591.25 572.688H592.625V580.688H591.25z'
                            opacity='1'
                        ></path>
                    </g>
                    <g id='g1181-9' transform='translate(-2 .155)'>
                        <path
                            id='rect1157-6-4'
                            d='M583.75 571.155H586.438V582.095H583.75z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-3-6'
                            d='M582.563 572.625H583.938V580.625H582.563z'
                            opacity='1'
                        ></path>
                    </g>
                </g>
                <path
                    id='path1195-9'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    d='M585.781 575.416h4.313'
                ></path>
            </g>
            <path
                id='fcup2'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M538.036 540.426l3.184 3.355-9.702 9.207-3.141-3.31'
            ></path>
            <g
                id='harp4'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='rotate(-43 394.272 58.972)'
            >
                <path id='path1056-4' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-7' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-7' d='M160.75 488.906v13.188'></path>
                <path id='path1079-5' d='M157.563 491.625h13'></path>
                <path id='path1079-3-4' d='M157.563 495.688h13'></path>
                <path id='path1079-9-8' d='M157.563 499.688h13'></path>
            </g>
            <path
                id='quad5'
                fill='url(#linearGradient1128-1)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.857'
                d='M774.624 -33.465H789.0840000000001V-2.5610000000000035H774.624z'
                opacity='1'
                transform='rotate(47.007) skewX(.014)'
            ></path>
            <g
                id='steer5'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                transform='rotate(-43 592.413 601.877)'
            >
                <g
                    id='g1193-5-6'
                    fill='#00f'
                    fillOpacity='1'
                    transform='translate(1.442 -1.364)'
                >
                    <g id='g1185-4-8'>
                        <path
                            id='rect1157-0-0'
                            d='M588.625 571.31H591.313V582.25H588.625z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-5-2'
                            d='M591.25 572.688H592.625V580.688H591.25z'
                            opacity='1'
                        ></path>
                    </g>
                    <g id='g1181-9-1' transform='translate(-2 .155)'>
                        <path
                            id='rect1157-6-4-0'
                            d='M583.75 571.155H586.438V582.095H583.75z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-3-6-5'
                            d='M582.563 572.625H583.938V580.625H582.563z'
                            opacity='1'
                        ></path>
                    </g>
                </g>
                <path
                    id='path1195-9-1'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    d='M585.781 575.416h4.313'
                ></path>
            </g>
            <g
                id='steer6'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                transform='rotate(-43 613.865 593.479)'
            >
                <g
                    id='g1193-5-0'
                    fill='#00f'
                    fillOpacity='1'
                    transform='translate(1.442 -1.364)'
                >
                    <g id='g1185-4-85'>
                        <path
                            id='rect1157-0-06'
                            d='M588.625 571.31H591.313V582.25H588.625z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-5-4'
                            d='M591.25 572.688H592.625V580.688H591.25z'
                            opacity='1'
                        ></path>
                    </g>
                    <g id='g1181-9-6' transform='translate(-2 .155)'>
                        <path
                            id='rect1157-6-4-2'
                            d='M583.75 571.155H586.438V582.095H583.75z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-3-6-58'
                            d='M582.563 572.625H583.938V580.625H582.563z'
                            opacity='1'
                        ></path>
                    </g>
                </g>
                <path
                    id='path1195-9-6'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    d='M585.781 575.416h4.313'
                ></path>
            </g>
            <g
                id='harp5'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='rotate(-43 460.56 32.18)'
            >
                <path id='path1056-4-8' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-7-4' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-7-7' d='M160.75 488.906v13.188'></path>
                <path id='path1079-5-2' d='M157.563 491.625h13'></path>
                <path id='path1079-3-4-4' d='M157.563 495.688h13'></path>
                <path id='path1079-9-8-0' d='M157.563 499.688h13'></path>
            </g>
            <g
                id='harp6'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='rotate(-43 526.12 5.904)'
            >
                <path id='path1056-4-2' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-7-9' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-7-9' d='M160.75 488.906v13.188'></path>
                <path id='path1079-5-0' d='M157.563 491.625h13'></path>
                <path id='path1079-3-4-8' d='M157.563 495.688h13'></path>
                <path id='path1079-9-8-1' d='M157.563 499.688h13'></path>
            </g>
            <path
                id='bend2'
                fill='url(#linearGradient1202-3)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.789'
                d='M315.299 799.42H353.74V848.452H315.299z'
                opacity='1'
                transform='matrix(.9254 -.379 .3703 .92891 0 0)'
            ></path>
            <g
                id='steer7'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                transform='translate(30.625 94.924)'
            >
                <g
                    id='g1193-4'
                    fill='#00f'
                    fillOpacity='1'
                    transform='translate(1.442 -1.364)'
                >
                    <g id='g1185-0'>
                        <path
                            id='rect1157-3'
                            d='M588.625 571.31H591.313V582.25H588.625z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-9'
                            d='M591.25 572.688H592.625V580.688H591.25z'
                            opacity='1'
                        ></path>
                    </g>
                    <g id='g1181-1' transform='translate(-2 .155)'>
                        <path
                            id='rect1157-6-9'
                            d='M583.75 571.155H586.438V582.095H583.75z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-3-69'
                            d='M582.563 572.625H583.938V580.625H582.563z'
                            opacity='1'
                        ></path>
                    </g>
                </g>
                <path
                    id='path1195-3'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    d='M585.781 575.416h4.313'
                ></path>
            </g>
            <g
                id='steer9'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                transform='translate(30.99 166.76)'
            >
                <g
                    id='g1193-0'
                    fill='#00f'
                    fillOpacity='1'
                    transform='translate(1.442 -1.364)'
                >
                    <g id='g1185-5'>
                        <path
                            id='rect1157-66'
                            d='M588.625 571.31H591.313V582.25H588.625z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-4'
                            d='M591.25 572.688H592.625V580.688H591.25z'
                            opacity='1'
                        ></path>
                    </g>
                    <g id='g1181-0' transform='translate(-2 .155)'>
                        <path
                            id='rect1157-6-0'
                            d='M583.75 571.155H586.438V582.095H583.75z'
                            opacity='1'
                        ></path>
                        <path
                            id='rect1159-3-4'
                            d='M582.563 572.625H583.938V580.625H582.563z'
                            opacity='1'
                        ></path>
                    </g>
                </g>
                <path
                    id='path1195-6'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    d='M585.781 575.416h4.313'
                ></path>
            </g>
            <g
                id='harp7'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='translate(454.802 188.904)'
            >
                <path id='path1056-8' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-2' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-9' d='M160.75 488.906v13.188'></path>
                <path id='path1079-96' d='M157.563 491.625h13'></path>
                <path id='path1079-3-0' d='M157.563 495.688h13'></path>
                <path id='path1079-9-2' d='M157.563 499.688h13'></path>
            </g>
            <g
                id='steer8'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
            >
                <path
                    id='path8995-61'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.846'
                    d='M612.98 699.661h2.23a5.472 4.12 0 003.52.965 5.472 4.12 0 003.51-.965h2.265v-6.308h-2.254a5.472 4.12 0 00-3.521-.967 5.472 4.12 0 00-3.514.967h-2.236z'
                    opacity='1'
                ></path>
                <path
                    id='rect8993-3'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.756'
                    d='M-698.674 611.971H-694.3389999999999V625.515H-698.674z'
                    opacity='1'
                    transform='rotate(-90)'
                ></path>
                <path
                    id='rect1042-2'
                    fill='url(#linearGradient2608)'
                    fillOpacity='1'
                    strokeWidth='0.749'
                    d='M-699.677 612.929H-693.306V624.543H-699.677z'
                    opacity='1'
                    transform='rotate(-90)'
                ></path>
                <path
                    id='path1044-1'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeWidth='0.756'
                    d='M618.735 699.728v-6.519'
                ></path>
            </g>
            <g
                id='harp8'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='translate(454.432 233.013)'
            >
                <path id='path1056-91' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-4' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-91' d='M160.75 488.906v13.188'></path>
                <path id='path1079-0' d='M157.563 491.625h13'></path>
                <path id='path1079-3-7' d='M157.563 495.688h13'></path>
                <path id='path1079-9-5' d='M157.563 499.688h13'></path>
            </g>
            <path
                id='valve3'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M611.623 710.522v-6.742l14.456 6.685v-6.562z'
            ></path>
            <path
                id='bend3'
                fill='url(#linearGradient2402)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.784'
                d='M740.666 598.65H770.49V618.477H740.666z'
                opacity='1'
                transform='matrix(.9762 .21685 -.1993 .97994 0 0)'
            ></path>
            <g
                id='steer10'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
            >
                <path
                    id='path8995-61-0'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.846'
                    d='M613.044 782.858h2.23a5.472 4.12 0 003.52.964 5.472 4.12 0 003.51-.964h2.266v-6.309h-2.254a5.472 4.12 0 00-3.522-.967 5.472 4.12 0 00-3.513.967h-2.237z'
                    opacity='1'
                ></path>
                <path
                    id='rect8993-3-4'
                    fill='none'
                    fillOpacity='0.999'
                    strokeWidth='0.756'
                    d='M-781.87 612.036H-777.535V625.5799999999999H-781.87z'
                    opacity='1'
                    transform='rotate(-90)'
                ></path>
                <path
                    id='rect1042-2-8'
                    fill='url(#linearGradient2632)'
                    fillOpacity='1'
                    strokeWidth='0.749'
                    d='M-782.874 612.994H-776.503V624.6080000000001H-782.874z'
                    opacity='1'
                    transform='rotate(-90)'
                ></path>
                <path
                    id='path1044-1-0'
                    fill='none'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeWidth='0.756'
                    d='M618.8 782.924v-6.518'
                ></path>
            </g>
            <g
                id='harp9'
                fill='none'
                stroke='#000'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeOpacity='1'
                strokeWidth='1'
                transform='translate(454.495 298.952)'
            >
                <path id='path1056-8-2' d='M167.688 488.906v13.188'></path>
                <path id='path1056-2-2-9' d='M164.063 488.906v13.188'></path>
                <path id='path1056-9-9-6' d='M160.75 488.906v13.188'></path>
                <path id='path1079-96-1' d='M157.563 491.625h13'></path>
                <path id='path1079-3-0-0' d='M157.563 495.688h13'></path>
                <path id='path1079-9-2-4' d='M157.563 499.688h13'></path>
            </g>
            <path
                id='valve4'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.756'
                d='M594.776 796.238l2.85-6.11 10.276 12.168 2.773-5.947z'
            ></path>
            <path
                id='quad6'
                fill='url(#linearGradient1128-2)'
                fillOpacity='1'
                stroke='#000'
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='0.799'
                d='M-816.857 601.876H-805.408V635.759H-816.857z'
                opacity='1'
                transform='rotate(-90)'
            ></path>
            <path
                id='path2503'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='7.559'
                d='M813.48 3.78l110.84.353.353 47.553-9.016 9.723L775.65 60.17l.707 83.616-8.308 9.369-752.008-.707.177 270.291'
            ></path>
            <path
                id='path2505'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='7.559'
                d='M.558 530.952l15.75-.5.125 270.875 575.625.125'
            ></path>
            <path
                id='path2508'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='7.563'
                d='M996.808 4.142h-36v93.093l-137.594-1.189-9.906 9.134-.181 711.419'
            ></path>
            <path
                id='path2510'
                fill='none'
                stroke='#000'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='7.559'
                d='M812.773 189.749l-138.34-.047-9.375 8.75v392'
            ></path>
            <path
                id='path2512'
                fill='none'
                stroke='#000'
                strokeDasharray='1, 2'
                strokeDashoffset='0'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1'
                d='M665.058 590.452V801.75H592.51'
            ></path>
            <path
                id='vaultdoor'
                fill='none'
                stroke={vault_door ? major : "#000"}
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='6.766'
                d='M928.032 3.747h29.214'
            ></path>
            <g
                id='security'
                fill={building_security ? major : darkTheme ? "#FFF" : "#000"}
                fillOpacity='1'
                transform='matrix(.02498 0 0 .02675 200.88 60.582)'
            >
                <g id='g3039' fill={building_security ? major : darkTheme ? "#FFF" : "#000"} fillOpacity='1'>
                    <path
                        id='path3037'
                        fill={building_security ? major : darkTheme ? "#FFF" : "#000"}
                        fillOpacity='1'
                        d='M794 10H206C98.2 10 10 98.2 10 206v588c0 107.8 88.2 196 196 196h588c107.8 0 196-88.2 196-196V206c0-107.8-88.2-196-196-196zM590.4 132.5l131.8 34-10.6 99.9H469.1l-10.6-99.9zm127.9 192.7c0 70.7-57.2 127.8-127.8 127.8H590.2c-70.5 0-127.7-57.2-127.7-127.8 0-13.7 2.8-26.7 6.7-39h242.6c3.8 12.3 6.5 25.2 6.5 39zm31.6 542.3l-18.2-188-5.9 188H455.1s-4.1-215.2-4.5-220.6l-225 207.6c-7.2 7.2-16.7 10.8-26.2 10.8-9.4 0-18.9-3.6-26.1-10.8-14.5-14.4-14.5-37.8 0-52.3 0 0 236.5-284.2 300.3-304.3 36.8-11.6 61.3-14.9 104.6-14.9h24.6C722 483 770.6 522 802 586.1c9.2 18.9 24.3 164.2 35.5 281.5h-87.6zm-74.7-367.2c20.3 4.1 37.2 10.3 51.5 18L532.5 865.8h-61.6z'
                    ></path>
                </g>
            </g>
            <g
                id='airtemp'
                fill={building_airtemp_fil}
                fillOpacity='1'
                transform='matrix(.05472 0 0 .05532 29.142 20.551)'
            >
                <g id='g3163' fill={building_airtemp_fil} fillOpacity='1'>
                    <path
                        id='path3159'
                        d='M382.485 299.556V59.678C382.486 26.771 355.714 0 322.808 0h-30.626c-32.906 0-59.678 26.771-59.678 59.677V236.65c-2.163.463-4.216.7-6.185.7-3.614 0-7.496-.769-11.87-2.35-4.77-1.724-9.854-4.324-15.239-7.077-5.975-3.054-12.153-6.213-18.697-8.579-7.699-2.783-14.917-4.135-22.067-4.135-7.151 0-14.369 1.353-22.068 4.136-6.543 2.366-12.722 5.524-18.697 8.579-5.384 2.752-10.469 5.353-15.24 7.077-4.372 1.581-8.254 2.349-11.868 2.349-3.614 0-7.497-.769-11.869-2.349-7.792-2.816-16.391 1.215-19.207 9.006-2.816 7.791 1.216 16.39 9.006 19.207 7.699 2.783 14.917 4.136 22.069 4.136 7.151 0 14.37-1.353 22.067-4.136 6.546-2.366 12.724-5.524 18.697-8.579 5.386-2.753 10.472-5.354 15.24-7.078 4.373-1.58 8.255-2.349 11.869-2.349 3.614 0 7.497.769 11.868 2.349 4.769 1.724 9.855 4.324 15.241 7.077 5.974 3.055 12.151 6.213 18.696 8.579 7.699 2.783 14.917 4.136 22.068 4.136 2.052 0 4.112-.125 6.185-.349v32.557a100.55 100.55 0 00-9.553 12.643c-2.647-.327-5.453-1.025-8.501-2.128-4.77-1.724-9.854-4.324-15.239-7.077-5.975-3.054-12.153-6.213-18.697-8.579-7.699-2.783-14.917-4.135-22.067-4.135-7.151 0-14.369 1.353-22.068 4.136-6.543 2.366-12.722 5.524-18.697 8.579-5.384 2.752-10.469 5.353-15.24 7.077-4.371 1.581-8.253 2.349-11.868 2.349s-7.498-.768-11.869-2.349c-7.792-2.816-16.391 1.215-19.207 9.006-2.816 7.791 1.216 16.39 9.006 19.207 7.698 2.783 14.917 4.136 22.069 4.136 7.152 0 14.371-1.353 22.067-4.135 6.546-2.366 12.724-5.524 18.697-8.579 5.386-2.753 10.472-5.354 15.24-7.078 4.373-1.58 8.255-2.349 11.869-2.349 3.614 0 7.497.769 11.868 2.349 4.769 1.724 9.855 4.324 15.241 7.077 5.974 3.055 12.151 6.213 18.696 8.579a76.883 76.883 0 006.352 1.989 100.84 100.84 0 00-3.356 25.818c0 5.629.466 11.184 1.368 16.624-3.024-1.39-6.159-2.99-9.404-4.649-5.973-3.054-12.149-6.211-18.697-8.579-7.699-2.783-14.917-4.135-22.067-4.135-7.151 0-14.369 1.353-22.068 4.136-6.547 2.367-12.723 5.524-18.697 8.579-5.384 2.752-10.47 5.353-15.239 7.077-4.373 1.581-8.255 2.349-11.869 2.349-3.614 0-7.497-.769-11.87-2.349-7.79-2.817-16.39 1.217-19.206 9.008-2.816 7.791 1.217 16.39 9.008 19.206 7.699 2.783 14.917 4.135 22.067 4.135s14.368-1.353 22.068-4.136c6.545-2.367 12.723-5.525 18.696-8.579 5.384-2.752 10.469-5.352 15.24-7.077 4.373-1.58 8.255-2.349 11.869-2.349 3.614 0 7.497.769 11.868 2.349 4.772 1.725 9.857 4.325 15.241 7.077 5.974 3.054 12.151 6.212 18.698 8.58 5.883 2.126 11.484 3.411 16.99 3.902a100.965 100.965 0 0015.864 20.212c18.911 18.65 43.85 28.869 70.372 28.868.478 0 .961-.003 1.439-.01 26.064-.363 50.66-10.766 69.257-29.292 18.599-18.527 29.094-43.084 29.553-69.146.449-25.481-8.472-49.507-25.242-68.338zm-145.239 66.538c0-18.89 7.392-36.615 20.813-49.91a15 15 0 004.444-10.657V59.677c0-16.364 13.313-29.677 29.678-29.677h30.626c16.364 0 29.678 13.313 29.678 29.677v245.85a15 15 0 004.444 10.657c13.756 13.626 21.144 31.803 20.803 51.183-.661 37.507-31.718 68.447-69.232 68.969-18.943.258-36.838-6.917-50.329-20.221-13.493-13.308-20.925-31.072-20.925-50.021z'
                    ></path>
                    <path
                        id='path3161'
                        d='M337.332 366.094c0-11.008-5.966-20.617-14.837-25.789V71.604c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15v268.702c-8.871 5.171-14.837 14.78-14.837 25.789 0 16.479 13.359 29.837 29.837 29.837 16.478-.001 29.837-13.359 29.837-29.838z'
                    ></path>
                </g>
            </g>
            <g
                id='fire'
                fill={building_fire ? major : darkTheme ? "#FFF" : "#000"}
                fillOpacity='1'
                transform='matrix(.0332 0 0 .0344 199.684 20.495)'
            >
                <g id='g3333' fill={building_fire ? major : darkTheme ? "#FFF" : "#000"} fillOpacity='1'>
                    <g id='_x37__15_' fill={building_fire ? major : darkTheme ? "#FFF" : "#000"} fillOpacity='1'>
                        <g id='g3330' fill={building_fire ? major : darkTheme ? "#FFF" : "#000"} fillOpacity='1'>
                            <path
                                id='path3328'
                                fill={building_fire ? major : darkTheme ? "#FFF" : "#000"}
                                fillOpacity='1'
                                d='M609.764 163.663C506.548 193.086 487.646 276.53 494.308 329.538 420.68 242.987 423.692 143.42 423.692 0 187.531 89.046 242.446 345.733 235.384 423.692c-59.387-48.631-70.615-164.77-70.615-164.77-62.707 32.271-94.154 118.422-94.154 188.308 0 169.006 136.994 306 306 306s306-136.994 306-306c0-100.438-73.746-146.762-72.851-283.567zm-221.379 542.49c-149.493 0-270.692-126.143-270.692-267.75 0-32.906.729-59.575 23.538-85.327-2.495 14.9 32.883 142.526 148.41 135.84-5.014-96.955-31.235-334.481 90.576-416.583-10.781 129.085 20.831 302.493 161.851 327.82-8.074-51.761-7.133-137.888 29.141-153.8 3.884 79.301 62.541 128.237 62.541 204.455-.001 138.006-133.534 255.345-245.365 255.345z'
                            ></path>
                        </g>
                    </g>
                </g>
            </g>
            <path
                id='airpressure'
                d='M46.304 60.707v2.039h3.434v2.038H48.02v2.038h1.717v2.039H48.02v2.038h1.717v2.039H48.02v2.038h1.717v2.039H48.02v2.038h1.717v2.039H48.02v2.038h1.717v2.039h-3.434v2.038h5.15v-26.5zm-13.733 2.039c0 4.896-.772 6.648-1.636 8.854-.809 2.065-1.67 4.524-1.777 9.492h-3.454l4.292 5.096 4.292-5.096h-3.393c.102-4.6.805-6.613 1.596-8.632.852-2.178 1.797-4.543 1.797-9.714zm10.3 0c0 4.896-.772 6.648-1.636 8.854-.809 2.065-1.67 4.524-1.777 9.492h-3.454l4.292 5.096 4.292-5.096h-3.393c.102-4.6.805-6.613 1.596-8.632.852-2.178 1.797-4.543 1.797-9.714z'
                style={{
                    lineHeight: "normal",
                    WebkitTextIndent: "0",
                    textIndent: "0",
                    WebkitTextAlign: "start",
                    textAlign: "start",
                    WebkitTextDecorationLine: "none",
                    textDecorationLine: "none",
                    WebkitTextDecorationStyle: "solid",
                    textDecorationStyle: "solid",
                    WebkitTextDecorationColor: "#000000",
                    textDecorationColor: "#000000",
                    WebkitTextTransform: "none",
                    textTransform: "none",
                    isolation: "auto",
                    mixBlendMode: "normal",
                }}
                fill={building_airpressure_diff_fil}
                fillOpacity='1'
                strokeWidth='1.871'
                textDecoration='none'
            ></path>
            <path
                id='airhumidity'
                fill={building_airhumidity_fil}
                fillOpacity='1'
                strokeWidth='1.926'
                d='M37.228 100.685c-6.799 0-12.33 5.702-12.33 12.712s5.531 12.712 12.33 12.712a.949.978 0 00.2-.02 12.327 12.327 0 001.715-.152 7.841 7.841 0 01-.719-1.86c-.392.046-.792.076-1.196.076-5.774 0-10.433-4.804-10.433-10.757 0-5.952 4.66-10.756 10.433-10.756 4.868 0 8.943 3.43 10.103 8.064a.949.978 0 000 .004c.06.238.094.483.137.725l.44.524c.361.426.958 1.163 1.62 2.055.008-.206.03-.408.03-.615 0-1.028-.128-2.053-.364-3.045a.949.978 0 00-.025-.137c-1.372-5.484-6.207-9.53-11.941-9.53zm0 3.911c-4.703 0-8.536 3.952-8.536 8.8a.949.978 0 101.897 0c0-3.791 2.961-6.844 6.639-6.844.781 0 1.53.14 2.226.397l1.445-1.486a8.238 8.238 0 00-3.545-.86.949.978 0 00-.126-.007zm5.672 1.948a.949.978 0 00-.652.294l-5.69 5.867a.949.978 0 101.34 1.383l5.691-5.867a.949.978 0 00-.69-1.677zm2.864 5.852l-.715.848s-1.212 1.435-2.43 3.224c-.61.894-1.224 1.878-1.701 2.85-.477.97-.845 1.909-.845 2.88 0 3.228 2.559 5.866 5.69 5.866 3.133 0 5.691-2.638 5.691-5.867 0-.97-.368-1.909-.844-2.88-.477-.971-1.092-1.955-1.7-2.85a43.931 43.931 0 00-2.431-3.223zm0 3.078c.417.517.8.948 1.597 2.117.576.845 1.147 1.768 1.56 2.608.412.84.636 1.618.636 1.998 0 2.173-1.686 3.912-3.793 3.912-2.108 0-3.794-1.74-3.794-3.912 0-.38.225-1.157.637-1.998.413-.84.984-1.763 1.56-2.608.796-1.169 1.179-1.6 1.597-2.117z'
                fontFamily='sans-serif'
                fontWeight='400'
                overflow='visible'
                style={{
                    lineHeight: "normal",
                    WebkitTextIndent: "0",
                    textIndent: "0",
                    WebkitTextAlign: "start",
                    textAlign: "start",
                    WebkitTextDecorationLine: "none",
                    textDecorationLine: "none",
                    WebkitTextDecorationStyle: "solid",
                    textDecorationStyle: "solid",
                    WebkitTextDecorationColor: "#000000",
                    textDecorationColor: "#000000",
                    WebkitTextTransform: "none",
                    textTransform: "none",
                    whiteSpace: "normal",
                    isolation: "auto",
                    mixBlendMode: "normal",
                }}
                textDecoration='none'
            ></path>
            <g
                id='neutron'
                stroke={vault_radiation_fil}
                strokeDasharray='none'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='11.471'
                transform='matrix(.06776 0 0 .06789 56.668 194.402)'
            >
                <circle
                    id='circle2825'
                    cx='0'
                    cy='0'
                    r='260'
                    fill='#ff0'
                    fillOpacity='1'
                ></circle>
                <circle id='circle6' cx='0' cy='0' r='50'></circle>
                <path
                    id='bld'
                    d='M75 0a75 75 0 00-37.5-64.952L125-216.506A250 250 0 01250 0z'
                ></path>
                <use
                    id='use9'
                    width='600'
                    height='600'
                    x='0'
                    y='0'
                    transform='rotate(120)'
                    xlinkHref='#bld'
                ></use>
                <use
                    id='use11'
                    width='600'
                    height='600'
                    x='0'
                    y='0'
                    transform='rotate(-120)'
                    xlinkHref='#bld'
                ></use>
            </g>
            <text
                xmlSpace='preserve'
                style={{
                    lineHeight: "1.25",
                    InkscapeFontSpecification: "'sans-serif, Bold'",
                    fontVariantLigatures: "normal",
                    fontVariantCaps: "normal",
                    fontVariantNumeric: "normal",
                    fontFeatureSettings: "normal",
                    WebkitTextAlign: "start",
                    textAlign: "start",
                }}
                id='fire_text'
                x='240.59'
                y='43.158'
                fill='#fff'
                fillOpacity='1'
                stroke='none'
                fontFamily='sans-serif'
                fontSize='26.667'
                fontStretch='normal'
                fontStyle='normal'
                fontVariant='normal'
                fontWeight='bold'
                letterSpacing='0'
                textAnchor='start'
                wordSpacing='0'
                writingMode='lr-tb'
            >
                <tspan
                    id='tspan5236'
                    x='240.59'
                    y='43.158'
                    style={{
                        InkscapeFontSpecification: "'sans-serif, Bold'",
                        fontVariantLigatures: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontFeatureSettings: "normal",
                        WebkitTextAlign: "start",
                        textAlign: "start",
                    }}
                    fill={building_fire ? major : darkTheme ? "#FFF" : "#000"}
                    fillOpacity='1'
                    fontFamily='sans-serif'
                    fontSize='26.667'
                    fontStretch='normal'
                    fontStyle='normal'
                    fontVariant='normal'
                    fontWeight='bold'
                    textAnchor='start'
                    writingMode='lr-tb'
                >
                    {building_fire ? 'FIRE!' : "NO FIRE"}
                </tspan>
            </text>
            <text
                xmlSpace='preserve'
                style={{
                    lineHeight: "1.25",
                    InkscapeFontSpecification: "'sans-serif, Bold'",
                    fontVariantLigatures: "normal",
                    fontVariantCaps: "normal",
                    fontVariantNumeric: "normal",
                    fontFeatureSettings: "normal",
                    WebkitTextAlign: "start",
                    textAlign: "start",
                }}
                id='security_text'
                x='240.024'
                y='83.664'
                fill={building_security ? major : darkTheme ? "#FFF" : "#000"}
                fillOpacity='1'
                stroke='none'
                fontFamily='sans-serif'
                fontSize='26.667'
                fontStretch='normal'
                fontStyle='normal'
                fontVariant='normal'
                fontWeight='bold'
                letterSpacing='0'
                textAnchor='start'
                wordSpacing='0'
                writingMode='lr-tb'
            >
                <tspan
                    id='tspan5236-0'
                    x='240.024'
                    y='83.664'
                    style={{
                        InkscapeFontSpecification: "'sans-serif, Bold'",
                        fontVariantLigatures: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontFeatureSettings: "normal",
                        WebkitTextAlign: "start",
                        textAlign: "start",
                    }}
                    fill={building_security ? major : darkTheme ? "#FFF" : "#000"}
                    fillOpacity='1'
                    fontFamily='sans-serif'
                    fontSize='26.667'
                    fontStretch='normal'
                    fontStyle='normal'
                    fontVariant='normal'
                    fontWeight='bold'
                    textAnchor='start'
                    writingMode='lr-tb'
                >
                    {building_security ? 'NOT SECURE' : "SECURE"}
                </tspan>
            </text>
            <text
                xmlSpace='preserve'
                style={{
                    lineHeight: "1.25",
                    InkscapeFontSpecification: "'sans-serif, Bold'",
                    fontVariantLigatures: "normal",
                    fontVariantCaps: "normal",
                    fontVariantNumeric: "normal",
                    fontFeatureSettings: "normal",
                    WebkitTextAlign: "start",
                    textAlign: "start",
                }}
                id='airtemp_reading'
                x='68.803'
                y='43.249'
                fill={building_airtemp_fil}
                fillOpacity='1'
                stroke='none'
                fontFamily='sans-serif'
                fontSize='26.667'
                fontStretch='normal'
                fontStyle='normal'
                fontVariant='normal'
                fontWeight='bold'
                letterSpacing='0'
                textAnchor='start'
                wordSpacing='0'
                writingMode='lr-tb'
            >
                <tspan
                    id='tspan5236-1'
                    x='68.803'
                    y='43.249'
                    style={{
                        InkscapeFontSpecification: "'sans-serif, Bold'",
                        fontVariantLigatures: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontFeatureSettings: "normal",
                        WebkitTextAlign: "start",
                        textAlign: "start",
                    }}
                    fill={building_airtemp_fil}
                    fillOpacity='1'
                    fontFamily='sans-serif'
                    fontSize='26.667'
                    fontStretch='normal'
                    fontStyle='normal'
                    fontVariant='normal'
                    fontWeight='bold'
                    textAnchor='start'
                    writingMode='lr-tb'
                >
                    {`${building_airtemp_val}°C`}
                </tspan>
            </text>
            <text
                xmlSpace='preserve'
                style={{ lineHeight: "1.25" }}
                id='airpressure_reading'
                x='66.711'
                y='83.574'
                fill='#fff'
                fillOpacity='1'
                stroke='none'
                fontFamily='sans-serif'
                fontSize='40'
                fontStyle='normal'
                fontWeight='normal'
                letterSpacing='0'
                wordSpacing='0'
            >
                <tspan
                    id='tspan6031'
                    x='66.711'
                    y='83.574'
                    style={{
                        InkscapeFontSpecification: "'sans-serif, Bold'",
                        fontVariantLigatures: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontFeatureSettings: "normal",
                        WebkitTextAlign: "start",
                        textAlign: "start",
                    }}
                    fill={building_airpressure_diff_fil}
                    fillOpacity='1'
                    fontFamily='sans-serif'
                    fontSize='26.667'
                    fontStretch='normal'
                    fontStyle='normal'
                    fontVariant='normal'
                    fontWeight='bold'
                    textAnchor='start'
                    writingMode='lr-tb'
                >
                    {`${building_airpressure_diff_val}Pa`}
                </tspan>
            </text>
            <text
                xmlSpace='preserve'
                style={{ lineHeight: "1.25" }}
                id='airhumidity_reading'
                x='64.339'
                y='124.081'
                fill='#fff'
                fillOpacity='1'
                stroke='none'
                fontFamily='sans-serif'
                fontSize='40'
                fontStyle='normal'
                fontWeight='normal'
                letterSpacing='0'
                wordSpacing='0'
            >
                <tspan
                    id='tspan6031-3'
                    x='64.339'
                    y='124.081'
                    style={{
                        InkscapeFontSpecification: "'sans-serif, Bold'",
                        fontVariantLigatures: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontFeatureSettings: "normal",
                        WebkitTextAlign: "start",
                        textAlign: "start",
                    }}
                    fill={building_airhumidity_fil}
                    fillOpacity='1'
                    fontFamily='sans-serif'
                    fontSize='26.667'
                    fontStretch='normal'
                    fontStyle='normal'
                    fontVariant='normal'
                    fontWeight='bold'
                    textAnchor='start'
                    writingMode='lr-tb'
                >
                    {`${building_airhumidity_val}%`}
                </tspan>
            </text>
            <text
                xmlSpace='preserve'
                style={{ lineHeight: "1.25" }}
                id='neutron_reading'
                x='91.93'
                y='204.109'
                fill='#fff'
                fillOpacity='1'
                stroke='none'
                fontFamily='sans-serif'
                fontSize='40'
                fontStyle='normal'
                fontWeight='normal'
                letterSpacing='0'
                wordSpacing='0'
            >
                <tspan
                    id='tspan6031-7'
                    x='91.93'
                    y='204.109'
                    style={{
                        InkscapeFontSpecification: "'sans-serif, Bold'",
                        fontVariantLigatures: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontFeatureSettings: "normal",
                        WebkitTextAlign: "start",
                        textAlign: "start",
                    }}
                    fill={vault_radiation_fil}
                    fillOpacity='1'
                    fontFamily='sans-serif'
                    fontSize='26.667'
                    fontStretch='normal'
                    fontStyle='normal'
                    fontVariant='normal'
                    fontWeight='bold'
                    textAnchor='start'
                    writingMode='lr-tb'
                >
                    {`${vault_radiation_val}uSv/h`}
                </tspan>
            </text>





        </g>
    )
};

export default Floor;