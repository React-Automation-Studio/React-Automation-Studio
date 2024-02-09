import TraditionalLayout from "./TraditionalLayout";
import Content from "../../../../docs/content/LayoutContent";
import type { Meta, StoryObj } from "@storybook/react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import React from "react";

const username = "Guest";

const footerContents = (
  <Grid
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    style={{ color: "white" }}
  >
    <Grid item xs={10} style={{ paddingLeft: "1em" }}>
      React Automation Studio Style Guide
    </Grid>
    <Grid
      item
      xs={2}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ color: "white" }}
    >
      <Grid item>
        <AccountCircle />
      </Grid>
      <Grid item style={{ paddingLeft: "1em" }}>
        Guest
      </Grid>
    </Grid>
  </Grid>
);
const handleClickMe2 = () => {
  alert("Thank you for clicking me 2!");
};

const drawerItems = (
  <React.Fragment>
    <ListItem button onClick={() => alert("Thank you for clicking me!")}>
      <ListItemIcon>
        <TouchAppIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={"Click me!"} />
    </ListItem>
    <ListItem button onClick={handleClickMe2}>
      <ListItemIcon>
        <TouchAppIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={"Click me 2!"} />
    </ListItem>
  </React.Fragment>
);

export default {
  component: TraditionalLayout,
  parameters: {},
  title: "Documentation/Style Guide/Layout Components/Traditional Layout",
  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <TraditionalLayout {...args}>
        <Content />
      </TraditionalLayout>
    );
  },
};

export const Overview = {
  ...Template,
  args: {},
};
/**
 * TraditionalLayout with styled app bar, footer and custom footerContent.
 */
export const Example1 = {
  ...Template,
  args: {
    title: "My App Title",
    alignTitle: "center",
    denseAppBar: true,
    showFooter: true,
    footerHeight: 40,
    footerContents: footerContents,
  },
};
/**
 * TraditionalLayout with no moreVert drawer and custom items in side drawer
 */
export const Example2 = {
  ...Template,
  args: {
    title: "My App Title",
    alignTitle: "center",
    denseAppBar: true,
    hideMoreVertMenu: true,
    drawerItems: drawerItems,
  },
};
/**
 * TraditionalLayout that hides drawers after item click
 */
export const Example3 = {
  ...Template,

  args: {
    title: "My App Title",
    alignTitle: "center",
    denseAppBar: true,
    hideDrawerAfterItemClick: true,
    hideMoreVertDrawerAfterItemClick: true,
  },
};
