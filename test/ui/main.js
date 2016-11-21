import button from '../../components/button'
import checkbox from '../../components/checkbox'
import textField from '../../components/text-field'

Array.from(document.querySelectorAll('.button'))
  .forEach(node => {
    node.addEventListener('click', button('ripple'))
  })
checkbox('checkbox')
textField('text-field', '-label', '-input')
