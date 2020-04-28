import React from "react";

/**
 * Unified all xPVs, yPVs and zPVs (with this order)
 * in a unique array. Then it returns the withWidget function.
 * @param {Component} WrappedComponent
 */
export default function withGraph(WrappedComponent) {
  return class Graph extends React.Component {
    render() {
      let pv = [];
      if (this.props.pvs !== undefined) {
        pv = this.props.pvs;
      } else {
        if (this.props.xPVs !== undefined) {
          pv = pv.concat(this.props.xPVs);
        }
        if (this.props.yPVs !== undefined) {
          pv = pv.concat(this.props.yPVs);
        }
        if (this.props.zPVs !== undefined) {
          pv = pv.concat(this.props.zPVs);
        }
      }
      return <WrappedComponent {...this.props} pv={pv} />;
    }
  };
}
