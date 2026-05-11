# Tank

A vertical column that fills bottom-up from min to max, showing a PV's
value as a coloured level against a grey background — like a fluid
tank.

## When to use

- Visualising a level in a container (water tank, gas cylinder,
  reservoir).
- Vertically-oriented dashboards where a horizontal `ProgressBar` would
  feel out of place.

For a horizontal bar, prefer `ProgressBar`. For a half-circle dial,
prefer `Gauge`.

## Common patterns

Basic usage with PV-driven min/max:

```jsx
<Tank pv="testIOC:test2" usePvMinMax />
```

Alarm-aware — the fill colour switches to the minor (orange) or major
(red) alarm colour when the PV severity crosses its thresholds:

```jsx
<Tank pv="testIOC:test2" usePvMinMax alarmSensitive />
```

With tick labels and inline value:

```jsx
<Tank pv="testIOC:test2" usePvMinMax showTicks showValue />
```

Stretch to fill the container by disabling the locked aspect ratio:

```jsx
<Tank pv="testIOC:test2" usePvMinMax lockAspectRatio={false} />
```

Wider, shorter tank via a custom `aspectRatio`:

```jsx
<Tank pv="testIOC:test2" usePvMinMax aspectRatio={0.5} />
```

## See also

- `ProgressBar` — horizontal level indicator with the same alarm-aware
  colouring.
- `Gauge` — half-circle dial.
