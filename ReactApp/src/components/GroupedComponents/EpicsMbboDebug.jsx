
import TextInput from '../BaseComponents/TextInput';
import SelectionInput from '../BaseComponents/SelectionInput';
import SelectionList from '../BaseComponents/SelectionList';
import TextOutput from '../BaseComponents/TextOutput';
import Grid from '@mui/material/GridLegacy';
import RadioButtonGroup from '../BaseComponents/RadioButtonGroup';

const EpicsMbboDebug = (props) => {
  return (
    <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center"
      sx={{
        padding: 0,
        spacing: 0,
        overflowX: "hidden",
        overflowY: "hidden",
      }}>

      <Grid item xs={12}>
        <TextOutput pv='$(device).NAME' macros={props['macros']} label={'EPICS PV Name:'} />
      </Grid>
      <Grid item xs={12}>
        <TextOutput pv='$(device).DESC' macros={props['macros']} label={'EPICS PV DESC:'} />
      </Grid>
      <Grid item xs={12}>
        <TextOutput pv='$(device)' macros={props['macros']} useStringValue={true} label={'EPICS PV String Value:'} />
      </Grid>
      <Grid item xs={12}>
        <TextOutput pv='$(device)' macros={props['macros']} label={'EPICS PV Numerical Value:'} />
      </Grid>
      <Grid item xs={12}>
        <TextInput pv='$(device)' macros={props['macros']} label={'EPICS PV Numerical Setpoint:'} />
      </Grid>
      <Grid item xs={12}>
        <TextInput pv='$(device)' macros={props['macros']} useStringValue={true} label={'EPICS PV String Setpoint:'} />
      </Grid>
      <Grid item xs={12}>
        <SelectionInput pv='$(device)' macros={props['macros']} usePvLabel={true} useStringValue={true} custom_selection_strings={props.custom_selection_strings} />
      </Grid>
      <Grid item xs={12}>
        <TextOutput pv='$(device).ZRST' macros={props['macros']} label={'EPICS PV ZRST:'} />
      </Grid>
      <Grid item xs={12}>
        <TextOutput pv='$(device).ONST' macros={props['macros']} label={'EPICS PV ONST:'} />
      </Grid>
      <Grid item xs={6}>
        <SelectionList pv='$(device)' macros={props['macros']} usePvLabel={true} useStringValue={true} custom_selection_strings={props.custom_selection_strings} />
      </Grid>
      <Grid item xs={6}>
        <RadioButtonGroup pv='$(device)' macros={props['macros']} usePvLabel={true} useStringValue={true} custom_selection_strings={props.custom_selection_strings} />
      </Grid>
      <Grid item xs={12}>
        <SelectionList horizontal pv='$(device)' macros={props['macros']} usePvLabel={true} useStringValue={true} custom_selection_strings={props.custom_selection_strings} />
      </Grid>
    </Grid>
  );
}


export default EpicsMbboDebug
