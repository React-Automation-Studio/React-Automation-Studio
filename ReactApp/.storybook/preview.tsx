// .storybook/preview.tsx

import React from 'react';

import { Preview } from '@storybook/react';
import Wrapper from '../src/styleguide/Wrapper'
const preview: Preview = {
  decorators: [
    (Story) => (
     <Wrapper>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </Wrapper>
    ),
  ],
};

export default preview;