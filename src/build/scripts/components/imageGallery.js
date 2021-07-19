const galleries = document.querySelectorAll('.gallery--full');

galleries.forEach(function(el) {
  new Flickity(el, {
    cellSelector: '.gallery__item',
    adaptiveHeight: true,
    imagesLoaded: true,
    pageDots: false,
    arrowShape: '',
    fade: true,
  });
});
