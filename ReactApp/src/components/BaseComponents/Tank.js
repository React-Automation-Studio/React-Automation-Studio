import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import ContextMenu from '../SystemComponents/ContextMenu';
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
import uuid from 'uuid';
import {LanDisconnect} from 'mdi-material-ui/';

import {

  makeVisFlexible,

} from 'react-vis';



const styles = theme => ({
  textTicks: {
    fill:theme.palette.type==='dark'?theme.palette.grey['300']:theme.palette.grey['500']

  },
  textValue: {
    fill:theme.palette.type==='dark'?theme.palette.grey['300']:theme.palette.grey['500']

  },

  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
  segmentValue:{

    textAnchor: 'middle',
    fontSize: '14px',
    fontWeight: 'bold',
    fill:'rgb(0, 102, 102) !important',

  },
  TextFieldSeverity0: {
    width: '100%',
    marginTop:'auto',

    marginBottom:'auto',
    fontWeight: 500,
    borderRadius: 4,

  },
  TextFieldSeverity1: {
    width: '100%',
    marginTop:'auto',

    marginBottom:'auto',
    fontWeight: 500,
    borderRadius: 4,
    //backgroundColor:'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)'
    background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, #FF8E53 99%)'//'green'
  },
  TextFieldSeverity2: {
    width: '100%',
    marginTop:'auto',

    marginBottom:'auto',
    fontWeight: 500,
    borderRadius: 4,
    //backgroundColor:'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)'
    background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, #E20101 99%)'//'green'
  }

});

function getTickValues(props,min,max,numberOfTicks,x0,y0,x1,x2,y1,y2,xOffset,yOffset,value){
  const {classes}= props;
  //this.test("test1");
  //this.handleInputValue();

  let ticks=[];

  let i=0;
   if(typeof props.disabled==='undefined'){
    if (props.showTicks===true){
  for (i=0 ; i<(numberOfTicks);i++){
    const rotation=0;
    const tickValue=i*(max-min)/(numberOfTicks-1)+min;
    ticks.push(
      <g key={i}
      >
        <text
          className={classes.textTicks}
          x={xOffset-3}
          y={y2-i*(y2-y0 -yOffset)/(numberOfTicks-1)  -3}
          textAnchor={'end'}
        >
          {parseFloat(tickValue).toFixed(0)+props.units}
        </text>
      </g>

        )
      }
    }

  }
  else{
    // ticks.push(
    //   <g key={i=i+1}
    //   >
    //     <text
    //       className={classes.textTicks}
    //       x={xOffset}
    //       y={y2+yOffset-3}
    //       textAnchor={'start'}
    //     >
    //       {props.pvname}
    //     </text>
    //   </g>
    //
    //     )
  }
      if (props.showValue===true)
      {ticks.push(
        <g key={i=i+1}
        >
          <text
            className={classes.textTicks}
            x={x0+(x2-x0)/2}
            y={yOffset-4}
            textAnchor={'middle'}
          >
            {typeof props.disabled==='undefined'?parseFloat(value).toFixed(0)+props.units:''}{}
          </text>
        </g>

          )
}



      //console.log(DataConnections[0]);
      return ticks;
    }




    function TankComponent(props) {
      const gradientId= uuid.v4();
      const {classes}=props;
      const units=props.units;
      const value=props.value;
      const min=props.min;
      const max=props.max;


      let yOffset;
      if (props.width >16){
        yOffset=16;

      }
      else{
       yOffset=0;
      }
      let xOffset;
      if (props.width >80){
        xOffset=80;

      }
      else{
       xOffset=0;
      }
      const radialTextOffset=0;
      const width=props.width;
      const height=props.width;;
      const y0=yOffset;
      const y2=(height-yOffset);
      const y1=yOffset+(y2-y0)/2;
      const x0=xOffset;
      const x2=(width-xOffset*0);
      const x1=(x2-x0)/2+x0;

      const level=(y2-y0)*(value-min)/(max-min);

      const color=props.color;
      return (

        <svg  width={width} height={height}>


          <linearGradient id={gradientId+'baseleft1'}  >
            <stop offset="0%" stopColor={props.theme.palette.type==='dark'?props.theme.palette.grey['300']:props.theme.palette.grey['200']} />
            <stop offset="100%"  stopColor={typeof props.disabled==='undefined'?props.theme.palette.grey['200']:'default'} />

          </linearGradient>
          <linearGradient id={gradientId+'baseright1'}  >

            <stop offset="0%"  stopColor={typeof props.disabled==='undefined'?props.theme.palette.grey['200']:'default'} />
            <stop offset="100%" stopColor={props.theme.palette.type==='dark'?props.theme.palette.grey['300']:props.theme.palette.grey['200']} />
          </linearGradient>

          <linearGradient id={gradientId+'right1'} >
            <stop offset="0%" stopColor={props.theme.palette.type==='dark'?props.theme.palette.grey['300']:props.theme.palette.grey['200']} />
            <stop offset="100%"  stopColor={typeof props.disabled==='undefined'?color:'default'} />

          </linearGradient>
          <linearGradient id={gradientId+'left1'}  >

            <stop offset="0%"  stopColor={typeof props.disabled==='undefined'?color:'default'} />
            <stop offset="100%" stopColor={props.theme.palette.type==='dark'?props.theme.palette.grey['300']:props.theme.palette.grey['200']} />
          </linearGradient>

          <g >
            <rect x={x1-1} y={y0} width={x2-x1} height={y2-y0}
              style={{
                opacity:1,
                strokeWidth:"0",
                fill:'url(#'+gradientId+'baseright1)',
              }}
            />
            <rect x={x0} y={y0} width={x2-x1} height={y2-y0}
              style={{opacity:1,
                strokeWidth:"0",
                fill:'url(#'+gradientId+'baseleft1)',
              }}

            />


            <rect x={x0} y={y2-level} width={x1-x0} height={level}
              style={{opacity:1,
                strokeWidth:"0",
                fill:'url(#'+gradientId+'left1)',
              }}
            />
            <rect x={x1-1} y={y2-level} width={x2-x1} height={level}
              style={{opacity:1,
                strokeWidth:"0",
                fill:'url(#'+gradientId+'right1)',
              }}

            />

            {getTickValues(props,min,max, 3,x0,y0,x1,x2,y1,y2,xOffset,yOffset,value)}
          </g>
          </svg>

          );
          }

          TankComponent.propTypes={
            height:PropTypes.number,
            width:PropTypes.number,
          }
          const FlexibleTankComponent = makeVisFlexible(withStyles(styles,{withTheme:true})(TankComponent));

    /**
    * The Tank Component is an Automation-studio component.
    */

    class Tank extends React.Component {
      constructor(props) {
        super(props);
        this.state={['value'] : "",
        ['inputValue'] : "",
        ['outputValue'] : "",
        ['hasFocus']:false,
        ['label']:"Undefined",
        ['pvname']:"Undefined",
        ['intialized']:false,
        ['metadata']:{},
        ['severity']:1,
        openContextMenu: false,
        'open':false,x0:0,y0:0
      }
      this.handleInputValue= this.handleInputValue.bind(this);
      this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
      this.handleMetadata= this.handleMetadata.bind(this);


    }


    handleInputValue(inputValue,pvname,initialized,severity){
    //  console.log("severity: ",severity);


      this.setState({['value']	 :inputValue,
      ['inputValue']:inputValue,
      ['pvname']:pvname,
      ['initialized']:initialized,
      ['severity']:severity});

    }


    handleMetadata(metadata){


      this.setState({['metadata']	 :metadata,
      ['newMetadata']:metadata});

    }



    handleInputValueLabel(inputValue){

      this.setState({['label']:inputValue});

    }



    componentDidMount() {

    }


    componentWillUnmount() {

    }


    handleContextMenuClose = (event) => {


      this.setState({ openContextMenu: false });

    };

    handleToggleContextMenu = (event) => {
      //   console.log(event.type)
      event.persist()
      this.setState(state => ({ openContextMenu: !state.openContextMenu,x0:event.pageX,y0:event.pageY }));

      event.preventDefault();
    }






    handleOnFocus= event =>{
      this.setState({['hasFocus']:true});
    }

    catchReturn= stateVar => event =>{
      if (event.key === 'Enter') {
        this.setState({['outputValue']:this.state['value']});
      }
    }


    handleOnBlur= event =>{
      this.setState({['hasFocus']:false,
      ['value']:this.state['inputValue'],
      ['metadata'] :this.state['newMetadata'] });
    }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };




    render() {
      const {classes}= this.props;
      const pv = this.props.pv;
      const macros=  this.props.macros;
      const usePvLabel= this.props.usePvLabel;
      const mylabel= this.props.label;
      const usePrecision= this.props.prec;
      const useStringValue=this.props.useStringValue;
      let severity=this.state.severity;
      let units="";
      const initialized=this.state.initialized;
      let value=this.state.value;
      if(initialized){
        if(this.props.usePvUnits===true){
          if (typeof this.state.metadata !== 'undefined'){
            if (typeof this.state.metadata.units !== 'undefined'){
              units=this.state.metadata.units;
            }
            else{
              units="";
            }
          }
          else {
            units="";
          }

        }
        else {
          units=this.props.units;
        }


        if (typeof this.props.usePrecision !== 'undefined'){
          if (this.props.usePrecision==true){
            if (typeof this.props.prec !== 'undefined'){
              value=parseFloat(value).toFixed(this.props.prec);
            }
            else
            value=parseFloat(value).toFixed(parseInt(this.state.metadata.precision));

          }

        }

      }

      if (typeof this.props.useStringSeverityMatch !== 'undefined'){
        if (this.props.useStringSeverityMatch==true){

          if (typeof this.props.StringSeverity !== 'undefined'){
            let string;
            for (string in this.props.StringSeverity){
              //      console.log(this.props.StringSeverity[string].stringMatch)
              if (value==this.props.StringSeverity[string].stringMatch){
                severity=this.props.StringSeverity[string].severity;
                break;
              }

            }

          }
        }
      }










      let write_access=false;
      let read_access=false;
      let min=0;
      let max=100;
      let color=this.props.theme.palette.primary.main;;
      if(initialized){

        if (typeof this.state.metadata !== 'undefined'){
          if (typeof this.state.metadata.write_access !== 'undefined'){
            write_access=this.state.metadata.write_access;
          }
          if (typeof this.state.metadata.read_access !== 'undefined'){
            read_access=this.state.metadata.read_access;
          }
        }


        if (typeof this.props.usePvMinMax === 'undefined'){
          if (typeof this.props.min !== 'undefined'){
            min=this.props.min;
          }
          if (typeof this.props.max !== 'undefined'){
            max=this.props.max;
          }
        }else{
          if(this.props.usePvMinMax == false)
          {
            if (typeof this.props.min !== 'undefined'){
              min=this.props.min;
            }
            if (typeof this.props.max !== 'undefined'){
              max=this.props.max;
            }
          }
          else {
            max=this.state.metadata.upper_disp_limit;
            min=this.state.metadata.lower_disp_limit;
          }
        }




        if (typeof this.props.alarmSensitive !== 'undefined'){
          if (this.props.alarmSensitive==true){
            if (severity==1){

              color=deepOrange['400'];
            }
            else if(severity==2){
              color=  red['800'];
            }
            else {
              color=this.props.theme.palette.primary.main;
              //  background_color='white';
            }
          }

        }

      }



      if(initialized){
        if(this.props.usePvUnits===true){
          if (typeof this.state.metadata !== 'undefined'){
            if (typeof this.state.metadata.units !== 'undefined'){
              units=" "+this.state.metadata.units;
            }
            else{
              units="";
            }
          }
          else {
            units="";
          }

        }
        else {
          units=typeof this.props.units!=='undefined'?" "+this.props.units:"";
        }

        if (value!==""){

          if (typeof this.props.usePrecision !== 'undefined'){
            if (this.props.usePrecision==true){
              if (typeof this.props.prec !== 'undefined'){
                value=parseFloat(value).toFixed(this.props.prec);
              }
              else
              value=parseFloat(value).toFixed(parseInt(this.state.metadata.precision));

            }

          }

        }

      }





      //console.log(units)
      return (

        <div style={{width:'100%',height:'100%'}} onContextMenu={this.handleToggleContextMenu}>
          <DataConnection
            pv={pv}
            macros={macros}
            usePvLabel={usePvLabel}
            usePrecision={usePrecision}
            handleInputValue={this.handleInputValue}
            handleMetadata={this.handleMetadata}
            outputValue=  {this.state.outputValue}
            useStringValue={useStringValue}
            handleInputValueLabel={this.handleInputValueLabel}
            intialLocalVariableValue={this.props.intialLocalVariableValue}
          />
          <ContextMenu
            disableProbe={this.props.disableProbe}
            open={this.state.openContextMenu}
            anchorReference="anchorPosition"
            anchorPosition={{ top: +this.state.y0, left: +this.state.x0 }}
            probeType={'readOnly'}
            pvs={[{pvname:this.state.pvname,initialized:initialized}]}
            handleClose={this.handleContextMenuClose}

            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          />
          {initialized===true &&
            <React.Fragment>
              <FlexibleTankComponent
                min={min}
                max={max}
                units={units}
                value={value}

                pv={this.state.pvname}
                color={color}
                showValue={this.props.showValue}
                showTicks={this.props.showTicks}

              />

              {/* <svg  width={this.props.width} height={this.props.height}>
                <text
                x={(x0+x1)/2}
                y={y1+valueOffsetY}
                textAnchor='middle'
                className={classes.textValue}
                >

                {value+units}
                </text>


                <linearGradient id={'rect-gradient'} >

                <stop offset="0%"  stopColor={this.props.theme.palette.primary.main} />
                <stop offset="100%" stopColor={this.props.theme.palette.type==='dark'?this.props.theme.palette.grey['300']:this.props.theme.palette.grey['200']} />
                </linearGradient>

                <path
                style={{opacity:1,
                fill:'none',
                fillOpacity:1,
                stroke:'url(#rect-gradient)',
                strokeWidth:ringWidth,
                strokeMiterlimit:4,
                strokeDasharray:'none',
                strokeOpacity:1}}



                d={"M "+x0+" "+y0+ " A "+radius+" "+radius+" 0 0 1 "+x1+" "+y1 }/>



                <path
                fill={this.props.theme.palette.secondary.main}



                transform={'rotate('+ needleRotation +" "+(x0+x1)/2 +' ' +y1+ ')' }

                d={"M "+(xOffset-6)+" "+(y0-1)+" "+ (xOffset +y1-yOffset)+ " "+(y0-4) +" "+ (xOffset +y1-yOffset)+ " "+(y0+4)+" " +(xOffset-6)+" "+(y0+1)
                +" " + (xOffset-6)+" "+(y0-1)}/>




                {this.getTickValues(min,max, 6,x0,x1,y1,xOffset,radialTextOffset)}
              </svg> */}


            </React.Fragment>
          }

          {(initialized===false||initialized==='undefined') &&
            <React.Fragment>
              <LanDisconnect style={{color:this.props.theme.palette.error.main,verticalAlign: "middle"}} fontSize='small'/>
              <FlexibleTankComponent
                min={0}
                max={100}
                units={''}
                value={0}

                pvname={this.state.pvname}
                disabled
                showValue={this.props.showValue}
                showTicks={this.props.showTicks}
              />
              {this.state.pvname}
            </React.Fragment>


          }
        </div>

)
}
}

Tank.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,
  /** Directive to round the value. */
  usePrecision:PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePrecision` is defined. */
  prec:PropTypes.number,
  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax:PropTypes.bool,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive:PropTypes.bool,
  /** Custom minimum to be used, if `usePvMinMax` is not defined. */
  min:PropTypes.number,
  /** Custom maximum to be used, if `usePvMinMax` is not defined. */
  max:PropTypes.number,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units:PropTypes.string,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel:PropTypes.bool,
  /** Directive to show the istantaneous value */
  showValue:PropTypes.bool,
  /** Directive to show the tick values */
  showTicks:PropTypes.bool,
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string

};

Tank.defaultProps = {

  debug:false,
  alarmSensitive:false,
  min:0,
  max:100,
  usePrecision:false,
  showValue:true,
  showTicks:true

};

Tank.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(Tank)
