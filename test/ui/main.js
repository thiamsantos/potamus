import potamus from '../../index.esnext'

Array.from(document.querySelectorAll('.button'))
  .forEach(node => {
    node.addEventListener('click', potamus.button('ripple'))
  })
potamus.checkbox('checkbox')
potamus.textField('text-field', '-label', '-input')
