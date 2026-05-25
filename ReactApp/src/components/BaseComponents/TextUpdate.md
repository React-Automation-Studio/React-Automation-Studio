# TextUpdate

Read-only text display that prints a PV's value, optionally with a
label and units. Built on top of MUI `<Typography>` so it picks up
the surrounding text style by default and supports any Typography
variant.

## When to use

- Inline value display in a dashboard row or paragraph where a full
  `TextOutput` field would be visually too heavy.
- Read-only outputs where you want the value to sit alongside other
  text rather than in its own box.

For an outlined text box, prefer `TextOutput`. For a writable
input, use `TextInput`.

## Common patterns

Custom label, units, and precision:

```jsx
<TextUpdate
  pv="testIOC:test1"
  label="My value is"
  units="mA"
  usePvPrecision
  prec={2}
/>
```

Pick up label, units and precision from PV metadata:

```jsx
<TextUpdate pv="testIOC:test2" usePvLabel usePvUnits usePvPrecision />
```

Alarm-aware background — the field's background gradient picks up the
minor/major alarm colour when the PV severity crosses its thresholds:

```jsx
<TextUpdate pv="testIOC:test2" usePvLabel alarmSensitive />
```

Engineering / scientific number format via mathjs:

```jsx
<TextUpdate
  pv="testIOC:test2"
  usePvLabel
  usePvUnits
  numberFormat={{ notation: "engineering", precision: 2 }}
/>
```

Larger Typography variant for emphasis:

```jsx
<TextUpdate pv="testIOC:test2" usePvLabel variant="h5" />
```

## See also

- `TextOutput` — outlined read-only field.
- `TextInput` — writable equivalent.
- `TextUpdateMultiplePVs` — the same display backed by several PVs.
