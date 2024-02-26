create DATABASE sportGoDb;
use sportGoDb;

CREATE TABLE IF NOT EXISTS `sportGoDb`.`category` (
  `category_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`));
  CREATE TABLE IF NOT EXISTS `sportGoDb`.`brand` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
CREATE TABLE IF NOT EXISTS `sportGoDb`.`product` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `stock` INT NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `discount` VARCHAR(45) NOT NULL,
  `size` VARCHAR(45) NOT NULL,
  `category_id` INT NOT NULL,
  `brands_id` INT NOT NULL,
  PRIMARY KEY (`id`, `category_id`, `brands_id`),
  INDEX `fk_Products_category1_idx` (`category_id` ASC),
  
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Products_brands1`
    FOREIGN KEY (`brands_id`)
    REFERENCES `brand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
  


CREATE TABLE IF NOT EXISTS `sportgodb`.`cart` (
  `userId` INT NOT NULL,
  `Products_id` INT,
  `Products_category_id` INT,
  PRIMARY KEY (`userId`, `Products_id`, `Products_category_id`),
  
    FOREIGN KEY (`Products_id` , `Products_category_id`)
    REFERENCES `sportgodb`.`product` (`id` , `category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `sportgodb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(45) NULL,
  `carrito_userId` INT NULL,
  `carrito_Products_id` INT NULL,
  `carrito_Products_category_id` INT NULL,
  PRIMARY KEY (`id`),
 
    FOREIGN KEY (`carrito_userId` , `carrito_Products_id` , `carrito_Products_category_id`)
    REFERENCES `sportgodb`.`cart` (`userId` , `Products_id` , `Products_category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO user (name, email, password, rol, avatar)
VALUES 
('santi ruggeri', 'santiruu@gmail.com', 'password123', 'admin', NULL),
('Jane Smith', 'jane.smith@example.com', 'securepass', 'customer', NULL),
('Alice Johnson', 'alice.johnson@example.com', 'pass123', 'customer', NULL),
('peponaXD', 'pepona@pepona.com', 'hola123', 'customer', NULL),
('santiruu', 'santiruu@gmail.com', 'lolapolola123', 'customer', NULL),
('pepitoXD', 'pepito@pepito.com', 'hola123', 'customer', NULL),
('Franco1389', 'francoralbornoz.12@gmail.com', 'hola123', 'customer', NULL),
('pepito123', 'jaja@gmail.com', 'hola123', 'seller', NULL),
('tomi', 'tom95@gmail.com', 'hola123', 'seller', NULL),
('tomillo', 'tom@gmail.com', 'hola123', 'customer', NULL),
('95eltom', '95eltom95@gmail.com', 'hola123', 'customer', NULL);

INSERT INTO category (category_id, name)
VALUES 
(1, 'sweatshirt'),
(2, 'headband'),
(3, 'ensamble'),
(4, 'glove'),
(5, 'shirt'),
(6, 'bags'),
(7, 'a'),
(8, 'e');

INSERT INTO brand (id, name)
VALUES 
(1, 'Puma'),
(2, 'Nike'),
(3, 'Addidas'),
(4, 'generic');

INSERT INTO product (id, name, price, stock, description, category, brand, gender, image, discount, size, category_id, brands_id)
VALUES 
('1', 'Campera deportiva Puma (H)', 6770, 3, 'campera deportiva puma para hombres', 'sweatshirt', 'Puma', 'male', '/images/show/camperaPumaH.jpg', '5% off', 'S', 1, 1),
('2', 'Bincha Nike', 1500, 1, 'bincha deportiva nike de material de toalla', 'headband', 'Nike', 'unisex', '/images/show/binchaNike.jpg', '30% off', 'S', 2, 2),
('3', 'Campera deportiva Adiddas', 8500, 2, 'campera deportiva marca addidas para mujer', 'sweatshirt', 'Addidas', 'female', '/images/show/camperaAdiddasF.jpg', '23% off', 'S', 1, 3),
('4', 'Conjunto Adiddas (hombre)', 22300, 2, 'Conjunto remera y pantalon addidas color negro', 'ensamble', 'Addidas', 'female', '/images/show/conjuntoAdiddasH.jpg', '12% off', 'M', 3, 3),
('5', 'Conjunto deportivo Nike (mujer)', 37855, 1, 'conjunto campera y pantalon para mujer color negro marca Nike', 'ensamble', 'Nike', 'female', '/images/show/conjuntoNikeF.jpg', '16% off', 'S', 3, 2),
('6', 'Guante deportivo Nike', 2300, 1, 'guante deportivo nike unisex', 'glove', 'Nike', 'unisex', '/images/show/guanteNike.jpg', '13% off', 'S', 4, 2),
('7', 'remera Nike reverse', 15550, 1, 'remera de algodon amarilla marca nike', 'shirt', 'Nike', 'unisex', '/images/show/remeraNikeReverse.jpg', '25%', 'S', 5, 2),
('8', 'Bincha deportiva Nike', 6500, 1, 'Bincha deportiva edicion especial NBA', 'headband', 'Nike', 'unisex', '/images/show/binchaNikeNBA.jpg', '0%', 'M', 2, 2),
('9', 'Bolso Deportivo', 20500, 4, 'Bolso deportivo azul de cuero sintetico', 'bags', 'generic', 'unisex', '/images/show/bolsoAzul.jpg', '17%', 'XL', 6, 4),
('10', 'Campera deportiva Adiddas', 26456, 2, 'Campera de polyester deportiva addidas para hombre', 'sweatshirt', 'Addidas', 'male', '/images/show/camperaDepHomAddidas.jpg', '13%', 'XL', 1, 3),
('11', 'campera deportiva Nike', 14200, 1, 'campera deportiva para hombre de polyester marca Nike', 'sweatshirt', 'Nike', 'male', '/images/show/camperaDepHomNike.jpg', '20%', 'M', 1, 2),
('12', 'Campera deportiva Adiddas', 16520, 2, 'campera deportiva marca Addidas para mujer', 'sweatshirt', 'Addidas', 'female', '/images/show/camperaMujAdidas.jpg', '10%', 'X', 1, 3),
('13', 'campera deportiva Nike', 13650, 1, 'campera deportiva de polyester marca nike para mujer', 'sweatshirt', 'Nike', 'female', '/images/show/camperaMujNike.jpg', '7%', 'S', 1, 2),
('14', 'campera deportiva', 10542, 5, 'campera deportiva generica', 'sweatshirt', 'generic', 'female', '/images/show/camperaMujSport.jpg', '6%', 'L', 1, 4);

INSERT INTO cart (userId, Products_id, Products_category_id)
VALUES
(1, NULL, NULL), 
(2, NULL, NULL),  
(3, NULL, NULL),  
(4, NULL, NULL),
(5, NULL, NULL), 
(6, NULL, NULL),  
(7, NULL, NULL),  
(8, NULL, NULL),
(9, NULL, NULL), 
(10, NULL, NULL),  
(11, NULL, NULL);
