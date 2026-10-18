DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS menu_items;
-- Таблица блюд
CREATE TABLE menu_items (
  id           SERIAL        PRIMARY KEY,
  name         VARCHAR(100)  NOT NULL,
  description  TEXT          NOT NULL,
  price        NUMERIC(8, 2) NOT NULL CHECK (price >= 0),
  category     VARCHAR(20)   NOT NULL
               CHECK (category IN ('ramen', 'sushi', 'appetizers', 'desserts', 'drinks')),
  image_url    TEXT,
  is_available BOOLEAN       NOT NULL DEFAULT TRUE
);

-- Таблица бронирований
CREATE TABLE reservations (
  id               SERIAL       PRIMARY KEY,
  customer_name    VARCHAR(100) NOT NULL,
  phone            VARCHAR(30)  NOT NULL,
  reservation_date DATE         NOT NULL,
  reservation_time TIME         NOT NULL,
  guests_count     INTEGER      NOT NULL CHECK (guests_count BETWEEN 1 AND 20),
  created_at       TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Демонстрационные блюда
-- (ссылки на фото-заглушки)
INSERT INTO menu_items (name, description, price, category, image_url, is_available) VALUES
('Тонкоцу рамен',   'Насыщенный свиной бульон, лапша, нори, яйцо аджитама и зелёный лук.', 590, 'ramen',      '/images/tonkotsu-ramen.jpg', TRUE),
('Мисо рамен',      'Рамен на мисо-бульоне с кукурузой, ростками и кусочками курицы.',     540, 'ramen',      '/images/miso-ramen.jpg',     TRUE),
('Сякэ нигири',     'Нигири с нежным лососем, 2 штуки.',                                    320, 'sushi',      '/images/salmon-nigiri.jpg',  TRUE),
('Ролл Калифорния', 'Краб, авокадо, огурец и икра тобико, 8 штук.',                         450, 'sushi',      '/images/california-roll.jpg',TRUE),
('Гёдза',           'Жареные японские пельмени со свининой, 5 штук.',                       350, 'appetizers', '/images/gyoza.jpg',          TRUE),
('Эдамамэ',         'Молодые соевые бобы с морской солью.',                                 240, 'appetizers', '/images/edamame.jpg',        TRUE),
('Моти',            'Рисовые пирожные с начинкой из клубники и сливок, 3 штуки.',           290, 'desserts',   '/images/mochi.jpg',          TRUE),
('Дораяки',         'Японские панкейки с пастой из красной фасоли.',                        260, 'desserts',   '/images/dorayaki.jpg',       TRUE),
('Матча латте',     'Порошковый зелёный чай матча с молоком.',                              280, 'drinks',     '/images/matcha-latte.jpg',   TRUE),
('Холодный сэнтя',  'Освежающий японский зелёный чай со льдом.',                            190, 'drinks',     '/images/sencha.jpg',         TRUE);