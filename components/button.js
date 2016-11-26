/**
 * Create a ripple.
 * @param {object} rect - the size of an element and its position relative to
 * the viewport.
 * @param {string} rippleClass - class name of the ripple ot be created.
 * @return {number} a DOM node.
 */
export const createRipple = (rect, rippleClass) => {
  const ripple = document.createElement('span')
  ripple.classList.add(rippleClass)
  ripple.style.height =
    ripple.style.width =
    `${Math.max(rect.width, rect.height)}px`

  return ripple
}

/**
 * Positionate a ripple.
 * @param {object} ripple - DOM node.
 * @param {string|number} top - top position of the node.
 * @param {string|number} left - left position of the node.
 * @example
 * const node = document.getElementById('id')
 * positionateRipple(node, 100, 200)
 */
export const positionateRipple = (ripple, top, left) => {
  ripple.style.top = `${top}px`
  ripple.style.left = `${left}px`
  ripple.classList.add('is-active')
}

/**
 * Get half of a number.
 * @param {number} n - a number.
 * @return {number} half of the n.
 */
export const getHalf = n => n / 2

/**
 * Main function of button component that adds the ripple effect.
 * @param {string} rippleClass - class name of the ripple.
 * @param {object} e - DOM event.
 */
export default rippleClass => e => {
  const button = e.target
  const buttonRect = button.getBoundingClientRect()
  let ripple = button.querySelector(`.${rippleClass}`)

  if (!ripple) {
    ripple = createRipple(buttonRect, rippleClass)
    button.appendChild(ripple)
  }

  ripple.classList.remove('is-active')
  const left =
    e.pageX -
    buttonRect.left -
    getHalf(ripple.offsetWidth) -
    document.body.scrollLeft
  const top =
    e.pageY -
    buttonRect.top -
    getHalf(ripple.offsetHeight) -
    document.body.scrollTop

  positionateRipple(ripple, top, left)

  return false
}
