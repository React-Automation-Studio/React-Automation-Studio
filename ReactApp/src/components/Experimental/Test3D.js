import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";

import TextInput from "../BaseComponents/TextInput";

import Slider from "../BaseComponents/Slider";

import Grid from "@mui/material/Grid";

import ThreeScene from "../Experimental/ThreeScene";

import Card from "@mui/material/Card";
import TraditionalLayout from "../UI/Layout/ComposedLayouts/TraditionalLayout.js";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1) * 2,
  },
  paper: {
    padding: theme.spacing(1) * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});
const Test3D = (props) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setHeight(props.height ? props.height : ref.current.offsetHeight);
        setWidth(props.width ? props.width : ref.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref, props.width, props.height, props.aspectRatio]);
  return (
    <div>
      <TraditionalLayout title="Epics Control of a 3D Object" denseAppBar>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          style={{ paddingTop: 16 }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ width: "100%", height: "100%" }}
          >
            <div ref={ref} style={{ height: "100%", width: "100%" }}>
              <ThreeScene width={width} height={height} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card style={{ padding: 12 }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                {" "}
                <Grid item xs={6}>
                  <TextInput
                    pv="testIOC:Cube1:xRotation"
                    macros={props["macros"]}
                    usePvMinMax={true}
                    label="xRotation"
                    step={0.01}
                    prec={3}
                    units={"rad"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    pv="testIOC:Cube1:yRotation"
                    macros={props["macros"]}
                    usePvMinMax={true}
                    label="yRotation"
                    step={0.01}
                    prec={3}
                    units={"rad"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Slider
                    pv="testIOC:Cube1:xRotation"
                    macros={props["macros"]}
                    usePvMinMax={true}
                    label="xRotation:"
                    step={0.01}
                    prec={3}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Slider
                    pv="testIOC:Cube1:yRotation"
                    macros={props["macros"]}
                    usePvMinMax={true}
                    label="yRotation:"
                    step={0.01}
                    prec={3}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </TraditionalLayout>
    </div>
  );
};

Test3D.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Test3D);
