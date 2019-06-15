const path = require('path')
module.exports = {
  theme: {

    fontFamily: {
      base: 'Roboto'
    }
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/styleguide/Wrapper'),
    //LogoRenderer: path.join(__dirname, './src/styleguide/components/Logo'),
//    StyleGuide: path.join(__dirname, './src/styleguide/components/StyleGuide'),
	//	StyleGuideRenderer: path.join(__dirname, './src/styleguide/components/StyleGuideRenderer'),
	//	SectionsRenderer: path.join(__dirname, './src/styleguide/components/SectionsRenderer'),



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
    name: 'Layout',
    content: 'src/docs/layout.md',
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
    ]
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
   {
     name: 'Base Components',
    // content: 'docs/ui.md',
     components: 'src/components/BaseComponents/*.js',
     exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
     usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
   },

 ]
}
