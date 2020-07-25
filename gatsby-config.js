module.exports = {
  siteMetadata: {
    title: 'Debbyiscoding',
    description: '紀錄一些技術、一些生活',
    siteUrl: 'https://debbyji.com',
    social: {
      twitter: '@debbyiscoding',
      facebook: '',
      cakeresume: ''
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-vscode`,
          options: {
            theme: 'Dark+ (default dark)', // Read on for list of included themes. Also accepts object and function forms.
            wrapperClassName: '',   // Additional class put on 'pre' tag. Also accepts function to set the class dynamically.
            injectStyles: true,     // Injects (minimal) additional CSS for layout and scrolling
            extensions: [],         // Third-party extensions providing additional themes and languages
            languageAliases: {},    // Map of custom/unknown language codes to standard/known language codes
            replaceColor: x => x,   // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
            getLineClassName: ({    // Function allowing dynamic setting of additional class names on individual lines
              content,              //   - the string content of the line
              index,                //   - the zero-based index of the line within the code fence
              language,             //   - the language specified for the code fence
              meta                  //   - any options set on the code fence alongside the language (more on this later)
            }) => '',
            logLevel: 'warn'       // Set to 'info' to debug if something looks wrong
          }
        }]
      }
    },
    `gatsby-plugin-sass`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
