import ToggleButton from './ToggleButton';
import TextInput from './TextInput';
import { within, userEvent, expect, waitFor } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: ToggleButton,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    pv: 'testIOC:BO1',
    label: 'testIOC:BO1 ',
  },
};

export const Momentary = {
  args: {
    pv: 'testIOC:BO1',
    label: 'testIOC:BO1 ',
    momentary: true,
  },
};

// Integration test: clicking the ToggleButton flips the binary PV. Sibling
// TextInput seeds a known initial state (0) and acts as the ground truth
// monitor that the IOC accepted the toggle (value flips to 1).
export const IocRoundtripTest = {
  tags: ['!dev', '!autodocs', 'roundtrip-test'],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:BO1" label="testIOC:BO1 monitor" />
      </div>
      <ToggleButton pv="testIOC:BO1" label="testIOC:BO1" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole('textbox', {}, { timeout: 5000 });
    const button = await canvas.findByRole('button');

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 },
    );

    await userEvent.clear(input);
    await userEvent.type(input, '0{Enter}');
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    // ToggleButton writes (1 - currentValue) on click, so 0 -> 1.
    await userEvent.click(button);
    await waitFor(() => expect(parseFloat(input.value)).toBe(1), { timeout: 5000 });

    await userEvent.clear(input);
    await userEvent.type(input, '0{Enter}');
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
