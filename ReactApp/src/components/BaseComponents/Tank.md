



Tank example connection to a SoftChannel EPICS AI pv with usePvMinMax:

```js
{/*The SimpleSlider code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the Tank */}  
  import SimpleSlider from './SimpleSlider';

  <div style={{width:'50%'}}>

  {/*###############*/}  

  <Tank  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} usePvMinMax={true}/>

  {/*###############*/}


<SimpleSlider pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}   label='Value:' usePvMinMax={true} step={1}/>
</div>
```
