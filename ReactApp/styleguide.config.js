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
          
        
          
          sections:[
            { 
              name: 'Layout Components',
              components: 'src/components/UI/Layout/ComposedLayouts/*.js',
              exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
              usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
            },
            { 
              name: 'TraditionalLayout Example 1',
              content: 'src/components/UI/Layout/ComposedLayouts/TraditionalLayoutEx1.md',
            },
            { 
              name: 'TraditionalLayout Example 2',
              content: 'src/components/UI/Layout/ComposedLayouts/TraditionalLayoutEx2.md',
            },
            { 
              name: 'TraditionalLayout Example 3',
              content: 'src/components/UI/Layout/ComposedLayouts/TraditionalLayoutEx3.md',
            },
         
          ]
        },
        {
          name: 'Theming',
          content: 'src/docs/themes/themes.md',
          
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
          components: ['src/components/SystemComponents/Widgets/Widget.js', 'src/components/SystemComponents/PV.js', 'src/components/ExperimentalExamples/Mobile/DynamicPvFieldExample.js','src/components/SystemComponents/EpicsPV.js','src/components/SystemComponents/LocalPV.js',],
          exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand', // 'hide' | 'collapse' | 'expand'




        },
        {
          name: 'Beamline Components',
          content: 'src/docs/beamlineComponents/BeamlineComponents.md',
          components: 'src/components/SvgBeamlineComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        
        {
          name: 'Experimental Base Components',
          content: 'src/docs/WorkingWithComponents.md',
          components: 'src/components/ExperimentalBaseComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Experimental Beamline Components',
          content: 'src/docs/beamlineComponents/BeamlineComponents.md',
          components: 'src/components/ExperimentalSvgBeamlineComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Experimental Alarm Handler',
          content: 'src/docs/alarmHandler/alarmHandler.md',
          //components: 'src/components/SvgBeamlineComponents/*.js',
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
