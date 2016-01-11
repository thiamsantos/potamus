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
