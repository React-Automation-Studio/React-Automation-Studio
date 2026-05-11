# ProgressBar

A horizontal bar that fills left-to-right from min to max, showing a
PV's value as a coloured level against a grey background.

## When to use

- Showing how full / how complete something is (a fill level, a job
  progress, a normalised value).
- Dashboards where a compact, low-chrome indicator is preferred over a
  dial.

For a half-circle dial, prefer `Gauge`. For a vertical column, prefer
`Tank`.

## Common patterns

Basic usage with PV-driven min/max:

```jsx
<ProgressBar pv="testIOC:test2" usePvMinMax />
```

Alarm-aware — the fill colour switches to the minor (orange) or major
(red) alarm colour when the PV severity crosses its thresholds:

```jsx
<ProgressBar pv="testIOC:test2" usePvMinMax alarmSensitive />
```

Inline value + tick labels (default):

```jsx
<ProgressBar pv="testIOC:test2" usePvMinMax showValue showTicks />
```

Compact bar without ticks or value text:

```jsx
<ProgressBar pv="testIOC:test2" usePvMinMax showTicks={false} showValue={false} />
```

Stretch to fill the container by disabling the locked aspect ratio:

```jsx
<ProgressBar pv="testIOC:test2" usePvMinMax lockAspectRatio={false} height={40} />
```

## See also

- `Gauge` — half-circle dial with the same alarm-aware colouring.
- `Tank` — vertical column level indicator.
