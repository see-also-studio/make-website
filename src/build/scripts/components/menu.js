/**
 * Slide in menu
 *
 */

 class Menu {
  constructor(el) {
    this.el = el;
    this.el.open = false;
    this.button = el.querySelector('.menu__button');
    this.nav = el.querySelector('.menu__nav');

    this.animation = null;
    this.isClosing = false;
    this.isOpening = false;
    this.button.addEventListener('click', (e) => this.onClick(e));

    this.links = el.querySelectorAll('.menu__nav a');
    this.links.forEach(link => link.addEventListener('click', () => this.close()));
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isOpening || this.el.open) {
      this.close();
    }
  }

  close() {
    this.isClosing = true;

    const startHeight = this.el.offsetHeight + 'px';
    const endHeight = this.button.offsetHeight + 'px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate({
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    this.el.style.height = this.el.offsetHeight + 'px';
    this.el.open = true;
    this.nav.classList.remove('menu__nav--hidden');
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isOpening = true;
    const startHeight = this.el.offsetHeight + 'px';
    const endHeight = this.button.offsetHeight + this.nav.offsetHeight + 'px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate({
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isOpening = false;
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isOpening = false;
    this.nav.classList.toggle('menu__nav--hidden', !open);
    this.el.style.height = this.el.style.overflow = '';
  }
}

let menu = new Menu(document.querySelector('.menu'));
