import React, { useEffect, useState, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import colormap from "colormap";
import ContextMenu from "../SystemComponents/ContextMenu";
import PV from "../SystemComponents/PV";
import { useEpicsPV } from "../SystemComponents/EpicsPV";
import Plot from "react-plotly.js";
import { isMobileOnly } from "react-device-detect";
import { replaceMacros } from "../SystemComponents/Utils/macroReplacement";
import { Typography } from "@mui/material";
const ImageCanvas = ({ data, width, height, colormapName }) => {
  const [colors, setColors] = useState(null);
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

  const canvasRef = useRef(null);
  const pixelSize = 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawHeatmap = () => {
      if (!Array.isArray(data) || !data.every(Array.isArray)) {
        // console.error("Data must be a 2D array.");
        return;
      }

      for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
          const color = colors[data[y][x]];
          ctx.fillStyle = color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    };
    if (colors) {
      drawHeatmap();
    }
  }, [data, pixelSize, colors, width, height]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};
/**
 * The CanvasPlot Component has been updated to Plotly.js scatter and line plot.
 * **Note**: The update includes a small breaking change.
 * See the backgroundColor prop for the workaround.
 */
const CanvasPlot = (props) => {
  const pv = useEpicsPV(props);
  const { initialized, value } = pv;
  const [data, setData] = useState(null);
  useEffect(() => {
    const Z = [];
    if (initialized) {
      if (value) {
        const { rows } = props;
        const cols = value.length / rows;

        // Initialize the 2D array Z

        // Populate Z with sub-arrays
        for (let i = 0; i < rows; i++) {
          const start = i * cols;
          const end = start + cols;
          Z.push(value.slice(start, end));
        }
      }
    }
    setData(Z);
  }, [initialized, value]);

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

  console.log(`{width: ${width}, height: ${height}}`);
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
          colormapName={props.colormapName}
        />
      </div>
    </div>
  );
};

CanvasPlot.propTypes = {
  /**Name of the image process variables, eg. ['$(device):test$(id0)','$(device):test$(id1)']*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id0)':'1','$(id1)':'2'}}*/
  macros: PropTypes.object,

  /**
   * Use this prop to make a seperate socket connection for the graph. It is experimental and can be possbily improve performace and for high data rate pv's and prevent slowing down the user interface
   */
  makeNewSocketIoConnection: PropTypes.bool,

  /** If the height is undefined then the height will be set to parents height, but if the aspectRatio is defined the the height will be set to the width multplied by the aspect ratio*/
  aspectRatio: PropTypes.number,
  /**
   * The backgorund color defaults to ```theme.palette.background.default```
   * For a Paper or a Card component set it to ```theme.palette.background.paper```
   */
  backgroundColor: PropTypes.string,
  /**
   * Set the width.
   */
  width: PropTypes.string,
  /**
   * Set the height.
   */
  height: PropTypes.string,

  /** number of elements in each row */
  rows: PropTypes.number,

  /**
   * Set the colormapName.
   */
  colormapName: PropTypes.string,
};

CanvasPlot.defaultProps = {
  rows: 1024,
  colormapName: "inferno",
  makeNewSocketIoConnection: false,
  debug: false,
};

export default CanvasPlot;
