import React, { useEffect, useState, useRef  } from "react";
import { useTheme } from "@mui/material/styles";
import colormap from "colormap";
import ContextMenu from "../SystemComponents/ContextMenu";
import { useEpicsPV } from "../SystemComponents/EpicsPV";
import { Typography } from "@mui/material";
import { useHeatmapWebWorker } from "./HeatmapWebWorker";
import { useDataTransformationWebWorker } from "./DataTransfromationWebworker";
const ImageCanvas = ({ data, width, height, colormapName }) => {
  const [colors, setColors] = useState(null);
  const imageData = useHeatmapWebWorker(data, colors); // Use the Web Worker for heatmap processing
  const canvasRef = useRef(null);

  // Generate colormap when colormapName changes
  useEffect(() => {
    setColors(
      colormap({
        colormap: colormapName,
        nshades: 256,
        format: "hex",
        alpha: 1,
      })
    );
  }, [colormapName]);

  // Render the ImageData onto the canvas
  useEffect(() => {
    if (imageData && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.putImageData(imageData, 0, 0);
    }
  }, [imageData]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: "1px solid gray" }}
    ></canvas>
  );
};
  

/**
 * The CanvasPlot Component has been updated to Plotly.js scatter and line plot.
 * **Note**: The update includes a small breaking change.
 * See the backgroundColor prop for the workaround.
 */
const CanvasPlot = ({
  rows= 1024,
  colormapName= "inferno",
  makeNewSocketIoConnection= true,
  useBinaryValue=true,
  debug= false,
  ...props
}:CanvasPlotProps) => {
  const pv = useEpicsPV({...props, useBinaryValue, debug, makeNewSocketIoConnection});
  const { initialized, value } = pv;
  
  const data = useDataTransformationWebWorker(value, rows,initialized); // Transform PV data into 2D array
  const theme = useTheme();
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : theme.palette.background.default;
  const paperRef = useRef(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleToggleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.target);
    setOpenContextMenu(!openContextMenu);
  };

  const handleContextMenuClose = () => {
    setOpenContextMenu(false);
  };

  const [openContextMenu, setOpenContextMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log(
        `handleResize offsetWidth: ${paperRef.current.offsetWidth}, offsetHeight: ${paperRef.current.offsetHeight}`
      );
      if (paperRef.current) {
        setHeight(
          props.aspectRatio
            ? paperRef.current.offsetWidth * props.aspectRatio
            : props.height
            ? props.height
            : paperRef.current.offsetHeight
        );
        setWidth(paperRef.current.offsetWidth);
      }
    };
    // The 'current' property contains info of the reference:
    // align, title, ... , width, height, etc.
    if (paperRef.current) {
      setHeight(
        props.aspectRatio
          ? paperRef.current.offsetWidth * props.aspectRatio
          : props.height
          ? props.height
          : paperRef.current.offsetHeight
      );
      setWidth(paperRef.current.offsetWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [paperRef, props.width, props.height, props.aspectRatio]);

  return (
    <div
      style={{ width: "100%", height: "100%", textAlign: "center" }}
      ref={paperRef}
    >
     
      <Typography variant="h6" style={{ padding: 8 }}>
        {`${pv.pvname}`}
      </Typography>
      <div
        onContextMenu={
          props.disableContextMenu ? undefined : handleToggleContextMenu
        }
        onPointerDownCapture={(event) => {
          if (event.button !== 0) {
            event.preventDefault();
            return;
          }
        }}
        style={{
          paddingRight: 8,
          paddingLeft: 8,
          paddingTop: 8,
          width: props.width ? props.width : width,
          height: props.aspectRatio
            ? height
            : props.height
            ? props.height
            : height,
          backgroundColor: backgroundColor,
        }}
      >
        {openContextMenu && (
          <ContextMenu
            disableProbe={props.disableProbe}
            open={openContextMenu}
            pvs={[pv]}
            handleClose={handleContextMenuClose}
            probeType={"readOnly"}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          />
        )}
        <ImageCanvas
          data={data}
          width={width}
          height={height}
          colormapName={colormapName}
        />
      </div>
    </div>
  );
};

interface CanvasPlotProps {
  /** Name of the image process variables, eg. ['$(device):test$(id0)','$(device):test$(id1)'] */
  pv: string;
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id0)':'1','$(id1)':'2'}} */
  macros?: object;

  /**
   * Use this prop to make a separate socket connection for the graph. It is experimental and can possibly improve performance and handle high data rate pv's without slowing down the user interface.
   */
  makeNewSocketIoConnection?: boolean;

  /** If the height is undefined then the height will be set to the parent's height, but if the aspectRatio is defined then the height will be set to the width multiplied by the aspect ratio. */
  aspectRatio?: number;
  /**
   * The background color defaults to ```theme.palette.background.default```.
   * For a Paper or a Card component, set it to ```theme.palette.background.paper```.
   */
  backgroundColor?: string;
  /**
   * Set the width.
   */
  width?: string;
  /**
   * Set the height.
   */
  height?: string;

  /** Number of elements in each row. */
  rows?: number;

  /**
   * Set the colormapName.
   */
  colormapName?: string;
  /**
   * use Binary Value as appose to json parsed value.
   */
   useBinaryValue?: boolean;
  /**
   * debug flag
   * */

  debug?: boolean;
}

export default CanvasPlot;
