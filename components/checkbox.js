/**
 * Check if browser is firefox.
 * @param {string} userAgent - userAgent of the browser.
 * @return {boolean} if userAgent contains Firefox return true.
 * @example
 * isFirefox(navigator.userAgent)
 */
export const isFirefox = userAgent => userAgent.search('Firefox') > -1

/**
 * Toggle a attribute from a DOM node.
 * @param {Object} node - DOM node.
 * @param {attr} attr - attribute to be toggled.
 * @example
 * const node = document.getElementById('id')
 * toggleAttribute(node, 'checked')
 */
export const toggleAttribute = (node, attr) => {
  if (node.hasAttribute(attr)) {
    node.removeAttribute(attr)
  } else {
    node.setAttribute(attr, '')
  }
}

/**
 * Checks if a DOM node is disabled.
 * @param {Object} node - DOM node.
 * @return {boolean} if disabled return true otherwise return false.
 * @example
 * const node = document.getElementById('id')
 * isDisabled(node)
 */
export const isDisabled = node => {
  const hasDisabledAttribute =
    node.hasAttribute('disabled') && node.getAttribute('disabled') !== 'false'

  if (node.classList.contains('is-disabled')) {
    return true
  } else if (hasDisabledAttribute) {
    return true
  }
  return false
}

/**
 * Simulate the default click behaviour of a standard checkbox.
 * @param {object} e - DOM event.
 * const node = document.getElementById('id')
 * node.addEventListener('click', checkboxBehaviour)
 */
export const checkboxBehaviour = e => {
  const node = e.target

  if (!isDisabled(node)) {
    node.classList.toggle('is-checked')
    toggleAttribute(node.nextSibling, 'checked')
  }
}

/**
 * Hide a node by setting the display to none.
 * @param {object} node - DOM node.
 * @example
 * const node = document.getElementById('id')
 * hide(node)
 */
export const hide = node => {
  node.style.display = 'none'
}

/**
 * Create a DOM node that shadow a standard checkbox.
 * @param {string} className - class name of the checkbox.
 * @param {boolean} checked - checked state of the checkbox.
 * @param {boolean} disabled - disabled state of the checkbox.
 * @return {object} DOM node that shadow a standard chckbox.
 * @example
 * createCheckbox('checkbox', false, true)
 */
export const createCheckbox = (className, checked, disabled) => {
  const checkbox = document.createElement('span')
  checkbox.classList.add(className)

  if (checked) {
    checkbox.classList.add('is-checked')
  }

  if (disabled) {
    checkbox.classList.add('is-disabled')
  }
  return checkbox
}

/**
 * Deactivate the checkboxes and add a DOM that simulate their behaviour.
 * @param {string} checkboxClass - class name of the checkboxes.
 * @example
 * firefoxCompat('checkbox')
 */
export const firefoxCompat = checkboxClass => {
  [].slice
    .call(document.querySelectorAll(`.${checkboxClass}`))
    .forEach(node => {
      hide(node)
      const checkbox =
        createCheckbox(checkboxClass, node.checked, node.disabled)

      checkbox.addEventListener('click', checkboxBehaviour)
      node.parentNode.insertBefore(checkbox, node)
    })
}

/**
 * Check if browser is firefox, if true add compatible checkboxes to the
 * document.
 * @param {string} userAgent - user agent of the browser.
 * @param {string} checkboxClass - class name of the checkboxes.
 * @example
 * checkbox(navigator.userAgent, 'checkbox')
 */
const checkbox = (userAgent, checkboxClass) => {
  if (isFirefox(userAgent)) {
    firefoxCompat(checkboxClass)
  }
}

export default checkbox
