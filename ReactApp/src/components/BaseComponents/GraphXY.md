# GraphXY

Real-time XY plot — pairs of PVs become traces on a Plotly chart. Each
entry in `xPVs[i]` is paired with `yPVs[i]` to form one line.

## When to use

- Live phase-plane or scatter visualisations (beam position, lissajous,
  IV-curves, parametric sweeps).
- Cases where the X axis is itself a PV value (use `GraphY` if X is
  time).

## Common patterns

Three traces with auto-scale and a custom range:

```jsx
<GraphXY
  xPVs={[
    "testIOC:BeamSweepSim:x.AVAL",
    "testIOC:BeamSweepSim:x1.AVAL",
    "testIOC:BeamSweepSim:x2.AVAL",
  ]}
  yPVs={[
    "testIOC:BeamSweepSim:y.AVAL",
    "testIOC:BeamSweepSim:y1.AVAL",
    "testIOC:BeamSweepSim:y2.AVAL",
  ]}
  xMin={-10000}
  xMax={10000}
  yMin={-10000}
  yMax={10000}
  showLegend
  updateMode="updateOnYChange"
  width="50%"
/>
```

Custom trace colours and legend names:

```jsx
<GraphXY
  xPVs={["testIOC:BeamSweepSim:x.AVAL"]}
  yPVs={["testIOC:BeamSweepSim:y.AVAL"]}
  legend={["Beam position"]}
  lineColor={["#82C3F8"]}
  showLegend
/>
```

Polling-mode update (client samples at `pollingRate`):

```jsx
<GraphXY
  xPVs={["testIOC:BeamSweepSim:x.AVAL"]}
  yPVs={["testIOC:BeamSweepSim:y.AVAL"]}
  usePolling
  pollingRate={50}
/>
```

Log-scaled Y axis with a d3 tick format:

```jsx
<GraphXY
  xPVs={["..."]}
  yPVs={["..."]}
  yScaleLog10
  yTickFormat=".3e"
/>
```

## See also

- `GraphY` — strip-chart of one or more PVs against time.
- `ArchiverDataViewer` — historical archive playback.
