ActionButton local variable example:
```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ActionButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='loc://test'   label='Value of loc://test '/>
  </div>

{/*###############*/}  
<ArrowButton pv='loc://test'  label={"100"} labelPlacement={"bottom"} actionValue={+100} />
<ArrowButton pv='loc://test'   actionValue={-100} />



{/*###############*/}


</div>
```
