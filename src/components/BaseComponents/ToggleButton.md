ToggleButton local variable example:
```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ToggleButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='loc://test'   label='Value of loc://test '/>
  </div>

{/*###############*/}  
<ToggleButton
  pv='loc://test'
  label={"write '1' or '0' to loc://test"}
  labelPlacement={"top"}
  custom_selection_strings={["OFF","ON"]}
/>
{/*###############*/}


  </div>
```

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


A momentary ToggleButton local variable example:
```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ToggleButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='loc://test'   label='Value of loc://test '/>
  </div>

{/*###############*/}  
<ToggleButton
  pv='loc://test'
  label={"momentary write '1' or '0' to loc://test"}
  labelPlacement={"top"}
  custom_selection_strings={["OFF","ON"]}
  momentary
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
