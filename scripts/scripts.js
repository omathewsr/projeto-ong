document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mainNav = document.querySelector('.main-nav');
  const hasSubmenu = document.querySelectorAll('.has-submenu');

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  hasSubmenu.forEach(function(item) {
    const link = item.querySelector('a');
    link.addEventListener('click', function(event) {
      if (window.innerWidth <= 768 && item.classList.contains('has-submenu')) {
        event.preventDefault();
        item.classList.toggle('active');
      }
    });
  });
});