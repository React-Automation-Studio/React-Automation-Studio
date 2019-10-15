ToggleButton EPICS example:
```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ToggleButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://testIOC:BO1'   label={'Value of: pva://testIOC:BO1 '} useStringValue={true}/>
  </div>

{/*###############*/}  
<ToggleButton
  pv='pva://testIOC:BO1'
  label={'pva://testIOC:BO1 '}
  labelPlacement={"top"}

/>
{/*###############*/}


  </div>
```


Momentary ToggleButton EPICS example:
```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ToggleButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://testIOC:BO1'   label={'Value of: pva://testIOC:BO1 '} useStringValue={true}/>
  </div>

{/*###############*/}  
<ToggleButton
  pv='pva://testIOC:BO1'
  label={'pva://testIOC:BO1 '}
  labelPlacement={"top"}
  momentary

/>
{/*###############*/}


  </div>
```
