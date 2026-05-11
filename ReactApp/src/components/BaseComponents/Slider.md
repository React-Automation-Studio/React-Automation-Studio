# Slider

Bounded numeric setpoint with a draggable thumb. Supports horizontal
or vertical orientation, custom step size, custom marks, and flexible
placement of label and value text. Built on MUI `<Slider>`.

## When to use

- Bounded operator setpoints where the user benefits from visual
  positioning (amplitude, gain, position).
- Cases where typing the exact number isn't required — drag-to-set is
  faster.

For a free-form numeric input, prefer `TextInput`. For a step-wise
digit-by-digit input, prefer `ThumbWheel`.

## Common patterns

Horizontal slider with PV-driven label, range, units, and step:

```jsx
<Slider
  pv="testIOC:amplitude"
  showValue
  usePvLabel
  usePvMinMax
  usePvUnits
  step={1}
/>
```

Add custom mark labels at specific values:

```jsx
<Slider
  pv="testIOC:amplitude"
  usePvLabel
  usePvMinMax
  marks={{ 0: 0, 2500: 2500, 5000: 5000, 7500: 7500, 10000: 10000 }}
/>
```

Vertical slider (parent container must have a fixed height):

```jsx
<div style={{ height: 300 }}>
  <Slider
    vertical
    pv="testIOC:amplitude"
    usePvLabel
    usePvMinMax
    usePvUnits
  />
</div>
```

Value below the thumb instead of above:

```jsx
<Slider
  vertical
  pv="testIOC:amplitude"
  usePvLabel
  usePvMinMax
  valuePlacement="bottom"
/>
```

## See also

- `TextInput` — free-form numeric input.
- `ThumbWheel` — digit-by-digit incremental input.
