document.querySelectorAll('.c-form-group__input')
  .forEach(input => {

    input.addEventListener('blur', function() {

      this.value ? this.classList.add('used') : this.classList.remove('used');
      this.parentNode.classList.remove('is-active');
      if(!this.value) this.parentNode.querySelector('.c-form-group__label').classList.remove('is-active');
    }, true);

    input.addEventListener('focus', function() {

      this.parentNode.classList.add('is-active');
      this.parentNode.querySelector('.c-form-group__label').classList.add('is-active');
    });

    input.addEventListener('input', function() {

      function validate(condition, classElement, className) {
        if (condition) {
          if (!classElement.contains(className)) classElement.add(className);
        } else {
          if (classElement.contains(className)) classElement.remove(className);
        }
      }

      let groupClass = this.parentNode.classList;
      let labelClass = this.parentNode.querySelector('.c-form-group__label').classList;
      let validClass = 'is-valid';
      let valid = this.checkValidity();

      validate(valid, groupClass, validClass);
      validate(valid, labelClass, validClass);
    });
  });
