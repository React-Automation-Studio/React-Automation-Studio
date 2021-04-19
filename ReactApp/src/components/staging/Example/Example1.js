import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';

import Slider from '../../BaseComponents/Slider';
import GraphY from '../../BaseComponents/GraphY';
import GraphXY from '../../BaseComponents/GraphXY';
import GraphXY2 from '../../BaseComponents/GraphXY2';
import SelectionList from '../../BaseComponents/SelectionList';
import ThumbWheel from '../../BaseComponents/ThumbWheel';



import ToggleButton from '../../BaseComponents/ToggleButton';


import Gauge from '../../BaseComponents/Gauge';

import AppBar from '@material-ui/core/AppBar';

import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';

import Divider from '@material-ui/core/Divider';




import withWidth from '@material-ui/core/withWidth';


import StyledIconIndicator from '../../BaseComponents/StyledIconIndicator';

import TraditionalLayout from '../../UI/Layout/ComposedLayouts/TraditionalLayout.js';

import { useLocalPV } from '../../SystemComponents/LocalPV'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0, flexGrow: 1 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  body1: theme.typography.body1,
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    overflowX: "hidden",
    overflowY: "hidden",
  },
  paper: {
    padding: theme.spacing(1) * 0,
    margin: theme.spacing(1) * 0,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(1) * 2,
  },
});

const Example1 = (props) => {
  //const [select,setSelect]=useState(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(0);
  const editorType = useLocalPV({ pv: 'loc://editorType', })

  const handleChange = (event, value) => {
    setShowAdvancedSettings(value);
  };



  // const handleStateChange=(stateValue)=>{
  //   //console.log(stateValue)
  //   setSelect(stateValue)
  // };






  const { width } = props;
  //console.log('width',width)

  const { classes } = props;
  // console.log('classes justin test1',classes)



  //console.log(softLim);

  let graphVH;


  if (width === 'xs') {
    graphVH = '25vh';
  } else if (width === 'sm') {
    graphVH = '30vh'
  } else {
    graphVH = '30vh'
  }

  const [updateRate, setUpdateRate] = useState(500);
  const [maxLength, setMaxLength] = useState(10000);

  const [makeNewSocketIoConnection, setMakeNewSocketIoConnection] = useState(false);
  const [noOfGraphs, setNoOfGraphs] = useState(1);
  const [graphWidth, setGraphWidth] = useState(12);
  //console.log('window.innerHeight',window.innerHeight)

  const getGraphs = (noOfGraphs, width) => {
    const graphs = [];

    let i = 0;
    for (i = 0; i < noOfGraphs; i++) {
      graphs.push(
        <Grid item xs={width} key={i.toString()}>
          <GraphY pvs={['pva://testIOC:test4', 'pva://testIOC:test5',
            'pva://testIOC:test3'
          ]} legend={['Sine Wave', 'Amplitude']}
            maxLength={maxLength}
            updateRate={updateRate}
            makeNewSocketIoConnection={makeNewSocketIoConnection === true}
          // title={"Test"}
          //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
          />

<div style={{height:'25vh',width:'25vh'}}>
  <GraphXY  
    xPVs={
      ['pva://testIOC:BeamSweepSim:x.AVAL',
       'pva://testIOC:BeamSweepSim:x1.AVAL',
       'pva://testIOC:BeamSweepSim:x2.AVAL'
      ]
    }  
    yPVs={
      ['pva://testIOC:BeamSweepSim:y.AVAL',
       'pva://testIOC:BeamSweepSim:y1.AVAL',
       'pva://testIOC:BeamSweepSim:y2.AVAL'
      ]
   }  

     yPVs={
      ['pva://testIOC:BeamSweepSim:y.AVAL',
       'pva://testIOC:BeamSweepSim:y1.AVAL',
       'pva://testIOC:BeamSweepSim:y2.AVAL'
      ]
   }  
    xmax={10000}
    ymax={10000}
    xmin={-10000}
    ymin={-10000}
    updateMode={'updateOnYChange'}
  />
</div>

<div style={{height:'50vh',width:'50vh'}}>
  <GraphXY2  
    xPVs={
      ['pva://testIOC:BeamSweepSim:x.AVAL',
       'pva://testIOC:BeamSweepSim:x1.AVAL',
       'pva://testIOC:BeamSweepSim:x2.AVAL'
      ]
    }  
    yPVs={
      ['pva://testIOC:BeamSweepSim:y.AVAL',
       'pva://testIOC:BeamSweepSim:y1.AVAL',
       'pva://testIOC:BeamSweepSim:y2.AVAL'
      ]
   }  

   pvs={
    ['pva://testIOC:BeamSweepSim:y.AVAL',
     'pva://testIOC:BeamSweepSim:y1.AVAL',
     'pva://testIOC:BeamSweepSim:y2.AVAL'
    ]
 }  
    xmax={10000}
    ymax={10000}
    xmin={-10000}
    ymin={-10000}
    updateMode={'updateOnYChange'}
  />
</div>
          {/* <GraphY

            pvs={[
              'pva://testIOC:MTextUpdate1',
              'pva://testIOC:MTextUpdate2',
              'pva://testIOC:MTextUpdate3',
              'pva://testIOC:MTextUpdate4',
              'pva://testIOC:MTextUpdate5'

            ]}
            maxLength={256}
            useTimeStamp
          />
          <GraphY
            pvs={['pva://testIOC:PS1:Readback', 'pva://testIOC:PS2:Readback', 'pva://testIOC:PS3:Readback']}
            maxLength={600}
            legend={[
              'Q1 readback',
              'Q2 readback',
              'Q3 readback',
            ]}
            yUnits={' A'}
            useTimeStamp={true}
            usePolling={true}
            pollingRate={100}
          /> */}
        </Grid>
      )
    }
    return (
      graphs
    )
  }





  return (

    <TraditionalLayout
      title="Mobile Layout Example"
      denseAppBar
      alignTitle="center"
    >


      <div style={{ paddingBottom: 48 }}>

        {showAdvancedSettings === 0 && <TabContainer key={'tabContainer0'}>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                alignItems={'stretch'}
                direction={'row'}
                justify={'flex-start'}
              >

                <Grid item xs={2}>
                  <TextField value={maxLength} onChange={(event) => setMaxLength(event.target.value)} label={"maxLength"} />
                </Grid>
                <Grid item xs={2}>
                  <TextField value={updateRate} onChange={(event) => setUpdateRate(event.target.value)} label={"updateRate"} />
                </Grid>

                <Grid item xs={2}>
                  <FormControlLabel
                    control={

                      <Checkbox checked={makeNewSocketIoConnection} onChange={(event) => setMakeNewSocketIoConnection(event.target.checked)} label={"updatmakeNewSocketIoConnectioneRate"} />
                    }
                    label={"New socket"}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField value={graphWidth} onChange={(event) => setGraphWidth(event.target.value)} label={"graphWidth"} />
                </Grid>
                <Grid item xs={2}>
                  <TextField value={noOfGraphs} onChange={(event) => setNoOfGraphs(event.target.value)} label={"noOfGraphs"} />
                </Grid>
                <Grid item xs={2}>

                </Grid>


                {
                  getGraphs(noOfGraphs, graphWidth)
                }
                {/* <Grid item xs={4} >
                  
                    <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5',
                    'pva://testIOC:test3'
                  ] } legend={['Sine Wave','Amplitude']}
                    maxLength={maxLength}
                    updateRate={updateRate}
                    makeNewSocketIoConnection={makeNewSocketIoConnection===true}
                     // title={"Test"}
                     //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                     />
                
                </Grid>
                <Grid item xs={4} >
                  
                    <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5',
                    'pva://testIOC:test3'
                  ] } legend={['Sine Wave','Amplitude']}
                    maxLength={maxLength}
                    updateRate={updateRate}
                    makeNewSocketIoConnection={makeNewSocketIoConnection===true}
                     // title={"Test"}
                     //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                     />
                
                </Grid>
                <Grid item xs={4} >
                  
                    <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5',
                    'pva://testIOC:test3'
                  ] } legend={['Sine Wave','Amplitude']}
                    maxLength={maxLength}
                    updateRate={updateRate}
                    makeNewSocketIoConnection={makeNewSocketIoConnection===true}
                     // title={"Test"}
                     //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                     />
                
                </Grid>
                <Grid item xs={4} >
                  
                    <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5',
                    'pva://testIOC:test3'
                  ] } legend={['Sine Wave','Amplitude']}
                    maxLength={maxLength}
                    updateRate={updateRate}
                    makeNewSocketIoConnection={makeNewSocketIoConnection===true}
                     // title={"Test"}
                     //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                     />
                
                </Grid>
                <Grid item xs={4} >
                  
                    <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5',
                    'pva://testIOC:test3'
                  ] } legend={['Sine Wave','Amplitude']}
                    maxLength={maxLength}
                    updateRate={updateRate}
                    makeNewSocketIoConnection={makeNewSocketIoConnection===true}
                     // title={"Test"}
                     //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                     />
                
                </Grid>
                <Grid item xs={4} >
                  
                    <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5',
                    'pva://testIOC:test3'
                  ] } legend={['Sine Wave','Amplitude']}
                    maxLength={maxLength}
                    updateRate={updateRate}
                    makeNewSocketIoConnection={makeNewSocketIoConnection===true}
                     // title={"Test"}
                     //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                     />
                
                </Grid> */}

                <Grid item xs={6} sm={4} lg={3} >

                  <Gauge pv='pva://$(device):amplitude' macros={{ '$(device)': 'testIOC' }} prec={3} usePvMinMax={true} />

                </Grid>

                <Grid item xs={2} sm={4} lg={5} >
                  <Grid container direction="column" justify="space-evenly" spacing={2} alignItems="stretch">
                    <Grid item>
                      <StyledIconIndicator pv='pva://$(device)' macros={{ '$(device)': 'testIOC:BO1' }} onColor={props.theme.palette.ok.main} offColor='default' label={'On'} labelPlacement={'end'} />

                    </Grid>
                    <Grid item>
                      <StyledIconIndicator pv='pva://$(device)' macros={{ '$(device)': 'testIOC:BO1' }} onColor='default' offColor={props.theme.palette.error.main} label={'Off'} labelPlacement={'end'} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={4} lg={4} >

                  <ToggleButton pv='pva://$(device)' macros={{ '$(device)': 'testIOC:BO1' }} custom_selection_strings={["OFF", "ON"]} />
                </Grid>



                <Grid item xs={12} sm={12} md={12} lg={12}>


                  <SelectionList debug={false} horizontal={true} pv='loc://editorType' useStringValue={true} custom_selection_strings={['ThumbWheel', 'Slider']}
                    initialLocalVariableValue='ThumbWheel'
                  />





                </Grid>
                <Grid item xs={12}>
                  {editorType.value === 'None' &&
                    <Grid container direction="row" item xs={12} spacing={2}>
                      <Grid item xs={12} >
                      </Grid>
                    </Grid>}
                  {editorType.value === 'ThumbWheel' &&
                    <Grid container direction="row" item xs={12} >
                      <Grid item xs={12}>
                        <div style={{ textAlign: 'center', marginTop: '16px', }}>
                          <ThumbWheel
                            pv='pva://$(device)'
                            macros={{ '$(device)': 'testIOC:amplitude' }}
                            prec_integer={3}
                            prec_decimal={1}
                          />
                        </div>
                      </Grid>
                    </Grid>}
                  {editorType.value === 'Slider' &&
                    <div style={{ marginTop: '16px' }}>
                      <Grid container direction="row" item xs={12} spacing={2}>
                        <Grid item xs={12}  >
                          <Slider pv='pva://$(device):amplitude' macros={{ '$(device)': 'testIOC' }} usePvMinMax={true} />
                        </Grid>
                      </Grid>
                    </div>}
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </TabContainer>}
        {showAdvancedSettings === 1 && <TabContainer key={'tabContainer1'}>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems={'stretch'} direction={'column'} justify={'flex-start'}>


                <Grid item >
                  <div style={{ marginBottom: 8 }}>Settings</div>
                  <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                    <Grid item xs={12} lg={4}>
                      <TextInput pv='pva://$(device):frequency' macros={{ '$(device)': 'testIOC' }} usePvUnits={true} prec={1} usePvLabel={true} />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextInput pv='pva://$(device):amplitude' macros={{ '$(device)': 'testIOC' }} usePvUnits={true} usePvLabel={true} />
                    </Grid>
                  </Grid>


                </Grid>
                <Grid item ><Divider /></Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabContainer>}
      </div>

      <AppBar className={classes.body1} style={{ position: 'fixed', bottom: 0, top: 'auto' }} color='inherit'>
        <Tabs value={showAdvancedSettings} onChange={handleChange} variant="fullWidth" scrollButtons="off">
          {/* <Tab icon={<SupervisorAccount />} /> */}
          <Tab icon={<AccountCircle />} />
          <Tab icon={<Settings />} />
        </Tabs>
      </AppBar>

    </TraditionalLayout>

  );
}




export default withWidth()(withStyles(styles, { withTheme: true })(Example1));
