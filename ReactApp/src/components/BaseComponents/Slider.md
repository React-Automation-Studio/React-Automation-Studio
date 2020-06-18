
Slider EPICS variable example:
```js



  <Slider  pv='pva://testIOC:amplitude'  showValue={true} usePvMinMax={true} step={1} usePvUnits={true}/>




```


Slider EPICS variable example with extra marks :
```js



  <Slider  pv='pva://testIOC:amplitude' marks={{0:0,2500:2500,5000:5000,7500:7500,10000:10000}}  usePvLabel={true} usePvMinMax={true} step={1} usePvUnits={true}/>




```
Slider EPICS variable example with extra marks :
```js



  <Slider  pv='pva://testIOC:amplitude' marks={{0:0,2500:2500,5000:5000,7500:7500,10000:10000}}  usePvLabel={true} usePvMinMax={true} step={1} usePvUnits={true} valuePlacement='bottom'/>




```

Slider EPICS variable example with extra marks :
```js



  <Slider  pv='pva://testIOC:amplitude' marks={{0:0,2500:2500,5000:5000,7500:7500,10000:10000}}  usePvLabel={true} usePvMinMax={true} step={1} usePvUnits={true} showValue={false}/>




```
Slider EPICS variable example with label and values at the top:
```js
  import Grid from '@material-ui/core/Grid';

 
  <Grid
    container
    direction="row"
    justify="space-between"
    alignItems="stretch"
    style={{height:300}}
  >
  <Grid item xs={3}>
    <Slider vertical pv='pva://testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true}/>
  </Grid>
  <Grid item xs={3}>
    <Slider vertical pv='pva://testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={3}>
    <Slider vertical pv='pva://testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={3}>
    <Slider vertical pv='pva://testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>



  </Grid>
 


```
Slider EPICS variable example with label and values at the top:
```js
  import Grid from '@material-ui/core/Grid';

 
  <Grid
    container
    direction="row"
    justify="space-between"
    alignItems="stretch"
    style={{height:300}}
  >
  <Grid item xs={3}>
    <Slider vertical pv='pva://testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} valuePlacement={'bottom'}/>
  </Grid>
 <Grid item xs={3}>
    <Slider vertical pv='pva://testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} valuePlacement={'bottom'}/>
  </Grid>
  <Grid item xs={3}>
    <Slider vertical pv='pva://testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} valuePlacement={'bottom'}/>
  </Grid>
  <Grid item xs={3}>
    <Slider vertical pv='pva://testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} valuePlacement={'bottom'}/>
  </Grid>


  </Grid>
 


```
Slider EPICS variable example with custom label and values at the top:
```js
  import Grid from '@material-ui/core/Grid';

 
  <Grid
    container
    direction="row"
    justify="space-around"
    alignItems="stretch"
    style={{height:300}}
  >
  <Grid item xs={2}>
    <Slider vertical pv='pva://testIOC:amplitude'  label={'A'}    usePvMinMax={true} step={1} usePvUnits={true}/>
  </Grid>
  <Grid item xs={2}>
    <Slider vertical pv='pva://testIOC:amplitude'   label={'B'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={2}>
    <Slider vertical pv='pva://testIOC:amplitude'  label={'C'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={2}>
    <Slider vertical pv='pva://testIOC:amplitude'   label={'D'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={2}>
    <Slider vertical pv='pva://testIOC:amplitude'   label={'E'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={2}>
    <Slider vertical pv='pva://testIOC:amplitude'   label={'F'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>

  
  
  


  </Grid>
 


```