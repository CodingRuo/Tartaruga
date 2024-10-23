import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'

export default [
    // Main bundle
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true,
                plugins: [terser()]
            },
            {
                file: 'dist/index.mjs',
                format: 'es',
                sourcemap: true,
                plugins: [terser()]
            }
        ],
        plugins: [
            cleanup(),
            filesize(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false // Keine Deklarationen im ersten Durchlauf
            })
        ],
        external: [
            // externe Dependencies
        ]
    },
    // Types bundle
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'es'
        },
        plugins: [dts()],
        external: [
            // externe Dependencies
        ]
    }
];