import { Configuration, LoaderOptionsPlugin } from 'webpack';

export const loader = {
  test: /\.(graphql|gql)$/,
  use: [
    {
      loader: 'babel-loader',
      options: { presets: ['@babel/preset-typescript', '@babel/preset-react'] },
    },
    { loader: 'graphql-let/loader' },
  ],
};

type Config = (
  nextConfig:
    | {
        webpack: (config: Configuration, options: LoaderOptionsPlugin) => void;
      }
    | {}
) => void;

const config: Config = (nextConfig = {}) => ({
  ...nextConfig,
  webpack(config: Configuration, options: LoaderOptionsPlugin) {
    config.module?.rules?.push(loader);

    if ('webpack' in nextConfig && typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});

export default config;
