BitIndicators local variable example:

```js
{/*The ToggleButton code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import ToggleButton from './ToggleButton';
  <div style={{textAlign:'center'}}>
  <ToggleButton
  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"write '1' or '0'"}
  labelPlacement={"top"}
  custom_selection_strings={["OFF","ON"]}
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='Test Label' onColor='lime' offColor='red'/>

  {/*###############*/}

  </div>
```

BitIndicators with custom icon local variable example:

```js
{/*The ToggleButton code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import ToggleButton from './ToggleButton';
  import Face from '@material-ui/icons/Face';
  <div style={{textAlign:'center'}}>
  <ToggleButton
  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"write '1' or '0'"}
  labelPlacement={"top"}
  custom_selection_strings={["OFF","ON"]}
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='Test Label' onColor='lime' offColor='red'>
  <Face/>
  </BitIndicators>

  {/*###############*/}

  </div>
```

BitIndicators example connection to a SoftChannel EPICS AI pv with example overides of colors and label placement:

```js
{/*The ToggleButton code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import ToggleButton from './ToggleButton';
  <div style={{textAlign:'center'}}>
  <ToggleButton
  pv='pva://$(device):test$(id)'
  macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"write '1' or '0'"}
  labelPlacement={"top"}
  custom_selection_strings={["OFF","ON"]}
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='My Label' labelPlacement='end' onColor='yellow' offColor='cyan'/>

  {/*###############*/}

  </div>
```
