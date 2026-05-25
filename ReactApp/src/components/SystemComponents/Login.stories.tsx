import Login from "./Login";
import type { Meta } from "@storybook/react";

export default {
  component: Login,
  title:"Routes and Login Components/Login",
  parameters: {},
  // !test skips this story from @storybook/test-runner. Login renders
  // <GoogleOAuthProvider> children that throw outside a real OAuth context,
  // which there's no way to provide cleanly in the storybook test harness.
  tags: ['!test',"!dev"],
  argTypes: {},
} as Meta;



export const Primary = {
 
  args: {
   
  },
};
