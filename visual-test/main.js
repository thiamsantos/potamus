import potamus from '../index.esnext'

Array.from(document.querySelectorAll('.button'))
  .forEach(node => {
    node.addEventListener('click', potamus.button('ripple'))
  })

Array.from(document.querySelectorAll('.text-field-input'))
  .forEach(potamus.textField)

potamus.checkbox(navigator.userAgent, 'switch')
potamus.checkbox(navigator.userAgent, 'checkbox')
