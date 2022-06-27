{% raw %}

TextUpdate example connection to a SoftChannel EPICS AI pv with custom label, precision and units:

```js
<TextUpdate  
   pv='$(device):test$(id)'
   macros={{'$(device)':'testIOC','$(id)':'1'}}
   label={"My value is "}
   units={"mA"}
   usePvPrecision={true}
   prec={2}
/>
```

TextUpdate example connection to a SoftChannel EPICS AI pv with EPICS label, precision and units:

```js
<TextUpdate  
   pv='$(device):test$(id)'
   macros={{'$(device)':'testIOC','$(id)':'2'}}
   usePvLabel={true}
   usePvUnits={true}
   usePvPrecision={true}
   alarmSensitive={true}
/>
```
TextUpdate example connection to a SoftChannel EPICS AI pv with EPICS label, precision, units and numberFormat:

```js
<TextUpdate  
   pv='$(device):test$(id)'
   macros={{'$(device)':'testIOC','$(id)':'2'}}
   usePvLabel={true}
   usePvUnits={true}
   usePvPrecision={true}
   alarmSensitive={true}
   numberFormat={{notation: 'engineering',precision: 2}}
/>
```
{% endraw %}
