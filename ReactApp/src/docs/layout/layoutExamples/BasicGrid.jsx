import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 8,
  textAlign: 'center',

  
}));
/**
 * @visibleName Basic Grid Layout
 */
function BasicGrid() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledPaper>xs=12</StyledPaper>
      </Grid>
      <Grid item xs={6}>
        <StyledPaper>xs=6</StyledPaper>
      </Grid>
      <Grid item xs={6}>
        <StyledPaper>xs=6</StyledPaper>
      </Grid>
      <Grid item xs={3}>
        <StyledPaper>xs=3</StyledPaper>
      </Grid>
      <Grid item xs={3}>
        <StyledPaper>xs=3</StyledPaper>
      </Grid>
      <Grid item xs={3}>
        <StyledPaper>xs=3</StyledPaper>
      </Grid>
      <Grid item xs={3}>
        <StyledPaper>xs=3</StyledPaper>
      </Grid>
    </Grid>
  );
}

export default BasicGrid;
