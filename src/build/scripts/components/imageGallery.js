const galleries = document.querySelectorAll('.gallery--full');

galleries.forEach(function(el) {
  new Swiper(el, {
    autoHeight: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".gallery__pagination",
      type: "fraction",
      formatFractionCurrent: function(number) {
        return number < 10 ? ('0' + number).slice(-2) : number;
      },
      formatFractionTotal: function(number) {
        return number < 10 ? ('0' + number).slice(-2) : number;
      },
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
               '<span class="gallery__pagination-seperator">/</span>'  +
               '<span class="' + totalClass + '"></span>';
      }
    },
    navigation: {
      nextEl: '.gallery__button--next',
      prevEl: '.gallery__button--prev',
    },
    keyboard: {
      enabled: true,
    },
  });
});
