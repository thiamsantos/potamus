'use strict';

/**
 * Create a ripple.
 * @param {object} rect - the size of an element and its position relative to
 * the viewport.
 * @param {string} rippleClass - class name of the ripple ot be created.
 * @return {number} a DOM node.
 */
var createRipple = function createRipple(rect, rippleClass) {
  var ripple = document.createElement('span');
  ripple.classList.add(rippleClass);
  ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';

  return ripple;
};

/**
 * Positionate a ripple.
 * @param {object} ripple - DOM node.
 * @param {string|number} top - top position of the node.
 * @param {string|number} left - left position of the node.
 * @example
 * const node = document.getElementById('id')
 * positionateRipple(node, 100, 200)
 */
var positionateRipple = function positionateRipple(ripple, top, left) {
  ripple.style.top = top + 'px';
  ripple.style.left = left + 'px';
  ripple.classList.add('show');
};

/**
 * Get half of a number.
 * @param {number} n - a number.
 * @return {number} half of the n.
 */
var getHalf = function getHalf(n) {
  return n / 2;
};

/**
 * Main function of button component that adds the ripple effect.
 * @param {string} rippleClass - class name of the ripple.
 * @param {object} e - DOM event.
 */
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
 * Check if browser is firefox.
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

/**
 * Check validity of a text-field.
 * Given a class, add this class to nodeToChange if nodeToValidate is valid,
 * otherwise remove a this class from nodeTo Validate.
 * @param {object} nodeToValidate - DOM node.
 * @param {object} nodeToChange - DOM node.
 * @param {string} validClassName - class name of valid nodes.
 */
var validate = function validate(nodeToValidate) {
  return function (nodeToChange, validClassName) {
    var isValid = nodeToValidate.checkValidity();

    if (isValid) {
      nodeToChange.classList.add(validClassName);
    } else {
      nodeToChange.classList.remove(validClassName);
    }
  };
};

/**
 * On blur function for text-field.
 * Remove class is-active of parent node and if value is not empty add class
 * is-closed
 * @param {object} e - DOM event.
 * @example
 * const node = document.getElementById('id')
 * node.addEventListener('blur', leavingInput, true)
 */
var leavingInput = function leavingInput(e) {
  var target = e.target;
  target.parentNode.classList.remove('is-active');

  if (!target.value) {
    target.parentNode.classList.add('is-closed');
  }
};

/**
 * On click function for text-field.
 * Remove class is-closed and add is-active.
 * @param {object} e - DOM event.
 * @example
 * const node = document.getElementById('id')
 * node.addEventListener('click', focusingInput)
 */
var focusingInput = function focusingInput(e) {
  var target = e.target;
  target.parentNode.classList.add('is-active');
  target.parentNode.classList.remove('is-closed');
};

/**
 * On input function for text-field.
 * If input is valid add class is-valid to the parent node.
 * @param {object} e - DOM event.
 * @example
 * const node = document.getElementById('id')
 * node.addEventListener('input', typingInput)
 */
var typingInput = function typingInput(e) {
  var target = e.target;
  var toggleValidClass = validate(target);

  toggleValidClass(target.parentNode, 'is-valid');
};

/**
 * Main function.
 * Add class is-closed do the parent node and attach the events.
 * @param {object} node - DOM node.
 * @example
 * const node = document.getElementById('id')
 * textField(node)
 */
var textField = (function (node) {
  node.parentNode.classList.add('is-closed');

  node.addEventListener('blur', leavingInput, true);
  node.addEventListener('focus', focusingInput);
  node.addEventListener('input', typingInput);
});

var potamus = function potamus(opts) {
  return function (style) {
    style.import('./components/*.styl');
  };
};

potamus.button = button;
potamus.checkbox = checkbox;
potamus.textField = textField;

module.exports = potamus;
