import TextUpdateMultiplePVs from "./TextUpdateMultiplePVs";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TextUpdateMultiplePVs,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    pvs: [
      "testIOC:MTextUpdate1",
      "testIOC:MTextUpdate2",
      "testIOC:MTextUpdate3",
      "testIOC:MTextUpdate4",
      "testIOC:MTextUpdate5",
    ],
    usePvLabel: true,
  },
};
