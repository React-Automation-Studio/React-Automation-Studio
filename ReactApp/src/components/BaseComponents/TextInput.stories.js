import  TextInput  from './TextInput';
import { within, userEvent, expect, waitFor } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TextInput,
  parameters: {

  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    pv:'$(device):test$(id)',
       macros:{'$(device)':'testIOC','$(id)':'2'},
       usePvLabel:true,
       usePvPrecision:true,
       usePvUnits:true,
       usePvMinMax:true,
       alarmSensitive:true,

  },
};

// Integration test: writes a value through pvServer to the demo IOC and asserts
// the new value comes back via the PV update. Exercises socket.io -> pvServer ->
// PyEpics -> testIOC -> pvServer -> client roundtrip.
export const IocRoundtripTest = {
  args: {
    pv: '$(device):test$(id)',
    macros: { '$(device)': 'testIOC', '$(id)': '2' },
    usePvLabel: true,
    usePvPrecision: true,
    usePvUnits: true,
    usePvMinMax: true,
    alarmSensitive: true,
  },
  // !dev hides the story from the Storybook sidebar (so users browsing the
  //   styleguide don't see the value flicker through 42 -> 5000),
  // !autodocs skips its inclusion in the auto-generated docs page,
  // 'roundtrip-test' lets us isolate this story during debugging via:
  //   pnpm test-storybook --includeTags roundtrip-test
  // The implicit 'test' tag is still present, so test-runner picks it up.
  tags: ['!dev', '!autodocs', 'roundtrip-test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole('textbox', {}, { timeout: 5000 });
  
    // Initial PV value (testIOC:test2 has VAL=5000 in the demo IOC db) — also
    // doubles as the "PV is connected" gate, since the value stays as the PV
    // name string until connection completes.
    await waitFor(
      () => expect(parseFloat(input.value)).toBe(5000),
      { timeout: 5000 },
    );

    // Write 42, Enter triggers handleCommitChange -> pvServer write -> IOC.
    await userEvent.clear(input);
    await userEvent.type(input, '42{Enter}');
    await waitFor(
      () => expect(parseFloat(input.value)).toBe(42),
      { timeout: 5000 },
    );

    // Reset to the original value so subsequent test runs / users see a sane state.
    await userEvent.clear(input);
    await userEvent.type(input, '5000{Enter}');
    await waitFor(
      () => expect(parseFloat(input.value)).toBe(5000),
      { timeout: 5000 },
    );
  },
};

export const EpicsAIOverides = {
  description: "test",
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Custom Label",
    usePvPrecision: true,
    prec: 5,
    units: "🍕",
    max: 5500,
    min: 4500,
    alarmSensitive: true,
    useUnits: true,
  },
};

export const EpicsMBBOStringValue = {
  description: "test",
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    useStringValue: true,
    usePvUnits: true,
  },
};

export const EpicsMBBONumericalValue = {
  description: "test",
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    usePvUnits: true,
  },
};

export const NumberFormatExample = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvPrecision: true,
    usePvUnits: true,
    usePvMinMax: true,
    prec: 3,
    alarmSensitive: true,
    numberFormat: { notation: "engineering", precision: 5 },
  },
};
