import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import ContextMenu from '../SystemComponents/ContextMenu';
//import MenuItem from '@material-ui/core/MenuItem';
/* eslint-disable eqeqeq */
const styles = theme => ({


  textQuadrapoleLabel: {
    fill:theme.palette.text.primary

  },
  textQuadrapoleValue: {
    fill:theme.palette.text.primary

  }
});

class QuadrapoleMagnet extends React.Component {
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
  pvname:pvname,
  initialized:initialized,
  severity:severity});

}


handleInputValueLabel(inputValue){

  this.setState({label:inputValue});

}


handleOnClick = ()=>{
  //console.log("In quad: clicked "+device.toString());
  this.props.handleOnClick(this.props.macros['$(device)']);
  //  this.setState({ ['clicked']: 1});
};

render() {
  const {classes}= this.props;
  const pv = this.props.pv;
  const macros=  this.props.macros;
  const usePvLabel= this.props.usePvLabel;
 
  const usePrecision= this.props.prec;
  const useStringValue=this.props.useStringValue;
  const severity=this.state.severity;
  
  const initialized=this.state.initialized;
  let value=this.state.value;
  if(initialized){
    


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









  


  return (
    <g    onContextMenu={this.handleToggleContextMenu}>
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
        <g onClick={this.handleOnClick} >
          <linearGradient id={this.state.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="0.5" stopColor='silver' />
            <stop offset="65%" stopColor={color} />
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
          <ellipse
            fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'elipse-gradient)':color}


            cx={this.props.cx+15}
            cy={this.props.cy}
            rx="10"
            ry="30"
            filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          />
          <ellipse
            fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'elipse-gradient)':color}
            cx={this.props.cx}
            cy={this.props.cy}
            rx="10"
            ry="30"
filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          />

          <text className={classes.textQuadrapoleValue}
            x={this.props.cx+7.5}
            y={this.props.cy+57.5}
            textAnchor='middle'
            filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          >
            {this.props.usePvUnits===true? value+" "+this.state.metadata.units: value+" "+this.props.units}

          </text>
          <text className={classes.textQuadrapoleLabel}
            x={this.props.cx+7.5}
            y={this.props.cy-40}
            textAnchor='middle'
            filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          >
            {usePvLabel===true? this.state.label:this.props.label}
          </text>
        </g>
      }
      {(initialized===false||initialized==='undefined') &&
        <g  >
          <linearGradient id="elipse-gradient">
            <stop offset="0%" stopOpacity="0" />

            <stop offset="75%" stopColor={'grey'} />

            {/*}<stop offset="100%" stopOpacity="0" />*/}
          </linearGradient>
          <linearGradient id={this.state.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="0" />
            <stop offset="65%" stopColor={'silver'} />
          </linearGradient>
          <defs>
            <filter id={this.state.pvname+"elipseShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="7.5" dy="7.5" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>

          <ellipse
            fill={'url(#'+this.state.pvname+'elipse-gradient)'}

            cx={this.props.cx}
            cy={this.props.cy}
            rx="10"
            ry="30"
            filter={"url(#"+this.state.pvname+"elipseShadow)" }
          />
          <ellipse
            fill={'url(#'+this.state.pvname+'elipse-gradient)'}

            cx={this.props.cx+15}
            cy={this.props.cy}
            rx="10"
            ry="30"
            filter={"url(#"+this.state.pvname+"elipseShadow)" }
          />

          </g>
        }
      </g>




    );
  }
}

QuadrapoleMagnet.contextType=AutomationStudioContext;
export default withStyles(styles)(QuadrapoleMagnet)
