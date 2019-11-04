export default function pageCursors() {
  let cursor1, cursor2, cursor3;
  cursor1 = document.getElementById('cursor');
  cursor2 = document.getElementById('cursor2');
  cursor3 = document.getElementById('cursor3');
  //Page cursors
  document
    .getElementsByTagName('body')[0]
    .addEventListener('mousemove', function(event) {
      cursor1.style.left = event.clientX + 'px';
      cursor1.style.top = event.clientY + 'px';
      cursor2.style.left = event.clientX + 'px';
      cursor2.style.top = event.clientY + 'px';
      cursor3.style.left = event.clientX + 'px';
      cursor3.style.top = event.clientY + 'px';
    });
}
