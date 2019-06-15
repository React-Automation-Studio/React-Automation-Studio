
SimpleSlider local variable example:
```js



  <SimpleSlider  pv='loc://test1'   label='Value:' min={-100} max={100} step={1}/>




```
SimpleSlider EPICS variable example:
```js



  <SimpleSlider  pv='pva://testIOC:amplitude'   usePvLabel={true} usePvMinMax={true} step={1}/>




```
