import babel from 'rollup-plugin-babel'

export default {
  entry: 'visual-test/main.js',
  format: 'iife',
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
  dest: 'visual-test/dist/bundle.js'
}
