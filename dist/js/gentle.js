var btnsRipple = function (e) {
  var target = e.target;
  var btnClass = target.className.toLowerCase();
  if(btnClass !== 'btn' && btnClass !== 'btn-small' && btnClass !== 'btn-large' && btnClass !== 'btn-block') return false;
  var rect = target.getBoundingClientRect();
  var ripple = target.querySelector('.ripple');
  if (!ripple) {
    ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) +
    'px';
    target.appendChild(ripple);
  }
  ripple.classList.remove('show');
  var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
  var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
  ripple.style.top = top + 'px';
  ripple.style.left = left + 'px';
  ripple.classList.add('show');
  return false;
} 

document.addEventListener('click', btnsRipple, false);

var materialForm = function() {
  if (this.value) {
    this.classList.add('used');
  } else{
    this.classList.remove('used');
  };
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.form-group input[type=text], .form-group input[type=email], .form-group input[type=number], .form-group input[type=password], .form-group input[type=search], .form-group input[type=tel], .form-group input[type=url], .form-group textarea').addEventListener('blur', materialForm, false);
});

//# sourceMappingURL=gentle.js.map
