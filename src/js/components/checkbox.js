function checkboxBehavior() {
  if (!this.classList.contains('disabled')) {
    const checkboxNode = this.parentNode.querySelector('[type=checkbox]')

    this.classList.toggle('checked')

    if (checkboxNode.hasAttribute('checked')) {
      checkboxNode.removeAttribute('checked')
    } else {
      checkboxNode.setAttribute('checked', '')
    }
  }
}

function firefoxCompat(checkboxClass) {
  [].slice
    .call(document.querySelectorAll(`.${checkboxClass}`))
    .forEach(node => {
      node.style.display = 'none'
      const span = document.createElement('span')
      span.classList.add(checkboxClass.toString())

      if (node.checked) {
        span.classList.add('checked')
      }
      if (node.disabled) {
        span.classList.add('disabled')
      }
      span.addEventListener('click', checkboxBehavior)

      node.parentNode.insertBefore(span, node)
    })
}

export default function checkbox(checkboxClass) {
  if (navigator.userAgent.search('Firefox') > -1) {
    firefoxCompat(checkboxClass)
  }
}
