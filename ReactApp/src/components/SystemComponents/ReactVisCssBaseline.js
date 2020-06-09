import Loadable from 'react-loadable';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => {
console.log(theme)
return({

  
  '@global':{
    '.react-vis-magic-css-import-rule': { display: 'inherit' },
    '.rv-treemap': { fontSize: '12px', position: 'relative' },
    '.rv-treemap__leaf': { overflow: 'hidden', position: 'absolute' },
    '.rv-treemap__leaf--circle': {
      alignItems: 'center',
      borderRadius: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    '.rv-treemap__leaf__content': {
      overflow: 'hidden',
      padding: '10px',
      textOverflow: 'ellipsis'
    },
    '.rv-xy-plot': { color: '#c3c3c3', position: 'relative' },
    '.rv-xy-plot canvas': { pointerEvents: 'none' },
    '.rv-xy-plot .rv-xy-canvas': { pointerEvents: 'none', position: 'absolute' },
    '.rv-xy-plot__inner': { display: 'block' },
    '.rv-xy-plot__axis__line': theme.palette.reactVis['.rv-xy-plot__axis__line'],
    '.rv-xy-plot__axis__tick__line': theme.palette.reactVis['.rv-xy-plot__axis__tick__line'],
    '.rv-xy-plot__axis__tick__text': theme.palette.reactVis['.rv-xy-plot__axis__tick__text'],
    '.rv-xy-plot__axis__title text': theme.palette.reactVis['.rv-xy-plot__axis__title text'],
    '.rv-xy-plot__grid-lines__line': theme.palette.reactVis['.rv-xy-plot__grid-lines__line'],
    '.rv-xy-plot__circular-grid-lines__line': {
      fillOpacity: '0',
      stroke: '#e6e6e9'
    },
    '.rv-xy-plot__series, .rv-xy-plot__series path': { pointerEvents: 'all' },
    '.rv-xy-plot__series--line': {
      fill: 'none',
      stroke: '#000',
      strokeWidth: '2px'
    },
    '.rv-crosshair': {
      position: 'absolute',
      fontSize: '11px',
      pointerEvents: 'none'
    },
    '.rv-crosshair__line': { background: '#47d3d9', width: '1px' },
    '.rv-crosshair__inner': { position: 'absolute', textAlign: 'left', top: '0' },
    '.rv-crosshair__inner__content': {
      borderRadius: '4px',
      background: '#3a3a48',
      color: '#fff',
      fontSize: '12px',
      padding: '7px 10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
    },
    '.rv-crosshair__inner--left': { right: '4px' },
    '.rv-crosshair__inner--right': { left: '4px' },
    '.rv-crosshair__title': { fontWeight: 'bold', whiteSpace: 'nowrap' },
    '.rv-crosshair__item': { whiteSpace: 'nowrap' },
    '.rv-hint': { position: 'absolute', pointerEvents: 'none' },
    '.rv-hint__content': {
      borderRadius: '4px',
      padding: '7px 10px',
      fontSize: '12px',
      background: '#3a3a48',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      color: '#fff',
      textAlign: 'left',
      whiteSpace: 'nowrap'
    },
    '.rv-discrete-color-legend': {
      boxSizing: 'border-box',
      overflowY: 'auto',
      fontSize: '12px'
    },
    '.rv-discrete-color-legend.horizontal': { whiteSpace: 'nowrap' },
    '.rv-discrete-color-legend-item': theme.palette.reactVis['.rv-discrete-color-legend-item'],
    '.rv-discrete-color-legend-item.horizontal': { display: 'inline-block' },
    '.rv-discrete-color-legend-item.horizontal .rv-discrete-color-legend-item__title': {
      marginLeft: '0',
      display: 'block'
    },
    '.rv-discrete-color-legend-item__color': {
      display: 'inline-block',
      verticalAlign: 'middle',
      overflow: 'visible'
    },
    '.rv-discrete-color-legend-item__color__path': {
      stroke: '#dcdcdc',
      strokeWidth: '2px'
    },
    '.rv-discrete-color-legend-item__title': { marginLeft: '10px' },
    '.rv-discrete-color-legend-item.disabled': { color: '#b8b8b8' },
    '.rv-discrete-color-legend-item.clickable': { cursor: 'pointer' },
    '.rv-discrete-color-legend-item.clickable:hover': { background: '#f9f9f9' },
    '.rv-search-wrapper': { display: 'flex', flexDirection: 'column' },
    '.rv-search-wrapper__form': { flex: '0' },
    '.rv-search-wrapper__form__input': {
      width: '100%',
      color: '#a6a6a5',
      border: '1px solid #e5e5e4',
      padding: '7px 10px',
      fontSize: '12px',
      boxSizing: 'border-box',
      borderRadius: '2px',
      margin: '0 0 9px',
      outline: '0'
    },
    '.rv-search-wrapper__contents': { flex: '1', overflow: 'auto' },
    '.rv-continuous-color-legend': { fontSize: '12px' },
    '.rv-continuous-color-legend .rv-gradient': {
      height: '4px',
      borderRadius: '2px',
      marginBottom: '5px'
    },
    '.rv-continuous-size-legend': { fontSize: '12px' },
    '.rv-continuous-size-legend .rv-bubbles': {
      textAlign: 'justify',
      overflow: 'hidden',
      marginBottom: '5px',
      width: '100%'
    },
    '.rv-continuous-size-legend .rv-bubble': {
      background: '#d8d9dc',
      display: 'inline-block',
      verticalAlign: 'bottom'
    },
    '.rv-continuous-size-legend .rv-spacer': {
      display: 'inline-block',
      fontSize: '0',
      lineHeight: '0',
      width: '100%'
    },
    '.rv-legend-titles': { height: '16px', position: 'relative' },
    '.rv-legend-titles__left, .rv-legend-titles__right, .rv-legend-titles__center': {
      position: 'absolute',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    '.rv-legend-titles__center': {
      display: 'block',
      textAlign: 'center',
      width: '100%'
    },
    '.rv-legend-titles__right': { right: '0' },
    '.rv-radial-chart .rv-xy-plot__series--label': { pointerEvents: 'none' }}
})
};

/**
 * This component injects CSS baseline for the React-Vis graph librbary.
 * The React-Vis scss styles were convereted using https://github.com/olavim/sass2jss
 * The styles are valid for react-vis 1.11.6
 * @param {*} props 
 */
const ReactVisCssBaseline=(props)=> {
  /* eslint-disable no-unused-vars */
  const { children = null} = props;
  /* eslint-enable no-unused-vars */
  return <React.Fragment>{children}</React.Fragment>;
}
export default withStyles(styles,{withTheme:true})(ReactVisCssBaseline)
