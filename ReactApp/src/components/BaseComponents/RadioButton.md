# RadioButton

A single MUI `<Radio>` bound to a binary PV — selected when the PV is
1, deselected when 0. Clicking flips the PV.

## When to use

- Building a custom multi-choice layout manually from individual radio
  buttons (instead of a group with PV-driven choices).
- A single boolean indicator/control where a `CheckBox` or `Switch`
  doesn't fit the visual style.

For a PV-driven multi-state choice, prefer `RadioButtonGroup`.

## Common patterns

Basic usage with PV-driven label:

```jsx
<RadioButton
  pv="testIOC:BO1"
  usePvLabel
  labelPlacement="end"
/>
```

Custom on-state colour:

```jsx
<RadioButton
  pv="testIOC:BO1"
  label="Enabled"
  onColor="success"
  labelPlacement="end"
/>
```

## See also

- `RadioButtonGroup` — auto-generated radio group from MBBI/MBBO PV
  enum strings.
- `CheckBox`, `Switch` — alternative two-state controls.
