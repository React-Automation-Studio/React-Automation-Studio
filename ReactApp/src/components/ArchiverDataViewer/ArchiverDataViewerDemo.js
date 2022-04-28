import React from 'react';
import ArchiverDataViewer from '../ArchiverDataViewer/ArchiverDataViewer'
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '../BaseComponents/ToggleButton'
import ThumbWheel from '../BaseComponents/ThumbWheel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { useTheme } from '@material-ui/core/styles';

const ArchiverDataViewerDemo = (props) => {
  const theme = useTheme();
  const footerContents = (
    <Grid container direction="row" justify="flex-start" alignItems="center" >
      <Grid item xs={12} style={{ paddingLeft: "1em" }}>
        <Typography>
          This demo requires the <a style={{ color: 'inherit' }} href="https://github.com/wduckitt/React-Automation-Studio-Demo-Archiver" 
          target="_blank"
          rel="noopener noreferrer"
          > demo EPICS archiver</a> to be running.
            </Typography>
      </Grid>
    </Grid>
  )
  return (
    <TraditionalLayout
      title="Archiver Viewer Examples"
      denseAppBar
      alignTitle="center"
    >
      <Grid
        container
        spacing={2}
        alignItems={'center'}
        direction={'row'}
        justify={'center'}
        style={{ paddingTop: 32, paddingLeft: 8, paddingRight: 8 }}
      >
        <Grid item xs={12} >
          <Paper elevation={theme.palette.paperElevation}>
            <ArchiverDataViewer
              archiver={"DEMO_ARCHIVER"}
              title={"Archived Data"}
              showButtons={true}
              defaultButtonsExpanded={true}
              livePolling={true}
              fromTimeOffset={'1m'}
              traces={
                [
                  {
                    pv: 'testIOC:BO1',
                    yAxis: 0
                  },
                  {
                    pv: 'testIOC:BO2',
                    yAxis: 1
                  },
                  {
                    pv: 'testIOC:amplitude',
                    yAxis: 2
                  },
                ]}
              yAxes={
                [
                  {
                    title: "BO1",
                  },
                  {
                    title: "BO2",
                  },
                  {
                    title: "Amplitude",
                  },
                ]}
              showLegend={true}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 64 }}>
          <Typography>
            Demo Buttons
            </Typography>
          <Paper elevation={theme.palette.paperElevation} >
            <Grid
              container
              spacing={2}
              alignItems={'center'}
              direction={'row'}
              justify={'center'}
            >
              <Grid item xs={6} lg={3}>
                <ToggleButton
                  usePvLabel={true}
                  pv='testIOC:BO1'
                />
              </Grid>
              <Grid item xs={6} lg={3}>
                <ToggleButton
                  usePvLabel={true}
                  pv='testIOC:BO2'
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <ThumbWheel
                  usePvLabel={true}
                  pv='testIOC:amplitude'
                  usePvMinMax={true}
                  labelPlacement='top'
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <AppBar style={{ position: 'fixed', bottom: 0, top: 'auto', height: 40 }} color={theme.palette.type === 'dark' ? "inherit" : "primary"}>
        {footerContents}
      </AppBar>
    </TraditionalLayout>
  )
}

export default ArchiverDataViewerDemo
