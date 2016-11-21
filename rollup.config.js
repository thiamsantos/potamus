import babel from 'rollup-plugin-babel'

export default {
  entry: 'test/ui/main.js',
  format: 'cjs',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['es2015', {modules: false}]
      ],
      plugins: ['external-helpers']
    })
  ],
  dest: 'test/ui/dist/bundle.js'
}
