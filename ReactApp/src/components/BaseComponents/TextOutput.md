# TextOutput

Outlined, read-only text field that displays a PV's value with an
optional label and units adornment. Built on MUI `<TextField>`, so it
inherits the `outlined` / `filled` / `standard` variants and supports
the full TextField prop surface via `muiTextFieldProps`.

## When to use

- Read-only displays where you want the value to sit in a distinct box
  (e.g. instrument readouts, status panels).
- Cases where you also need to surface PV metadata (precision, units,
  enum strings, timestamps).

For an inline `Typography`-style display, prefer `TextUpdate`. For a
writable input, use `TextInput`.

## Common patterns

Basic usage with PV-driven label, precision, units and alarm
sensitivity:

```jsx
<TextOutput
  pv="testIOC:test2"
  usePvLabel
  usePvPrecision
  usePvUnits
  alarmSensitive
/>
```

Override metadata with custom label, precision, units:

```jsx
<TextOutput
  pv="testIOC:test2"
  label="Custom Label"
  usePvPrecision
  prec={5}
  units="🍕"
  alarmSensitive
/>
```

Display the string value of an MBBO PV instead of its numerical state:

```jsx
<TextOutput pv="testIOC:mbboTest1" usePvLabel useStringValue />
```

Engineering / scientific number format via mathjs:

```jsx
<TextOutput
  pv="testIOC:test2"
  usePvPrecision
  prec={3}
  usePvUnits
  numberFormat={{ notation: "engineering", precision: 5 }}
/>
```

Display the PV's timestamp instead of its value:

```jsx
<TextOutput pv="testIOC:test2" displayTimeStamp />
```

Display a specific metadata field (e.g. precision, severity, units):

```jsx
<TextOutput pv="testIOC:test2" displayMetaData="precision" label="prec" />
```

## See also

- `TextUpdate` — inline `Typography`-style read-only display.
- `TextInput` — writable equivalent.
