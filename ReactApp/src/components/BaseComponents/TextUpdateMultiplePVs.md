# TextUpdateMultiplePVs

Renders a stack of read-only `<Typography>` lines, one per PV in the
`pvs` array. Each line shows the PV's label (from its `DESC` metadata
field) and current value.

## When to use

- Status panels that display several related read-backs without each
  one needing its own labelled box.
- Cases where you'd otherwise stack many `TextUpdate` components by
  hand.

For a single PV, use `TextUpdate`. For a writable / outlined field,
use `TextInput` or `TextOutput`.

## Common patterns

Basic usage — show several PVs in a compact stack:

```jsx
<TextUpdateMultiplePVs
  pvs={[
    "testIOC:MTextUpdate1",
    "testIOC:MTextUpdate2",
    "testIOC:MTextUpdate3",
    "testIOC:MTextUpdate4",
    "testIOC:MTextUpdate5",
  ]}
  usePvLabel
/>
```

Alarm-aware — each line picks up the minor/major alarm colour
independently based on its own PV severity:

```jsx
<TextUpdateMultiplePVs pvs={pvList} usePvLabel alarmSensitive />
```

Engineering number format via mathjs:

```jsx
<TextUpdateMultiplePVs
  pvs={pvList}
  usePvLabel
  numberFormat={{ notation: "engineering", precision: 3 }}
/>
```

## See also

- `TextUpdate` — single-PV variant.
- `TextOutput` — single-PV outlined field.
