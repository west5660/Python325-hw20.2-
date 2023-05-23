
const anim = document.getElementsByClassName('anim');                                  // Получаем коллекцию элементов с классом 'anim'

const food = document.getElementsByClassName('food');                                  // Получаем коллекцию элементов с классом 'food'


const rd = Array.from({ length: food.length }, () => ({                          // Создаем массив объектов координат для каждого элемента food
  px0: 0,                                                                              // начальная позиция  оси X
  py0: 0,                                                                              // начальная позиция  оси Y
  px: 0,                                                                              // текущая позиция  оси X
  py: 0,                                                                              // текущая позиция  оси Y
  ofx: 0,                                                                             // смещение  оси X относительно элемента
  ofy: 0,                                                                             // смещение  оси Y относительно элемента
}));


const foodid = [1, 2, 0];                                                            // Массив идентификаторов элементов food, которые будут скрываться при соприкосновении с anim


for (let i = 0; i < food.length; i++) {                                              // Проходим по каждому элементу food и добавляем необходимые обработчики событий
  const item = food[i];
  item.draggable = true;                                                            // Устанавливаем элемент как "перетаскиваемый"
  item.ondragstart = start;                                                           // Обработчик события начала перетаскивания
  item.ondragend = end;                                                             // Обработчик события окончания перетаскивания


  function start(event) {                                                           // Обработчик события начала перетаскивания
    const id = Number(this.id); // Получаем идентификатор элемента food
    rd[id].px = event.pageX; // Запоминаем текущую позицию по оси X
    rd[id].py = event.pageY; // Запоминаем текущую позицию по оси Y
    rd[id].ofx = event.offsetX; // Запоминаем смещение по оси X относительно элемента
    rd[id].ofy = event.offsetY; // Запоминаем смещение по оси Y относительно элемента
  }

  // Обработчик события окончания перетаскивания
  function end(event) {
    const id = Number(this.id); // Получаем идентификатор элемента food
    const x = event.pageX; // Получаем текущую позицию по оси X
    const y = event.pageY; // Получаем текущую позицию по оси Y

    // Устанавливаем новое положение элемента food на основе перемещения курсора
    this.style.left = `${x - rd[id].px + rd[id].px0}px`; // Новая позиция по оси X
    this.style.top = `${y - rd[id].py + rd[id].py0}px`; // Новая позиция по оси Y

    // Обновляем значения начальной позиции элемента food
    rd[id].px0 += x - rd[id].px; // Обновляем начальную позицию по оси X
    rd[id].py0 += y - rd[id].py; // Обновляем начальную позицию по оси Y

    // Обновляем текущую позицию элемента food
    rd[id].px = x; // Обновляем текущую позицию по оси X
    rd[id].py = y; // Обновляем текущую позицию по оси Y

    // Проверяем, было ли соприкосновение с элементом anim
    checkForEaten(id);
  }
}

// Функция для проверки соприкосновения элемента food с элементом anim
function checkForEaten(id) {
  // Получаем координаты центра элемента anim
  const animCenterX = anim[id].offsetLeft + 75; // X-координата центра элемента anim
  const animCenterY = anim[id].offsetTop + 75; // Y-координата центра элемента anim

  // Получаем координаты центра элемента food
  const foodCenterX = rd[id].px - rd[id].ofx + 75; // X-координата центра элемента food
  const foodCenterY = rd[id].py - rd[id].ofy + 75; // Y-координата центра элемента food

  // Вычисляем расстояние между центрами окружностей с использованием теоремы Пифагора
  const centersDistance = Math.hypot(
    foodCenterX - animCenterX, // Разница по оси X между центрами
    foodCenterY - animCenterY // Разница по оси Y между центрами
  );

  // Если расстояние между центрами меньше 150 (радиуса), скрываем элемент food
  if (centersDistance < 150) {
    food[foodid[id]].setAttribute('hidden', 'true'); // Скрываем элемент food
  }
}








