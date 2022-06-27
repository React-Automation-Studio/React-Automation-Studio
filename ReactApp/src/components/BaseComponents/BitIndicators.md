{% raw %}

BitIndicators EPICS variable example:
```js
{/*The TextInput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import TextInput from './TextInput';
  <div style={{textAlign:'center'}}>
  <TextInput
  pv='$(device):mbboTest1' macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"Byte Value"}
  labelPlacement={"top"}
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators pv='$(device):mbboTest1' macros={{'$(device)':'testIOC','$(id)':'2'}}label='My Label' labelPlacement='top' bitLabelPlacement='end' usePvBitLabels={true} numberOfBits={5}/>

  {/*###############*/}

  </div>
```


```js
{/*The TextInput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import TextInput from './TextInput';
  <div style={{textAlign:'center'}}>
  <TextInput
  pv='$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"Byte Value"}
  labelPlacement={"top"}
  
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators pv='$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}label='My Label' labelPlacement='top' bitLabelPlacement='end'  />

  {/*###############*/}

  </div>
```

BitIndicators with custom icon EPICS variable example:

```js
{/*The TextInput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import TextInput from './TextInput';
  import Face from '@material-ui/icons/Face';
  <div style={{textAlign:'center'}}>
  <TextInput
  pv='$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"Byte Value"}
  labelPlacement={"top"}
  
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators  pv='$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}} label='My Label' labelPlacement='top' bitLabelPlacement='end' onColor='lime' offColor='red'>
  <Face/>
  </BitIndicators>

  {/*###############*/}

  </div>
```

BitIndicators example connection to a SoftChannel EPICS AI pv with example overrides of colors and label placement:

```js
{/*The TextInput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import TextInput from './TextInput';
  <div style={{textAlign:'center'}}>
  <TextInput
  pv='$(device):test$(id)'
  macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"Byte Value"}
  labelPlacement={"top"}
  
  />
  <br/><br/>
  {/*###############*/}  

  <BitIndicators
    horizontal={true}
    pv='$(device):test$(id)'
    macros={{'$(device)':'testIOC','$(id)':'2'}}
    label='My Label'
    bitLabelPlacement='end'
    onColor='yellow'
    offColor='cyan'
    
    />
  {/*###############*/}

  </div>
```

```js
{/*The TextInput code is included for demonstration purposes only*/}  
{/*Only the the JSX code between the hashes  is required to instantiate the BitIndicators */}  
  import TextInput from './TextInput';
  <div style={{textAlign:'center'}}>
  <TextInput
  pv='$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}
  label={"Byte Value"}
  labelPlacement={"top"}
  
  />
  <br/><br/>
  {/*###############*/}  
  <div style={{float: 'left'}}>
  <BitIndicators 
    pv='$(device):test$(id)'
    macros={{'$(device)':'testIOC','$(id)':'2'}}
    label='Byte 1' 
    labelPlacement='top' 
    bitLabels={[]}
    bitLabelPlacement='end' 
    onColor='lime' 
    offColor='red'
    numberOfBits={16}
    />
    </div>
    <div style={{float: 'left',paddingLeft:8}}>
    <BitIndicators 
    pv='$(device):test$(id)'
    macros={{'$(device)':'testIOC','$(id)':'2'}}
    label='Byte 2' 
    labelPlacement='top' 
    bitLabelPlacement='end' 
    onColor='lime' 
    offColor='red'
    numberOfBits={16}
    />
  </div>
  {/*###############*/}

  </div>
```
{% raw %}