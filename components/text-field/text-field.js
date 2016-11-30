/**
 * Check validity of a text-field.
 * Given a class, add this class to nodeToChange if nodeToValidate is valid,
 * otherwise remove a this class from nodeTo Validate.
 * @param {object} nodeToValidate - DOM node.
 * @param {object} nodeToChange - DOM node.
 * @param {string} validClassName - class name of valid nodes.
 */
export const validate = nodeToValidate => (nodeToChange, validClassName) => {
  const isValid = nodeToValidate.checkValidity()

  if (isValid) {
    nodeToChange.classList.add(validClassName)
  } else {
    nodeToChange.classList.remove(validClassName)
  }
}

/**
 * On blur function for text-field.
 * Remove class is-active of parent node and if value is not empty add class
 * is-closed
 * @param {object} e - DOM event.
 * @example
 * const node = document.getElementById('id')
 * node.addEventListener('blur', leavingInput, true)
 */
export const leavingInput = e => {
  const target = e.target
  target.parentNode.classList.remove('is-active')

  if (!target.value && !target.placeholder) {
    target.parentNode.classList.add('is-closed')
  }
}

/**
 * On click function for text-field.
 * Remove class is-closed and add is-active.
 * @param {object} e - DOM event.
 * @example
 * const node = document.getElementById('id')
 * node.addEventListener('click', focusingInput)
 */
export const focusingInput = e => {
  const target = e.target
  target.parentNode.classList.add('is-active')
  target.parentNode.classList.remove('is-closed')
}

/**
 * On input function for text-field.
 * If input is valid add class is-valid to the parent node.
 * @param {object} e - DOM event.
 * @example
 * const node = document.getElementById('id')
 * node.addEventListener('input', typingInput)
 */
export const typingInput = e => {
  const target = e.target
  const toggleValidClass = validate(target)

  toggleValidClass(target.parentNode, 'is-valid')
}

/**
 * Main function.
 * Add class is-closed do the parent node and attach the events.
 * @param {object} node - DOM node.
 * @example
 * const node = document.getElementById('id')
 * textField(node)
 */
export default node => {
  if (!node.placeholder) {
    node.parentNode.classList.add('is-closed')
  }

  node.addEventListener('blur', leavingInput, true)
  node.addEventListener('focus', focusingInput)
  node.addEventListener('input', typingInput)
}
