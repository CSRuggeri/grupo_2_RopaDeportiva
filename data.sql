Drop database if exists sportGoDb;
CREATE DATABASE sportGoDb;
use sportGoDb;

CREATE TABLE IF NOT EXISTS `sportGoDb`.`category` (
  `category_id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  CREATE TABLE IF NOT EXISTS `sportGoDb`.`brand` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  
CREATE TABLE IF NOT EXISTS `sportGoDb`.`product` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `name` VARCHAR(45) COLLATE utf8_unicode_ci NOT NULL,
  `price` INT unsigned NOT NULL,
  `stock` INT unsigned NOT NULL DEFAULT 1,
  `description` VARCHAR(150) COLLATE utf8_unicode_ci NOT NULL,
  `gender` VARCHAR(45) COLLATE utf8_unicode_ci NOT NULL,
  `image` VARCHAR(150) COLLATE utf8_unicode_ci NOT NULL,
  `discount` int NOT NULL default '0',
  `size` VARCHAR(45) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` INT unsigned DEFAULT NULL,
  `brand_id` INT unsigned DEFAULT NULL,
  
  PRIMARY KEY (`id`),
  KEY `category_FK` (`category_id`),
  KEY `brand_FK` (`brand_id`),
  CONSTRAINT `category_FK` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `brand_FK_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `sportgodb`.`user` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  `birthDate` DATE NOT NULL,
  `email` VARCHAR(255) unique NOT NULL,
  `address` VARCHAR(255) DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  CREATE TABLE IF NOT EXISTS `sportgodb`.`cart` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `userId` INT unsigned DEFAULT NULL,
  `Product_id` INT unsigned DEFAULT NULL,
  `Product_quantity` INT unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_FK` (`userId`),
  KEY `Product_FK` (`Product_id`),
  constraint `userId_FK` FOREIGN KEY (`userId`) REFERENCES `sportgodb`.`user` (`id`),
  constraint `Product_FK` FOREIGN KEY (`Product_id`) REFERENCES `sportgodb`.`product` (`id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO category (name)
VALUES 
('Abrigos'),
('Futbol'),
('Trajes de baño'),
('Accesorios'),
('Gimnasio'),
('Running'),
('Ciclismo'),
('Deportes de combate');

INSERT INTO brand (name)
VALUES 
('Puma'),
('Nike'),
('Addidas'),
('Under Armour'),
('Reebok'),
('New Balance'),
('Salomon'),
('Generic');

INSERT INTO product (name, price, stock, description, gender, image, discount, size, category_id, brand_id)
VALUES 
('Campera deportiva Puma (H)', 6770, 3, 'campera deportiva puma para hombres', 'male', '/images/show/camperaPumaH.jpg', 5, 'S', 1, 1),
('Bincha Nike', 1500, 1, 'bincha deportiva nike de material de toalla', 'unisex', '/images/show/binchaNike.jpg', 30, 'S', 2, 2),
('Campera deportiva Adiddas', 8500, 2, 'campera deportiva marca addidas para mujer', 'female', '/images/show/camperaAdiddasF.jpg', 23, 'S', 1, 3),
('Conjunto Adiddas (hombre)', 22300, 2, 'Conjunto remera y pantalon addidas color negro', 'female', '/images/show/conjuntoAdiddasH.jpg', 12, 'M', 3, 3),
('Conjunto deportivo Nike (mujer)', 37855, 1, 'conjunto campera y pantalon para mujer color negro marca Nike', 'female', '/images/show/conjuntoNikeF.jpg', 16, 'S', 3, 2),
('Guante deportivo Nike', 2300, 1, 'guante deportivo nike unisex', 'unisex', '/images/show/guanteNike.jpg', 13, 'S', 4, 2),
('remera Nike reverse', 15550, 1, 'remera de algodon amarilla marca nike', 'unisex', '/images/show/remeraNikeReverse.jpg', 25, 'S', 5, 2),
('Bincha deportiva Nike', 6500, 1, 'Bincha deportiva edicion especial NBA', 'unisex', '/images/show/binchaNikeNBA.jpg', 0, 'M', 2, 2),
('Bolso Deportivo', 20500, 4, 'Bolso deportivo azul de cuero sintetico', 'unisex', '/images/show/bolsoAzul.jpg', 17, 'XL', 6, 4),
('Campera deportiva Adiddas', 26456, 2, 'Campera de polyester deportiva addidas para hombre', 'male', '/images/show/camperaDepHomAddidas.jpg', 13, 'XL', 1, 3),
('campera deportiva Nike', 14200, 1, 'campera deportiva para hombre de polyester marca Nike', 'male', '/images/show/camperaDepHomNike.jpg', 20, 'M', 1, 2),
('Campera deportiva Adiddas', 16520, 2, 'campera deportiva marca Addidas para mujer', 'female', '/images/show/camperaMujAdidas.jpg', 10, 'S', 1, 3),
('campera deportiva Nike', 13650, 1, 'campera deportiva de polyester marca nike para mujer', 'female', '/images/show/camperaMujNike.jpg', 7, 'S', 1, 2),
('campera deportiva', 10542, 5, 'campera deportiva generica', 'female', '/images/show/camperaMujSport.jpg', 6, 'L', 1, 4);

INSERT INTO user (name, birthDate, email, address, password, avatar, admin)
VALUES 
('Franco Albornoz', '2024-03-01', 'francoralbornoz.12@gmail.com', 'Holanda 2031', '$2b$10$rJStRbYkJLDl1NVYMnUISOaY5HM4GU81LJjtKye6jdPezdf6bQOo2', '/images/avatars/1710808761868-SA-17719-Remera-Salomon-Logo-Ss-Tee-Vi-Hombre-Dark-Denim.jpg', '1');

insert into cart (userId,Product_id,Product_quantity) values 
(1,1,5),(1,2,3);

select * from user 
inner join cart on userId = user.id
inner join product on product.id = cart.Product_id
where user.name = 'Franco Albornoz' 


