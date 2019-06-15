ThumbWheel local variable example with default integer and decimal precision (4 and 3):

```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ThumbWheel */}  
  import TextOutput from './TextOutput';
  <React.Fragment>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='loc://testVariable'   label='loc://testVariable'/>
  </div>


{/*###############*/}  

  <ThumbWheel  pv='loc://testVariable'/>

{/*###############*/}  
  </React.Fragment>
```

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
      usePrecision={true}
      usePvUnits={true}
      usePvMinMax={true}
      alarmSensitive={false}
      />
  </div>


{/*###############*/}  

  <ThumbWheel
    pv='pva://$(device):test$(id)'
    macros={{'$(device)':'testIOC','$(id)':'2'}}
    prec_integer={3}
    prec_decimal={2}
    />

{/*###############*/}  
  </React.Fragment>
```
