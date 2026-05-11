# SelectionInput

Dropdown (`<TextField select>`) that lists the enum strings of an MBBI
/ MBBO PV and writes the selected string back. Built on MUI
`<TextField>`.

## When to use

- Multi-state PVs (modes, ranges, gain settings) where a dropdown is
  the most compact representation.
- Cases where the choices come from PV metadata directly (no
  hand-maintained list needed).

For radio buttons in a row/column, prefer `RadioButtonGroup`. For a
list panel, prefer `SelectionList`.

## Common patterns

Basic usage — choices come from the PV's enum strings:

```jsx
<SelectionInput pv="testIOC:mbboTest1" usePvLabel />
```

Custom subset of strings (only the listed values are offered):

```jsx
<SelectionInput
  pv="testIOC:mbboTest1"
  usePvLabel
  custom_selection_strings={["text 1", "text 3"]}
/>
```

`filled` variant:

```jsx
<SelectionInput pv="testIOC:mbboTest1" usePvLabel variant="filled" />
```

## See also

- `RadioButtonGroup` — same choice as visible radio buttons.
- `SelectionList` — same choice as a clickable list.
