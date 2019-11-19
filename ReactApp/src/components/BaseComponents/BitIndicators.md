BitIndicators local variable example:

```js
{/*The TextInput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import TextInput from './TextInput';
  <div style={{textAlign:'center'}}>
  <TextInput
  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"Byte Value"}
  labelPlacement={"top"}
  custom_selection_strings={["OFF","ON"]}
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}label='My Label' labelPlacement='Top' bitLabelPlacement='end' onColor='lime' offColor='red'/>

  {/*###############*/}

  </div>
```

BitIndicators with custom icon local variable example:

```js
{/*The TextInput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import TextInput from './TextInput';
  import Face from '@material-ui/icons/Face';
  <div style={{textAlign:'center'}}>
  <TextInput
  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"Byte Value"}
  labelPlacement={"top"}
  custom_selection_strings={["OFF","ON"]}
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='My Label' labelPlacement='Top' bitLabelPlacement='end' onColor='lime' offColor='red'>
  <Face/>
  </BitIndicators>

  {/*###############*/}

  </div>
```

BitIndicators example connection to a SoftChannel EPICS AI pv with example overides of colors and label placement:

```js
{/*The TextInput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import TextInput from './TextInput';
  <div style={{textAlign:'center'}}>
  <TextInput
  pv='pva://$(device):test$(id)'
  macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"Byte Value"}
  labelPlacement={"top"}
  custom_selection_strings={["OFF","ON"]}
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators horizontal={true} pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='My Label' labelPlacement='Top' bitLabelPlacement='end' onColor='yellow' offColor='cyan'/>

  {/*###############*/}

  </div>
```
