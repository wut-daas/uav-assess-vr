const { description } = require('../../package.json')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'UAV Assess VR',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#base
   */
  base: '/uav-assess-vr/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'wut-daas/uav-assess-vr',
    editLinks: false,
    docsDir: 'docs',
    editLinkText: '',
    lastUpdated: true,
    nav: [
      {
        text: 'User Guide',
        link: '/guide/',
      },
      {
        text: 'Developer Guide',
        link: '/developer/'
      },
      {
        text: 'OBLot Research Centre',
        link: 'https://oblot.pw.edu.pl/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'User Guide',
          collapsable: false,
          children: [
            '',
            'getting-started',
            'autopilot-simulation'
          ]
        }
      ],
      '/developer/': [
        {
          title: 'Developer Guide',
          collapsable: false,
          children: [
            '',
            'tasks',
            'assessment',
            'hardware',
            'visuals',
            'documentation'
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
