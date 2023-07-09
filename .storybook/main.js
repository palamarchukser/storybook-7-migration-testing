/** @type { import('@storybook/vue-webpack5').StorybookConfig } */
import remarkGfm from 'remark-gfm';

const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue-webpack5",
    options: {},
  },
  webpackFinal: async config => {
    config.module.rules.push(
      {
        test: /\.(stories|story)\.mdx$/,
        use: [
          {
            loader: require.resolve('@storybook/mdx2-csf/loader'),
            options: {
              skipCsf: false,
              mdxCompileOptions: {
                remarkPlugins: [remarkGfm],
              },
            },
          },
        ],
      },
    );

    const newConfig = {
      ...config,
      entry: [
        ...config.entry,
      ],
      module: {
        ...config.module,
      },
      resolveLoader: {
        ...config.resolveLoader,
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
        },
      },
    };

    return newConfig;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
