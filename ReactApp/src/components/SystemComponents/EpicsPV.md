The pv object return through the pvData callback or or returned from the  `useEpicsPV` Hook function has a default structure with the following properties:

```js static
{
      initialized: false,
      pvname: pvname,
      value: number or string,
      severity: number,
      timestamp: number,
      metadata: { 
        initialized: false, 
        pvname: "", 
        value: "", 
        char_value: "", 
        lower_disp_limit: "",
        upper_disp_limit: "",
        lower_warning_limit: "",
        upper_warning_limit: "",
        units: "",
        precision: number,
        enum_strs:[] }
```
|  Property |Type |Default | Description |
|:-:|:-|
|value|any|0| The pv's value, valid after initialized===true
|initialize|bool|false| true when all the pvs are initialized and connected to live data
|metadata|object|{}| The metadata from the pv, valid after initialized===true
|severity|number|0| The derived alarm severity , valid after initialized===true
|timestamp|number|""| The timestamp of the pv, valid after initialized===true


Example using the Hook `useEpicsPV` :

```js
import React from 'react';
import {useEpicsPV} from './EpicsPV'
const Example1=(props)=>{
    const pv=useEpicsPV({pv:'pva://$(device):test$(id)', macros:{'$(device)':'testIOC','$(id)':'2'}})
    const {initialized}=pv;
    const value=initialized?pv.value:"value is not initialized";

return(   
  <div>{value}</div>
 )
}
<Example1/>
