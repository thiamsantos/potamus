/**
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

export const leavingInput = (textFieldClass, labelSufix) => e => {
  const target = e.target
  if (target.value) {
    target.classList.add('used')
  } else {
    target.classList.remove('used')
  }

  target.parentNode.classList.remove('is-active')
  if (!target.value) {
    target.parentNode.querySelector(`.${textFieldClass}${labelSufix}`)
      .classList.add('is-closed')
  }
}

export const focusingInput = (textFieldClass, labelSufix) => e => {
  const target = e.target
  target.parentNode.classList.add('is-active')
  target.parentNode.querySelector(`.${textFieldClass}${labelSufix}`)
    .classList.remove('is-closed')
}

export const typingInput = (textFieldClass, labelSufix) => e => {
  const target = e.target
  const group = target.parentNode
  const label = target.parentNode
          .querySelector(`.${textFieldClass}${labelSufix}`)
  const validClass = 'is-valid'
  const toggleValidClass = validate(target)

  toggleValidClass(group, validClass)
  toggleValidClass(label, validClass)
}

const eventHandler = (textFieldClass, labelSufix) => node => {
  node.parentNode.classList.add('is-closed')

  node.addEventListener('blur', leavingInput(textFieldClass, labelSufix), true)
  node.addEventListener('focus', focusingInput(textFieldClass, labelSufix))
  node.addEventListener('input', typingInput(textFieldClass, labelSufix))
}

export default function textField(textFieldClass, labelSufix, inputSufix) {
  [].slice
    .call(document.querySelectorAll(`.${textFieldClass}${inputSufix}`))
    .forEach(eventHandler(textFieldClass, labelSufix))
}
