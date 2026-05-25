# RadioButtonGroup

Auto-generated group of radio buttons for an MBBI / MBBO PV. Each
button corresponds to one of the PV's enum strings; clicking writes
that string back to the PV.

## When to use

- Multi-state PVs where all choices should be visible at once.
- Form-style screens where the choices belong in a labelled group.

For a compact dropdown, prefer `SelectionInput`. For a list/sidebar
layout, prefer `SelectionList`.

## Common patterns

Basic usage — choices come from the PV's enum strings:

```jsx
<RadioButtonGroup pv="testIOC:mbboTest1" usePvLabel />
```

Custom subset of strings:

```jsx
<RadioButtonGroup
  pv="testIOC:mbboTest1"
  usePvLabel
  custom_selection_strings={["text 1", "text 3"]}
/>
```

Horizontal layout via MUI `RadioGroup` props:

```jsx
<RadioButtonGroup
  pv="testIOC:mbboTest1"
  usePvLabel
  muiRadioGroupProps={{ row: true }}
/>
```

Custom on-state colour:

```jsx
<RadioButtonGroup pv="testIOC:mbboTest1" usePvLabel onColor="success" />
```

## See also

- `RadioButton` — single radio bound to a binary PV.
- `SelectionInput`, `SelectionList` — alternative MBBI/MBBO controls.
