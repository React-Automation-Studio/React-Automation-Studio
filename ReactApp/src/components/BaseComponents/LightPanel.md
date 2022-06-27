{% raw %}
LightPanel example:

```js
import Switch from "./Switch";
<React.Fragment>
  <div style={{ marginBottom: 8 }}>
    <Switch
      pv="$(device):BO$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "1" }}
      usePvLabel
      labelPlacement="end"
    />
  </div>

  {/*###############*/}

  <LightPanel
    pv="$(device):BO$(id)"
    macros={{ "$(device)": "testIOC", "$(id)": "1" }}
    colors={{ 0: "red", 1: "lime" }}
    usePvLabel
    labelPlacement="top"
  />

  {/*###############*/}
</React.Fragment>;
```

It can be used also with multi-binary records:

```js
import RadioButtonGroup from "./RadioButtonGroup";
<React.Fragment>
  <div style={{ marginBottom: 8 }}>
    <RadioButtonGroup
      pv="$(device):mbboTest$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "1" }}
      horizontal={true}
      usePvLabel={true}
    />
  </div>

  {/*###############*/}

  <LightPanel
    pv="$(device):mbboTest$(id)"
    macros={{ "$(device)": "testIOC", "$(id)": "1" }}
    colors={{
      0: "red",
      1: "lime",
      2: "deepskyblue",
      3: "orange",
      4: "deeppink",
    }}
    usePvLabel
    labelPlacement="top"
    variant="h4"
  />

  {/*###############*/}
</React.Fragment>;
```

And with analog records, defining the `customValueStrings`. Try setting values 0 or 1:

```js
import TextInput from "./TextInput";
<React.Fragment>
  <div style={{ marginBottom: 8 }}>
    <TextInput
      pv="$(device):test$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "2" }}
      usePvLabel={true}
      usePvPrecision={true}
      usePvUnits={true}
      usePvMinMax={true}
      alarmSensitive={false}
    />
  </div>

  {/*###############*/}

  <LightPanel
    pv="$(device):test$(id)"
    macros={{ "$(device)": "testIOC", "$(id)": "2" }}
    colors={{
      0: "red",
      1: "lime",
    }}
    usePvLabel
    labelPlacement="top"
    customValueStrings={["FOO", "BAR"]}
  />

  {/*###############*/}
</React.Fragment>;
```
{% endraw %}
