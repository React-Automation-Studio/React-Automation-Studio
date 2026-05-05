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
  parameters: { docs: { disable: true } },
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await waitFor(() => canvas.getByRole('textbox'), { timeout: 15000 });
    await waitFor(() => expect(input).not.toBeDisabled(), { timeout: 15000 });

    await userEvent.clear(input);
    await userEvent.type(input, '42{Enter}');

    await waitFor(
      () => expect(parseFloat(input.value)).toBe(42),
      { timeout: 5000 },
    );

    // Reset to a known value so subsequent runs/users see a sane state
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
