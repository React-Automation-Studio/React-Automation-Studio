//This example is deprecated and will be removed in a future release 

import React from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';
import SelectionInput from '../../BaseComponents/SelectionInput';

import TextUpdate from '../../BaseComponents/TextUpdate';
import Grid from '@material-ui/core/Grid';

import ToggleButton from '../../BaseComponents/ToggleButton';
import ActionButton from '../../BaseComponents/ActionButton';

console.warn("This example is deprecated and will be removed in a future release")

class ControlBottomHarp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(device) {
    this.props.handlePsOnClick(device);
  };
  render() {
    return (
      <Grid container justify="flex-start" direction="row" alignItems="center" spacing={0}>
        <Grid item xs={3} sm={3}>
          <div style={{ height: '60px', 'width': '200px' }}>
            <ToggleButton pv='$(device)$(number)$(line):put-outIn' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p' }} usePvLabel={true} labelPlacement={"top"} />
            <br />
            <ActionButton pv='$(device)$(number)$(line):$(xOrY)_store_offset' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p', '$(xOrY)': 'x' }} label={"Store Offset"} labelPlacement={"top"} actionValue={"1"} actionString={"Store Offset"} />
            <SelectionInput pv='$(device)$(number)$(line):$(xOrY)raw.SCAN' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p', '$(xOrY)': 'x' }} label={'Scan rate'} useStringValue={true} />
            <br />
            <TextInput pv='$(device)$(number)$(line):$(xOrY)range' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p', '$(xOrY)': 'x' }} usePvLabel={true} />
            <SelectionInput pv='$(device)$(number)$(line):$(xOrY)range' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p', '$(xOrY)': 'x' }} useStringValue={true} custom_selection_strings={['1', '2', '3', '4', '5', '6']} />
            <br />
            <div>
              Command:
              <TextUpdate pv='$(device)$(number)$(line):put-outIn' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p' }} usePvLabel={true} useStringValue={true} />
              Status:
              <TextUpdate pv='$(device)$(number)$(line):get-statusText' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p' }} usePvLabel={true} useStringValue={true} />
            </div>
          </div>
        </Grid>
        <Grid item xs={3} sm={2}>
          <div style={{ height: '60px', 'width': '200px' }}>
            <ToggleButton pv='$(device)$(number)$(line):put-outIn' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p' }} usePvLabel={true} labelPlacement={"top"} />
            <br />
            <SelectionInput pv='$(device)$(number)$(line):$(xOrY)raw.SCAN' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p', '$(xOrY)': 'y' }} label={'Scan rate'} useStringValue={true} />
            <br />
            <TextInput pv='$(device)$(number)$(line):$(xOrY)range' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p', '$(xOrY)': 'y' }} usePvLabel={true} />
            <SelectionInput pv='$(device)$(number)$(line):$(xOrY)range' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p', '$(xOrY)': 'y' }} useStringValue={true} custom_selection_strings={['1', '2', '3', '4', '5', '6']} />
            <br />
            <div>
              Command:
            <TextUpdate pv='$(device)$(number)$(line):put-outIn' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p' }} usePvLabel={true} useStringValue={true} />
            Status:
            <TextUpdate pv='$(device)$(number)$(line):get-statusText' macros={{ '$(device)': 'harp', '$(number)': '5', '$(line)': 'p' }} usePvLabel={true} useStringValue={true} />
            </div>
          </div>
        </Grid>
        <Grid item xs={3} sm={2}>
          <div style={{ height: '60px', 'width': '100px' }}>
            <ToggleButton pv='testIOC:BeamlineA:InUse' label={"BL A in use"} labelPlacement={"top"} />
          </div>
          <div style={{ height: '60px', 'width': '100px' }}>
            <ToggleButton pv='testIOC:BeamlineB:InUse' label={"BL B in use"} labelPlacement={"top"} />
          </div>
          <div style={{ height: '60px', 'width': '100px' }}>
            <ToggleButton pv='testIOC:BeamlineC:InUse' label={"BL C in use"} labelPlacement={"top"} />
          </div>
          <div style={{ height: '60px', 'width': '100px' }}>
            <ToggleButton pv='testIOC:BeamlineD:InUse' label={"BL D in use"} labelPlacement={"top"} />
          </div>
        </Grid>
        <Grid item xs={3} sm={2}>
          <div style={{ height: '60px', 'width': '100px' }}>
            <ToggleButton pv='testIOC:BeamlineA:BeamOn' label={"Beam On"} labelPlacement={"top"} />
          </div>
        </Grid>
      </Grid>
    );
  }
}

ControlBottomHarp1.contextType = AutomationStudioContext;
export default ControlBottomHarp1
