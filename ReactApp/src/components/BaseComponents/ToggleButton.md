# ToggleButton

Button that toggles a binary PV between 0 and 1, or acts as a
momentary push (writes 1 while held, 0 on release). Wraps MUI
`<Button>` — supports custom `onColor`/`offColor` to indicate state and
arbitrary start/end icons via `muiButtonProps`.

## When to use

- Boolean controls where a labelled button feels more like a "command"
  than a checkbox (start/stop, arm/disarm).
- Momentary actions (e.g. "Reset" pulse that must auto-release).
- Cases where you want an icon to dominate the control.

For a tick-mark toggle, use `CheckBox`. For a slider-style toggle,
use `Switch`. For a write-only action (no on/off state), use
`ActionButton`.

## Common patterns

Standard toggle with an icon:

```jsx
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

<ToggleButton
  pv="testIOC:BO1"
  label="testIOC:BO1"
  labelPlacement="top"
  muiButtonProps={{ startIcon: <PowerSettingsNewIcon /> }}
/>
```

Momentary button — writes 1 on press, 0 on release:

```jsx
<ToggleButton
  pv="testIOC:BO1"
  label="Reset"
  momentary
  muiButtonProps={{ startIcon: <PowerSettingsNewIcon /> }}
/>
```

Custom on/off colours:

```jsx
<ToggleButton
  pv="testIOC:BO1"
  label="Beam"
  onColor="success"
  offColor="error"
/>
```

## See also

- `CheckBox`, `Switch` — alternative two-state toggles.
- `ActionButton` — write-only command without on/off state.
- `RadioButton`, `RadioButtonGroup` — multi-state choice.
