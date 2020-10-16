In this example the TextInput component receives a waveform PV.

Reading harp 1 x-axis current PV.

The current is centered in the array. You have to scroll till you see the values (around 22-25 indexes). By default the ArrayContainer shows only 10 elements per time.

The ArrayContainer does not know how many items there are in the PV value. For this reason it expects a props with the array length. By default the maxItemsCount is 100

```js
import { Grid, Typography } from "@material-ui/core";
import TextInput from "../BaseComponents/TextInput";

<Grid container spacing={5}>
  <Grid item xs={12}>
    <Typography algin="center">Standard behavior</Typography>
    <TextInput pv="pva://testIOC:binaryWaveform" />
  </Grid>
  <Grid item xs={12}>
    <Typography algin="center">ArrayContainer behavior</Typography>
    <ArrayContainer maxItemsCount={10}>
      <TextInput pv="pva://testIOC:binaryWaveform" />
    </ArrayContainer>
  </Grid>
</Grid>;
```

By default this component shows only ten items per time. Users can choose how many items they want to see per time. Obviously this value can't be greater than maxItemsCount.

When not all the items are visible the registersLabel props is useful to add a label to each element. This value overrides the value given to the `label` props of (in our case) `TextInput`.

```js
import TextInput from "../BaseComponents/TextInput";

let indexes = Array.from(Array(10).keys());
let labels = indexes.map((num) => num.toString());

<ArrayContainer
  registersLabel={labels}
  maxItemsCount={10}
  visibleItemsCount={3}
>
  <TextInput pv="pva://testIOC:binaryWaveform" />
</ArrayContainer>;
```

In some cases users want to show or consider only a subset of the array values. In this case we use `registers`. Items order in the `registers` prop does count!

When specifying the registers values, the `maxItemsCount` is overridden with the length of the array given to `registers`; in these cases `maxItemsCount can be overridden`. Instead the visibleItemsCount can be specified. If not the component shows all the elements given into the array.

```js
import { Grid, Typography } from "@material-ui/core";
import TextInput from "../BaseComponents/TextInput";

<Grid container spacing={5}>
  <Grid item xs={12}>
    <Typography algin="center">ArrayContainer with registers</Typography>
    <ArrayContainer
      registers={[0, 1, 4, 8, 9]}
      registersLabel={["zero", "one", "four", "eight", "nine"]}
    >
      <TextInput pv="pva://testIOC:binaryWaveform" />
    </ArrayContainer>
  </Grid>
  <Grid item xs={12}>
    <Typography algin="center">
      ArrayContainer with registers and visibleItemsCount
    </Typography>
    <ArrayContainer
      registers={[0, 1, 4, 8, 9]}
      registersLabel={["zero", "one", "four", "eight", "nine"]}
      visibleItemsCount={3}
    >
      <TextInput pv="pva://testIOC:binaryWaveform" />
    </ArrayContainer>
  </Grid>
</Grid>;
```

Horizontal direction without and with minimum width for each item

```js
import { Grid, Typography } from "@material-ui/core";
import { EmojiEmotions } from "@material-ui/icons";
import StyledIconButton from "../BaseComponents/StyledIconButton";

let indexes = Array.from(Array(48).keys());
let labels = indexes.map((num) => num.toString());

<Grid container>
  <Grid item xs={12}>
    <Typography algin="center">Horizontal direction</Typography>
    <ArrayContainer
      registersLabel={labels}
      direction="horizontal"
      maxItemsCount={10}
    >
      <StyledIconButton pv="pva://testIOC:binaryWaveform">
        <EmojiEmotions />
      </StyledIconButton>
    </ArrayContainer>
  </Grid>
  <Grid item xs={12}>
    <Typography algin="center">
      Horizontal direction with minimum width
    </Typography>
    <ArrayContainer
      registersLabel={labels}
      direction="horizontal"
      itemMinWidth={20}
      maxItemsCount={10}
    >
      <StyledIconButton pv="pva://testIOC:binaryWaveform">
        <EmojiEmotions />
      </StyledIconButton>
    </ArrayContainer>
  </Grid>
</Grid>;
```

Add a label on the ArrayContainer component and add spacing between items

```js
import TextInput from "../BaseComponents/TextInput";

<ArrayContainer
  label="My Array Container"
  spacing={1}
  visibleItemsCount={3}
  maxItemsCount={10}
>
  <TextInput pv="pva://testIOC:binaryWaveform" />
</ArrayContainer>;
```
