import React from "react";
import { DiscreteColorLegend } from "react-vis";

/**
 * Define Graph legend based on props.
 * @param {array} legendColor
 * @param {object} theme
 */
export const getLegend = (legendProps, legendColor, theme) => {
  if (legendProps !== undefined) {
    let legendItems = legendProps.map((item, idx) => {
      return {
        title: item.toString(),
        color: legendColor[idx],
        stroke: theme.palette.type == "dark" ? "#80deea" : "#dbdbe0",
      };
    });
    return (
      <DiscreteColorLegend
        color="#e89b02"
        orientation="horizontal"
        items={legendItems}
        style={{
          position: "absolute",
          right: "50px",
          top: "10px",
          color: theme.palette.type === "dark" ? "#ccccce" : "#dbdbe0",
          strokeWidth: 0.2,
        }}
      />
    );
  }
};

/**
 * Format received timestamp.
 * @param {Date} timestamp
 * @param {bool} extended
 */
export const formatTime = (timestamp, extended = false) => {
  let mydate = new Date(timestamp * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = mydate.getFullYear();
  let month = months[mydate.getMonth()];
  let date = mydate.getDate();
  let hour = mydate.getHours();
  let min = mydate.getMinutes();
  let sec = mydate.getSeconds();
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  if (extended) {
    return date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  }
  return hour + ":" + min + ":" + sec;
};

/**
 * Check given arrays are equal
 * @param {Array} array1
 * @param {Array} array2
 */
export const areArrayEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
};

/**
 * Apply log10 conversion to the given array (or single value).
 * Return an array.
 * @param {Array} value 
 */
export const log10Conversion = (value) => {
  return value.map((val) => val > 0 ? Math.log10(val) : null);
};
