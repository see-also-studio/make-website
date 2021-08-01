const indexHeader = document.querySelector('.index-header');
const mainContent = document.querySelector('#main');
const headerLogo = document.querySelector('.header__logo');

if (indexHeader) {
  scrollHandler();
  window.addEventListener('scroll', scrollHandler);
}

function scrollHandler() {
  const headerVisible = mainContent.getBoundingClientRect().top > 0 ? true : false;

  indexHeader.classList.toggle('index-header--hidden', !headerVisible);
  headerLogo.classList.toggle('header__logo--active', !headerVisible);
}
