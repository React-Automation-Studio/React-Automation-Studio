import MainDashboard from "./MainDashboard";

export default {
  component: MainDashboard,
  parameters: {},
  tags: ["!dev", "!autodocs"],
  argTypes: {},
};

// Smoke-screen story: smoke-tested by @storybook/test-runner via the default
// per-story render check. Verifies the dashboard mounts without throwing.
export const Primary = {
  args: {},
};
