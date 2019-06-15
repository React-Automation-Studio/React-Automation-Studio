import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({


  textHarp: {
    fill:theme.palette.text.primary

  }

});

class Harp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    'value' : "",
    'hasFocus':false,
    'label':"Undefined",
    'pvname':"Undefined",
    'intialized':false,
    'metadata':{},
    'severity':'',
    open: false,
  }
  this.handleOnClick= this.handleOnClick.bind(this);
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);
}



componentDidMount() {
}


componentWillUnmount() {

}





handleMetadata(metadata){


  this.setState({'metadata'	 :metadata});


}


handleInputValue(inputValue,pvname,initialized,severity){

  this.setState({'value'	 :inputValue,
  'pvname':pvname,
  'initialized':initialized,
  'severity':severity});

}


handleInputValueLabel(inputValue){

  this.setState({['label']:inputValue});

}


handleOnClick = device => event => {
//  console.log("In Harp: clicked "+device.toString());
  //this.props.handleOnClick(device);
  if (this.state.value==1){
    this.setState({ ['value']: this.state['value']==0?1:0,
    open:false});
  }
  else {
    this.setState({ open:true});
  }

};


handleYes = () => {
  this.setState({ ['value']: 1,
  open:false});

};
handleNo = () => {
  this.setState({ ['value']: 0,
  open:false});

};
render() {
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

  }

  let color='';
  if (typeof this.props.alarmSensitive !== 'undefined'){
    if (this.props.alarmSensitive==true){
      if (severity==1){
        color='#FF8E53';
      }
      else if(severity==2){
        color='#E20101';
      }
      else color='#133C99';
    }

  }





  let yoffset=0;
  if (value==1){
    yoffset=0;

  }
  else{
    yoffset=-30;
  }
  const style = {
    background: background_color,
    borderRadius: 4,

  };


  return (
    <g>
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Warning!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to insert the harp?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleNo} color="primary">
            No
          </Button>
          <Button onClick={this.handleYes} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <g  onClick={this.handleOnClick(this.props.macros['$(device)'])}>
        <DataConnection
          pv={pv}
          macros={macros}
          usePvLabel={usePvLabel}
          usePrecision={usePrecision}
          handleInputValue={this.handleInputValue}
          handleMetadata={this.handleMetadata}
          outputValue=  {this.state.value}
          useStringValue={useStringValue}
        />

        { usePvLabel===true && <DataConnection

          pv={pv.toString()+".DESC"}
          macros={macros}
          handleInputValue={this.handleInputValueLabel}

                                    />    }

        {initialized===true &&

          <g>




            <linearGradient id={this.state.pvname+'Harp-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopColor='grey' />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
            <defs>
              <filter id={this.state.pvname+"HarpShadow"} x="0" y="0" width="600%" height="500%">
                <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
                <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <g transform={'translate('+this.props.cx+','+this.props.cy+')'}


            >
              {yoffset!==0&&
                <g  transform='scale (0.3996 1.25)'>
                  <g
                    fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'Harp-gradient)':color}
                    filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"HarpShadow)":"" }
                    transform='rotate(15,0,0) '
                  >
                    <rect width="3" height="36" x={-9}  y={ +yoffset-17.5} />"
                    <rect width="3" height="36" x={-3}  y={ +yoffset-17.5} />"
                    <rect width="3" height="36" x={+3}  y={ +yoffset-17.5} />"
                    <rect width="3" height="36" x={9}   y={ +yoffset-17.5} />"
                    <rect width="36" height="3" x={-18}  y={ +yoffset+9} />"
                    <rect width="36" height="3" x={-18}  y={ +yoffset-9} />"
                    <rect width="36" height="3" x={-18}  y={ +yoffset-3} />"
                    <rect width="36" height="3" x={-18}  y={ +yoffset+3} />"
                  </g>
                </g>
              }
              {yoffset===0&&
                <g  transform='scale (0.3996 1.25)'>
                  <g
                    fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'Harp-gradient)':color}
                    filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"HarpShadow)":"" }
                    transform='rotate(15,0,0) '
                  >
                    <rect width="3" height="12" x={-9}  y={ +yoffset+6.5} />"
                    <rect width="3" height="14" x={-3}  y={ +yoffset+4.5} />"
                    <rect width="3" height="16" x={+3}  y={ +yoffset+2.5} />"
                    <rect width="3" height="16" x={-9}  y={ +yoffset-17.5} />"
                    <rect width="3" height="14" x={-3}  y={ +yoffset-17.5} />"
                    <rect width="3" height="16" x={+3}  y={ +yoffset-17.5} />"
                    <rect width="3" height="36" x={9}   y={ +yoffset-17.5} />"
                    <rect width="36" height="3" x={-18}  y={ +yoffset+9} />"
                    <rect width="36" height="3" x={-18}  y={ +yoffset-9} />"
                    <rect width="18" height="3" x={0}  y={ +yoffset-3} />"
                    <rect width="18" height="3" x={0}  y={ +yoffset+3} />"
                  </g>
                </g>
              }

              <text className={classes.textHarp}
                x={0}
                y={+yoffset-40}
                textAnchor='middle'
                filter={this.props.textShadow===true?"url(#"+this.state.pvname+"HarpShadow)":"" }
              >
                {usePvLabel===true? this.state['label']:this.props.label}
              </text>
            </g>
          </g>
        }
        {(initialized===false||initialized==='undefined') &&
          <g transform={'translate('+this.props.cx+','+this.props.cy+')'}>
            <linearGradient id={this.state.pvname+'Harp-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopOpacity="0" />
              <stop offset="90%" stopColor={'grey'} />
            </linearGradient>
            <g  transform='scale (0.3996 1.25)'>
              <g
                fill={'grey'}
                filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"HarpShadow)":"" }
                transform='rotate(15,0,0) '
              >
                <rect width="3" height="36" x={-9}  y={ +yoffset-17.5} />"
                <rect width="3" height="36" x={-3}  y={ +yoffset-17.5} />"
                <rect width="3" height="36" x={+3}  y={ +yoffset-17.5} />"
                <rect width="3" height="36" x={9}   y={ +yoffset-17.5} />"
                <rect width="36" height="3" x={-18}  y={ +yoffset+9} />"
                <rect width="36" height="3" x={-18}  y={ +yoffset-9} />"
                <rect width="36" height="3" x={-18}  y={ +yoffset-3} />"
                <rect width="36" height="3" x={-18}  y={ +yoffset+3} />"
              </g>
            </g>

            <text
              x={0}
              y={10}
              textAnchor='middle'

            >
              {"Connecting"}
            </text>
            <text
              x={0}
              y={25}
              textAnchor='middle'

            >
              {"to:"}
            </text>
            <text
              x={0}
              y={40}
              textAnchor='middle'

            >
              {this.state['pvname']}
            </text>
          </g>
        }
      </g>
    </g>



                    );
                  }
                }

                Harp.contextType=AutomationStudioContext;
          export default withStyles(styles)( Harp)
