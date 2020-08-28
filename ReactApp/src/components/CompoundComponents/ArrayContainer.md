In this example the ArrayContainer receives as component TextInput.
It shows only the first 5 elements.

```js
import TextInput from "../BaseComponents/TextInput";
<ArrayContainer
  pv="pva://testIOC:test4"
  component={TextInput}
  registers={[0,1,2,3,4]}
/>;
```

ArrayContainer using TextInput with the single elements horizontal aligned:

```js
import TextInput from "../BaseComponents/TextInput";
<ArrayContainer
  pv="pva://testIOC:test4"
  component={TextInput}
  registers={[0,1,2,3,4]}
  alignHorizontal
/>;
```

ArrayContainer using TextInput with a label for each array value:

```js
import TextInput from "../BaseComponents/TextInput";
<ArrayContainer
  pv="pva://testIOC:test4"
  component={TextInput}
  registers={[1, 2, 5]}
  registersLabel={["one", "two", "five"]}
  registersLabelPlacement="top"
  usePvLabel
  labelPlacement="top"
  units="V"
  usePvPrecision
  numberFormat={{ notation: "engineering", precision: 5 }}
/>;
```

ArrayContainer using TextUpdate.

```js
import TextUpdate from "../BaseComponents/TextUpdate";
<ArrayContainer
  pv="pva://testIOC:test4"
  component={TextUpdate}
  registers={[1, 2, 5]}
  registersLabel={["one", "two", "five"]}
  registersLabelPlacement="top"
/>;
```

ArrayContainer receives a binary waveform and the StyledIconButton.
ArrayContainer forward its children.

```js
import StyledIconButton from "../BaseComponents/StyledIconButton";
import { Grid } from "@material-ui/core";
import { Face } from "@material-ui/icons";

<Grid container spacing={2}>
  <Grid item xs={6}>
    <ArrayContainer
      pv="pva://testIOC:binaryWaveform"
      usePvLabel
      labelPlacement="top"
      component={StyledIconButton}
      registersLabel={[
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
      ]}
    >
      <Face />
    </ArrayContainer>
  </Grid>
  <Grid item xs={6}>
    <ArrayContainer
      pv="pva://testIOC:binaryWaveform"
      usePvLabel
      labelPlacement="top"
      component={StyledIconButton}
      registersLabelPlacement="bottom"
      registersLabel={[
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
      ]}
      alignHorizontal
    >
      <Face />
    </ArrayContainer>
  </Grid>
</Grid>;
```
