// Переключатель ночного режима
const switcher = document.querySelector('#cbx'),
// Загрузить еще
    more = document.querySelector('.more'),
// Модальное окно с видео выбранным
    modal = document.querySelector('.modal'),
// Видео карточки
    videos = document.querySelectorAll('.videos__item');

let player;

// Выпадающее меню бургер (выезжает постепенно вниз и вверх по клику)
function bindSlideToggle(trigger, boxBody, content, openClass) {
    // Объект кнопка не активна
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };
    // внешний контейнер, изначально скрыт
    const box = document.querySelector(boxBody),
    // внутренний контейнер с определенной высотой
        boxContent = document.querySelector(content);
    
    // Функция обратного вызова (callback)
    button.element.addEventListener('click', () => {
        // Проверка открытия меню
        if (button.active === false) {
            button.active = true;
            // высоту и прозрачность меню, установленные в 0, плавно повышаем
            box.style.height = boxContent.clientHeight + 'px'; //clientHeight -высота, расчитанная js
            // Добавим класс видимости (переменная)
            box.classList.add(openClass);
        } else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
    });
}

bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

// Переключение ночного режима
function switchMode() {
    // проверка состояния
    if (night === false) {
        night = true;
        // document.body.style.backgroundColor = '#000';
        document.body.classList.add('night'); // уже написан класс заранее
        document.querySelectorAll('.hamburger > line').forEach(item => { // item - случайный аргумент (можно назвать как хотим)
            item.style.stroke = '#fff'; //stroke - параметр
        }); // значок гамбургера красим в другой цвет
        
        document.querySelectorAll('.videos__item-descr').forEach(item => { // item - случайный аргумент (можно назвать как хотим)
            item.style.color = '#fff';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => { // item - случайный аргумент (можно назвать как хотим)
            item.style.color = '#fff';
        });

        document.querySelector('.header__item-descr').style.color = '#fff';

        document.querySelector('.logo > img').src = 'logo/youtube_night.svg';
    } else {
        night = false;
        document.body.classList.remove('night'); // уже написан класс заранее
        document.querySelectorAll('.hamburger > line').forEach(item => { // item - случайный аргумент (можно назвать как хотим)
            item.style.stroke = '#000';
        }); // значок гамбургера красим в другой цвет
                
        document.querySelectorAll('.videos__item-descr').forEach(item => { // item - случайный аргумент (можно назвать как хотим)
            item.style.color = '#000';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => { // item - случайный аргумент (можно назвать как хотим)
            item.style.color = '#000';
        });

        document.querySelector('.header__item-descr').style.color = '#000';

        document.querySelector('.logo > img').src = 'logo/youtube.svg';
    }
}

let night = false; // ночной режим выключен изначально
switcher.addEventListener('change', () => {
    switchMode();
});

// Загрузка новых видео
// скопированный код
// const data = [
//     ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
//     ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
//         '#2 Установка spikmi и работа с ветками на GitHub | Марафон верстки  Урок 2',
//         '#1 Верстка реального заказа landing Page | Марафон верстки | Артём Исламов'],
//     ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
//     ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
// ];

// more.addEventListener('click', () => {
//     const videosWrapper = document.querySelector('.videos__wrapper');
//     more.remove(); //удаление кнопки

//     //перебор массива data
//     for (let i = 0; i < data[0].length; i++) { //т.к. по 3 элемента везде
//         let card = document.createElement('a'); //создаем ссылку (тег а)
//         card.classList.add('videos__item', 'videos__item-active'); //появление и удаление второго класса добавляет эффекты
//         card.setAttribute('data-url', data[3][i]);
//         card.innerHTML = `
//             <img src="${data[0][i]}" alt="thumb">
//             <div class="videos__item-descr">
//                 ${data[1][i]}
//             </div>
//             <div class="videos__item-views">
//                 ${data[2][i]}
//             </div>
//         `;

//         //помещаем ссылку в конец другого элемента
//         videosWrapper.appendChild(card);
//         // устанавливаем 10 милисек задержки до исчезновения класса после его появления
//         setTimeout(() => {
//             card.classList.remove('videos__item-active');
//         }, 10);

//         // проверка ночного режима
//         if (night === true) {
//             card.querySelector('.videos__item-descr').style.color = '#fff';
//             card.querySelector('.videos__item-views').style.color = '#fff';
//         };
//         // модальные окна по нажатию - день 2
//         bindNewModal(card);
//     };
//     // обрезаем названия - функция дальше из второго дня
//     sliceTitle('.videos__item-descr', 100);
// });

//День 3
const videosWrapper = document.querySelector('.videos__wrapper');

function start() {
    gapi.client.init({
        'apiKey': 'AIzaSyBcmBUbqOlRWVFaIbyeFYytXD9Z5ZdCvc0',
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then(function() {
        return gapi.client.youtube.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": '6',
            "playlistId": "PL3LQJkGQtzc4gsrFkm4MjWhTXhopsMgpv"
        })
    }).then(function(response) {
        console.log(response.result);        

        response.result.items.forEach(item => {
            let card = document.createElement('a'); //создаем ссылку (тег а)
            card.classList.add('videos__item', 'videos__item-active'); //появление и удаление второго класса добавляет эффекты
            card.setAttribute('data-url', item.contentDetails.videoId);
            card.innerHTML = `
                <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                <div class="videos__item-descr">
                    ${item.snippet.title}
                </div>
                <div class="videos__item-views">
                    2.7 тыс. просмотров
                </div>
            `;

            //помещаем ссылку в конец другого элемента
            videosWrapper.appendChild(card);
            // устанавливаем 10 милисек задержки до исчезновения класса после его появления
            setTimeout(() => {
                card.classList.remove('videos__item-active');
            }, 10);

            // проверка ночного режима
            if (night === true) {
                card.querySelector('.videos__item-descr').style.color = '#fff';
                card.querySelector('.videos__item-views').style.color = '#fff';
            };
            // модальные окна по нажатию - день 2
        });

        sliceTitle('.videos__item-descr', 100);
        bindModal(document.querySelectorAll('.videos__item'));

    }).catch( e => {
        console.log(e);
    });
};

more.addEventListener('click', () => {
    more.remove();
    gapi.load('client', start);
});

// поиск по ютуб
function search(target) {
    gapi.client.init({
        'apiKey': 'AIzaSyBcmBUbqOlRWVFaIbyeFYytXD9Z5ZdCvc0',
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then(function() {
        return gapi.client.youtube.search.list({
            'maxResults': '10',
            'part': 'snippet',
            'q': `${target}`,
            'type': ''
        });
    }).then(function(response) {
        console.log(response.result);
        // videosWrapper.innerHTML = ``; //долго работает - лучше while
        while (videosWrapper.firstChild) {
            videosWrapper.removeChild(videosWrapper.firstChild);
        };

        response.result.items.forEach(item => {
            let card = document.createElement('a'); //создаем ссылку (тег а)
            card.classList.add('videos__item', 'videos__item-active'); //появление и удаление второго класса добавляет эффекты
            card.setAttribute('data-url', item.id.videoId);
            card.innerHTML = `
                <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                <div class="videos__item-descr">
                    ${item.snippet.title}
                </div>
                <div class="videos__item-views">
                    2.7 тыс. просмотров
                </div>
            `;

            //помещаем ссылку в конец другого элемента
            videosWrapper.appendChild(card);
            // устанавливаем 10 милисек задержки до исчезновения класса после его появления
            setTimeout(() => {
                card.classList.remove('videos__item-active');
            }, 10);

            // проверка ночного режима
            if (night === true) {
                card.querySelector('.videos__item-descr').style.color = '#fff';
                card.querySelector('.videos__item-views').style.color = '#fff';
            };
            // модальные окна по нажатию - день 2
        });

        sliceTitle('.videos__item-descr', 100);
        bindModal(document.querySelectorAll('.videos__item'));
    });
};

document.querySelector('.search').addEventListener('submit', (e) => {
    e.preventDefault();
    gapi.load('client', () => {
        search(document.querySelector('.search > input').value);
    });
    document.querySelector('.search > input').value = '';
});


// День 2
// Подрежем заголовки
function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        // обрезание лишних пробелов методом trim с начала и конца строки
        item.textContent.trim();

        if (item.textContent.length < count) {
            return;
        } else {
            // первые 100 символов
            const str = item.textContent.slice(0, count + 1) + "...";
            item.textContent = str;
        };
    });
};

// sliceTitle('.videos__item-descr', 100);

// пишем модальное окно: при нажатии на видео, будет открываться
// окно modal, где будет плеер youTube
// открытие окна
function openModal() {
    modal.style.display = 'block';
};
// закрытие окна
function closeModal() {
    modal.style.display = 'none';
    //остановка видео по закрытии модального окна
    player.stopVideo(); //из документации
};

function bindModal(cards) {
    cards.forEach(item => {
        item.addEventListener('click', (e) => {
            // объект события е
            // отменяем стандартное поведение браузера по клику на ссылки
            e.preventDefault();
            //загрузка видео по id
            const id = item.getAttribute('data-url');
            loadVideo(id);
            openModal();
        });
    });
};

// bindModal(videos);

// функция для привязки открытия модального окна к новосозданным карточкам

function bindNewModal(cards) {
    cards.addEventListener('click', (e) => {
        // объект события е
        // отменяем стандартное поведение браузера по клику на ссылки
        e.preventDefault();
        //загрузка видео по id
        const id = cards.getAttribute('data-url');
        loadVideo(id);
        openModal();
    });
};

//по клику вне модального окна - его закрытие
modal.addEventListener('click', (e) => {
    //проверяем куда мы нажали
    if (!e.target.classList.contains('modal__body')) {
        closeModal();
    };
});
document.addEventListener('keydown', function(evt) { if (evt.keyCode === 27) { closeModal(); }; });

//работа с ютуб iframe api
// обязательно нужен сервер
// создадим видео плеер в модальное окно
function createVideo() {
    // скопировано с документации
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    // создаем новый экземпляр плеера с задержкой для прогрузки
    setTimeout(() => {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE',
        });
    }, 300);
};

createVideo();

// нужно останавливать видео по закрытию модального окна
// нужно загружать определенное видео по id

function loadVideo(id) {
    player.loadVideoById({'videoId': `${id}`}); //из документации
};