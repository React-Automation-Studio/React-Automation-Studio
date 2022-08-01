import React from 'react'

import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';
import DataConnection from '../../../SystemComponents/DataConnection';
import withStyles from '@mui/styles/withStyles';

import PropTypes from 'prop-types';


import HarpGraphY from './HarpGraphY'




const wireSpacing = [-42, -39, -36, -33, -30, -27, -24, -22, -20, -18, -16, -14, -12, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 42, 43];


const styles = theme => ({
  lineSeries: {
    stroke: theme.palette.mode === 'dark' ? 'orange' : 'default'
  },
});


/* eslint-disable eqeqeq */
class HarpGraph extends React.Component {
  constructor(props) {
    super(props);
    let state = {}
    let pv;
    let pvname;
    let dataPVs = {};
    for (pv in this.props.dataPVs) {
      pvname = this.props.dataPVs[pv];
      if (typeof this.props.macros !== 'undefined') {
        let macro;
        for (macro in this.props.macros) {
          pvname = pvname.replace(macro.toString(), this.props.macros[macro].toString());
        }
      }

      dataPVs[pvname] = {
        label: "", initialized: false, pvname: pvname, value: [], char_value: "", alarmColor: "", lower_disp_limit: 0, upper_disp_limit: 10000, lower_warning_limit: 4000, upper_warning_limit: 6000,
        units: "V", precision: 0
      };
    }

    state['rangeUnits'] = "";
    state['ymax'] = "";
    state['ymax'] = 2000;
    state['rangeYmax'] = 2000;
    state['ymin'] = 0;
    state['dataPVs'] = dataPVs;
    state['openContextMenu'] = false;
    state['x0'] = 0;
    state['y0'] = 0;
    const contextPVs = [];
    for (const item in dataPVs) {
      contextPVs.push(dataPVs[item]);
    }
    state['contextPVs'] = contextPVs;

    this.state = state;

    this.handleRangeInputValue = this.handleRangeInputValue.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleInputValueLabel = this.handleInputValueLabel.bind(this);
    this.handleMetadata = this.handleMetadata.bind(this);
    this.multipleDataConnections = this.multipleDataConnections.bind(this);
   
    this.changeOtherGraphYmax = this.changeOtherGraphYmax.bind(this);
    this.changeThisGraphYmax = this.changeThisGraphYmax.bind(this);
  }


  handleRangeInputValue = (inputValue, pvname, initialized, severity) => {
    if (initialized === true) {
      switch (parseInt(inputValue)) {
        case 1:
          if (!((this.state.rangeUnits == 'uA') && (this.state.rangeYmax == 200))) {
            this.setState({ 'rangeUnits': 'uA', 'ymax': 200, 'rangeYmax': 200 });
          }
          break;
        case 2:
          if (!((this.state.rangeUnits == 'uA') && (this.state.rangeYmax == 20))) {
            this.setState({ 'rangeUnits': 'uA', 'ymax': 20, 'rangeYmax': 20 });
          }
          break;
        case 3:
          if (!((this.state.rangeUnits == 'nA') && (this.state.rangeYmax == 2000))) {
            this.setState({ 'rangeUnits': 'nA', 'ymax': 2000, 'rangeYmax': 2000 });
          }
          break;
        case 4:
          if (!((this.state.rangeUnits == 'nA') && (this.state.rangeYmax == 200))) {
            this.setState({ 'rangeUnits': 'nA', 'ymax': 200, 'rangeYmax': 200 });
          }
          break;
        case 5:
          if (!((this.state.rangeUnits == 'nA') && (this.state.rangeYmax == 20))) {
            this.setState({ 'rangeUnits': 'nA', 'ymax': 20, 'rangeYmax': 20 });
          }
          break;
        case 6:
          if (!((this.state.rangeUnits == 'pA') && (this.state.rangeYmax == 2000))) {
            this.setState({ rangeUnits: 'pA', 'ymax': 2000, 'rangeYmax': 2000 });
          }
          break;
        default:
      }
    }
  }

  handleInputValue = (inputValue, pvname, initialized, severity) => {
    if (initialized === true) {
      let dataPVs = this.state.dataPVs;
      let newArray = [];

      let max;
      if (typeof this.props.maxLength !== 'undefined') {
        max = this.props.maxLength;
        newArray = dataPVs[pvname].value.concat(inputValue);
      }
      else {
        newArray = inputValue;
        max = inputValue.length;
      }

      dataPVs[pvname].initialized = initialized;
      dataPVs[pvname].severity = severity;

      let length = newArray.length;

      if (length > max) {
        newArray = newArray.slice(length - max);
      }

      let i = 0;
      let sample;
      let data = [];
      let n;
      for (n in newArray) {
        if (newArray[n] > 0) {
          sample = { x: wireSpacing[i], y: newArray[n] }
        }
        else {
          sample = { x: wireSpacing[i], y: this.state.ymin }
        }

        data[i] = sample;

        i++;
      }

      dataPVs[pvname].value = newArray;
      dataPVs[pvname].linedata = data;

      this.setState({ dataPVs: dataPVs });

    }
    else {
      let dataPVs = this.state.dataPVs;
      dataPVs[pvname].initialized = false;

      let i;
      let sample;
      let data = [];

      for (i in wireSpacing) {
        sample = { x: wireSpacing[i], y: 0 }
        data[i] = sample;
      }

      dataPVs[pvname].linedata = data;

      this.setState({ dataPVs: dataPVs });
    }
  }

  handleMetadata = pvname => (metadata) => {
    let dataPVs = this.state.dataPVs;
    dataPVs[pvname].metadata = metadata;
    this.setState({ dataPVs: dataPVs });
  }

  handleInputValueLabel = pvname => (inputValue) => {
    let dataPVs = this.state.dataPVs;
    dataPVs[pvname].label = inputValue;
    this.setState({ dataPVs: dataPVs });
  }

  handleContextMenuClose = event => {
    this.setState({ openContextMenu: false });
  };

  handleToggleContextMenu = (event) => {
    event.persist()
    this.setState(state => ({ openContextMenu: !state.openContextMenu, x0: event.pageX, y0: event.pageY }));
    event.preventDefault();
  }

  handleOnFocus = event => {
    this.setState({ hasFocus: true });
  }

  catchReturn = stateVar => event => {
    if (event.key === 'Enter') {
      this.setState({ outputValue: this.state.value });
    }
  }

  handleOnBlur = event => {
    this.setState({
      hasFocus: false,
      value: this.state['inputValue'],
      metadata: this.state['newMetadata']
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleWheel = (event) => {
    const adjust = this.state.ymax / 5;
    let ymax = this.state.ymax;
    if (event.deltaY < 0) {
      ymax = this.state.ymax - adjust;
    }
    else {
      ymax = this.state.ymax + adjust;
    }

    this.setState({ ymax: ymax })

    this.changeOtherGraphYmax(ymax);
  };

  changeOtherGraphYmax = (ymax) => {
    this.props.changeOtherGraphYmax(ymax);
  };
  changeThisGraphYmax = (ymax) => {
  };

  handleOnClick = (event) => {
    if (event.nativeEvent.which === 1) {
      this.setState({ ymax: this.state.rangeYmax })
      this.changeOtherGraphYmax(this.state.rangeYmax);
    }
  };

  multipleDataConnections = () => {
    let pv;
    let DataConnections = [];
    for (pv in this.state.dataPVs) {

      DataConnections.push(
        <div key={pv.toString()}>
          <DataConnection
            key={'pv' + pv.toString()}
            pv={this.state.dataPVs[pv].pvname}
            handleInputValue={this.handleInputValue}
            handleMetadata={this.handleMetadata(this.state.dataPVs[pv].pvname)}
          />
          {this.props.usePvLabel === true && <DataConnection
            pv={pv.toString() + ".DESC"}
            handleInputValue={this.handleInputValueLabel(this.state.dataPVs[pv].pvname)}
          />}
          {this.props.usePvLabel === true ? this.state.dataPVs[pv].label + ': ' : ""}
        </div>
      )
    }

    return DataConnections;
  }

 

  componentDidUpdate(prevProps) {
    if (prevProps.ymaxFromOtherGraph !== 'undefined') {
      if (prevProps.ymaxFromOtherGraph != this.props.ymaxFromOtherGraph) {
        this.setState({ ymax: this.props.ymaxFromOtherGraph });
      }
    }
  }

  render() {



    
    

    const ymax = this.state.ymax;
   

    return (
      <React.Fragment>
        {(typeof this.props.rangePV !== 'undefined') && <DataConnection
          key={'pv' + this.props.rangePV.toString()}
          pv={this.props.rangePV}
          handleInputValue={this.handleRangeInputValue}
        />
        }
      
        <HarpGraphY
        pvs={this.props.dataPVs}
        macros={this.props.macros}
        legend={this.props.legend}
        lineColor={[ '#e89b02']}
        yAxisTitle={this.props.ylabel}
        xAxisTitle={'mm'}
        yUnits={this.state.rangeUnits}
        yMin={0}
        yMax={ymax}
        onWheel={this.handleWheel} 
        onClick={this.handleOnClick}      
        />
      </React.Fragment>
    )
  }
}

HarpGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

HarpGraph.contextType = AutomationStudioContext;
export default withStyles(styles, { withTheme: true })(HarpGraph)

  /* eslint-disable eqeqeq */