import React from "react";

/**
 * SVG Canvas for the SVG beamline components
 */
const BeamLineCanvas = (props: BeamLineCanvasProps) => {
  return (
    <svg height={props.height} width={props.width} {...props.svgProps}>
      {props.children}
    </svg>
  );
};

interface BeamLineCanvasProps {
  /**
   * SVG Canvas height
   */
  height: number | string;

  /**
   * SVG Canvas width
   */
  width: number | string;

  /**
   * SVG beam line components
   */
  children: React.ReactNode | React.ReactNodeArray;

  /**
   * Any SVG props can be passed to the canvas as an object
   */
  svgProps?: React.SVGProps<SVGSVGElement>;
}

export default BeamLineCanvas;
