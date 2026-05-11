# StyledIconButton

Two-state icon button bound to a binary PV. Clicking toggles the PV
between 0 and 1; the icon picks up `onColor` when the PV is 1 and
`offColor` when it is 0. Pass any MUI SvgIcon as a child.

## When to use

- Compact icon-only toggles where space is at a premium (toolbars,
  status rows).
- Cases where an icon is the natural representation of the on/off
  state (e.g. lock/unlock, mute/unmute).

For a labelled button, prefer `ToggleButton`. For a read-only icon
indicator, prefer `StyledIconIndicator`.

## Common patterns

Default colours with a custom child icon:

```jsx
import Face from "@mui/icons-material/Face";

<StyledIconButton pv="testIOC:BO1" usePvLabel>
  <Face />
</StyledIconButton>
```

Custom off colour and end-placed label:

```jsx
<StyledIconButton
  pv="testIOC:BO1"
  usePvLabel
  labelPlacement="end"
  offColor="secondary"
/>
```

## See also

- `StyledIconIndicator` — read-only icon indicator.
- `ToggleButton` — labelled two-state button.
- `CheckBox`, `Switch` — alternative two-state controls.
