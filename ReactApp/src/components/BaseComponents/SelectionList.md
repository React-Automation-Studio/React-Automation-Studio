# SelectionList

Clickable list of choices bound to an MBBI / MBBO PV. Each item is a
list row; clicking writes that string back to the PV.

## When to use

- Multi-state PVs where the full list of choices should be visible at
  once (no expanding dropdown).
- Sidebars / navigation-style choices where the list itself is part of
  the layout.

For a compact dropdown, prefer `SelectionInput`. For a button-bar
layout, prefer `RadioButtonGroup`.

## Common patterns

Vertical list with PV-driven label and choices:

```jsx
<SelectionList pv="testIOC:mbboTest1" usePvLabel />
```

Horizontal layout:

```jsx
<SelectionList pv="testIOC:mbboTest1" usePvLabel horizontal />
```

Custom subset of strings — only the listed values are offered:

```jsx
<SelectionList
  pv="testIOC:mbboTest1"
  usePvLabel
  custom_selection_strings={["text 1", "text 3"]}
/>
```

## See also

- `SelectionInput` — same choice as a dropdown.
- `RadioButtonGroup` — same choice as radio buttons.
