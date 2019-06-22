
TextOutput example connection to an SoftChannel EPICS AI pv:

```js
    <TextOutput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       usePvLabel={true}
       usePrecision={true}
       usePvUnits={true}
       usePvMinMax={true}
       alarmSensitive={true}
    />
```
TextOutput example connection to a SoftChannel EPICS AI pv with example overides of EPICS fields:

```js
    <TextOutput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       label={'Custom Label'}
       usePrecision={true}
       prec={5}
       units={"🍕"}
       max={5500}
       min={4500}
       alarmSensitive={true}
    />
```

TextOutput example connection to an SoftChannel EPICS MBBO pv using the string value:

```js
    <TextOutput  
       pv='pva://$(device):mbboTest$(id)'
       macros={{'$(device)':'testIOC','$(id)':'1'}}
       usePvLabel={true}
       useStringValue={true}
       usePvUnits={true}

    />


```
TextOutput example connection to an SoftChannel EPICS MBBO pv using the numerical value:

```js
    <TextOutput  
       pv='pva://$(device):mbboTest$(id)'
       macros={{'$(device)':'testIOC','$(id)':'1'}}
       usePvLabel={true}
       usePvUnits={true}

    />


```

TextOutput example :

```js
    <TextOutput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       alarmSensitive={true}
       usePrecision={true}
       prec={3}
       usePvUnits={true}
    />
```
