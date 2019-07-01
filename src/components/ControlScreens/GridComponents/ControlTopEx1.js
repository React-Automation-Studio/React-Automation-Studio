import React from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';
import SelectionInput from '../../BaseComponents/SelectionInput';
import TextOutput from '../../BaseComponents/TextOutput';
import SimpleSlider from '../../BaseComponents/SimpleSlider';
import TextUpdate from '../../BaseComponents/TextUpdate';
import Grid from '@material-ui/core/Grid';
import SwitchComponent from '../../BaseComponents/SwitchComponent';
import ToggleButton from '../../BaseComponents/ToggleButton';
import ActionButton from '../../BaseComponents/ActionButton';

import QuadrapoleMagnet from '../../SvgComponents/QuadrapoleMagnet';
import Harp from '../../SvgComponents/Harp';
import FC from '../../SvgComponents/FC';
import BendingMagnet from '../../SvgComponents/BendingMagnet';
import SteererXMagnet from '../../SvgComponents/SteererXMagnet';
import SteererXYMagnet from '../../SvgComponents/SteererXYMagnet';
import SlitXY from '../../SvgComponents/SlitXY';
import SvgElementTest from '../../SvgComponents/SvgElementTest';
//import MenuItem from '@material-ui/core/MenuItem';
import HorizontalBeamline from '../../SvgComponents/HorizontalBeamline';


class ControlToptEx1 extends React.Component {
  constructor(props) {
    super(props);
    this.state={}


    this.handleOnClick= this.handleOnClick.bind(this);
  }


  handleOnClick(device){
    //  console.log("in control top clicked "+device.toString());
    this.props.handlePsOnClick(device);
    //this.props.handlePsOnClick(device);
    //  this.setState({ ['clicked']: 1});
  };
  render() {

    const cX=50;
    const cY=50;
    return (

      <div style={{ padding: 12} }>


        <svg width="100%" height="400px">
          {/*  <linearGradient id={'rect-gradient'} gradientTransform="rotate(90)">

            <stop offset="0%" stopOpacity="0" />
            <stop offset="75%" stopColor={'grey'} />
            </linearGradient>
            <rect
            fill='url(#rect-gradient)'

            width="100%"
            height="10"
            x="0"
            y="45" />
          */}
          <HorizontalBeamline cx={0}
            cy={99}
            pv={'pva://testIOC:BeamlineA:BeamOn'}
            width={'113px'}
          />
          <HorizontalBeamline cx={'113px'}
            cy={99}
            pv={'pva://testIOC:BeamlineB:BeamOn'}
            width={'148px'}
          />
          <HorizontalBeamline cx={'261px'}
            cy={99}
            pv={'pva://testIOC:BeamlineC:BeamOn'}
            width={'150px'}
          />
          <HorizontalBeamline cx={'411px'}
            cy={99}
            pv={'pva://testIOC:BeamlineD:BeamOn'}
            width={'150px'}
          />
          <HorizontalBeamline cx={'561px'}
            cy={99}
            pv={'pva://testIOC:BeamlineE:BeamOn'}
            width={'850px'}
          />

          <FC

            cx={100}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:FC1','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            componentGradient={true}
            componentShadow={true}
            label='FC1'
          />
          <QuadrapoleMagnet
            handleOnClick={this.handleOnClick}
            cx={150}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:PS1','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='Q1'
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />
          <Harp

            cx={200}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:Harp1old','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='Harp1'

            textShadow={false}
            componentGradient={true}
          />
          <FC

            cx={250}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:FC2','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            componentGradient={true}
            componentShadow={true}


            label='FC2'
          />
          <QuadrapoleMagnet
            handleOnClick={this.handleOnClick}
            cx={300}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:PS2','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            alarmSensitive={true}
            label='Q2'
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />
          <Harp

            cx={350}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:Harp2old','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='Harp2'
            componentShadow={false}
            textShadow={false}
            componentGradient={true}
          />
          <FC

            cx={400}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:FC3','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            componentGradient={true}
            componentShadow={true}
            label='FC3'
          />
          <QuadrapoleMagnet
            handleOnClick={this.handleOnClick}
            cx={450}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:PS3','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            alarmSensitive={true}
            label='Q3'
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />

          <FC

            cx={550}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:FC4','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            componentShadow={true}
            componentGradient={true}
            label='FC4'
            labelOffsetY={0}
            labelOffsetX={0}
          />

          <Harp

            cx={500}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:Harp3old','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='Harp3'
            componentShadow={false}
            textShadow={false}
            componentGradient={true}
          />
          <SteererXYMagnet
            handleOnClick={this.handleOnClick}
            cx={650}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:STR1:X','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='STR2 XY'
            labelOffsetY={-27}
            labelOffsetX={0}
            valueOffsetY={35}
            valueOffsetX={0}
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />
          <SteererXYMagnet
            handleOnClick={this.handleOnClick}
            cx={800}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:STR1:X','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='STR2 XY'
            labelOffsetY={-27}
            labelOffsetX={0}
            valueOffsetY={35}
            valueOffsetX={0}
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />
          {/*}<SteererXMagnet
            handleOnClick={this.handleOnClick}
            cx={630}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:STR1:X','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='STR1 X'
            labelOffsetY={-20}
            labelOffsetX={0}
            valueOffsetY={+20}
            valueOffsetX={0}
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />*/}
          <BendingMagnet
            handleOnClick={this.handleOnClick}
            cx={600}
            cy={101}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:PS4','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='BM1'
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />


          <SteererXYMagnet
            handleOnClick={this.handleOnClick}
            cx={590}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:STR1:X','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='STR1 XY'
            labelOffsetY={-14}
            labelOffsetX={0}
            valueOffsetY={18}
            valueOffsetX={0}
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />
          <SteererXYMagnet
            handleOnClick={this.handleOnClick}
            cx={700}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:STR1:X','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='STR3 XY'
            labelOffsetY={-14}
            labelOffsetX={0}
            valueOffsetY={18}
            valueOffsetX={0}
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />

          <SlitXY
            handleOnClick={this.handleOnClick}
            cx={900}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:STR1:X','$(pv_suffix)':'Readback'}}
            units={'mm'}
            usePvLabel={false}
            alarmSensitive={true}
            label='SlitXY 1'
            labelOffsetY={-14}
            labelOffsetX={0}
            valueOffsetY={18}
            valueOffsetX={0}
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />

          <SlitXY
            handleOnClick={this.handleOnClick}
            cx={1000}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:STR1:X','$(pv_suffix)':'Readback'}}
            units={'mm'}
            usePvLabel={false}
            alarmSensitive={true}
            label='SlitXY 1'
            labelOffsetY={-14}
            labelOffsetX={0}
            valueOffsetY={18}
            valueOffsetX={0}
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
          />

          {/*}  <SvgElementTest
            handleOnClick={this.handleOnClick}
            cx={600}
            cy={50}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:PS3','$(pv_suffix)':'Readback'}}
            usePvUnits={true}
            alarmSensitive={true}
            label='test'
            />
          */}
          {/*}
            <SvgElementTest

            cx={700}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:Harp3','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='Harp3'
            componentShadow={false}
            textShadow={false}
            componentGradient={true}
            />
            <SvgElementTest

            cx={800}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:Harp3','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='Harp3'
            componentShadow={true}
            textShadow={false}
            componentGradient={true}
            />
            <SvgElementTest

            cx={900}
            cy={100}
            pv={'pva://$(device):$(pv_suffix)'}
            macros={{'$(device)':'testIOC:Harp2','$(pv_suffix)':'InOut'}}
            usePvUnits={true}
            usePvLabel={false}
            alarmSensitive={true}
            label='Harp2'
            componentShadow={false}
            textShadow={false}
            componentGradient={true}
            />
          */}
        </svg>

        {/* <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          >
          <Grid item sm={3} >
          <div onClick={this.props.handlePsOnClick('testIOC:PS1')}>
          <TextOutput  pv='pva://testIOC:PS1:Readback' usePrecision={true} prec={3} usePvUnits={true} alarmSensitive={true} usePvLabel={true}/>
          </div>
          </Grid>
          <Grid item sm={3}>
          <div onClick={this.props.handlePsOnClick('testIOC:PS2')}>
          <TextOutput  pv='pva://testIOC:PS2:Readback'  usePrecision={true} prec={3} usePvUnits={true} alarmSensitive={true} usePvLabel={true}/>
          </div>

          </Grid>

          <Grid item sm={3}>
          <div onClick={this.props.handlePsOnClick('testIOC:PS3')}>
          <TextOutput  pv='pva://testIOC:PS3:Readback'  usePrecision={true} prec={3} usePvUnits={true} alarmSensitive={true} usePvLabel={true}/>
          </div>
          </Grid>



          </Grid>
        */}

      </div>
);
}
}

ControlToptEx1.contextType=AutomationStudioContext;
export default ControlToptEx1
