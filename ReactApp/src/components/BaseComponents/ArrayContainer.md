In this example the ArrayContainer receives as component TextInputComponent:

```js
import { TextInputComponent } from "./TextInput";
<ArrayContainer
  pv="pva://testIOC:test4"
  usePvLabel
  labelPlacement="top"
  units="V"
  usePvPrecision
  numberFormat={{ notation: "engineering", precision: 5 }}
  component={TextInputComponent}
  numberOfVisibleElements={5}
/>;
```

ArrayContainer using TextInputComponent with the single elements horizontal aligned:

```js
import { TextInputComponent } from "./TextInput";
<ArrayContainer
  pv="pva://testIOC:test4"
  usePvLabel
  labelPlacement="top"
  units="V"
  usePvPrecision
  numberFormat={{ notation: "engineering", precision: 5 }}
  component={TextInputComponent}
  numberOfVisibleElements={5}
  alignHorizontal
/>;
```

ArrayContainer using TextInputComponent with a label for each array value:

```js
import { TextInputComponent } from "./TextInput";
<ArrayContainer
  pv="pva://testIOC:test4"
  usePvLabel
  labelPlacement="top"
  units="V"
  usePvPrecision
  numberFormat={{ notation: "engineering", precision: 5 }}
  component={TextInputComponent}
  numberOfVisibleElements={5}
  elementLabel={["first", "second", "third", "fourth", "fifth"]}
/>;
```

ArrayContainer using TextUpdateComponent.

```js
import { TextUpdateComponent } from "./TextUpdate";
<ArrayContainer
  pv="pva://testIOC:test4"
  usePvLabel
  labelPlacement="top"
  units="V"
  usePvPrecision
  numberFormat={{ notation: "engineering", precision: 5 }}
  component={TextUpdateComponent}
  numberOfVisibleElements={5}
  elementLabel={["first", "second", "third", "fourth", "fifth"]}
/>;
```

ArrayContainer receives a binary waveform and the StyledIconButtonComponent.
ArrayContainer forward its children.

```js
import { StyledIconButtonComponent } from "./StyledIconButton";
import { Grid } from "@material-ui/core";
import { Face } from "@material-ui/icons";

<Grid container spacing={2}>
  <Grid item xs={6}>
    <ArrayContainer
      pv="pva://testIOC:binaryWaveform"
      usePvLabel
      labelPlacement="top"
      component={StyledIconButtonComponent}
      elementLabel={[
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
      component={StyledIconButtonComponent}
      elementLabelPlacement="bottom"
      elementLabel={[
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
