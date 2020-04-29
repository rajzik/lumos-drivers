import { Driver, STRATEGY_REFERENCE } from '@beemo/core';
import { NextDriverConfig } from './types';

export default class NextDriver extends Driver<NextDriverConfig> {
  bootstrap() {
    this.setMetadata({
      bin: 'next',
      configName: 'next.config.js',
      configStrategy: STRATEGY_REFERENCE,
      description: this.tool.msg('app:nextDescription'),
      title: 'Next.js',
    });
  }
}
