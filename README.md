# Фокус

---

## Демонстрация

---

## Описание

Фокус — это веб-приложение для онлайн-бронирования билетов на фильмы, созданное с использованием стека MERN.

---

## Структура проекта

---

## Установка

---

## Лицензия

Код распространяется по лицензии MIT.

---

## Технологии

Фокус использует ряд проектов с открытым исходным кодом для своей работы:

#### Клиентская часть

---

#### Серверная часть

---

## Требования

Фокус требует [Node.js](https://nodejs.org/) для работы.

---

## Установка

---

## Функциональность:

---

## Конфигурация

---

## Структура API

---

## Плагины

Фокус в настоящее время расширен следующими плагинами. Инструкции по их использованию в вашем приложении приведены ниже.

---

# Возможности!

  - Добавление / Обновление / Удаление фильмов
  - Добавление / Обновление / Удаление кинотеатров
  - Добавление / Обновление / Удаление сеансов
  - Добавление / Обновление / Удаление бронирований
  - Добавление / Обновление / Удаление пользователей
  - Генерация QR-кода для регистрации на сеанс
  - Отправка HTML-приглашений по электронной почте

Вы также можете:
  - Экспортировать QR-код в формате PDF

### Технологии
Cinema + использует ряд проектов с открытым исходным кодом для своей работы:
* [MongoDB](https://www.mongodb.com/) - Документо-ориентированная NoSQL база данных для хранения данных приложения.
* [ExpressJS](https://expressjs.com/) - Быстрый фреймворк для создания сетевых приложений на Node.js.
* [ReactJS](https://reactjs.org/) - Библиотека JavaScript для создания пользовательских интерфейсов.
* [Redux](https://redux.js.org/) - Предсказуемый контейнер состояния для JavaScript-приложений.
* [nodeJS](https://nodejs.org/) - Среда выполнения JavaScript, построенная на движке V8 от Chrome.

### Установка

Cinema + требует [Node.js](https://nodejs.org/) для работы.

Настройте переменные окружения 

```sh
$ Создайте файл .env в папках server и client
$ Ознакомьтесь с примером .env
Создайте базу данных MongoDB и добавьте строку подключения в файл .env
```

Установите зависимости и devDependencies

```sh
$ git clone https://github.com/georgesimos/Movie-app.git
$ npm install
$ cd server npm install && npm start
$ cd client npm install && npm start
```
Запустите сервер.

```sh
$ cd server 
$ npm install 
```

Запустите клиент.

```sh
$ cd client 
$ npm install 
$ npm start
```

Запуск из корневой директории
```sh
$ npm run server
$ npm run client
```

### Плагины

Cinema + в настоящее время расширен следующими плагинами. Инструкции по их использованию в вашем приложении приведены ниже.

### Сервер


| Плагин | README |
| ------ | ------ |
| concurrently | [plugins/concurrently/README.md](https://github.com/kimmobrunfeldt/concurrently/blob/master/README.md) |
| bcryptjs | [plugins/bcryptjs/README.md](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) |
| express | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md) |
| googleapis | [plugins/googleapis/README.md](https://github.com/googleapis/googleapis/blob/master/README.md) |
| jsonwebtoken | [plugins/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md) |
| mongoose | [plugins/mongoose/README.md](https://github.com/Automattic/mongoose/blob/master/README.md) |
| multer | [plugins/multer/README.md](https://github.com/expressjs/multer/blob/master/README.md)|
| nodemailer | [plugins/nodemailer/README.md](https://github.com/nodemailer/nodemailer/blob/master/README.md) |
| nodemon | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md) |
| qrcode | [plugins/qrcode/README.md](https://github.com/soldair/node-qrcode/blob/master/README.md) |

### Клиент

| Плагин | README |
| ------ | ------ |
| fullcalendar | [plugins/fullcalendar/README.md](https://github.com/fullcalendar/fullcalendar/blob/master/README.md) |
| material-ui | [plugins/material-ui/README.md](https://github.com/mui-org/material-ui/blob/master/README.md) |
| moment | [plugins/moment/README.md](https://www.npmjs.com/package/@date-io/moment?activeTab=readme) |
| jspdf | [plugins/jspdf/README.md](https://github.com/MrRio/jsPDF) |
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| react-facebook-login | [plugins/react-facebook-login /README.md](https://github.com/keppelen/react-facebook-login/blob/master/README.md) |
| react-google-login | [plugins/react-google-login/README.md](https://www.npmjs.com/package/react-google-login) |
| react-redux | [plugins/react-redux/README.md](https://github.com/reduxjs/react-redux) |
| react-router-dom | [plugins/react-router/README.md](https://github.com/ReactTraining/react-router/blob/master/README.md) |
| react-slick | [plugins/react-slick/README.md](https://github.com/akiran/react-slick) |
| redux | [plugins/redux/README.md](https://github.com/reduxjs/redux)|

### Задачи

 - Добавить светлый режим / Больше тем



# Скриншоты! 

Страница фильма
<img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/movie.png" />

<details>
  <summary>Больше скриншотов</summary>
  Страница бронирования
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/booking.png" />

  Приглашения на бронирование
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/invitation.png" />

  Страница гостевой панели
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/guest-dashboard.png" />

  Страница моего аккаунта
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/my-account.png" />

  Главная страница администратора
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/admin-dashboard.png" />

  Страница кинотеатров администратора
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/admin-cinemas.png" />

  Страница фильмов администратора
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/admin-movies.png" />

  Страница бронирований администратора
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/reservations.png" />

  Календарь бронирований администратора
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/calendar.png" />
</details>



Лицензия
----

MIT
