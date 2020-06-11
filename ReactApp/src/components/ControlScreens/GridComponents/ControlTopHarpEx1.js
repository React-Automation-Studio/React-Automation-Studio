import React from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import QuadrapoleMagnet from '../../iThembaLabsSvgComponents/QuadrapoleMagnet';
import Harp from '../../iThembaLabsSvgComponents/Harp';
import FC from '../../iThembaLabsSvgComponents/FC';
import BendingMagnet from '../../iThembaLabsSvgComponents/BendingMagnet';
import SteererYMagnet from '../../iThembaLabsSvgComponents/SteererYMagnet';
import SteererXYMagnet from '../../iThembaLabsSvgComponents/SteererXYMagnet';
import SlitXY from '../../iThembaLabsSvgComponents/SlitXY';
import HorizontalBeamline from '../../iThembaLabsSvgComponents/HorizontalBeamline';


class ControlTopHarpEx1 extends React.Component {
  constructor(props) {
    super(props);
    this.state={}

    this.handleOnSystemClick= this.handleOnSystemClick.bind(this);
    this.handleOnClick= this.handleOnClick.bind(this);
    this.handleHarpInserted= this.handleHarpInserted.bind(this);
    this.handleHarpRemoved= this.handleHarpRemoved.bind(this);
  }

  handleOnSystemClick(system){

    this.props.handleOnSystemClick(system);
  }

  handleOnClick(device){

    this.props.handlePsOnClick(device);

  };

  handleHarpInserted=(name)=>{


    this.props.handleHarpInserted(name);

  }

  handleHarpRemoved=(name)=>{


    this.props.handleHarpRemoved(name);

  }


  render() {

    
    return (

      <div style={{ padding: 12} }>


        <svg width="100%" height="100%" viewBox="0 0 1411 400" preserveAspectRatio="xMidYMid meet">

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
          systemName={'testIOC:FC1sim'}
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
          maxHarpsReached={this.props.maxHarpsReached}
          cx={200}
          cy={100}
          systemName={'testIOC:Harp1'}
          usePvLabel={false}
          alarmSensitive={true}
          label='Harp 1'

          textShadow={false}
          componentGradient={true}
          handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}

        />
        <FC

          cx={250}
          cy={100}
          systemName={'testIOC:FC2sim'}
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
          maxHarpsReached={this.props.maxHarpsReached}
          cx={350}
          cy={100}
          systemName={'testIOC:Harp2'}
          usePvLabel={false}
          alarmSensitive={true}
          label='Harp 2'

          textShadow={false}
          componentGradient={true}
          handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}

        />
        <FC

          cx={400}
          cy={100}
          systemName={'testIOC:FC3sim'}
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
          systemName={'testIOC:FC4sim'}
          usePvUnits={true}
          usePvLabel={false}
          alarmSensitive={true}
          componentGradient={true}
          componentShadow={true}
          label='FC4'
        />

        <Harp
          maxHarpsReached={this.props.maxHarpsReached}
          cx={500}
          cy={100}
          systemName={'testIOC:Harp3'}
          usePvLabel={false}
          alarmSensitive={true}
          label='Harp 3'

          textShadow={false}
          componentGradient={true}
          handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}

        />



        <SteererXYMagnet
          handleOnClick={this.handleOnSystemClick}
          system={{
            systemName:'testIOC:STR2',
            displayName:'STR2XY',
            editorType:'steererXY',
            devices:
            {
              xDevice:{deviceName:'testIOC:STR2:X',readback:'Readback',setpoint:'Setpoint'},
              yDevice:{deviceName:'testIOC:STR2:Y',readback:'Readback',setpoint:'Setpoint'}
            }
          }}

          cx={800}
          cy={100}
          xUnits={'A'}
          yUnits={'A'}
          prec={3}
          
          alarmSensitive={true}
          labelOffsetY={-27}
          labelOffsetX={0}
          valueOffsetY={35}
          valueOffsetX={0}
          componentShadow={true}
          textShadow={false}
          componentGradient={true}
        />


                <SteererXYMagnet

                  handleOnClick={this.handleOnSystemClick}
                  system={{
                    systemName:'testIOC:STR1',
                    displayName:'STR1XY',
                    editorType:'steererXY',
                    devices:
                    {
                      xDevice:{deviceName:'testIOC:STR1:X',readback:'Readback',setpoint:'Setpoint'},
                      yDevice:{deviceName:'testIOC:STR1:Y',readback:'Readback',setpoint:'Setpoint'}
                    }
                  }}
                  cx={785}
                  cy={100}

                  xUnits={'A'}
                  yUnits={'A'}
                  prec={3}
                  
                  alarmSensitive={true}

                  labelOffsetY={5}
                  labelOffsetX={0}
                  valueOffsetY={5}
                  valueOffsetX={0}
                  componentShadow={true}
                  textShadow={false}
                  componentGradient={true}
                />

        <SteererYMagnet
          handleOnClick={this.handleOnSystemClick}

          system={{
            systemName:'testIOC:STR3',
            displayName:'STR3Y',
            editorType:'singlePS',
            devices:
            {
              device:{deviceName:'testIOC:STR3:Y',readback:'Readback',setpoint:'Setpoint'}

            }
          }}


          cx={1100}
          cy={100}
          xUnits={'A'}
          yUnits={'A'}
          prec={3}
          
          alarmSensitive={true}
          labelOffsetY={-27}
          labelOffsetX={0}
          valueOffsetY={0}
          valueOffsetX={0}
          componentShadow={true}
          textShadow={false}
          componentGradient={true}
        />

        <SteererYMagnet
          handleOnClick={this.handleOnSystemClick}
          system={{
            systemName:'testIOC:STR4',
            displayName:'STR4X',
            editorType:'singlePS',
            devices:
            {
              device:{deviceName:'testIOC:STR4:X',readback:'Readback',setpoint:'Setpoint'}

            }
          }}
          cx={1200}
          cy={100}
          xUnits={'A'}
          yUnits={'A'}
          prec={3}
          
          alarmSensitive={true}
          labelOffsetY={-27}
          labelOffsetX={0}
          valueOffsetY={0}
          valueOffsetX={0}
          componentShadow={true}
          textShadow={false}
          componentGradient={true}
        />

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


    <SlitXY
      handleOnClick={this.handleOnSystemClick}
      system={{
        systemName:'testIOC:SLITXY1',
        displayName:'SLITXY1',
        editorType:'slitxy',
        devices:
        {
          xGapDevice:{deviceName:'testIOC:SLITXY1:X:Gap',readback:'Readback',setpoint:'Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY1:X:Offset',readback:'Readback',setpoint:'Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY1:Y:Gap',readback:'Readback',setpoint:'Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY1:Y:Offset',readback:'Readback',setpoint:'Setpoint'}
        }
      }}
      cx={900}
      cy={100}
      prec={2}
      
      usePvUnits={true}
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
      handleOnClick={this.handleOnSystemClick}
      system={{
        systemName:'testIOC:SLITXY2',
        displayName:'SLITXY2',
        editorType:'slitxy',
        devices:
        {
          xGapDevice:{deviceName:'testIOC:SLITXY2:X:Gap',readback:'Readback',setpoint:'Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY2:X:Offset',readback:'Readback',setpoint:'Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY2:Y:Gap',readback:'Readback',setpoint:'Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y:Offset',readback:'Readback',setpoint:'Setpoint'}
        }
      }}
      cx={1300}
      cy={100}
      prec={2}
      
      usePvUnits={true}
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


    <Harp
      maxHarpsReached={this.props.maxHarpsReached}
      cx={1150}
      cy={100}
      systemName={'testIOC:Harp4'}
      usePvLabel={false}
      alarmSensitive={true}
      label='Harp 4'

      textShadow={false}
      componentGradient={true}
      handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}

    />

</svg>


</div>
);
}
}

ControlTopHarpEx1.contextType=AutomationStudioContext;
export default ControlTopHarpEx1
