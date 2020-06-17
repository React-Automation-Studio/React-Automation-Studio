



Gauge example connection to a SoftChannel EPICS AI pv with usePvMinMax:

```js
{/*The Slider code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the Gauge */}  
  import Slider from './Slider';

  <div style={{width:'50%'}}>

  {/*###############*/}  

  <Gauge  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} usePvMinMax={true}/>

  {/*###############*/}


<Slider pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}   label='Value:' usePvMinMax={true} step={1}/>
</div>
```
