'use strict';

(function () {

  function validate(condition, classElement, className) {

    if (condition && !classElement.contains(className)) classElement.add(className);

    if (!condition && classElement.contains(className)) classElement.remove(className);
  }

  function leavingInput() {

    this.value ? this.classList.add('used') : this.classList.remove('used');
    this.parentNode.classList.remove('is-active');

    if (!this.value) this.parentNode.querySelector('.c-form-group__label').classList.add('is-closed');
  }

  function focusingInput() {

    this.parentNode.classList.add('is-active');
    this.parentNode.querySelector('.c-form-group__label').classList.remove('is-closed');
  }

  function typingInput() {

    var groupClass = this.parentNode.classList,
        labelClass = this.parentNode.querySelector('.c-form-group__label').classList,
        valid = this.checkValidity(),
        validClass = 'is-valid';

    validate(valid, groupClass, validClass);
    validate(valid, labelClass, validClass);
  }

  function eventHandler(input) {

    input.parentNode.querySelector('.c-form-group__label').classList.add('is-closed');

    input.addEventListener('blur', leavingInput, true);
    input.addEventListener('focus', focusingInput);
    input.addEventListener('input', typingInput);
  }

  document.querySelectorAll('.c-form-group__input').forEach(eventHandler);
})();