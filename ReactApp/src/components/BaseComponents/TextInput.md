
TextInput example connection to an SoftChannel EPICS AI pv:

```js
    <TextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       usePvLabel={true}
       usePvPrecision={true}
       usePvUnits={true}
       usePvMinMax={true}
       alarmSensitive={true}
    />
```
TextInput example connection to a SoftChannel EPICS AI pv with example overrides of EPICS fields:

```js
    <TextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       label={'Custom Label'}
       usePvPrecision={true}
       prec={5}
       units={"🍕"}
       max={5500}
       min={4500}
       alarmSensitive={true}
    />
```

TextInput example connection to an SoftChannel EPICS MBBO pv using the string value:

```js
    <TextInput  
       pv='pva://$(device):mbboTest$(id)'
       macros={{'$(device)':'testIOC','$(id)':'1'}}
       usePvLabel={true}
       useStringValue={true}
       usePvUnits={true}

    />


```
TextInput example connection to an SoftChannel EPICS MBBO pv using the numerical value:

```js
    <TextInput  
       pv='pva://$(device):mbboTest$(id)'
       macros={{'$(device)':'testIOC','$(id)':'1'}}
       usePvLabel={true}
       usePvUnits={true}

    />


```

TextInput example :

```js
    <TextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       alarmSensitive={true}
       usePvPrecision={true}
       prec={3}
       usePvUnits={true}
    />
```

TextInput number format example :

```js
    <TextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       alarmSensitive={true}
       usePvPrecision={true}
       prec={3}
       usePvUnits={true}
       numberFormat={{notation: 'engineering',precision: 5}}
    />
```

