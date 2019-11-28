
SimpleSlider EPICS variable example:
```js



  <SimpleSlider  pv='pva://testIOC:amplitude'   usePvLabel={true} usePvMinMax={true} step={1}/>




```


SimpleSlider EPICS variable example with extra marks and thumb:
```js



  <SimpleSlider  pv='pva://testIOC:amplitude' marks={[{value:0,label:0},{value:2500,label:2500},{value:5000,label:5000},{value:7500,label:7500},{value:10000,label:10000}]} showThumbValue={true} usePvLabel={true} usePvMinMax={true} step={1}/>




```
