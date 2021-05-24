ToggleButton EPICS example:
```js
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ToggleButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='testIOC:BO1'   label={'Value of: testIOC:BO1 '} useStringValue={true}/>
  </div>

{/*###############*/}  
<ToggleButton
  pv='testIOC:BO1'
  label={'testIOC:BO1 '}
  labelPlacement={"top"}
  muiButtonProps={{startIcon:<PowerSettingsNewIcon />}}
/>
{/*###############*/}


  </div>
```


Momentary ToggleButton EPICS example:
```js
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ToggleButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='testIOC:BO1'   label={'Value of: testIOC:BO1 '} useStringValue={true}/>
  </div>

{/*###############*/}  
<ToggleButton
  pv='testIOC:BO1'
  label={'testIOC:BO1 '}
  labelPlacement={"top"}
  momentary
  muiButtonProps={{startIcon:<PowerSettingsNewIcon />}}
 

/>
{/*###############*/}


  </div>
```
