StyledIconButton local variable example:

```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconButton */}  
  import TextOutput from './TextOutput';
  import Face from '@material-ui/icons/Face';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='loc://testVariable'   label='loc://testVariable'/>
  </div>
  {/*###############*/}  

  <StyledIconButton  pv='loc://testVariable' label='Test Label'/>


  {/*###############*/}

  </div>
```
StyledIconButton with custom icon local variable example:

```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconButton */}  
  import TextOutput from './TextOutput';
  import Face from '@material-ui/icons/Face';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='loc://testVariable'   label='loc://testVariable'/>
  </div>
  {/*###############*/}  

  <StyledIconButton  pv='loc://testVariable' label='Test Label'>
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
      usePrecision={true}
      usePvUnits={true}
      usePvMinMax={true}
      alarmSensitive={false}
      />
  </div>
  {/*###############*/}  

  <StyledIconButton  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} usePvLabel={true} labelPlacement='end'/>

  {/*###############*/}

  </div>
```
