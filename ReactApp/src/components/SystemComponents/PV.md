The pv object return through the pvData callback or passed to the child function has a default structure with the following properties:

```js static
{
    value: 0,
    label: "",
    initialized: false,
    PVs: [],
    metadata: {},
    severity: 0,
    timestamp: "",
    units: "",
    min: 0,
    max: 0,
    prec: 0,
    readOnly: true,
    enum_strs: []
  }
```
|  Property |Type |Default | Description |
|:-:|:-|
|value|any|0| The pv's value, valid after initialized===true
|label|string|""| The derived label, valid after initialized===true
|initialize|bool|false| true when all the pvs are initialized and connected to live data
|PVS|array|[]| An array of all the pvs, valid after initialized===true
|metadata|object|{}| The metadata from the pv, valid after initialized===true
|severity|number|0| The derived alarm severity , valid after initialized===true
|timestamp|number|""| The timestamp of the pv, valid after initialized===true
|units|string|""| The derived units, valid after initialized===true
|min|number|0| The derived minimum, valid after initialized===true
|max|number|0| The derived maximum, valid after initialized===true
|prec|number|0| The derived precision, valid after initialized===true
|readOnly|bool|true| False if write access is disabled, valid after initialized===true
|enum_strs|array|[]| An array of enumerator strings, if the pv is an enumerator type, valid after initialized===true

Example 1: Raising the pv state using pvData function

```js
import React, { useState } from 'react'
const Example1=(props)=>{
const [pv,setPv]=useState({initialized:false});
const pvConnection=<PV
   pv='pva://$(device):test$(id)'
   macros={{'$(device)':'testIOC','$(id)':'2'}} 
   pvData={setPv}
 />
let {initialized}=pv;
let value=initialized?pv.value:"value is not initialized";
let content=<div>{value}</div>;
return(   
  <React.Fragment>
   {pvConnection}
   {content}
  </React.Fragment>
 )
}

<Example1/>
```
Example 2: passing the pv state to a child function

```js
import React, { useState } from 'react'
const Example2=(props)=>{
    
    return(
        <PV     pv='pva://$(device):test$(id)'       macros={{'$(device)':'testIOC','$(id)':'2'}} >
           { 
            (pv)=>{
               let {initialized}=pv;
               let value=initialized?pv.value:"value is not initialized";
               let content=<div>{value}</div>;
               return (content)
            }
           }
       </PV>
    )

}


<Example2/>
```


Example 3: passing the pv state to a child function

```js
import React, { useState } from 'react'

const Content=(props)=>{
    let {initialized}=props;
    let value=initialized?props.value:"value is not initialized";
    return (<div>{value}</div>)
    
}


const Example3=(props)=>{
    
    return(
        <PV pv='pva://$(device):test$(id)'  macros={{'$(device)':'testIOC','$(id)':'2'}} >
           {Content}
       </PV>
    )

}


<Example3/>
```

Example 4: passing the pv state to a child function

```js
import React, { useState } from 'react'
const Example4=(props)=>{
    
    return(
        <PV     pv='pva://$(device):test$(id)'       macros={{'$(device)':'testIOC','$(id)':'2'}} >
           { 
            ({initialized,value})=>{
               return <div>{initialized?value:"value is not initialized"}</div>
               
            }
           }
       </PV>
    )

}


<Example4/>
```

Example 5: Raising the state of multiple pvs to an array using  the pvData function

```js
import React, { useState } from 'react'
const Example5=(props)=>{
const [pvs,setPvs]=useState([]);
const pvConnections=()=>{
    let pvs=[];
    props.pvs.map((item,index)=>{
        pvs.push(
        <PV
            key={index.toString()}
            pv={item}
            macros={props.macros} 
            pvData={(pv) => setPvs(prePvs => {
                let pvs = [...prePvs]
                // if you want modify the  pv data do it here!
                pvs[index] = pv;
                return pvs
  
              }
              )}
          />)
    })
    return pvs
    }


const content=()=>{
    let contentArray=[];
    pvs.map((pv,index)=>{
        let {initialized}=pv;
        let value=initialized?pv.pvName +": "+pv.value:pv.pvName +" is not initialized";
        contentArray.push(<div key={index.toString()} >{value}</div>)
    })
    return contentArray
    };
return(   
  <React.Fragment>
   {pvConnections()}
   {content()}
  </React.Fragment>
 )
}

<Example5
    pvs={[
        'pva://$(device):MTextUpdate1',
        'pva://$(device):MTextUpdate2',
        'pva://$(device):MTextUpdate3',
        'pva://$(device):MTextUpdate4',
        'pva://$(device):MTextUpdate5'
    ]}
    macros={{'$(device)':'testIOC'}} 
/>
```