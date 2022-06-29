{% raw %}

SwitchComponent example connection to a SoftChannel EPICS AI pv with use of EPICS label and a custom label position:

```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the SwitchComponent */}  
  import TextOutput from './TextOutput';
  <React.Fragment>
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

  <SwitchComponent
    pv='$(device):BO$(id)'
    macros={{'$(device)':'testIOC','$(id)':'1'}}
    usePvLabel={true}
    labelPosition={"end"}
    />

{/*###############*/}  
  </React.Fragment>
```
{% endraw %}