const path = require('path')
module.exports = {
  pagePerSection: true,
  theme: {

    fontFamily: {
      base: 'Roboto'
    }
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/styleguide/Wrapper'),



  },
  sections: [
    {
      name: 'Introduction',
      content: 'src/docs/introduction.md'
    },

    {
      name: 'Documentation',
      content: 'src/docs/documentation.md'
    },
    {
      name: 'Installation Guide',
      content: 'src/docs/installationGuide.md',
      sections: [
        {
          name: 'Installation',
          content: 'src/docs/installation/installation.md',
        },
        {
          name: 'Launching the Docker compose files',
          content: 'src/docs/installation/launching.md',
        },
        {
          name: 'Configuring Enviroment Variables',
          content: 'src/docs/installation/userloginOverview.md',
          sections: [
            {
              name: ' Enabling login and authentication',
              content: 'src/docs/installation/userlogin.md',
            },
            {
              name: ' Enabling user access rights',
              content: 'src/docs/installation/userAccessRights.md',
            },
            {
              name: ' Enabling HTTPS',
              content: 'src/docs/installation/https.md',
            },
          ]
        },


      ]
    },
    {
      name: 'Style Guide',
      content: 'src/docs/styleguide.md',
      sections: [
        {
          name: 'How It Works',
          content: 'src/docs/layout/howItWorks.md',
        },
        {
          name: 'Sample Layouts',
          content: 'src/docs/layout/sampleLayouts.md',
          components: 'src/docs/layout/layoutExamples/*.js',
          exampleMode: 'hide', // 'hide' | 'collapse' | 'expand'
          usageMode: 'hide' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Layout Wrapper Components',
          content: 'src/docs/WorkingWithLayouts.md',
          components: 'src/components/UI/Layouts/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Base Components',
          content: 'src/docs/WorkingWithComponents.md',
          components: 'src/components/BaseComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Widget and PV Components',
          content: 'src/docs/widget/widget.md',
          components: ['src/components/SystemComponents/Widgets/Widget.js', 'src/components/SystemComponents/PV.js', 'src/components/ExperimentalExamples/Mobile/DynamicPvFieldExample.js'],
          exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand', // 'hide' | 'collapse' | 'expand'




        },
        {
          name: 'Experimental Base Components',
          content: 'src/docs/WorkingWithComponents.md',
          components: 'src/components/ExperimentalBaseComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },

      ],
      sectionDepth: 2
    },
    // {
    //   name: 'Documentation',
    //   sections: [
    //     {
    //       name: 'Installation',
    //       content: 'docs/installation.md',
    //       description: 'The description for the installation section'
    //     },
    //     {
    //       name: 'Configuration',
    //       content: 'docs/configuration.md'
    //     },
    //     {
    //       name: 'Live Demo',
    //       external: true,
    //       href: 'http://example.com'
    //     }
    //   ]
    // },


  ]
}
