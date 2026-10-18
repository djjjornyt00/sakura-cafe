# Sakura Café 🌸

Сайт японского кафе: главная, меню из базы данных, страница «О кафе», бронирование столика и контакты.

**Технологии:** React + Vite (frontend), Node.js + Express (backend), PostgreSQL, REST API.

## Что понадобится

- [Node.js](https://nodejs.org) (версия LTS)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com)

Проверьте установку:

```bash
node -v
npm -v
psql --version
git --version
```

## Структура проекта

```text
sakura-cafe/
├── frontend/        React-приложение (страницы, компоненты, стили)
├── backend/         Express-сервер и REST API
├── database.sql     Создание таблиц и демо-блюда
├── .env.example     Образец настроек
└── README.md
```

## Запуск с нуля

### 1. Скачайте проект

```bash
git clone <https://github.com/djjjornyt00/sakura-cafe>
cd sakura-cafe
```

### 2. Настройте файл `.env`

Скопируйте `.env.example` в новый файл `.env` (в корне проекта) и впишите свой пароль от PostgreSQL:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ваш_пароль
DB_NAME=sakura_cafe
FRONTEND_URL=http://localhost:5173
```

Файл `.env` не попадает в Git, поэтому пароль остаётся только у вас.

### 3. Создайте базу данных

Windows PowerShell:

```powershell
$env:PGCLIENTENCODING = "UTF8"
psql -U postgres -c "CREATE DATABASE sakura_cafe;"
psql -U postgres -d sakura_cafe -f database.sql
```

macOS / Linux:

```bash
PGCLIENTENCODING=UTF8 psql -U postgres -c "CREATE DATABASE sakura_cafe;"
PGCLIENTENCODING=UTF8 psql -U postgres -d sakura_cafe -f database.sql
```

Файл `database.sql` создаёт таблицы `menu_items` и `reservations` и добавляет 10 демо-блюд. Повторный запуск пересоздаёт таблицы (брони при этом удалятся).

### 4. Запустите backend

```bash
cd backend
npm install
npm run dev
```

Сервер будет доступен на http://localhost:5000. Проверка: откройте http://localhost:5000/api/health, должно быть `{"status":"ok","database":"connected"}`.

### 5. Запустите frontend

В **новом** окне терминала:

```bash
cd frontend
npm install
npm run dev
```

Откройте http://localhost:5173.

## API

| Метод | Адрес | Описание |
|---|---|---|
| GET | `/api/health` | Работают ли сервер и база данных |
| GET | `/api/menu` | Все доступные блюда |
| GET | `/api/menu/:id` | Одно блюдо |
| POST | `/api/reservations` | Создать бронь |

Пример тела запроса для брони:

```json
{
  "customer_name": "Анна",
  "phone": "+7 900 123-45-67",
  "reservation_date": "2030-05-20",
  "reservation_time": "19:00",
  "guests_count": 2
}
```

## Как управлять меню

Меню хранится в таблице `menu_items`. Примеры:

```sql
-- Изменить цену
UPDATE menu_items SET price = 650 WHERE id = 1;

-- Скрыть блюдо с сайта
UPDATE menu_items SET is_available = FALSE WHERE id = 2;

-- Посмотреть брони
SELECT * FROM reservations ORDER BY created_at DESC;
```

## Фотографии и контакты

- Фото блюд лежат в `frontend/public/images/`, имена файлов указаны в колонке `image_url` таблицы `menu_items`.
- Логотип: `frontend/public/logo.svg`, фото первого экрана: `frontend/public/hero.jpg`.
- Адрес, телефон и соцсети меняются в `frontend/src/pages/Contacts.jsx`.

## Частые проблемы

- **Меню не загружается:** проверьте, что backend запущен и `/api/health` отвечает `ok`.
- **Ошибка подключения к базе:** проверьте пароль и имя базы в `.env`.
- **Русский текст в `psql` отображается кракозябрами (Windows):** выполните `chcp 65001` и `$env:PGCLIENTENCODING = "UTF8"`. Это проблема консоли, на сайте текст отображается правильно.
- **Порт занят:** измените `PORT` в `.env` (и `FRONTEND_URL`, если меняли порт frontend).

## Что можно добавить дальше

Админ-панель для блюд и броней, подтверждение брони по почте, корзина и онлайн-заказ.
