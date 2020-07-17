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
        {
          name: 'Configuring MongoDB Server Settings',
          content: 'src/docs/MongoDB/MongoDB.md',
          sections: [
            {
              name: 'MongoDB Primer',
              content: 'src/docs/MongoDB/MongoDB_Primer.md',
              sections: [
                {
                  name: 'Replication',
                  content: 'src/docs/MongoDB/MongoDB_Primer_Replication.md',
                },
                {
                  name: 'Mongo Express',
                  content: 'src/docs/MongoDB/MongoDB_Primer_MExpress.md',
                }
              ]
            },
            {
              name: 'MongoDB Configuration',
              content: 'src/docs/MongoDB/MongoDB_Config.md',
              sections: [
                {
                  name: 'Default configuration',
                  content: 'src/docs/MongoDB/MongoDB_Config_Default.md',
                },
                {
                  name: 'Changing MongoDB configuration settings',
                  content: 'src/docs/MongoDB/MongoDB_Config_Config.md',
                }
              ]
            },
          ],
        },
      ],
      sectionDepth: 1
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



          sections: [
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
          components: ['src/components/SystemComponents/Widgets/Widget.js', 'src/components/SystemComponents/PV.js', 'src/components/ExperimentalExamples/Mobile/DynamicPvFieldExample.js', 'src/components/SystemComponents/EpicsPV.js', 'src/components/SystemComponents/LocalPV.js',],
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
          sections: [
            {
              name: 'Setting Up Alarm Server',
              content: 'src/docs/alarmHandler/setup.md',
              sections: [
                {
                  name: 'Environment settings',
                  content: 'src/docs/alarmHandler/environment.md',
                },
                {
                  name: 'MongoDB seed data',
                  content: 'src/docs/alarmHandler/seedData.md',
                  sections: [
                    {
                      name: 'config.json',
                      content: 'src/docs/alarmHandler/configJson.md',
                    },
                    {
                      name: 'pvList.json',
                      content: 'src/docs/alarmHandler/pvListJson.md',
                    },
                    {
                      name: 'users.json',
                      content: 'src/docs/alarmHandler/usersJson.md',
                    },
                  ]
                },
              ]
            },
            {
              name: 'Alarm Handler User Guide',
              content: 'src/docs/alarmHandler/userGuide.md',
              sections: [
                {
                  name: 'Functional implementation and conventions',
                  content: 'src/docs/alarmHandler/implementConventions.md',
                },
                {
                  name: 'Alarm setup view',
                  content: 'src/docs/alarmHandler/alarmSetup.md',
                  sections: [
                    {
                      name: 'ALARM AREAS',
                      content: 'src/docs/alarmHandler/alarmAreas.md',
                    },
                    {
                      name: 'ALARM TABLE',
                      content: 'src/docs/alarmHandler/alarmTable.md',
                    },
                    {
                      name: 'ALARM LOG',
                      content: 'src/docs/alarmHandler/alarmLog.md',
                    },
                  ]
                },
                {
                  name: 'User notification view',
                  content: 'src/docs/alarmHandler/userNotification.md',
                },
              ]
            }
          ],
          components: 'src/components/AlarmHandler/AlarmHandler.js',
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
