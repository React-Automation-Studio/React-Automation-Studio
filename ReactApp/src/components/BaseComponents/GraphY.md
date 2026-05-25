# GraphY

Real-time strip-chart of one or more PVs against a sample-index or
timestamp X axis. Built on Plotly; each entry in `pvs` becomes one
trace.

## When to use

- Live trends — temperatures, voltages, beam currents — where the X
  axis is time (or sample order).
- Multi-PV overlay where several signals need to be compared on the
  same Y axis.

For phase-plane / parametric XY plots (X axis is itself a PV), use
`GraphXY`. For historical replay, see `ArchiverDataViewer`.

## Common patterns

Single trace with a legend label and a custom-height container:

```jsx
<div style={{ height: "25vh" }}>
  <GraphY
    pvs={["testIOC:test4", "testIOC:test5"]}
    legend={["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"]}
  />
</div>
```

Custom trace colours:

```jsx
<GraphY
  pvs={["testIOC:test4", "testIOC:test5"]}
  legend={["A", "B"]}
  lineColor={["#3f51b5", "#e91e63"]}
/>
```

Cap the number of points retained per trace (rolling buffer):

```jsx
<GraphY
  pvs={[
    "testIOC:MTextUpdate1",
    "testIOC:MTextUpdate2",
    "testIOC:MTextUpdate3",
    "testIOC:MTextUpdate4",
    "testIOC:MTextUpdate5",
  ]}
  maxLength={256}
/>
```

Log-scale Y axis with engineering tick format:

```jsx
<GraphY
  pvs={["testIOC:test5"]}
  legend={["Sine Wave Amplitude"]}
  yScaleLog10
  yTickFormat=".3e"
/>
```

Pinned Y-axis range:

```jsx
<GraphY
  title="Custom yMin and yMax"
  pvs={["testIOC:test5"]}
  legend={["Sine Wave Amplitude"]}
  yMin={3000}
  yMax={6000}
/>
```

PV timestamps on the X axis instead of sample index:

```jsx
<GraphY pvs={["testIOC:test5"]} useTimeStamp />
```

## See also

- `GraphXY` — parametric XY plot.
- `ArchiverDataViewer` — historical archive playback.
