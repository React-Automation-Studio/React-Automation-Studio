
  ActionButton EPICS BO example:

```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ActionButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://testIOC:BO1'   label='Value of pva://testIOC:BO1'/>
  </div>


  <ActionButton
    pv='pva://testIOC:BO1'
    label={"pva://testIOC:BO1"}
    labelPlacement={"top"}
    actionValue={"1"}
    actionString={"write 1 to pva://testIOC:BO1"}
    tooltip={
      'Click button to write action value'
    }
    showTooltip={true}
    tooltipProps={{placement:'top'}}
  />

  <ActionButton
    pv='pva://testIOC:BO1'
    label={"pva://testIOC:BO1"}
    labelPlacement={"top"}
    actionValue={"0"}
    actionString={"write 0 to pva://testIOC:BO1"}
    tooltip={
      'Click button to write action value'
    }
    showTooltip={true}
    tooltipProps={{placement:'bottom'}}
  />
  </div>
```

ActionButton to multi variable example:
```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ActionButton */}  
  import TextOutput from './TextOutput';
  import CloudUploadIcon from '@material-ui/icons/CloudUpload';
    import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://testIOC:BO1'   label='Value of pva://testIOC:BO1 '/>
  </div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://testIOC:BO2'   label='Value of pva://testIOC:BO2 '/>
  </div>

{/*###############*/}  
<ActionButton
  pvs={['pva://testIOC:BO1','pva://testIOC:BO2']}
  label={"write '1' to multiple PVS "}
  labelPlacement={"top"}
  actionValue={"1"}
  actionString={"write '1' "}
  muiButtonProps={{startIcon:<CloudUploadIcon />}}
/>

<ActionButton
  pvs={['pva://testIOC:BO1','pva://testIOC:BO2']}
  label={"write '0' to multiple PVS "}
  labelPlacement={"top"}
  actionValue={"0"}
  actionString={"write '0' "}
  muiButtonProps={{endIcon:<CloudDownloadIcon />}}
/>
{/*###############*/}
</div>
```

ActionButton receiving a waveform example. Show only a subset of registers:

```js
    import { Grid, Typography } from "@material-ui/core";
    import StyledIconIndicator from "./StyledIconIndicator";

    const button1Strings = [];
    const button0Strings = [];
    const labels = [];
    for (let i = 0; i < 10; i++) {
      button1Strings.push("Write 1 into register " + i);
      button0Strings.push("Write 0 into register " + i);
      labels.push("Register " + i);
    }
    <Grid container>
        <Grid item xs={12}>
            <StyledIconIndicator 
                pv='pva://testIOC:binaryWaveform' 
                alignHorizontal 
                registersLabel={labels}
                registersLabelPlacement={"bottom"}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography style={{ textAlign: "center" }}>
                Vertical display
            </Typography>
            <ActionButton
              pv='pva://testIOC:binaryWaveform'
              label="pva://testIOC:binaryWaveform"
              labelPlacement="top"
              actionValue={1}
              registersActionString={button1Strings}
              tooltip="Click button to write action value"
              showTooltip
              tooltipProps={{ placement: "top" }}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography style={{ textAlign: "center" }}>
                Horizontal display
            </Typography>
            <ActionButton
              pv='pva://testIOC:binaryWaveform'
              label="pva://testIOC:binaryWaveform"
              labelPlacement="top"
              actionValue={0}
              registersActionString={button0Strings}
              tooltip="Click button to write action value"
              showTooltip
              tooltipProps={{ placement: "top" }}
              alignHorizontal
            />
        </Grid>
    </Grid>
```
