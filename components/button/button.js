{
let btnsRipple = e => {
  let target = e.target;
  if(!target.classList.contains('c-btn')) return false;
  let rect = target.getBoundingClientRect();
  let ripple = target.querySelector('.ripple');
  if (!ripple) {
    ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) +
    'px';
    target.appendChild(ripple);
  }

  ripple.classList.remove('show');
  let top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
  let left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
  ripple.style.top = top + 'px';
  ripple.style.left = left + 'px';
  ripple.classList.add('show');
  return false;
};

document.addEventListener('click', btnsRipple, false);
}
