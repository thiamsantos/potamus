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

/**
 * @param {string} userAgent - userAgent of the browser.
 * @return {boolean} if userAgent contains Firefox return true.
 * @example
 * isFirefox(navigator.userAgent)
 */
var isFirefox = function isFirefox(userAgent) {
  return userAgent.search('Firefox') > -1;
};

/**
 * Toggle a attribute from a DOM node.
 * @param {Object} node - DOM node.
 * @param {attr} attr - attribute to be toggled.
 * @example
 * const node = document.getElementById('id')
 * toggleAttribute(node, 'checked')
 */
var toggleAttribute = function toggleAttribute(node, attr) {
  if (node.hasAttribute(attr)) {
    node.removeAttribute(attr);
  } else {
    node.setAttribute(attr, '');
  }
};

/**
 * Checks if a DOM node is disabled.
 * @param {Object} node - DOM node.
 * @return {boolean} if disabled return true otherwise return false.
 * @example
 * const node = document.getElementById('id')
 * isDisabled(node)
 */
var isDisabled = function isDisabled(node) {
  var hasDisabledAttribute = node.hasAttribute('disabled') && node.getAttribute('disabled') !== 'false';

  if (node.classList.contains('disabled')) {
    return true;
  } else if (hasDisabledAttribute) {
    return true;
  }
  return false;
};

/**
 * Simulate the default click behaviour of a standard checkbox.
 * @param {object} e - DOM event.
 * const node = document.getElementById('id')
 * node.addEventListener('click', checkboxBehaviour)
 */
var checkboxBehaviour = function checkboxBehaviour(e) {
  var node = e.target;

  if (!isDisabled(node)) {
    node.classList.toggle('checked');
    toggleAttribute(node.nextSibling, 'checked');
  }
};

/**
 * Hide a node by setting the display to none.
 * @param {object} node - DOM node.
 * @example
 * const node = document.getElementById('id')
 * hide(node)
 */
var hide = function hide(node) {
  node.style.display = 'none';
};

/**
 * Create a DOM node that shadow a standard checkbox.
 * @param {string} className - class name of the checkbox.
 * @param {boolean} checked - checked state of the checkbox.
 * @param {boolean} disabled - disabled state of the checkbox.
 * @return {object} DOM node that shadow a standard chckbox.
 * @example
 * createCheckbox('checkbox', false, true)
 */
var createCheckbox = function createCheckbox(className, checked, disabled) {
  var checkbox = document.createElement('span');
  checkbox.classList.add(className);

  if (checked) {
    checkbox.classList.add('checked');
  }

  if (disabled) {
    checkbox.classList.add('disabled');
  }
  return checkbox;
};

/**
 * Deactivate the checkboxes and add a DOM that simulate their behaviour.
 * @param {string} checkboxClass - class name of the checkboxes.
 * @example
 * firefoxCompat('checkbox')
 */
var firefoxCompat = function firefoxCompat(checkboxClass) {
  [].slice.call(document.querySelectorAll('.' + checkboxClass)).forEach(function (node) {
    hide(node);
    var checkbox = createCheckbox(checkboxClass, node.checked, node.disabled);

    checkbox.addEventListener('click', checkboxBehaviour);
    node.parentNode.insertBefore(checkbox, node);
  });
};

/**
 * Check if browser is firefox, if true add compatible checkboxes to the
 * document.
 * @param {string} userAgent - user agent of the browser.
 * @param {string} checkboxClass - class name of the checkboxes.
 * @example
 * checkbox(navigator.userAgent, 'checkbox')
 */
var checkbox = function checkbox(userAgent, checkboxClass) {
  if (isFirefox(userAgent)) {
    firefoxCompat(checkboxClass);
  }
};

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
