import React from 'react'
import AutomationStudioContext from './AutomationStudioContext';
import DeprecatedLocalPV from '../SystemComponents/DeprecatedLocalPV';
import DeprecatedEpicsPV from './DeprecatedEpicsPV';


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
   


    const pv =this.state.pvname;

    return (

      <React.Fragment  >
      {pv.includes('loc://')&&
        <DeprecatedLocalPV
        localVariable={this.context.localVariables[pv]}
        value={typeof this.context.localVariables[pv]==='undefined'?undefined:this.context.localVariables[pv].value}
        initialValue={this.props.initialLocalVariableValue}
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
    <DeprecatedEpicsPV
    pv={pv}
    macros={this.props.macros}
    usePrecision={this.props.usePrecision}
    handleInputValue={this.props.handleInputValue}
    handleMetadata={this.props.handleMetadata}
    outputValue=  {this.props.outputValue}
    useStringValue={this.props.useStringValue}
    debug={this.props.debug}
    newValueTrigger={this.props.newValueTrigger}
    usePolling={this.props.usePolling}
    pollingRate={this.props.pollingRate}
    />
  }
  { (pv.includes('pva://')&&this.props.usePvLabel===true) && <DeprecatedEpicsPV

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
