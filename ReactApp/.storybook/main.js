// .storybook/main.js

import { mergeConfig } from 'vite';

export default {
  // Replace your-framework with the framework you are using (e.g., react-vite, vue3-vite)
  framework: '@storybook/react-vite',
  stories: [
    
    '../src/docs/Introduction.mdx',
    '../src/docs/installation/installation.mdx',
    '../src/docs/installation/launching.mdx',
   '../src/docs/installation/userloginOverview.mdx',
    '../src/docs/installation/*.mdx',
    '../src/docs/MongoDB/MongoDB.mdx',
    '../src/docs/MongoDB/MongoDB_Primer.mdx',
    '../src/docs/MongoDB/MongoDB_Primer_Replication.mdx',
    '../src/docs/MongoDB/MongoDB_Config.mdx',
    '../src/docs/MongoDB/MongoDB_Config_Default.mdx',
    '../src/docs/MongoDB/MongoDB_Config_Config.mdx',
    '../src/docs/MongoDB/MongoDB_Compass.mdx',
    '../src/docs/styleguide.mdx',
    '../src/docs/layout/howItWorks.mdx',
    '../src/docs/layout/sampleLayouts.mdx',
    '../src/docs/layout/layoutExamples/BasicGrid.mdx',
    '../src/docs/layout/layoutExamples/Mobile.mdx',
    '../src/docs/WorkingWithLayouts.mdx',
    // '../src/docs/**/*.mdx', 
  '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  // '../src/components/**/*.mdx',
],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-docs"
  ],
  async viteFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      // Your development configuration goes here
    }
    if (configType === 'PRODUCTION') {
      // Your production configuration goes here.
    }
    return mergeConfig(config, {
      // Your environment configuration here
    });
  },
};