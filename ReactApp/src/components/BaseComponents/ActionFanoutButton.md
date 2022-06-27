{% raw %}

ActionButton EPICS variable example:
```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ActionButton */}  
  import TextOutput from './TextOutput';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='testIOC:BO1'   label='Value of testIOC:BO1 '/>
  </div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='testIOC:BO2'   label='Value of testIOC:BO2 '/>
  </div>

{/*###############*/}  
<ActionFanoutButton
  dataPVs={['testIOC:BO1','testIOC:BO2']}
  label={"write '1' to multiple PVS "}
  labelPlacement={"top"}
  actionValue={"1"}
  actionString={"write '1' "}
/>

<ActionFanoutButton
  dataPVs={['testIOC:BO1','testIOC:BO2']}
  label={"write '0' to multiple PVS "}
  labelPlacement={"top"}
  actionValue={"0"}
  actionString={"write '0' "}
/>
{/*###############*/}
</div>
```
{% endraw %}
