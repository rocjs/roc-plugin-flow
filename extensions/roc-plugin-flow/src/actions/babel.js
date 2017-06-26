
export default () => () => (babelConfig) => {
    babelConfig.plugins.push('babel-plugin-transform-flow-strip-types');

    return babelConfig;
};
