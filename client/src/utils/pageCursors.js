const pageCursors = () => {
  let cursor1 = document.getElementById('cursor');
  let cursor2 = document.getElementById('cursor2');
  let cursor3 = document.getElementById('cursor3');

  // Проверяем наличие всех необходимых элементов
  if (!cursor1 || !cursor2 || !cursor3) {
    return; // Если какой-то элемент отсутствует, прекращаем выполнение
  }

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
};

export default pageCursors;
