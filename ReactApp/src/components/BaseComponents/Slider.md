
Slider EPICS variable example:
```js



  <Slider  pv='pva://testIOC:amplitude'   usePvLabel={true} usePvMinMax={true} step={1}/>




```


Slider EPICS variable example with extra marks and thumb:
```js



  <Slider  pv='pva://testIOC:amplitude' marks={{0:0,2500:2500,5000:5000,7500:7500,10000:10000}} showThumbValue={true} usePvLabel={true} usePvMinMax={true} step={1}/>




```


Slider EPICS variable example with extra marks and thumb:
```js


  <div style={{height:300}}>
  <Slider vertical pv='pva://testIOC:amplitude' marks={{0:0,2500:2500,5000:5000,7500:7500,10000:10000}} showThumbValue={true} usePvLabel={true} usePvMinMax={true} step={1}/>
  </div>



```
