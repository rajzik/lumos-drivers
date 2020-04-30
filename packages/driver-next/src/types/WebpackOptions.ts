import webpack from 'webpack';

export interface WebpackOptions {
  buildId: string;
  dev: boolean;
  isServer: boolean;
  defaultLoaders: webpack.Loader[];
  webpack: unknown;
}
