import React, { useState } from "react";

import TextOutput from "../BaseComponents/TextOutput";
import TextInput from "../BaseComponents/TextInput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableCell from "@mui/material/TableCell";
import SelectionInput from "../BaseComponents/SelectionInput";
import ActionButton from "../BaseComponents/ActionButton";

import Stack from "@mui/system/Stack";
import { useTheme } from "@mui/system";
import { StyledTableCell } from "./TableStyles";
import { Typography } from "@mui/material";

const Info = (props) => {
  const muiTextFieldProps = { size: "small", variant: "standard" };
  const theme = useTheme();
  const paperElevation = theme.palette.paperElevation;
  return (
    <Typography>
      This is the first preview of the AreaDetector component in React Automation Studio. It's still in development and is not considered production ready. 
      Its only been tested with the SimDetector IOC. Included with RAS is a docker container with the SimDetector IOC and a test area detector.
      <br/>
      <br/>
      Set the acquire period two 2 seconds in the Collect accordian.
      
      </Typography>
   
   
      
   
  );
};
export default Info;
