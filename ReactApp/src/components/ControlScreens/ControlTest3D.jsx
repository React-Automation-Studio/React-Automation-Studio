//This example is deprecated and will be removed in a future release

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import Slider from "../BaseComponents/Slider";
import Grid from '@mui/material/GridLegacy';

import ControlRightEx1 from "../ControlScreens/GridComponents/ControlRightEx1";
import ControlTopEx1 from "../ControlScreens/GridComponents/ControlTopEx1";
import SideBar from "../SystemComponents/SideBar";
import ThreeScene from "../..//api/ThreeScene";

console.warn(
  "This example is deprecated and will be removed in a future release"
);

const ControlTest3D = (props) => {
  const theme = useTheme();
  const [editorType, setEditorType] = useState("PS");
  const [displayEditor, setDisplayEditor] = useState(false);
  const [editorMacros, setEditorMacros] = useState({ "$(device)": "" });

  const handlePsOnClick = (name) => {
    setEditorType("PS");
    setDisplayEditor(true);
    setEditorMacros({ "$(device)": name });
  };

  return (
    <div>
      <SideBar />
      <Grid container spacing={3}>
        <Grid item sm={9}>
          <div style={{ height: "25vh" }}>
            <ControlTopEx1
              macros={{
                "$(PS1)": "testIOC:PS1",
                "$(PS2)": "testIOC:PS2",
                "$(PS3)": "testIOC:PS3",
              }}
              handlePsOnClick={handlePsOnClick}
            />
          </div>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item sm={12}>
              <div style={{ height: "50vh", marginLeft: "25px" }}>
                <ThreeScene />
              </div>
            </Grid>
          </Grid>
          <div style={{ height: "25vh", marginLeft: "25px" }}>
            <div style={{ height: "50px", width: "400px" }}>
              <Slider
                pv="testIOC:Cube1:xRotation"
                macros={props["macros"]}
                usePvMinMax={true}
                min={1000}
                max={500}
                usePvLabel={true}
                step={0.1}
                prec={3}
              />
              <Slider
                pv="testIOC:Cube1:yRotation"
                macros={props["macros"]}
                usePvMinMax={true}
                min={1000}
                max={500}
                usePvLabel={true}
                step={0.1}
                prec={3}
              />
            </div>
          </div>
        </Grid>
        <Grid item sm={3}>
          {displayEditor === true &&
            editorMacros["$(device)"] === "testIOC:PS1" && (
              <ControlRightEx1 macros={editorMacros} />
            )}
          {displayEditor === true &&
            editorMacros["$(device)"] === "testIOC:PS2" && (
              <ControlRightEx1 macros={editorMacros} />
            )}
          {displayEditor === true &&
            editorMacros["$(device)"] === "testIOC:PS3" && (
              <ControlRightEx1 macros={editorMacros} />
            )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlTest3D;
