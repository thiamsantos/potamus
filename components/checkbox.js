export const isFirefox = userAgent => userAgent.search('Firefox') > -1

export const toggleAttribute = (node, attr) => {
  if (node.hasAttribute(attr)) {
    node.removeAttribute(attr)
  } else {
    node.setAttribute(attr, '')
  }
}

export const isDisabled = node => {
  const hasDisabledAttribute =
    node.hasAttribute('disabled') && node.getAttribute('disabled') !== 'false'

  if (node.classList.contains('disabled')) {
    return true
  } else if (hasDisabledAttribute) {
    return true
  }
  return false
}

export const checkboxBehaviour = e => {
  const node = e.target

  if (!isDisabled(node)) {
    node.classList.toggle('checked')
    toggleAttribute(node.nextSibling, 'checked')
  }
}

function firefoxCompat(checkboxClass) {
  [].slice
    .call(document.querySelectorAll(`.${checkboxClass}`))
    .forEach(node => {
      node.style.display = 'none'
      const span = document.createElement('span')
      span.classList.add(checkboxClass)

      if (node.checked) {
        span.classList.add('checked')
      }
      if (node.disabled) {
        span.classList.add('disabled')
      }
      span.addEventListener('click', checkboxBehaviour)

      node.parentNode.insertBefore(span, node)
    })
}

export default function checkbox(checkboxClass) {
  if (isFirefox(navigator.userAgent)) {
    firefoxCompat(checkboxClass)
  }
}
