# ActionButton

Write-only command button. Clicking writes a fixed `actionValue` to
the bound PV (or to every PV in `pvs`). Wraps MUI `<Button>`.

## When to use

- One-shot commands (start, stop, reset, save) where the button
  has no two-state read-back semantics.
- Multi-PV actions where the same value should be written to several
  PVs at once.

For a two-state toggle, prefer `ToggleButton`. For boolean controls
that track PV state, prefer `CheckBox` or `Switch`.

## Common patterns

Single-PV action button:

```jsx
<ActionButton
  pv="testIOC:BO1"
  label="testIOC:BO1"
  labelPlacement="top"
  actionValue="1"
  actionString="write 1 to testIOC:BO1"
  tooltip="Click button to write action value"
  showTooltip
/>
```

Multi-PV write — same value written to every PV in `pvs`:

```jsx
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

<ActionButton
  pvs={["testIOC:BO1", "testIOC:BO2"]}
  label="write '1' to multiple PVs"
  actionValue="1"
  actionString="write '1'"
  muiButtonProps={{ startIcon: <CloudUploadIcon /> }}
/>
```

Custom palette colour:

```jsx
<ActionButton
  pv="testIOC:BO1"
  label="Reset"
  actionValue="1"
  color="error"
/>
```

## See also

- `ToggleButton` — two-state toggle / momentary button.
- `CheckBox`, `Switch` — state-tracking boolean controls.
