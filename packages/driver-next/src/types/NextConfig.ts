import { NextConfigObject } from './NextConfigObject';
import { NextDefaultConfig } from './NextDefaultConfig';
import { NextPhases } from './NextPhases';

export type NextConfig =
  | NextConfigObject
  | ((phase: NextPhases, defaultConfig: NextDefaultConfig) => NextConfigObject);
