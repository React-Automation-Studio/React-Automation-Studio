

SelectionList example connection to a SoftChannel EPICS MBBO pv with horizontal orientation and EPICS pv strings for choice:

```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the SelectionList */}  
  import TextOutput from './TextOutput';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <TextOutput
    pv='pva://$(device):mbboTest$(id)'
    macros={{'$(device)':'testIOC','$(id)':'1'}}
    usePvLabel={true}
    useStringValue={true}/>
  </div>

  {/*###############*/}  

  <SelectionList  pv='pva://$(device):mbboTest$(id)'       macros={{'$(device)':'testIOC','$(id)':'1'}}
  horizontal={true}  
  usePvLabel={true}/>

  {/*###############*/}

</div>
```

SelectionList example connection to a SoftChannel EPICS MBBO pv with vertical orientation and custom strings for choice:

```js
{/*The TextOutput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the SelectionList */}  
  import TextOutput from './TextOutput';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <TextOutput
    pv='pva://$(device):mbboTest$(id)'
    macros={{'$(device)':'testIOC','$(id)':'1'}}
    label={'Custom Label'}
    useStringValue={true}
    usePvLabel={true}/>
  </div>

  {/*###############*/}  

  <SelectionList  pv='pva://$(device):mbboTest$(id)' macros={{'$(device)':'testIOC','$(id)':'1'}}    usePvLabel={true} labelPlacement='bottom' custom_selection_strings={['text 1','text 3']}/>

  {/*###############*/}

</div>
```
