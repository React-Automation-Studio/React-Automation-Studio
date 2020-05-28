

ThumbWheel example connection to a SoftChannel EPICS AI pv with custom precision:

```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ThumbWheel */}  
  import TextOutput from './TextOutput';
  <React.Fragment>
  <div style={{marginBottom:8}}>
    <TextOutput
      pv='pva://$(device):test$(id)'
      macros={{'$(device)':'testIOC','$(id)':'2'}}
      usePvLabel={true}
      
      usePvUnits={true}
      usePvMinMax={true}
      alarmSensitive={true}
      prec={5}
      />
  </div>


{/*###############*/}  

  <ThumbWheel
    pv='pva://$(device):test$(id)'
    macros={{'$(device)':'testIOC','$(id)':'2'}}
    prec_integer={4}
    prec_decimal={5}
    prec={5}
    usePvMinMax={true}
    />

{/*###############*/}  
  </React.Fragment>
```
