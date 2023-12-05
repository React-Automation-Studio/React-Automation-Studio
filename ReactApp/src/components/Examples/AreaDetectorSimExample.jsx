import React from 'react';
import AreaDetector from '../AreaDetector/AreaDetector'

const AreaDetectorSimExample = () => {
    return (
        <AreaDetector
            titleProps={{
                title: "Area Detector Sim Example",
                alignTitle: "center",
                titleVariant: "h6",
                titleTextStyle: { textTransform: 'uppercase' }
            }}
            macros={{"$(P)": "ras:adsim:", "$(R)": "cam1:"}}
        />
    );
};

export default AreaDetectorSimExample;