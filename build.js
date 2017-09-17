'use strict';

const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const pkg = require('./package.json');

const bundles = [
    {
        format: 'es', ext: '.js'
    },
    {
        format: 'umd', ext: '.js'
    },
    {
        format: 'umd', ext: '.min.js', minify: true
    }
];

let promise = Promise.resolve();
promise = promise.then(() => del(['dist/*']));

for (const config of bundles) {
    const plugins = [
        nodeResolve(),
        commonjs(),
        babel({
            presets: [
                'es2015-rollup',
                'react',
                'stage-0'
            ],
            plugins: [
                ['transform-runtime', {polyfill: false, regenerator: true}],
                'external-helpers'
            ],
            babelrc: false,
            exclude: 'node_modules/**',
            runtimeHelpers: true
        })
    ];
    if (config.minify) {
        plugins.push(uglify());
    }
    promise = promise.then(() => rollup.rollup({
        input: 'src/index.js',
        external: Object.keys(pkg.peerDependencies).concat(Object.keys(pkg.devDependencies)),
        plugins: plugins
    })).then(bundle => bundle.write({
        file: `dist/index.${config.format}${config.ext}`,
        format: config.format,
        sourcemap: !config.minify,
        globals: {
            react: 'React'
        },
        name: pkg.name
    }));
}

promise.then(() => {
    fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
    fs.writeFileSync('dist/README.md', fs.readFileSync('README.md', 'utf-8'), 'utf-8');
    fs.writeFileSync('dist/LICENSE', fs.readFileSync('LICENSE', 'utf-8'), 'utf-8');
    // TODO: changelog
});

promise.catch(err => console.error(err.stack));
