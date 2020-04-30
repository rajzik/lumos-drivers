import { Driver, STRATEGY_REFERENCE } from '@beemo/core';
import { NextConfig, NextConfigObject, NextDefaultConfig, NextPhases } from './types';

export default class NextDriver extends Driver<NextConfig> {
  bootstrap() {
    this.setMetadata({
      bin: 'next',
      configName: 'next.config.js',
      configStrategy: STRATEGY_REFERENCE,
      description: this.tool.msg('app:nextDescription'),
      title: 'Next.js',
    });
  }

  mergeConfig(prev: NextConfig, next: NextConfig): NextConfig {
    if (typeof prev !== 'function' && typeof next !== 'function') {
      return super.mergeConfig(prev, next);
    }

    return (phase: NextPhases, options: NextDefaultConfig) => {
      const { defaultConfig } = options;
      let newConfig: NextConfigObject;
      if (typeof prev === 'function') {
        newConfig = prev(phase, options);
      } else {
        newConfig = super.mergeConfig(defaultConfig, prev) as NextConfigObject;
      }

      if (typeof next === 'function') {
        newConfig = next(phase, { defaultConfig: newConfig });
      } else {
        newConfig = super.mergeConfig(newConfig, next) as NextConfigObject;
      }

      return newConfig!;
    };
  }
}
