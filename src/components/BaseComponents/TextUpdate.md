TextUpdate local variable example with custom label:

```js
  <TextUpdate  pv='loc://testVariable'   label='testVariable = '/>
```

TextUpdate example connection to a SoftChannel EPICS AI pv with custom label, precision and units:

```js
<TextUpdate  
   pv='pva://$(device):test$(id)'
   macros={{'$(device)':'testIOC','$(id)':'1'}}
   label={"My value is "}
   units={"mA"}
   usePrecision={true}
   prec={2}
/>
```

TextUpdate example connection to a SoftChannel EPICS AI pv with EPICS label, precision and units:

```js
<TextUpdate  
   pv='pva://$(device):test$(id)'
   macros={{'$(device)':'testIOC','$(id)':'1'}}
   usePvLabel={true}
   usePvUnits={true}
   usePrecision={true}
/>
```
