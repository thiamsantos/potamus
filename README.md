# potamus
[![Build Status](https://travis-ci.org/thiamsantos/potamus.svg?branch=master)](https://travis-ci.org/thiamsantos/potamus)
[![Coveralls](https://img.shields.io/coveralls/thiamsantos/potamus.svg)](https://coveralls.io/github/thiamsantos/potamus?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![npm (scoped)](https://img.shields.io/npm/v/potamus.svg)](https://www.npmjs.com/package/potamus)
[![npm](https://img.shields.io/npm/l/potamus.svg)](https://github.com/thiamsantos/potamus/blob/master/LICENSE.md)

> A lightweight and responsive setup of Material Design components writed in stylus.

Is not always interesting to use in your project a whole framework like [Materialize](http://materializecss.com/) or [Material Design Lite](https://getmdl.io/). This project aims to provide independent components without any dependencies, which would not change the way you drive your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Stylus plugin](#stylus-plugin)
  - [Javascript API](#javascript-api)
- [Components](#components)
  - [Button](#button)
  - [Checkbox](#checkbox)
  - [Radio](#radio)
  - [Text Field](#text-field)
  - [Data Table](#data-table)
- [Contribute](#contribute)
- [License](#license)

## Installation
```sh
$ npm install --save-dev potamus
```

## Usage
Potamus consists of a two-part package, a stylus plugin and a javascript API.

### Stylus Plugin
> Is fully recommended the use of [autoprefixer-stylus](https://github.com/jescalan/autoprefixer-stylus) along with potamus.

#### Import
Just import the stylus file to you project.
``` stylus
@import 'path/to/potamus/components/some-component.styl'
```
#### Gulp
To use with gulp just first install the npm package and then add to use add to your gulpfile as a plugin of stylus.
``` javascript
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const potamus = require('potamus')
const stylus = require('gulp-stylus')

gulp.task('stylus', () =>
  gulp.src('src/*.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: [potamus()]
    }))
    .pipe(gulp.dest('dist/')))
```
#### Stylus cli
Add potamus as argument of the use option.
```sh
$ stylus --use potamus src -o dist
```

### Javascript API
Use some module loader as [rollup](http://rollupjs.org/), [webpack](https://webpack.github.io/), or [browserify](http://browserify.org/) to load potamus components.

#### CommonJs:
```javascript
const potamus = require('potamus')
```
#### ES6 Modules:
```javascript
import potamus from 'potamus'
```
#### ES6 Modules + Named import:
```javascript
import {someModule} from 'potamus'

// Example:
import {button, checkbox} from 'potamus'
```

## Components
> Note: All components works just fine without javascript, but with some limitations, so is good include the scripts.

**You should pass a object as argument for every mixin, if none of the option is passed you can pass a blank object.**

### Button
#### HTML:
``` html
<button class="some-awesome-button-class-name">Button</button>
```
#### Stylus:
```stylus
.some-awesome-button-class-name
  button({
    background-color: #E91E63, // background-color of the button
    color: #fff,         // text-color of the button
    ripple-name: effect, // class name for the ripple effect
    js: true             // if true classes needed for js interactions are added
    width: 300px         // width of the button, can be omitted
  })
```
#### JavaScript:
```javascript
import potamus from 'potamus'

Array.from(document.querySelectorAll('.some-awesome-button-class-name'))
  .forEach(node => {
    node.addEventListener('click', button('name-for-ripple-effect-class'))
  })
```
### Checkbox
#### HTML:
```html
<input class="some-awesome-checkbox-class-name" type="checkbox">
```
#### Stylus:
```stylus
.some-awesome-checkbox-class-name
  checkbox({
    border-color: #ccc, // border color when the checkbox is unchecked
    background-color: #E91E63, // color when the checkbox is checked
    size: 40px          // size of the checkbox
  })
```
#### JavaScript:
```javascript
import potamus from 'potamus'

potamus.checkbox(navigator.userAgent, 'some-awesome-checkbox-class-name')
```

### Radio
#### HTML:
```html
<input class="some-awesome-radio-name" type="radio" id="first" name="radio">
<input class="some-awesome-radio-name" type="radio" id="second" name="radio">
```
#### Stylus:
```stylus
.some-awesome-radio-name
  radio({
    animation-name: radio-fade, // name of the animation of the radio
    border-color: #9E9E9E,      // border color when the radio is unchecked
    background-color: #F44336,  // color when the radio is checked
    size: 30px                  // size of the checkbox
  })
```
#### JavaScript:

This component doesn't need javascript.

### Text-field
#### HTML:
```html
<div class="some-awesome-text-field-name">
  <input class="some-awesome-text-field-name_sufix-input" type="text">
  <label class="some-awesome-text-field-name__sufix-label">Nome</label>
</div>
```
#### Stylus:
```stylus
.some-awesome-text-field-name
  text-field({
    active-color: #2196F3,                 // color when the input is focused
    default-color: #9E9E9E,                // color when the input is closed
    input-name: _sufix-input,              // sufix for input class name
    js: true,                              // if true classes needed for js
                                           // // interactions are added
    label-name: __sufix-label,             // sufix for label class name
    primary-text-color: rgba(0,0,0,.87),   // color of text on input an label
    secondary-text-color: rgba(0,0,0,.54), // color of text when label is closed
    valid-color: #4CAF50                   // color when the input is valid
  })
```
#### JavaScript:
```javascript
import potamus from 'potamus'

Array
  .from(document.querySelectorAll('.some-awesome-text-field-name_sufix-input'))
  .forEach(potamus.textField)
```

### Data Table
```html
<table class="some-awesome-table-name">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Height</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Stephen Curry</td>
      <td>27</td>
      <td>1,91</td>
      <td>Akron, OH</td>
    </tr>
    <tr>
      <td>Klay Thompson</td>
      <td>25</td>
      <td>2,01</td>
      <td>Los Angeles, CA</td>
    </tr>
  </tbody>
</table>
```
#### Stylus:
```stylus
.some-awesome-table-name
  table({
    responsive: true, // default false
    striped: true     // default false
  })
```
#### JavaScript:

This component doesn't need javascript.

## Contribute
- Fork it!
- Create a new branch for the new feature: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request with full remarks documenting your changes ;)

## License

[MIT License](https://github.com/thiamsantos/potamus/blob/master/LICENSE.md) &copy; [Thiago Santos](https://github.com/thiamsantos)
