

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
      prec={3}
      />
  </div>


{/*###############*/}  

  <ThumbWheel
    pv='pva://$(device):test$(id)'
    macros={{'$(device)':'testIOC','$(id)':'2'}}
    prec_integer={4}
    prec_decimal={3}
    prec={3}
    usePvMinMax={true}
    />

{/*###############*/}  
  </React.Fragment>
```
custom increments example
```js
 <ThumbWheel
    pv='pva://$(device):test$(id)'
    macros={{'$(device)':'testIOC','$(id)':'2'}}
    
    prec={1}
    usePvMinMax={true}
    custom_increments={[500,50,5,0.5]}
    />
```