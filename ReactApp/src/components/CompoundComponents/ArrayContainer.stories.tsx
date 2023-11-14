import { Grid, Typography } from "@mui/material";
import TextInput from "../BaseComponents/TextInput";
import TextOutput from "../BaseComponents/TextOutput";
import ArrayContainer from "./ArrayContainer";
import type { Meta, StoryObj } from "@storybook/react";
import { EmojiEmotions } from "@mui/icons-material";
import StyledIconButton from "../BaseComponents/StyledIconButton";
export default {
  component: ArrayContainer,
  parameters: {},

  // tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography algin="center">
            String Contents of the Waveform
          </Typography>
          <TextOutput pv="testIOC:binaryWaveform" />
        </Grid>
        <Grid item xs={12}>
          <Typography algin="center">
            ArrayContainer Indexed TextInputs
          </Typography>
          <ArrayContainer {...args}>
            <TextInput pv="testIOC:binaryWaveform" />
          </ArrayContainer>
        </Grid>
      </Grid>
    );
  },
};

export const Example1 = {
  ...Template,
  args: {
    maxItemsCount: 10,
  },
};

const Template2: StoryObj = {
  render: ({ ...args }) => {
    let indexes = Array.from(Array(10).keys());
    let labels = indexes.map((num) => num.toString());
    return (
      <ArrayContainer {...args} registersLabel={labels} visibleItemsCount={3}>
        <TextInput pv="testIOC:binaryWaveform" />
      </ArrayContainer>
    );
  },
};
export const Example2 = {
  ...Template2,
  args: {
    maxItemsCount: 10,
  },
};

const Template3: StoryObj = {
  render: ({ ...args }) => {
    return (
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography algin="center">ArrayContainer with registers</Typography>
          <ArrayContainer
            registers={[0, 1, 4, 8, 9]}
            registersLabel={["zero", "one", "four", "eight", "nine"]}
          >
            <TextInput pv="testIOC:binaryWaveform" />
          </ArrayContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography algin="center">
            ArrayContainer with registers and visibleItemsCount
          </Typography>
          <ArrayContainer
            registers={[0, 1, 4, 8, 9]}
            registersLabel={["zero", "one", "four", "eight", "nine"]}
            visibleItemsCount={3}
          >
            <TextInput pv="testIOC:binaryWaveform" />
          </ArrayContainer>
        </Grid>
      </Grid>
    );
  },
};
export const Example3 = {
  ...Template3,
  args: {},
};

const Template4: StoryObj = {
  render: ({ ...args }) => {
    let indexes = Array.from(Array(48).keys());
    let labels = indexes.map((num) => num.toString());
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography algin="center">Horizontal direction</Typography>
          <ArrayContainer
            registersLabel={labels}
            direction="horizontal"
            maxItemsCount={10}
          >
            <StyledIconButton pv="testIOC:binaryWaveform">
              <EmojiEmotions />
            </StyledIconButton>
          </ArrayContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography algin="center">
            Horizontal direction with minimum width
          </Typography>
          <ArrayContainer
            registersLabel={labels}
            direction="horizontal"
            itemMinWidth={20}
            maxItemsCount={10}
          >
            <StyledIconButton pv="testIOC:binaryWaveform">
              <EmojiEmotions />
            </StyledIconButton>
          </ArrayContainer>
        </Grid>
      </Grid>
    );
  },
};
export const Example4 = {
  ...Template4,
  args: {},
};

const Template5: StoryObj = {
  render: ({ ...args }) => {
    return (
      <ArrayContainer
        label="My Array Container"
        spacing={1}
        visibleItemsCount={3}
        maxItemsCount={10}
      >
        <TextInput pv="testIOC:binaryWaveform" />
      </ArrayContainer>
    );
  },
};
export const Example5 = {
  ...Template5,
  args: {},
};
