import React from 'react'
import AutomationStudioContext from './AutomationStudioContext';
import deprecatedLocalPV from '../SystemComponents/deprecatedLocalPV';
import deprecatedEpicsPV from '../SystemComponents/deprecatedEpicsPV';
import { withStyles } from '@material-ui/core/styles';
import uuid from 'uuid';
const styles = theme => ({
  body1: theme.typography.body1,



});

class DataConnection extends React.Component {
  constructor(props) {
    super(props);

    let pvname;
    if (typeof this.props.macros !== 'undefined'){
      let macro;
      pvname=this.props.pv;
      for (macro in this.props.macros){
        pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
      }
      this.state ={

        'pvname':pvname,

      };
    }
    else{
      pvname=this.props.pv;
      this.state ={

        'pvname':pvname,

      };
    }
  }



  componentDidMount() {

  }

  componentWillUnmount(){

  }





  render() {
    const {classes} =this.props;


    const pv =this.state['pvname']

    return (

      <React.Fragment  >
      {pv.includes('loc://')&&
        <deprecatedLocalPV
        localVariable={this.context.localVariables[pv]}
        value={typeof this.context.localVariables[pv]==='undefined'?undefined:this.context.localVariables[pv].value}
        initialValue={this.props.intialLocalVariableValue}
        pv={pv}
        usePrecision={this.props.usePrecision}
        handleInputValue={this.props.handleInputValue}
        handleMetadata={this.props.handleMetadata}
        outputValue=  {this.props.outputValue}
        useStringValue={this.props.useStringValue}
        debug={this.props.debug}
        />
      }
    {pv.includes('pva://')&&
    <deprecatedEpicsPV
    pv={pv}
    macros={this.props.macros}
    usePrecision={this.props.usePrecision}
    handleInputValue={this.props.handleInputValue}
    handleMetadata={this.props.handleMetadata}
    outputValue=  {this.props.outputValue}
    useStringValue={this.props.useStringValue}
    debug={this.props.debug}
    newValueTrigger={this.props.newValueTrigger}
    />
  }
  { (pv.includes('pva://')&&this.props.usePvLabel===true) && <deprecatedEpicsPV

  pv={pv.toString()+".DESC"}
  macros={this.props.macros}
  handleInputValue={this.props.handleInputValueLabel}

  />    }

  </React.Fragment>
)
}
}

DataConnection.contextType=AutomationStudioContext;
export default DataConnection
