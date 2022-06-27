{% raw %}

GraphY EPICS variable example, drag the slider to modulate the amplitude of the Sine Wave:
```js
import Slider from './Slider';
<div>
<div style={{height:'25vh'}}>
  <GraphY  
    pvs={['testIOC:test4','testIOC:test5']}  
    legend={['Modulated Sine Wave Amplitude','Sine Wave Amplitude']}
  />
</div>
  <Slider  pv='testIOC:amplitude'   label='Sine Wave Amplitude' usePvMinMax={true}/>
</div>


```

GraphY EPICS variable example, alternate line colors:
```js
import Slider from './Slider';
<div>
<div style={{height:'25vh'}}>
  <GraphY  
    pvs={['testIOC:test4','testIOC:test5']}  
    legend={['Modulated Sine Wave Amplitude','Sine Wave Amplitude']}
    lineColor={['#3f51b5','#e91e63']}
  />
</div>
  <Slider  pv='testIOC:amplitude'   label='Sine Wave Amplitude' usePvMinMax={true}/>
</div>


```






GraphY EPICS variable example:
```js


<div style={{height:'25vh'}}>
  <GraphY  

    pvs={[
      'testIOC:MTextUpdate1',
      'testIOC:MTextUpdate2',
      'testIOC:MTextUpdate3',
      'testIOC:MTextUpdate4',
      'testIOC:MTextUpdate5'

    ]}
      maxLength={256}
  />
</div>




```
GraphY log scale:
```js
import Slider from './Slider';
<div>
<div style={{height:'25vh'}}>
  <GraphY  
    pvs={['testIOC:test5']}  
    legend={['Sine Wave Amplitude']}
    yScaleLog10={true}
    yTickFormat=".3e" 
  />
</div>
  <Slider  pv='testIOC:amplitude'   label='Sine Wave Amplitude' usePvMinMax={true}/>
</div>


```


GraphY custom yMin nad yMax:
```js
import Slider from './Slider';
<div>
<div style={{height:'25vh'}}>
  <GraphY
    title={"Custom yMin and yMax"}  
    pvs={['testIOC:test5']}  
    legend={['Sine Wave Amplitude']}
    yMin={3000}
    yMax={6000}
  />
</div>
  <Slider  pv='testIOC:amplitude'   label='Sine Wave Amplitude' usePvMinMax={true}/>
</div>
```
{% endraw %}