
StyledIconButton example connection to a SoftChannel EPICS AI pv with example of usePvLabel

```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconButton */}  
  import TextOutput from './TextOutput';
  import Face from '@material-ui/icons/Face';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <TextOutput   
     pv='pva://$(device):BO$(id)'
     macros={{'$(device)':'testIOC','$(id)':'1'}} 
     usePvLabel={true} 
     usePvPrecision={true} />
  </div>
  {/*###############*/}  

  <StyledIconButton    
    pv='pva://$(device):BO$(id)'
    macros={{'$(device)':'testIOC','$(id)':'1'}} 
    usePvLabel={true}>
    <Face/>
  </StyledIconButton>

  {/*###############*/}

  </div>
```
StyledIconButton example connection to a SoftChannel EPICS AI pv with example of usePvLabel and overide of label placement:

```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconButton */}  
  import TextOutput from './TextOutput';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <TextOutput
      pv='pva://$(device):BO$(id)'
      macros={{'$(device)':'testIOC','$(id)':'1'}} 
      usePvLabel={true}
      usePvPrecision={true}
      usePvUnits={true}
      usePvMinMax={true}
      alarmSensitive={false}
      />
  </div>
  {/*###############*/}  

  <StyledIconButton  
    pv='pva://$(device):BO$(id)'
    macros={{'$(device)':'testIOC','$(id)':'1'}} 
    usePvLabel={true} 
    labelPlacement='end' 
    offColor="secondary"
    />

  {/*###############*/}

  </div>
```

StyledIconButton receives a binary waveform.

```js
import { Grid } from "@material-ui/core";
import { Face } from "@material-ui/icons";

<Grid container spacing={2}>
  <Grid item xs={6}>
    <StyledIconButton
      pv="pva://testIOC:binaryWaveform"
      usePvLabel
      labelPlacement="top"
      registersLabel={[
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
      ]}
    >
      <Face />
    </StyledIconButton>
  </Grid>
  <Grid item xs={6}>
    <StyledIconButton
      pv="pva://testIOC:binaryWaveform"
      usePvLabel
      labelPlacement="top"
      registersLabelPlacement="bottom"
      registersLabel={[
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
      ]}
      alignHorizontal
    >
      <Face />
    </StyledIconButton>
  </Grid>
</Grid>;
```
