
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

ActionButton to multi variable example:
```js
{/*The TextOuput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the ActionButton */}  
  import TextOutput from './TextOutput';
  import CloudUploadIcon from '@material-ui/icons/CloudUpload';
    import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
  <div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://testIOC:BO1'   label='Value of pva://testIOC:BO1 '/>
  </div>
  <div style={{marginBottom:8}}>
    <TextOutput  pv='pva://testIOC:BO2'   label='Value of pva://testIOC:BO2 '/>
  </div>

{/*###############*/}  
<ActionButton
  pvs={['pva://testIOC:BO1','pva://testIOC:BO2']}
  label={"write '1' to multiple PVS "}
  labelPlacement={"top"}
  actionValue={"1"}
  actionString={"write '1' "}
  muiButtonProps={{startIcon:<CloudUploadIcon />}}
/>

<ActionButton
  pvs={['pva://testIOC:BO1','pva://testIOC:BO2']}
  label={"write '0' to multiple PVS "}
  labelPlacement={"top"}
  actionValue={"0"}
  actionString={"write '0' "}
  muiButtonProps={{endIcon:<CloudDownloadIcon />}}
/>
{/*###############*/}
</div>
```

