interact('.index-header__icon')
.on('down', function(event) {
  event.preventDefault();
  let target = event.currentTarget;
  target.parentNode.appendChild(target);
})
.draggable({
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: '.index-header',
    }),
  ],
  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,
  },
});

function dragMoveListener(event) {
  const target = event.target;
  const position = {
    x: (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y: (parseFloat(target.getAttribute('data-y')) || 0) + event.dy,
  };

  target.style.transform = 'translate(' + position.x + 'px, ' + position.y + 'px)';
  target.setAttribute('data-x', position.x);
  target.setAttribute('data-y', position.y);
}
