import React from 'react';
import PropTypes from 'prop-types';

/**
 * SVG Canvas for the SVG beamline components
 */
const BeamLineCanvas = (props) => {
    return (
        <svg
            height={props.height}
            width={props.width}
            {... props.svgProps}
        >
            {props.children}
        </svg>
    )
}

BeamLineCanvas.propTypes = {
    /**
     * SVG Canvas height
     */
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,

    /**
     * SVG Canvas width
     */
    width: PropTypes.oneOfType([
       PropTypes.number,
       PropTypes.string,
    ]).isRequired,
    
    /**
     * SVG beam line components
      
     */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    /**
     * Any SVG props can passed to the canvas as an object
     */
    svgProps: PropTypes.object,
};

BeamLineCanvas.defaultProps = {
};

export default BeamLineCanvas
