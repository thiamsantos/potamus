export default function button(buttonClass, rippleClass) {
  function createRipple(rect) {
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

  function btnsRipple(e) {
    if (!e.target.classList.contains(buttonClass)) {
      return false
    }

    const btn = e.target
    const rect = btn.getBoundingClientRect()
    let ripple = btn.querySelector(`.${rippleClass}`)

    if (!ripple) {
      ripple = createRipple(rect)
      btn.appendChild(ripple)
    }

    ripple.classList.remove('show')

    const left =
      e.pageX -
      rect.left -
      getHalf(ripple.offsetWidth) -
      document.body.scrollLeft
    const top =
      e.pageY -
      rect.top -
      getHalf(ripple.offsetHeight) -
      document.body.scrollTop

    positionateRipple(ripple, top, left)

    return false
  }

  document.addEventListener('click', btnsRipple, false)
}
