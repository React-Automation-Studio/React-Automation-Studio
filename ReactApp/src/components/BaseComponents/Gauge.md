# Gauge

A half-circle dial gauge for displaying a numeric PV value against its
min/max range. The arc fills clockwise from leftmost (minimum) to
rightmost (maximum), with a needle pointing to the current value.

## When to use

- Visualising a single analog value (temperature, pressure, level) at a
  glance, where magnitude relative to range matters more than exact
  digits.
- Dashboards where the user benefits from peripheral-vision feedback
  (a swing of the needle is easier to notice than a number changing).

For a horizontal bar fill, prefer `ProgressBar`. For a vertical column
fill, prefer `Tank`.

## Common patterns

Basic usage — bind to a PV and pick up min/max from the PV's HOPR/LOPR
metadata:

```jsx
<Gauge pv="testIOC:test2" usePvMinMax />
```

Alarm-aware accent — the arc switches to the minor (orange) or major
(red) alarm colour when the PV severity crosses its warn/alarm
thresholds:

```jsx
<Gauge pv="testIOC:test2" usePvMinMax alarmSensitive />
```

Custom range, units, and precision overriding PV metadata:

```jsx
<Gauge pv="testIOC:test2" min={-100} max={100} units="°C" prec={1} />
```

Read units and precision from PV metadata (EGU/PREC fields):

```jsx
<Gauge pv="testIOC:test2" usePvMinMax usePvUnits usePvPrecision />
```

Thicker arc via `ringWidth`:

```jsx
<Gauge pv="testIOC:test2" usePvMinMax ringWidth={60} />
```

## See also

- `ProgressBar` — horizontal level indicator with the same alarm-aware
  colouring.
- `Tank` — vertical column level indicator.
- `TextOutput` — when you need precise digits rather than a visual gauge.
