import button from './components/button/button'
import checkbox from './components/checkbox/checkbox'
import textField from './components/text-field/text-field'

const potamus = opts => style => {
  style.import('./components/*/*.styl')
}

potamus.button = button
potamus.checkbox = checkbox
potamus.textField = textField

export default potamus
