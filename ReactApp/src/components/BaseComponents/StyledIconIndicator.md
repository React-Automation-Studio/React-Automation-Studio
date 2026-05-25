# StyledIconIndicator

Read-only icon indicator bound to a binary PV. The icon takes
`onColor` when the PV is 1 and `offColor` when it is 0. Pass any MUI
SvgIcon as a child to replace the default circle indicator.

## When to use

- Compact status indicators where an icon conveys meaning better than
  a coloured dot (e.g. lock/unlock, link/no-link, beam on/off).
- Toolbars and status rows that need to surface a boolean state at a
  glance.

For a writable icon, prefer `StyledIconButton`. For a coloured text
panel, prefer `LightPanel`.

## Common patterns

Default indicator — uses a circle icon:

```jsx
<StyledIconIndicator
  pv="testIOC:BO1"
  label="Test Label"
  onColor="lime"
  offColor="red"
/>
```

Custom icon — pass as a child:

```jsx
import Face from "@mui/icons-material/Face";

<StyledIconIndicator
  pv="testIOC:BO1"
  label="Test Label"
  onColor="lime"
  offColor="red"
>
  <Face />
</StyledIconIndicator>
```

Label to the right of the icon:

```jsx
<StyledIconIndicator
  pv="testIOC:BO1"
  label="My Label"
  labelPlacement="end"
  onColor="yellow"
  offColor="cyan"
/>
```

## See also

- `StyledIconButton` — writable two-state icon button.
- `LightPanel` — coloured status panel.
- `BitIndicators` — per-bit decoder for an integer status word.
