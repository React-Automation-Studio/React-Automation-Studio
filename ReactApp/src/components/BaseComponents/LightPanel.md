# LightPanel

Read-only coloured panel that displays a PV's value as a status light.
Supports binary, multi-state (MBBI/MBBO) and analog PVs — each PV
value maps to a colour and an optional display string.

## When to use

- Status lights, fault lamps, and operator overview panels.
- Multi-state status displays (running / fault / standby / off).

For a per-bit decoder of an integer status word, use `BitIndicators`.
For an icon-based indicator, use `StyledIconIndicator`.

## Common patterns

Binary on/off indicator:

```jsx
<LightPanel
  pv="testIOC:BO1"
  colors={{ 0: "red", 1: "lime" }}
  usePvLabel
  labelPlacement="top"
/>
```

Multi-state indicator with a colour per state and larger text:

```jsx
<LightPanel
  pv="testIOC:mbboTest1"
  colors={{
    0: "red",
    1: "lime",
    2: "deepskyblue",
    3: "orange",
    4: "deeppink",
  }}
  usePvLabel
  labelPlacement="top"
  variant="h4"
/>
```

Analog PV mapped to custom display strings — pass `useStringValue=false`
and supply `customValueStrings` (the integer PV value becomes the
array index):

```jsx
<LightPanel
  pv="testIOC:test2"
  colors={{ 0: "red", 1: "lime" }}
  usePvLabel
  labelPlacement="top"
  useStringValue={false}
  customValueStrings={["FOO", "BAR"]}
/>
```

## See also

- `BitIndicators` — per-bit decoder for an integer status word.
- `StyledIconIndicator` — icon-based status indicator.
