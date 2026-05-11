# CheckBox

Two-state toggle bound to a binary PV (BO / BI / longout 0|1). Wraps
MUI `<Checkbox>` with PV plumbing — toggles the PV between 0 and 1 on
click.

## When to use

- Boolean operator settings (enable/disable, on/off flags).
- Form-style screens where a tick mark is the natural representation
  of a flag.

For a slider-style two-state toggle, prefer `Switch`. For an inline
indicator (read-only), prefer `LightPanel` or `StyledIconIndicator`.

## Common patterns

Basic usage with PV-driven label:

```jsx
<CheckBox pv="testIOC:BO1" usePvLabel labelPlacement="end" />
```

Custom on-state colour (uses MUI theme palette key):

```jsx
<CheckBox pv="testIOC:BO1" label="Enable" onColor="success" />
```

Pair with a `TextOutput` to show the live PV value alongside the
control:

```jsx
<>
  <TextOutput pv="testIOC:BO1" usePvLabel />
  <CheckBox pv="testIOC:BO1" usePvLabel labelPlacement="end" />
</>
```

## See also

- `Switch` — slider-style two-state toggle.
- `LightPanel`, `StyledIconIndicator` — read-only boolean indicators.
- `RadioButton`, `RadioButtonGroup` — multi-state choice.
