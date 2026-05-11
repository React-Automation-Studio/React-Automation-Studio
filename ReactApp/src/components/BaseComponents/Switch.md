# Switch

Slider-style two-state toggle bound to a binary PV. Wraps MUI
`<Switch>` with PV plumbing — toggles between 0 and 1 on click.

## When to use

- Boolean controls where the slider metaphor (on/off, enabled/disabled)
  is more natural than a tick mark.
- Settings panels and operator screens with a row of on/off controls.

For a tick-mark toggle, prefer `CheckBox`. For a read-only indicator,
prefer `LightPanel` or `StyledIconIndicator`.

## Common patterns

Basic usage with PV-driven label:

```jsx
<Switch pv="testIOC:BO1" usePvLabel labelPlacement="end" />
```

Custom on-state colour:

```jsx
<Switch pv="testIOC:BO1" label="Enable" onColor="success" />
```

Pair with a `TextOutput` to show the PV's live string value (e.g.
`On` / `Off`):

```jsx
<>
  <TextOutput pv="testIOC:BO1" usePvLabel useStringValue />
  <Switch pv="testIOC:BO1" usePvLabel labelPlacement="end" />
</>
```

## See also

- `CheckBox` — tick-mark two-state toggle.
- `LightPanel`, `StyledIconIndicator` — read-only boolean indicators.
- `ToggleButton` — multi-state choice button bar.
