import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";

import TextInput from "../BaseComponents/TextInput";
import Slider from "../BaseComponents/Slider";
import ThreeScene from "./ThreeScene";
import TraditionalLayout from "../UI/Layout/ComposedLayouts/TraditionalLayout";
import SectionCard, { SubSection } from "../UI/SectionCard";

const Test3D = (props) => {
  const theme = useTheme();
  const elevation = theme.palette.paperElevation;

  return (
    <TraditionalLayout title="3D Object Control" denseAppBar alignTitle="center">
      <Box sx={{ p: 2, overflowX: "hidden" }}>
        <SectionCard elevation={elevation}>
          <SubSection icon={ViewInArOutlinedIcon} title="3D Object">
            <Stack spacing={2}>
              <Box
                sx={{
                  borderRadius: 1.5,
                  overflow: "hidden",
                  bgcolor: "background.default",
                }}
              >
                <ThreeScene />
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextInput
                    pv="testIOC:Cube1:xRotation"
                    macros={props.macros}
                    usePvMinMax
                    label="X rotation"
                    step={0.01}
                    prec={3}
                    units="rad"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextInput
                    pv="testIOC:Cube1:yRotation"
                    macros={props.macros}
                    usePvMinMax
                    label="Y rotation"
                    step={0.01}
                    prec={3}
                    units="rad"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ px: 2 }}>
                  <Slider
                    pv="testIOC:Cube1:xRotation"
                    macros={props.macros}
                    usePvMinMax
                    step={0.01}
                    prec={3}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ px: 2 }}>
                  <Slider
                    pv="testIOC:Cube1:yRotation"
                    macros={props.macros}
                    usePvMinMax
                    step={0.01}
                    prec={3}
                  />
                </Grid>
              </Grid>
            </Stack>
          </SubSection>
        </SectionCard>
      </Box>
    </TraditionalLayout>
  );
};

export default Test3D;
