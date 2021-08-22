const header = document.querySelector('.header');
const indexHeader = document.querySelector('.index-header');
const mainContent = document.querySelector('#main');
const headerLogo = document.querySelector('.header__logo');
const headerWrapper = document.querySelector('.header__top');

if (indexHeader) {
  scrollHandler();
  window.addEventListener('scroll', scrollHandler);
}

function scrollHandler() {
  const headerVisible = mainContent.getBoundingClientRect().top >= 5 ? true : false;

  indexHeader.classList.toggle('index-header--hidden', !headerVisible);
  headerLogo.classList.toggle('header__logo--active', !headerVisible);
  headerWrapper.classList.toggle('header__top--transparent', headerVisible);
}

window.addEventListener('scroll', stickyMenu);
function stickyMenu() {
  const menuRaiseAmount = Math.max(0, window.innerHeight - mainContent.getBoundingClientRect().bottom + 1);
  header.style.setProperty('--menu-raise-amount', menuRaiseAmount + 'px');
}
