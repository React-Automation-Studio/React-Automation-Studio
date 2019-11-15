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
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
import ContextMenu from '../SystemComponents/ContextMenu';
import {LanDisconnect} from 'mdi-material-ui/';
import { create, all } from 'mathjs';
const config = { }
const math = create(all, config)



const styles = theme => ({

  body1: theme.typography.body1,




  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
  TextField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    borderRadius: 4
  },



  TextFieldSeverity0: {


  },
  TextFieldSeverity1: {
    borderRadius: 2,
    padding:1,
    background:deepOrange['400']
    //  background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, '+deepOrange['400'] +' 99%)'
  },
  TextFieldSeverity2: {
    borderRadius: 2,
    padding:1,
    background:red['800']
    //  backgroundColor:'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)'
    //  background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, '+red['800'] +' 99%)'
  }


});



/**
* The TextUpdate Component is a wrapper on the JavaScript <b>div</b> container tag. The component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
* The margins and spacing must be controlled from the parent component.<br/><br/>
* More information on JavaScript <b>div</b> tag:
* https://www.w3schools.com/tags/tag_div.asp<br/><br/>

*/
class TextUpdate extends React.Component {
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
    ['severity']:'',
    openContextMenu: false,
    'open':false,x0:0,y0:0
  }
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);

}


handleInputValue(inputValue,pvname,initialized,severity){
  //console.log("severity: ",severity);

  if (this.state['hasFocus']===false){
    this.setState({['value']	 :inputValue,
    ['inputValue']:inputValue,
    ['pvname']:pvname,
    ['initialized']:initialized,
    ['severity']:severity});
  }
  else {  this.setState({['inputValue']:inputValue,
  ['pvname']:pvname,
  ['initialized']:initialized,
  ['severity']:severity});
}
}


handleMetadata(metadata){

  if (this.state['hasFocus']===false){
    this.setState({['metadata']	 :metadata,
    ['newMetadata']:metadata});
  }
  else {  this.setState({['newMetadata']:metadata});

}
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
test(){
}







render() {
  //console.log(this.props)
  const {classes}= this.props;
  const pv = this.props.pv;
  const macros=  this.props.macros;
  const usePvLabel= this.props.usePvLabel;
  const mylabel= this.props.label;
  const usePrecision= this.props.prec;
  const useStringValue=this.props.useStringValue;
  const severity=this.state.severity;
  let units="";
  const initialized=this.state.initialized;
  let value=this.state.value;
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
      if (typeof this.props.units !== 'undefined'){
        units=" "+this.props.units;

      }else {
        units="";
      }
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

    if (typeof this.props.numberFormat !== 'undefined'){
      value=math.format(parseFloat(value),this.props.numberFormat)

    }




  }

  let textFieldClassName;

  let background_color='';
  if (typeof this.props.alarmSensitive !== 'undefined'){
    if (this.props.alarmSensitive==true){
      if (severity==1){
        background_color='linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)';
      }
      else if(severity==2){
        background_color='linear-gradient(45deg, #FFFFFF 1%, #E20101 99%)';
      }
      else background_color='white';
    }

    if (this.props.alarmSensitive==true){
      if (severity==1){
        textFieldClassName=classes.TextFieldSeverity1;
        //  background_color='linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)';
      }
      else if(severity==2){
        textFieldClassName=classes.TextFieldSeverity2;
        //  background_color='linear-gradient(45deg, #FFFFFF 1%, #E20101 99%)';
      }
      else {
        textFieldClassName=classes.TextFieldSeverity0;
        //  background_color='white';
      }
    }

  }







  const style = {
    background: background_color,
    borderRadius: 4,

  };

  return (

    <div onContextMenu={this.handleToggleContextMenu}>
      <DataConnection
        pv={pv}
        macros={macros}
        usePvLabel={usePvLabel}
        usePrecision={usePrecision}
        handleInputValue={this.handleInputValue}
        handleMetadata={this.handleMetadata}
        outputValue=  {this.state.outputValue}
        useStringValue={useStringValue}
        debug={this.props.debug}
        handleInputValueLabel={this.handleInputValueLabel}
        intialLocalVariableValue={this.props.intialLocalVariableValue}
      />
      <React.Fragment>
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
          <span className={textFieldClassName} >
            {usePvLabel===true? this.state['label']+': ':this.props.label}
            {value} {units}
          </span>

        }

        {((initialized===false)||(initialized==='undefined')) &&
        <div className={classes.body1}>
          {<span> <LanDisconnect style={{color:this.props.theme.palette.error.main,verticalAlign: "middle"}} fontSize='small'/> {this.state['pvname']} </span>}


        </div>






      }
    </React.Fragment>
  </div>
)
}
}
TextUpdate.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel:PropTypes.bool,
  /** Directive to use the units contained in the  EPICS pv's EGU field. */
  usePvUnits: PropTypes.bool,
  /** Directive to round the value. */
  usePrecision:PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePrecision` is defined. */
  prec:PropTypes.number,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units:PropTypes.string,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive:PropTypes.bool,
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** If defined, then the string representaion of the number can be formatted using the mathjs format function eg.  numberFormat={{notation: 'engineering',precision: 3}}. See https://mathjs.org/docs/reference/functions/format.html for more examples*/
  numberFormat:PropTypes.object,
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string

};

TextUpdate.defaultProps = {
  debug:false,
  alarmSensitive:false,
  usePrecision:false,
  usePvLabel:false,
  usePvUnits:false,
};

TextUpdate.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(TextUpdate)
