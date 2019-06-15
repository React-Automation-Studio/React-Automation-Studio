Gauge local variable example with defaults:

```js
{/*The SimpleSlider code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the Gauge */}  
  import SimpleSlider from './SimpleSlider';
  <div style={{textAlign:'center'}}>


  {/*###############*/}  
<div style={{width:'50%',height:'100%'}}>
  <Gauge  pv='loc://testVariable'   />
</div>
  {/*###############*/}
  <div style={{marginBottom:8}}>
    <SimpleSlider  pv='loc://testVariable'   label='Value:' min={0} max={100} step={1}/>
  </div>
</div>

```

Gauge example connection to a SoftChannel EPICS AI pv with custom min max:

```js
{/*The SimpleSlider code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the Gauge */}  
  import SimpleSlider from './SimpleSlider';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <SimpleSlider pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'1'}}   label='Value:' usePvMinMax={true} step={1}/>
  </div>

  {/*###############*/}  

  <Gauge  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'1'}} usePvMinMax={true}/>

  {/*###############*/}

</div>
```

Gauge example connection to a SoftChannel EPICS AI pv with usePvMinMax:

```js
{/*The SimpleSlider code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the Gauge */}  
  import SimpleSlider from './SimpleSlider';
  <div style={{textAlign:'center'}}>
  <div style={{marginBottom:8}}>
    <SimpleSlider pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}   label='Value:' usePvMinMax={true} step={1}/>
  </div>

  {/*###############*/}  

  <Gauge  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} usePvMinMax={true}/>

  {/*###############*/}

</div>
```
