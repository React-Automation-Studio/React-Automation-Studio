# TextInput

Outlined writable text field for setting a PV's value. Built on MUI
`<TextField>`, so it inherits the `outlined` / `filled` / `standard`
variants and supports the full TextField prop surface via
`muiTextFieldProps`.

## When to use

- Operator setpoints (write-side of a control loop).
- Any field where the user must type a value back to a PV.

For a read-only equivalent, use `TextOutput`. For numeric setpoints
where the value is constrained to a range, prefer `Slider` or
`ThumbWheel`.

## Common patterns

Basic usage with PV-driven label, precision, units, range and alarm
sensitivity:

```jsx
<TextInput
  pv="testIOC:test2"
  usePvLabel
  usePvPrecision
  usePvUnits
  usePvMinMax
  alarmSensitive
/>
```

Override metadata with custom label, precision, units, and range:

```jsx
<TextInput
  pv="testIOC:test2"
  label="Custom Label"
  usePvPrecision
  prec={5}
  units="🍕"
  min={4500}
  max={5500}
  alarmSensitive
/>
```

MBBO input as enum string (e.g. type "On" / "Off"):

```jsx
<TextInput
  pv="testIOC:mbboTest1"
  usePvLabel
  useStringValue
  usePvUnits
/>
```

Engineering / scientific number format via mathjs:

```jsx
<TextInput
  pv="testIOC:test2"
  usePvPrecision
  prec={3}
  usePvUnits
  numberFormat={{ notation: "engineering", precision: 5 }}
/>
```

## See also

- `TextOutput` — read-only equivalent.
- `Slider`, `ThumbWheel` — bounded numeric input.
