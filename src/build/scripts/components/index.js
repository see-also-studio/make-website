const header = document.querySelector('.header');
const indexHeader = document.querySelector('.index-header');
const mainContent = document.querySelector('#main');

if (indexHeader) {
  scrollHandler();
  window.addEventListener('scroll', scrollHandler);
}

function scrollHandler() {
  const headerVisible = mainContent.getBoundingClientRect().top >= 5 ? true : false;
  header.classList.toggle('header--transparent', headerVisible);
  indexHeader.classList.toggle('index-header--hidden', !headerVisible);
}

window.addEventListener('scroll', stickyMenu);
function stickyMenu() {
  const menuRaiseAmount = Math.max(0, window.innerHeight - mainContent.getBoundingClientRect().bottom + 1);
  header.style.setProperty('--menu-raise-amount', menuRaiseAmount + 'px');
}
