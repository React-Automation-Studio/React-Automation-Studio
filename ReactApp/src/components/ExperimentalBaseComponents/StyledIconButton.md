
StyledIconButton example connection to a SoftChannel EPICS AI pv with example of usePvLabel

```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconButton */}  
  import TextOutput from './TextOutput';
  import Face from '@material-ui/icons/Face';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} usePvLabel={true} usePvPrecision={true} prec={0}/>
  </div>
  {/*###############*/}  

  <StyledIconButton  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} usePvLabel={true}>
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
      pv='pva://$(device):test$(id)'
      macros={{'$(device)':'testIOC','$(id)':'2'}}
      usePvLabel={true}
      usePvPrecision={true}
      usePvUnits={true}
      usePvMinMax={true}
      alarmSensitive={false}
      />
  </div>
  {/*###############*/}  

  <StyledIconButton  
    pv='pva://$(device):test$(id)' 
    macros={{'$(device)':'testIOC','$(id)':'2'}} 
    usePvLabel={true} 
    labelPlacement='end' 
    offColor="secondary"
    />

  {/*###############*/}

  </div>
```
