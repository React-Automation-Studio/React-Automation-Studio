import React, { useState } from "react";

import TextOutput from "../BaseComponents/TextOutput";
import TextInput from "../BaseComponents/TextInput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableCell from "@mui/material/TableCell";
import SelectionInput from "../BaseComponents/SelectionInput";
import MultiActionButton from "./MultiActionButton";

import { useTheme } from "@mui/system";
import { StyledTableCell } from "./TableStyles";
import { Typography } from "@mui/material";
import Stack from "@mui/system/Stack";
const Info = (props) => {
  const {acquirePeriod}=props;
  const muiTextFieldProps = { size: "small", variant: "standard" };
  const theme = useTheme();
  const paperElevation = theme.palette.paperElevation;
  return (
    <Typography>
      This is the first preview of the AreaDetector component in React
      Automation Studio. It's still in development and is not considered
      production ready. Its only been tested with the SimDetector IOC. Included
      with RAS is a docker container with the SimDetector IOC and a test area
      detector.
      <br />
      <br />
      Use the quick launch buttons to start the the 4 sim modes below with
      settings based on the examples in the AreaDetectorSim documentation.
      <br />
      <br />
      {`For any other modes set the acquire period ${acquirePeriod} seconds in the Collect
      accordian. Otherwise in its current version it will overload the client.`}
      <br />
      <br />
      <Stack direction="row" spacing={2}>
        <MultiActionButton
          acquirePeriod={acquirePeriod}
          macros={props.macros}
          actionString="Peaks"
          simMode={"Peaks"}
          gainX={1}
          gainY={1}
          gain={200}
          gainRed={1}
          gainGreen={2}
          gainBlue={3}
          Offset={0}
          Noise={0}
          peakStartX={0}
          peakStartY={0}
          peakNumX={20}
          peakNumY={20}
          peakStepX={128}
          peakStepY={256}
          peakWidthX={10}
          peakWidthY={20}
          peakVariation={0}
          xSine1Amplitude={10}
          xSine1Frequency={200}
          xSine1Phase={0}
          xSine2Amplitude={0}
          xSine2Frequency={50}
          xSine2Phase={0}
          ySine1Amplitude={5}
          ySine1Frequency={100}
          ySine1Phase={0}
          ySine2Amplitude={0}
          ySine2Frequency={10}
          ySine2Phase={0}
          xSineOperation={"Add"}
          ySineOperation={"Add"}
        />
        <MultiActionButton
          acquirePeriod={acquirePeriod}
          macros={props.macros}
          actionString="Sine"
          simMode={"Sine"}
          gainX={1}
          gainY={1}
          gain={100}
          gainRed={1}
          gainGreen={1}
          gainBlue={1}
          Offset={0}
          Noise={0}
          peakStartX={0}
          peakStartY={0}
          peakNumX={20}
          peakNumY={20}
          peakStepX={128}
          peakStepY={256}
          peakWidthX={10}
          peakWidthY={20}
          peakVariation={0}
          xSine1Amplitude={1}
          xSine1Frequency={2}
          xSine1Phase={0}
          xSine2Amplitude={1}
          xSine2Frequency={50}
          xSine2Phase={0}
          ySine1Amplitude={1}
          ySine1Frequency={2}
          ySine1Phase={0}
          ySine2Amplitude={1}
          ySine2Frequency={20}
          ySine2Phase={0}
          xSineOperation={"Add"}
          ySineOperation={"Add"}
        />
        <MultiActionButton
          acquirePeriod={acquirePeriod}
          macros={props.macros}
          actionString="Linear Ramp"
          simMode={"LinearRamp"}
          gainX={1}
          gainY={1}
          gain={3}
          gainRed={1}
          gainGreen={2}
          gainBlue={3}
          Offset={0}
          Noise={0}
          peakStartX={0}
          peakStartY={0}
          peakNumX={20}
          peakNumY={20}
          peakStepX={128}
          peakStepY={256}
          peakWidthX={10}
          peakWidthY={20}
          peakVariation={0}
          xSine1Amplitude={10}
          xSine1Frequency={200}
          xSine1Phase={0}
          xSine2Amplitude={0}
          xSine2Frequency={50}
          xSine2Phase={0}
          ySine1Amplitude={5}
          ySine1Frequency={100}
          ySine1Phase={0}
          ySine2Amplitude={0}
          ySine2Frequency={10}
          ySine2Phase={0}
          xSineOperation={"Add"}
          ySineOperation={"Add"}
        />
        <MultiActionButton
          acquirePeriod={acquirePeriod}
          macros={props.macros}
          actionString="Offset&Noise"
          simMode={"Offset&Noise"}
          gainX={1}
          gainY={5}
          gain={200}
          gainRed={1}
          gainGreen={2}
          gainBlue={3}
          Offset={10}
          Noise={255}
          peakStartX={0}
          peakStartY={0}
          peakNumX={20}
          peakNumY={20}
          peakStepX={128}
          peakStepY={256}
          peakWidthX={10}
          peakWidthY={20}
          peakVariation={0}
          xSine1Amplitude={10}
          xSine1Frequency={200}
          xSine1Phase={0}
          xSine2Amplitude={0}
          xSine2Frequency={50}
          xSine2Phase={0}
          ySine1Amplitude={5}
          ySine1Frequency={100}
          ySine1Phase={0}
          ySine2Amplitude={0}
          ySine2Frequency={10}
          ySine2Phase={0}
          xSineOperation={"Add"}
          ySineOperation={"Add"}
        />
      </Stack>
    </Typography>
  );
};
export default Info;
