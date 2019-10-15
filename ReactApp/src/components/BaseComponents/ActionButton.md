
  ActionButton EPICS BO example:

```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ActionButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://testIOC:BO1'   label='Value of pva://testIOC:BO1'/>
  </div>


  <ActionButton
    pv='pva://testIOC:BO1'
    label={"pva://testIOC:BO1"}
    labelPlacement={"top"}
    actionValue={"1"}
    actionString={"write 1 to pva://testIOC:BO1"}
  />

  <ActionButton
    pv='pva://testIOC:BO1'
    label={"pva://testIOC:BO1"}
    labelPlacement={"top"}
    actionValue={"0"}
    actionString={"write 0 to pva://testIOC:BO1"}
  />
  </div>
```
