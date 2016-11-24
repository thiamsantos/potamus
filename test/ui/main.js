import potamus from '../../index.esnext'

Array.from(document.querySelectorAll('.button'))
  .forEach(node => {
    node.addEventListener('click', potamus.button('ripple'))
  })
potamus.checkbox(navigator.userAgent, 'checkbox')
potamus.textField('text-field', '-label', '-input')
