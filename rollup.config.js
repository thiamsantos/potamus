import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/js/main.js',
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
  dest: 'bin/js/main.js'
}
