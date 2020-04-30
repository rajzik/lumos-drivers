import webpack from 'webpack';
import { PathMap } from './PathMap';
import { PathMapOptions } from './PathMapOptions';
import { WebpackOptions } from './WebpackOptions';

export interface NextConfigObject {
  env?: {
    [key: string]: string | number | boolean;
  };
  webpack?:
    | null
    | ((config: webpack.Configuration, options: WebpackOptions) => webpack.Configuration);
  webpackDevMiddleware?: null | ((config: webpack.Configuration) => webpack.Configuration);
  distDir?: string;
  assetPrefix?: string;
  configOrigin?: string;
  useFileSystemPublicRoutes?: boolean;
  generateBuildId?(): Promise<string>;
  generateEtags?: boolean;
  pageExtensions?: string[];
  target?: 'server' | 'serverless' | 'experimental-serverless-trace';
  poweredByHeader?: boolean;
  compress?: boolean;
  devIndicators?: {
    buildActivity?: boolean;
    autoPrerender?: boolean;
  };
  onDemandEntries?: {
    maxInactiveAge?: number;
    pagesBufferLength?: number;
  };
  amp?: {
    canonicalBase?: string;
    [key: string]: unknown;
  };
  exportTrailingSlash?: boolean;
  experimental?: {
    cpus?: number;
    jsconfigPaths?: boolean;
    css?: boolean;
    scss?: boolean;
    documentMiddleware?: boolean;
    granularChunks?: boolean;
    modern?: boolean;
    plugins?: boolean;
    profiling?: boolean;
    sprFlushToDisk?: boolean;
    reactMode?: 'legacy' | 'blocking' | 'concurrent';
    workerThreads?: boolean;
    basePath?: string;
    sassOptions?: {
      [key: string]: unknown;
    };
    pageEnv?: boolean;
    measureFid?: boolean;
  };
  future?: {
    excludeDefaultMomentLocales?: boolean;
  };
  serverRuntimeConfig?: {
    [key: string]: unknown;
  };
  publicRuntimeConfig?: {
    [key: string]: unknown;
  };
  reactStrictMode?: boolean;
  typescript?: {
    [key: string]: unknown;
  };
  exportPathMap?(defaultPathMap: PathMap, options: PathMapOptions): Promise<PathMap>;
}
