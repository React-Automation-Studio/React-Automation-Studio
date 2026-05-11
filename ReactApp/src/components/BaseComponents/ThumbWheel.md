# ThumbWheel

Digit-by-digit incremental numeric input. Each "wheel" represents a
single decimal place with up/down arrows that increment or decrement
that digit. Useful when an operator needs to dial a precise value
without typing.

## When to use

- Precision operator setpoints (motor positions, voltage references)
  where a fixed step at a known decimal place is more reliable than
  free-form typing.
- Touchscreen-friendly numeric input — no keyboard required.

For a free-form numeric input, prefer `TextInput`. For a draggable
bounded setpoint, prefer `Slider`.

## Common patterns

Standard layout — 4 integer digits and 3 decimal digits:

```jsx
<ThumbWheel
  pv="testIOC:test2"
  prec_integer={4}
  prec_decimal={3}
  usePvMinMax
/>
```

Custom increments — fixed step sizes (e.g. 500 / 50 / 5 / 0.5):

```jsx
<ThumbWheel
  pv="testIOC:test2"
  prec={1}
  usePvMinMax
  custom_increments={[500, 50, 5, 0.5]}
/>
```

Pair with a `TextOutput` to display the value alongside:

```jsx
<>
  <TextOutput pv="testIOC:test2" usePvLabel usePvUnits prec={3} />
  <ThumbWheel pv="testIOC:test2" prec_integer={4} prec_decimal={3} usePvMinMax />
</>
```

## See also

- `TextInput` — free-form numeric input.
- `Slider` — draggable bounded input.
