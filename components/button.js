function createRipple(rect, rippleClass) {
  const ripple = document.createElement('span')
  ripple.classList.add(rippleClass)
  ripple.style.height =
    ripple.style.width =
    `${Math.max(rect.width, rect.height)}px`

  return ripple
}

function positionateRipple(ripple, top, left) {
  ripple.style.top = `${top}px`
  ripple.style.left = `${left}px`
  ripple.classList.add('show')
}

const getHalf = n => n / 2

export default rippleClass => e => {
  const button = e.target
  const buttonRect = button.getBoundingClientRect()
  let ripple = button.querySelector(`.${rippleClass}`)

  if (!ripple) {
    ripple = createRipple(buttonRect, rippleClass)
    button.appendChild(ripple)
  }

  ripple.classList.remove('show')
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
