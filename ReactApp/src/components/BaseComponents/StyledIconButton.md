
StyledIconButton example connection to a SoftChannel EPICS AI pv with example of usePvLabel

```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconButton */}  
  import TextOutput from './TextOutput';
  import Face from '@mui/icons-material/Face';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <TextOutput   
     pv='$(device):BO$(id)'
     macros={{'$(device)':'testIOC','$(id)':'1'}} 
     usePvLabel={true} 
     usePvPrecision={true} />
  </div>
  {/*###############*/}  

  <StyledIconButton    
    pv='$(device):BO$(id)'
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
      pv='$(device):BO$(id)'
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
    pv='$(device):BO$(id)'
    macros={{'$(device)':'testIOC','$(id)':'1'}} 
    usePvLabel={true} 
    labelPlacement='end' 
    offColor="secondary"
    />

  {/*###############*/}

  </div>
```
