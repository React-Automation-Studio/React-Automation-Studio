# BitIndicators

Renders the individual bits of an integer PV as a row or column of
SVG icons that light up when the corresponding bit is set. Useful for
status-byte / interlock-pattern displays.

## When to use

- Decoding a multi-bit status word (e.g. an interlock byte, a fault
  word, an `mbbi` raw value) into per-bit visual indicators.
- Operator screens that need to surface "which bit is on" at a glance.

## Common patterns

Standard 8-bit indicator with PV-driven bit labels:

```jsx
<BitIndicators
  pv="testIOC:mbboTest1"
  label="Status"
  labelPlacement="top"
  bitLabelPlacement="end"
  usePvBitLabels
  numberOfBits={5}
/>
```

Custom on/off colours and horizontal layout:

```jsx
<BitIndicators
  pv="testIOC:test2"
  horizontal
  label="Status byte"
  bitLabelPlacement="end"
  onColor="yellow"
  offColor="cyan"
/>
```

Custom icon (any MUI SvgIcon) used for the bits — pass as a child:

```jsx
import Face from "@mui/icons-material/Face";

<BitIndicators
  pv="testIOC:test2"
  label="My Label"
  bitLabelPlacement="end"
  onColor="lime"
  offColor="red"
>
  <Face />
</BitIndicators>
```

Two stacked 16-bit panels for the low / high words of a 32-bit value:

```jsx
<>
  <BitIndicators
    pv="testIOC:test2"
    label="Byte 1"
    numberOfBits={16}
    onColor="lime"
    offColor="red"
  />
  <BitIndicators
    pv="testIOC:test2"
    label="Byte 2"
    numberOfBits={16}
    onColor="lime"
    offColor="red"
  />
</>
```

## See also

- `LightPanel` — single-bit indicator with a coloured panel.
- `StyledIconIndicator` — single-bit indicator with a custom icon.
