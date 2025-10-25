document.addEventListener('DOMContentLoaded', function() {
  const menuHamburguer = document.querySelector('.hamburger-menu');
  const mainNav = document.querySelector('.main-nav');
  const temSubmenu = document.querySelectorAll('.has-submenu');

  if (menuHamburguer) {
    menuHamburguer.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  temSubmenu.forEach(function(item) {
    const link = item.querySelector('a');
    link.addEventListener('click', function(event) {
      if (window.innerWidth <= 768 && item.classList.contains('has-submenu')) {
        event.preventDefault();
        item.classList.toggle('active');
      }
    });
  });

  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let isValid = true;

      const errorMessages = form.querySelectorAll('.error-message');
      errorMessages.forEach(error => error.remove());

      for (const field of this.elements) {
        validateField(field);
      }

      const newErrorMessages = form.querySelectorAll('.error-message');
      if (newErrorMessages.length === 0) {
        console.log('Formulário enviado com sucesso!');
      }
    });

    for (const field of form.elements) {
      if (field.willValidate) {
        field.addEventListener('input', function() {
          validateField(this);
        });
      }
    }
  });

  function validateField(field) {
    const existingError = field.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
      existingError.remove();
    }

    let fieldValid = field.checkValidity();
    let customValidationMessage = '';

    if (fieldValid) {
      switch (field.id) {
        case 'v-nome':
          if (!validaNome(field.value)) {
            fieldValid = false;
            customValidationMessage = 'O nome deve conter apenas letras e espaços.';
          }
          break;
        case 'v-email':
        case 'newsletter-email':
          if (field.value && !validaEmail(field.value)) {
            fieldValid = false;
            customValidationMessage = 'Formato válido seu.nome@exemplo.com';
          }
          break;
        case 'v-cpf':
          if (field.value && !validaCPF(field.value)) {
            fieldValid = false;
            customValidationMessage = 'O CPF deve estar no formato 000.000.000-00.';
          }
          break;
        case 'v-telefone':
          if (field.value && !validaTelefone(field.value)) {
            fieldValid = false;
            customValidationMessage = 'Insira um telefone válido (ex: (11) 98765-4321 ou (11) 8765-4321).';
          }
          break;
      }
    }

    if (!fieldValid) {
      showError(field, customValidationMessage || field.validationMessage);
    }
  }

  function showError(field, message) {
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;

    const existingError = field.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
      existingError.remove();
    }

    field.insertAdjacentElement('afterend', error);
  }

  function validaEmail(email) {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function validaCPF(cpf) {
    const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return re.test(cpf);
  }

  function validaTelefone(phone) {
    const re = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return re.test(phone);
  }

  function validaNome(name) {
    const re = /^[A-Za-zÀ-ÿ\s]+$/;
    return re.test(name);
  }
});