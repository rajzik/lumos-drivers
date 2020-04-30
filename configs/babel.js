module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    ['@babel/preset-env', { targets: { node: process.version.slice(1) } }],
    '@babel/preset-typescript',
  ],
};

