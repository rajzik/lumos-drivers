import { mockTool, stubExecResult } from '@beemo/core/lib/testUtils';
import fs from 'fs';
import NextDriver from '../src/NextDriver';

describe('NextDriver', () => {
  let driver: NextDriver;
  // let context: DriverContext;
  let writeSpy: jest.SpyInstance;

  beforeEach(() => {
    driver = new NextDriver();
    driver.tool = mockTool();
    driver.bootstrap();

    // context = stubDriverContext(driver);

    writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => true);
  });

  afterEach(() => {
    writeSpy.mockRestore();
  });

  it('sets options from constructor', () => {
    driver = new NextDriver({
      args: ['--foo', '--bar=1'],
      dependencies: ['babel'],
      env: { DEV: 'true' },
    });

    expect(driver.options).toEqual({
      args: ['--foo', '--bar=1'],
      dependencies: ['babel'],
      env: { DEV: 'true' },
      strategy: 'native',
    });
  });

  it('sets correct metadata', () => {
    expect(driver.metadata).toEqual(
      expect.objectContaining({
        bin: 'next',
        configName: 'next.config.js',
        configOption: '--config',
        configStrategy: 'reference',
        dependencies: [],
        description: 'nextDescription',
        filterOptions: true,
        helpOption: '--help',
        title: 'Next.js',
        useConfigOption: false,
        versionOption: '--version',
        watchOptions: [],
        workspaceStrategy: 'reference',
      }),
    );
  });

  describe('mergeConfig()', () => {
    it('merges using eslint engine', () => {
      expect(
        driver.mergeConfig(
          {
            env: {
              node: true,
            },
            amp: {
              foo: 'error',
            },
          },
          {
            amp: {
              foo: ['error', 'always'],
            },
          },
        ),
      ).toEqual({
        env: {
          node: true,
        },
        amp: {
          foo: ['error', 'always'],
        },
      });
    });

    it('merges ignore list correctly', () => {
      expect(
        driver.mergeConfig(
          {
            pageExtensions: ['foo', 'bar'],
          },
          {
            pageExtensions: ['baz', 'foo'],
          },
        ),
      ).toEqual({
        pageExtensions: ['foo', 'bar', 'baz'],
      });
    });

    it('merges function and object correctly', () => {
      expect(
        ((driver.mergeConfig(
          (phase, options) => {
            return {
              pageExtensions: ['foo', 'bar'],
            };
          },
          {
            pageExtensions: ['baz', 'foo'],
          },
        ) as unknown) as Function)('test', {}),
      ).toEqual({
        pageExtensions: ['foo', 'bar', 'baz'],
      });
    });

    it('merges function and object correctly override setting', () => {
      expect(
        ((driver.mergeConfig(
          {
            pageExtensions: ['baz', 'foo'],
          },
          (phase, { defaultConfig }) => {
            return {
              ...defaultConfig,
              pageExtensions: ['foo', 'bar'],
            };
          },
        ) as unknown) as Function)('test', {}),
      ).toEqual({
        pageExtensions: ['foo', 'bar'],
      });
    });
  });

  describe('processFailure()', () => {
    it('outputs stderr and stdout', () => {
      const errorSpy = jest.spyOn(driver.tool.console, 'logError');

      driver.processFailure(
        stubExecResult({
          command: 'next',
          stderr: 'Error',
        }),
      );

      expect(errorSpy).toHaveBeenCalledWith('Error');
    });
  });
});
