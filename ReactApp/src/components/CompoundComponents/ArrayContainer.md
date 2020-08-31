In this example the TextInput receives a waveform PV.
The registers prop allows the widget to show only the first 5 elements.

```js
import TextInput from "../BaseComponents/TextInput";
<TextInput
  pv="pva://testIOC:test4"
  registers={[0,1,2,3,4]}
/>;
```

TextInput with the single elements horizontal aligned:

```js
import TextInput from "../BaseComponents/TextInput";
<TextInput
  pv="pva://testIOC:test4"
  registers={[0,1,2,3,4]}
  alignHorizontal
/>;
```

TextInput with a label for each array value:

```js
import TextInput from "../BaseComponents/TextInput";
<TextInput
  pv="pva://testIOC:test4"
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

TextUpdate receiving a waveform PV:

```js
import TextUpdate from "../BaseComponents/TextUpdate";
<TextUpdate
  pv="pva://testIOC:test4"
  registers={[1, 2, 5]}
  registersLabel={["one", "two", "five"]}
  registersLabelPlacement="top"
/>;
```

Binary waveform using StyledIconButton.

```js
import StyledIconButton from "../BaseComponents/StyledIconButton";
import { Grid } from "@material-ui/core";
import { Face } from "@material-ui/icons";

<Grid container spacing={2}>
  <Grid item xs={6}>
    <StyledIconButton
      pv="pva://testIOC:binaryWaveform"
      usePvLabel
      labelPlacement="top"
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
    </StyledIconButton>
  </Grid>
  <Grid item xs={6}>
    <StyledIconButton
      pv="pva://testIOC:binaryWaveform"
      usePvLabel
      labelPlacement="top"
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
    </StyledIconButton>
  </Grid>
</Grid>;
```
