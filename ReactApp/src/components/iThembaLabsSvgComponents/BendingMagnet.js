import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import ContextMenu from '../SystemComponents/ContextMenu';
//import MenuItem from '@material-ui/core/MenuItem';
const styles = theme => ({


  textBMLabel: {
    fill:theme.palette.text.primary

  },
  textBMValue: {
    fill:theme.palette.text.primary

  },
  textBMLabelDisconneted: {
    fill:'dimgrey'

  },
});

/* eslint-disable eqeqeq */
class BendingMagnet extends React.Component {
  constructor(props) {
    super(props);
    let pvname;
    if (typeof this.props.macros !== 'undefined'){
      let macro;
      pvname=this.props.pv;
      for (macro in this.props.macros){
        pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
      }
    }
    else{
      pvname=this.props.pv;

    }
    this.state={'value' : "",
    'inputValue' : "",
    'outputValue' : "",
    'hasFocus':false,
    'label':"Undefined",
    'pvname':pvname,
    'intialized':false,
    'metadata':{},
    'severity':'',
    openContextMenu: false,
    'open':false,x0:0,y0:0
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

handleContextMenuClose = (event) => {


  this.setState({ openContextMenu: false });

};

handleToggleContextMenu = (event) => {
  //   console.log(event.type)
  event.persist()
  this.setState(state => ({ openContextMenu: !state.openContextMenu,x0:event.pageX,y0:event.pageY }));

  event.preventDefault();
}




handleMetadata(metadata){


  this.setState({metadata	 :metadata});


}


handleInputValue(inputValue,pvname,initialized,severity){

  this.setState({value	 :inputValue,
  ['pvname']:pvname,
  initialized:initialized,
  ['severity']:severity});

}


handleInputValueLabel(inputValue){

  this.setState({label:inputValue});

}


handleOnClick = device => event => {
  //console.log("In quad: clicked "+device.toString());
  this.props.handleOnClick(device);
  //  this.setState({ ['clicked']: 1});
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

  let color_side='';
  let color_face='';
  let color_top='';
  if (typeof this.props.alarmSensitive !== 'undefined'){
    if (this.props.alarmSensitive==true){
      if (severity==1){
        color_side='#FF8E53';
          color_face='#FF8E43';
          color_top='#FF8E63';
      }
      else if(severity==2){
        color_side='#E20101';
        color_face='#E20901';
        color_top='#E20111';
      }
      else {
        color_side='#133CA9';
        color_face='#133C99';
        color_top='#133CA3';
    }

    }

  }









  const style = {
    background: background_color,
    borderRadius: 4,

  };


  return (
    <g  onContextMenu={this.handleToggleContextMenu}>
    <ContextMenu
      disableProbe={this.props.disableProbe}
      open={this.state.openContextMenu}
      anchorReference="anchorPosition"
      anchorPosition={{ top: +this.state.y0, left: +this.state.x0 }}
      probeType={'simple'}
      pvs={[{pvname:this.state.pvname,initialized:initialized}]}
      handleClose={this.handleContextMenuClose}

      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    />
      <DataConnection
        pv={pv}
        macros={macros}
        usePvLabel={usePvLabel}
        usePrecision={usePrecision}
        handleInputValue={this.handleInputValue}
        handleMetadata={this.handleMetadata}
        outputValue=  {this.state.outputValue}
        useStringValue={useStringValue}
      />

      { usePvLabel===true && <DataConnection

        pv={pv.toString()+".DESC"}
        macros={macros}
        handleInputValue={this.handleInputValueLabel}

                                  />    }

      {initialized===true &&
        <g transform={'translate('+this.props.cx+','+this.props.cy+')'}  onClick={this.handleOnClick(this.props.macros['$(device)'])}>
          <linearGradient id={this.state.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
            <stop offset="75%" stopColor={color_side} />
          </linearGradient>
          <defs>
            <filter id={this.state.pvname+"elipseShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g transform="translate(-10,-1086)"
            fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'elipse-gradient)':color_side}
            style={{'strokeWidth':'0.3',
            'stroke':'black'}}
          >
            <g filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }>
            <path
               id="path8478"
               d="M 24.149959,1064.5524 5.135178,1049.0529 h 10.000004 l 19.014781,15.4995 z"
            />
            <path
               id="path8480"
               d="m 0.04018281,1106.8979 1.41294219,-16.1439 10.578125,-0.016 1.208307,1.0171 0.837821,-9.512 -3.126797,-2.5487 -0.106831,1.0124 h -8.5625 l 2.853928,-31.6543 19.014781,15.4995 -5.094995,57.845 z"
               />
            <path
               id="path8484"
               d="m 12.03125,1090.738 1.34375,0.032 -0.135443,0.9854 -1.208307,-1.0171"
               />
            <path
               id="path8486"
               d="m 10.950581,1079.6944 1.268169,0.9815 -1.375,0.031 z"/>

            <path
               id="path8488"
               d="m 24.149959,1064.5524 h 10.000004 l -5.094995,57.845 -10.000004,-4e-4 z"
/>

            </g>
          </g>


          <text className={classes.textBMValue}
            x={7.5}
            y={57.5}
            textAnchor='middle'
            filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          >
            {this.props.usePvUnits===true? value+" "+this.state.metadata.units: value+" "+this.props.units}

          </text>
          <text className={classes.textBMLabel}
            x={7.5}
            y={-40}
            textAnchor='middle'
            filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          >
            {usePvLabel===true? this.state.label:this.props.label}
          </text>
        </g>
      }
      {(initialized===false||initialized==='undefined') &&
        <g transform={'translate('+this.props.cx+','+this.props.cy+')'}>
          <linearGradient id={this.state.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="0" stopColor={'grey'} />
            <stop offset="75%" stopColor={'grey'} />
          </linearGradient>
          <defs>
            <filter id={this.state.pvname+"elipseShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          >
            <g>

              <path d="M 10 25 L 10 25 L 23 25 L 23 -25 L 10 -25 L 10 25 "
                fill={'grey'}
                style={{'strokeWidth':'0.5',
                'stroke':'dimgrey'}}

              />
              <path d="M -10 -5  L 0, -5   A 2.5 5  0 1,1 0,5 L -10 5 L -10 20 L 10 25 L 10 -25 L -10 -30 L -10 -5"
                fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'elipse-gradient)':'grey'}
                style={{'strokeWidth':'0.3',
                'stroke':'dimgrey'}}
              />


              <path d="M 23 -25 L 23 -25 L 8 -30 L -10 -30 L 10 -25 L 23 -25"
                fill={'grey'}
                style={{'strokeWidth':'0.3',
                'stroke':'dimgrey'}}

              />



            </g>
          </g>



          <text className={classes.textBMLabelDisconneted}
            x={7.5}
            y={-40}
            textAnchor='middle'
            filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          >
            {usePvLabel===true? this.state.label:this.props.label}
          </text>
        </g>
        }
      </g>




    );
  }
}

BendingMagnet.contextType=AutomationStudioContext;
export default withStyles(styles)(BendingMagnet)
