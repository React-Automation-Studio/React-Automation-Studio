StyledIconIndicator local variable example:

```js
{/*The ToggleButton code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconIndicator */}  
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

  <StyledIconIndicator pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='Test Label' onColor='lime' offColor='red'/>

  {/*###############*/}

  </div>
```

StyledIconIndicator with custom icon local variable example:

```js
{/*The ToggleButton code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconIndicator */}  
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

  <StyledIconIndicator  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='Test Label' onColor='lime' offColor='red'>
  <Face/>
  </StyledIconIndicator>

  {/*###############*/}

  </div>
```

StyledIconIndicator example connection to a SoftChannel EPICS AI pv with example overides of colors and label placement:

```js
{/*The ToggleButton code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the StyledIconIndicator */}  
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

  <StyledIconIndicator  pv='pva://$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='My Label' labelPlacement='end' onColor='yellow' offColor='cyan'/>

  {/*###############*/}

  </div>
```
