# Frontend testing

This document tracks integration test coverage for the React frontend
(`ReactApp/src/components/`). It is the canonical reference for what is and
isn't covered by the storybook-based PV roundtrip test suite.

## How the tests run

Tests run against the **live dev compose stack** (full backend: pvServer,
demo IOC, MongoDB replica set, alarm handler), driven by
[`@storybook/test-runner`](https://github.com/storybookjs/test-runner) which
in turn drives Playwright/Chromium against the running Storybook.

```bash
# Bring up the test stack (extends docker-compose-dev-styleguide-dev.yml):
docker compose -f docker-compose-test.yml up

# Run the suite (in a second terminal):
docker compose -f docker-compose-test.yml run --rm test-runner

# Or run only the PV-roundtrip stories (fast iteration):
docker compose -f docker-compose-test.yml run --rm test-runner \
  sh -c "pnpm test-storybook --url https://localhost:6060 --verbose --includeTags roundtrip-test"
```

`docker-compose-test.yml` carries comments explaining the network, TLS-cert,
and test-config wiring — read it if you're touching the test stack itself.

## Test categories

| Category | Mechanism | What it proves |
|----------|-----------|----------------|
| **Smoke** | Default, automatic. test-runner navigates to every story and fails if React throws on render. | The component mounts without crashing. |
| **Roundtrip** (write) | `IocRoundtripTest` play function with a sibling `TextInput`. Seeds a known PV value, performs the action under test, asserts the sibling `TextInput` reflects the new value (proving the IOC accepted the write and broadcast it back). | Click / type / toggle on a write-capable component reaches the IOC and round-trips through pvServer. |
| **Display** (read) | `IocPvDisplayTest` play function with a sibling `TextInput`. Writes via the seed input, asserts the read-only component's rendered output (text, `aria-valuenow`, etc.) follows the PV. | The display component is genuinely subscribed to the PV's broadcasts and re-renders on update. |

The sibling-`TextInput` pattern is critical: it gives the test an
**independent witness** of the IOC state. Without it, asserting on the
component-under-test alone would just confirm "the user-typed value is
echoed back", not that the IOC accepted the write or that the read component
is wired to the PV at all.

Stories with play functions are tagged `['!dev', '!autodocs', 'roundtrip-test']`
so they're hidden from the Storybook sidebar (no value flicker for users
browsing the styleguide) and not picked up by autodocs, but still run by
test-runner.

## Coverage

Every component / page that ships a `*.stories.*` file is covered by **smoke
tests** automatically — test-runner navigates to each story, fails if React
throws on render. The "Stories" column lists every story by name; each one
gets one smoke test.

Stories with explicit play functions are marked **[R]** (Roundtrip, write
component) or **[D]** (Display, read component). Those play functions run
*on top of* the smoke check.

### `components/BaseComponents/`

| Component | Stories | Notes |
|-----------|---------|-------|
| ActionButton | Overview, Write1, Write0, WriteMultiple, **IocRoundtripTest [R]** | click → BO1 |
| BitIndicators | Overview, CustomIcon, CustomColors | needs `data-pv-value` to be testable |
| CheckBox | Primary, **IocRoundtripTest [R]** | toggle → BO1 |
| Gauge | Overview, **IocPvDisplayTest [D]** | `role="meter"` + `aria-valuenow` |
| GraphXY | Overview | plot — separate testing strategy out of scope here |
| GraphY | Overview, AlternateColors, OneHundredThousandDataPoints, OneMillionDataPoints | plot — separate testing strategy out of scope here |
| LightPanel | Overview, MultiBinary, **IocPvDisplayTest [D]** | findByText (`Off`/`On` ZNAM/ONAM) |
| ProgressBar | Primary, NoTicks, **IocPvDisplayTest [D]** | `role="progressbar"` + `aria-valuenow` |
| RadioButton | Primary | single radio; group is covered |
| RadioButtonGroup | Primary, CustomSelectionStrings, **IocRoundtripTest [R]** | findByLabelText (anchored) |
| SelectionInput | Example, ExampleCustomSelection, **IocRoundtripTest [R]** | combobox — option lookup via `body` scope (portal) |
| SelectionList | Horizontal, Vertical, VerticalCustomSelection, **IocRoundtripTest [R]** | findByText → `closest('[role="button"]')` |
| Slider | Primary, ExtraMarks, Vertical, CustomLabel | roundtrip *(deferred)* — rc-slider's drag handler is unreachable from headless Chromium; revisit on MUI Slider migration |
| StyledIconButton | Overview, CustomColors, CustomIcon | similar pattern to ActionButton; not yet covered |
| StyledIconIndicator | Overview, CustomColors, CustomIcon | binary visual; needs `data-pv-value` |
| Switch | Overview, **IocRoundtripTest [R]** | `role="switch"` (MUI 7) |
| Tank | Overview, WithTicks, **IocPvDisplayTest [D]** | `role="meter"` + `aria-valuenow` |
| TextInput | Primary, **IocRoundtripTest [R]**, EpicsAIOverides, EpicsMBBOStringValue, EpicsMBBONumericalValue, NumberFormatExample | pilot — also serves as the universal "seed" for sibling-tests |
| TextOutput | Primary, EpicsAIOverides, EpicsMBBOStringValue, EpicsMBBONumericalValue, NumberFormatExample, **IocPvDisplayTest [D]** | findByLabelText (`seed` vs `readback`) |
| TextUpdate | Primary, PvLabel, NumberFormat, **IocPvDisplayTest [D]** | findByText |
| TextUpdateMultiplePVs | Primary | display variant; not yet covered |
| ThumbWheel | Overview, Primary | per-digit buttons render only icons (no text/aria-label) — needs component change |
| ToggleButton | Primary, Momentary, **IocRoundtripTest [R]** | click → BO1 |

### `components/CompoundComponents/`

| Component | Stories | Notes |
|-----------|---------|-------|
| ArrayContainer | Example1, Example2, Example3, Example4, Example5 | container that fans out to children PVs |

### `components/SystemComponents/`

| Component | Stories | Notes |
|-----------|---------|-------|
| EpicsPV | Primary | low-level PV hook; not directly user-facing |
| LocalPV | Primary | local-only state; no IOC interaction |
| Login | Primary *(skipped)* | renders `<GoogleOAuthProvider>` children that throw outside an OAuth context — tagged `!test` |
| PV | Primary | low-level PV hook |
| Widgets/Widget | Primary | Widget base — used internally by every Base Component |

### `components/AlarmHandler/`

| Component | Stories | Notes |
|-----------|---------|-------|
| AlarmHandler | Primary | smoke covers full alarm-handler page mount |

### `components/ArchiverDataViewer/`

| Component | Stories | Notes |
|-----------|---------|-------|
| ArchiverDataViewer | Overview | requires a configured archiver — smoke only |

### `components/LoadSaveComponent/`

| Component | Stories | Notes |
|-----------|---------|-------|
| LoadSave | Overview | smoke covers full load/save page mount |

### `components/SvgBeamlineComponents/`

All beamline SVG components are smoke-only — they render based on PV state
but have no semantic value attribute exposed. Each ships a single `Overview`
story.

| Component | Stories | Notes |
|-----------|---------|-------|
| BeamLineCanvas | Overview | |
| BendingMagnet | Overview | |
| FC | Overview | Faraday cup |
| Harp | Overview | |
| HorizontalBeamline | Overview | |
| QuadrapoleMagnet | Overview | |
| SlitXY | Overview | |
| SteererXMagnet | Overview | |
| SteererXYMagnet | Overview | |
| SteererYMagnet | Overview | |

### `components/ExperimentalSvgBeamlineComponents/`

| Component | Stories | Notes |
|-----------|---------|-------|
| SvgComponent | Overview | preview / experimental |

### `components/UI/Layout/ComposedLayouts/`

| Component | Stories | Notes |
|-----------|---------|-------|
| TraditionalLayout | Overview, Example1, Example2, Example3 | layout demo |

### `docs/layout/layoutExamples/`

| Component | Stories | Notes |
|-----------|---------|-------|
| Mobile | Primary | mobile layout demo |

## Summary

| Coverage type | Count | Where |
|---|---|---|
| Smoke (all stories that aren't tagged `!test`) | ~99 stories across 45 story files | every component / page with `.stories.*` |
| Roundtrip play function | 8 | TextInput, ActionButton, ToggleButton, Switch, CheckBox, RadioButtonGroup, SelectionInput, SelectionList |
| Display play function | 6 | TextOutput, TextUpdate, LightPanel, ProgressBar, Tank, Gauge |
| Deferred | 1 | Slider — rc-slider hostile to test-runner |
| Skipped from test-runner | 1 | Login — needs `<GoogleOAuthProvider>` context |
| Smoke-only (no play function yet) | 30 | balance — most are display-only or page-level |

## Adding a new test

For a write-capable component (Roundtrip):

```tsx
import TextInput from "./TextInput";
import { within, userEvent, expect, waitFor } from "storybook/test";

export const IocRoundtripTest = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:..." label="seed" />
      </div>
      <YourComponent pv="testIOC:..." />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const seed = await canvas.findByLabelText(/^seed$/i);
    // ...wait for connect, seed initial value, perform action,
    // assert seed reflects the new state, reset.
  },
};
```

For a read-only component (Display) the pattern is the same; the play
function asserts the read component's rendered output (text content,
`aria-valuenow`, etc.) instead of an action.

If the read component is purely visual (icon swap, color change, SVG with
no semantic value), the standard fix is to expose state via:

- `role="meter"` / `role="progressbar"` + `aria-valuenow` for scalars, **or**
- `data-pv-value="..."` on the root element for enums / binary states.

Both of these are also accessibility wins for real users.
