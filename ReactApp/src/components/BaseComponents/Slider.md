
Slider EPICS variable example:
```js



  <Slider  pv='testIOC:amplitude'  showValue={true} usePvMinMax={true} usePvLabel={true} step={1} usePvUnits={true}/>




```


Slider EPICS variable example with extra marks :
```js



  <Slider  pv='testIOC:amplitude' marks={{0:0,2500:2500,5000:5000,7500:7500,10000:10000}}  usePvLabel={true} usePvMinMax={true} step={1} usePvUnits={true}/>




```
Slider EPICS variable example with label and values at the top:
```js
  import Grid from '@mui/material/Grid';

 
  <Grid
    container
    direction="row"
    justifyContent="space-between"
    alignItems="stretch"
    style={{height:300}}
  >
  <Grid item xs={3}>
    <Slider vertical={true} pv='testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true}/>
  </Grid>
  <Grid item xs={3}>
    <Slider vertical={true} pv='testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={3}>
    <Slider vertical={true} pv='testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={3}>
    <Slider vertical={true} pv='testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>



  </Grid>
 


```
Slider EPICS variable example with label at the top  and values at the bottom:
```js
  import Grid from '@mui/material/Grid';

 
  <Grid
    container
    direction="row"
    justifyContent="space-between"
    alignItems="stretch"
    style={{height:300}}
  >
  <Grid item xs={3}>
    <Slider vertical={true} pv='testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} valuePlacement={'bottom'}/>
  </Grid>
 <Grid item xs={3}>
    <Slider vertical={true} pv='testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} valuePlacement={'bottom'}/>
  </Grid>
  <Grid item xs={3}>
    <Slider vertical={true} pv='testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} valuePlacement={'bottom'}/>
  </Grid>
  <Grid item xs={3}>
    <Slider vertical={true} pv='testIOC:amplitude'   usePvLabel={true}    usePvMinMax={true} step={1} usePvUnits={true} valuePlacement={'bottom'}/>
  </Grid>


  </Grid>
 


```
Slider EPICS variable example with custom label and values at the top:
```js
  import Grid from '@mui/material/Grid';

 
  <Grid
    container
    direction="row"
    justifyContent="space-around"
    alignItems="stretch"
    style={{height:300}}
  >
  <Grid item xs={2}>
    <Slider vertical={true} pv='testIOC:amplitude'  label={'A'}    usePvMinMax={true} step={1} usePvUnits={true}/>
  </Grid>
  <Grid item xs={2}>
    <Slider vertical={true} pv='testIOC:amplitude'   label={'B'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={2}>
    <Slider vertical={true} pv='testIOC:amplitude'  label={'C'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={2}>
    <Slider vertical={true} pv='testIOC:amplitude'   label={'D'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={2}>
    <Slider vertical={true} pv='testIOC:amplitude'   label={'E'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>
  <Grid item xs={2}>
    <Slider vertical={true} pv='testIOC:amplitude'   label={'F'}    usePvMinMax={true} step={1} usePvUnits={true} />
  </Grid>

  
  
  


  </Grid>
 


```