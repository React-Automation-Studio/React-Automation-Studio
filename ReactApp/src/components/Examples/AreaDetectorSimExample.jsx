import React from "react";
import AreaDetector from "../AreaDetector/AreaDetector";

const AreaDetectorSimExample = () => {
  return (
    <AreaDetector
      titleProps={{
        title: "Area Detector Sim Example",
        alignTitle: "center",
        titleVariant: "h6",
        titleTextStyle: { textTransform: "uppercase" },
      }}
      macros={{ "$(P)": "ras:adsim:", "$(R)": "cam1:" }}
      pluginTypes={[
        "image1",
        "Pva1",
        "Proc1",
        "Trans1",
        "CC1",
        "CC2",
        "Over1",
        "ROI1",
        "ROI2",
        "ROI3",
        "ROI4",
        "Stats1",
        "Stats2",
        "Stats3",
        "Stats4",
        "Stats5",
        "Scatter1",
        "Gather1",
        "ROIStat1",
        "CB1",
        "Attr1",
        "FFT1",
        "Codec1",
        "Codec2",
        "BadPix1",
        "netCDF1",
        "TIFF1",
        "JPEG1",
        "Nexus1",
        "Magick1",
        "HDF1",
      ]}
    />
  );
};

export default AreaDetectorSimExample;
