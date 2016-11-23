'use strict';

function createRipple(rect, rippleClass) {
  var ripple = document.createElement('span');
  ripple.classList.add(rippleClass);
  ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';

  return ripple;
}

function positionateRipple(ripple, top, left) {
  ripple.style.top = top + 'px';
  ripple.style.left = left + 'px';
  ripple.classList.add('show');
}

var getHalf = function getHalf(n) {
  return n / 2;
};

var button = (function (rippleClass) {
  return function (e) {
    var button = e.target;
    var buttonRect = button.getBoundingClientRect();
    var ripple = button.querySelector('.' + rippleClass);

    if (!ripple) {
      ripple = createRipple(buttonRect, rippleClass);
      button.appendChild(ripple);
    }

    ripple.classList.remove('show');
    var left = e.pageX - buttonRect.left - getHalf(ripple.offsetWidth) - document.body.scrollLeft;
    var top = e.pageY - buttonRect.top - getHalf(ripple.offsetHeight) - document.body.scrollTop;

    positionateRipple(ripple, top, left);

    return false;
  };
});

var isFirefox = function isFirefox(userAgent) {
  return userAgent.search('Firefox') > -1;
};

var toggleAttribute = function toggleAttribute(node, attr) {
  if (node.hasAttribute(attr)) {
    node.removeAttribute(attr);
  } else {
    node.setAttribute(attr, '');
  }
};

var isDisabled = function isDisabled(node) {
  var hasDisabledAttribute = node.hasAttribute('disabled') && node.getAttribute('disabled') !== 'false';

  if (node.classList.contains('disabled')) {
    return true;
  } else if (hasDisabledAttribute) {
    return true;
  }
  return false;
};

var checkboxBehaviour = function checkboxBehaviour(e) {
  var node = e.target;

  if (!isDisabled(node)) {
    node.classList.toggle('checked');
    toggleAttribute(node.nextSibling, 'checked');
  }
};

function firefoxCompat(checkboxClass) {
  [].slice.call(document.querySelectorAll('.' + checkboxClass)).forEach(function (node) {
    node.style.display = 'none';
    var span = document.createElement('span');
    span.classList.add(checkboxClass);

    if (node.checked) {
      span.classList.add('checked');
    }
    if (node.disabled) {
      span.classList.add('disabled');
    }
    span.addEventListener('click', checkboxBehaviour);

    node.parentNode.insertBefore(span, node);
  });
}

function checkbox(checkboxClass) {
  if (isFirefox(navigator.userAgent)) {
    firefoxCompat(checkboxClass);
  }
}

function textField(textFieldClass, labelSufix, inputSufix) {
  function validate(condition, classElement, className) {
    if (condition && !classElement.contains(className)) {
      classElement.add(className);
    } else if (!condition && classElement.contains(className)) {
      classElement.remove(className);
    }
  }

  function leavingInput() {
    if (this.value) {
      this.classList.add('used');
    } else {
      this.classList.remove('used');
    }

    this.parentNode.classList.remove('is-active');
    if (!this.value) {
      this.parentNode.querySelector('.' + textFieldClass + labelSufix).classList.add('is-closed');
    }
  }

  function focusingInput() {
    this.parentNode.classList.add('is-active');
    this.parentNode.querySelector('.' + textFieldClass + labelSufix).classList.remove('is-closed');
  }

  function typingInput() {
    var groupClass = this.parentNode.classList;
    var labelClass = this.parentNode.querySelector('.' + textFieldClass + labelSufix).classList;
    var valid = this.checkValidity();
    var validClass = 'is-valid';

    validate(valid, groupClass, validClass);
    validate(valid, labelClass, validClass);
  }

  function eventHandler(input) {
    input.parentNode.querySelector('.' + textFieldClass + labelSufix).classList.add('is-closed');

    input.addEventListener('blur', leavingInput, true);
    input.addEventListener('focus', focusingInput);
    input.addEventListener('input', typingInput);
  }

  [].slice.call(document.querySelectorAll('.' + textFieldClass + inputSufix)).forEach(eventHandler);
}

var potamus = function potamus(opts) {
  return function (style) {
    style.import('./components/*.styl');
  };
};

potamus.button = button;
potamus.checkbox = checkbox;
potamus.textField = textField;

module.exports = potamus;
