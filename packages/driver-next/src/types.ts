import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_EXPORT,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants';
import webpack from 'webpack';

export type NextPhases =
  | typeof PHASE_DEVELOPMENT_SERVER
  | typeof PHASE_EXPORT
  | typeof PHASE_PRODUCTION_BUILD
  | typeof PHASE_PRODUCTION_SERVER;

export interface NextConfigObject {
  env?: {
    [key: string]: string | number | boolean;
  };
  webpack?: Nullable<
    (config: webpack.Configuration, options: WebpackOptions) => webpack.Configuration
  >;
  webpackDevMiddleware?: Nullable<(config: webpack.Configuration) => webpack.Configuration>;
  distDir?: string;
  assetPrefix?: string;
  configOrigin?: string;
  useFileSystemPublicRoutes?: boolean;
  generateBuildId?(): Promise<string>;
  generateEtags?: boolean;
  pageExtensions?: string[];
  target?: 'server' | 'serverless';
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
  amp?: { canonicalBase?: string; [key: string]: unknown };
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
    reactMode?: string;
    workerThreads?: boolean;
    basePath?: string;
    sassOptions?: {
      [key: string]: unknown;
    };
    pageEnv?: boolean;
    measureFid?: boolean;
  };
  future?: { excludeDefaultMomentLocales?: boolean };
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

export interface WebpackOptions {
  buildId: string;
  dev: boolean;
  isServer: boolean;
  defaultLoaders: webpack.Loader[];
  webpack: unknown;
}

export interface PathMapOptions {
  dev: boolean;
  dir: string;
  outDir: Nullable<string>;
  distDir: string;
  buildId: string;
}

export interface PathMap {
  page: string;
  query: {
    [key: string]: unknown;
  };
}

export interface NextDefaultConfig {
  defaultConfig: NextConfigObject;
}

export type NextDriverConfig =
  | NextConfigObject
  | ((phase: NextPhases, defaultConfig: NextDefaultConfig) => NextConfigObject);
