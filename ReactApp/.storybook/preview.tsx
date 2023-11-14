// .storybook/preview.tsx
import { Preview } from "@storybook/react";
import Wrapper from "../src/styleguide/Wrapper";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/blocks";
import ImportPath from "./ImportPath";
const preview: Preview = {
  decorators: [
    (Story) => (
      <Wrapper>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </Wrapper>
    ),
  ],
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    // controls: {
    //   matchers: {
    //     // color: /(background|color)$/i,
    //     // date: /Date$/,
    //   },
    // },
   
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ImportPath libName={"React-Automation-Studio"} />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;

// import React from 'react';

// import { Preview } from '@storybook/react';
// import Wrapper from '../src/styleguide/Wrapper'
// const preview: Preview = {
//   decorators: [
//     (Story) => (
//      <Wrapper>
//         {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
//         <Story />
//       </Wrapper>
//     ),
//   ],
// };

// export default preview;
