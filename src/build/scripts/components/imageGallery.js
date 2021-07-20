const galleries = document.querySelectorAll('.gallery--full');

galleries.forEach(function(el) {
  new Swiper(el, {
    autoHeight: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
    },
  });
});
