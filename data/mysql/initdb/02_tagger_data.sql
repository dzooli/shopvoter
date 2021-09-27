use tagger;
INSERT INTO city (name, createdAt, updatedAt)
VALUES ('Budapest', NOW(), now());
INSERT INTO city (name, createdAt, updatedAt)
VALUES ('Pécs', NOW(), now());
INSERT INTO city (name, createdAt, updatedAt)
VALUES ('Sopron', NOW(), now());
INSERT INTO company (name, city_id, createdAt, updatedAt)
VALUES ('Manna Kft.', 1, NOW(), now());
INSERT INTO company (name, city_id, createdAt, updatedAt)
VALUES ('Anna Kft.', 1, NOW(), now());
INSERT INTO company (name, city_id, createdAt, updatedAt)
VALUES ('Alma Kft.', 2, NOW(), now());
INSERT INTO company (name, city_id, createdAt, updatedAt)
VALUES ('Körte Kft.', 2, NOW(), now());
INSERT INTO company (name, city_id, createdAt, updatedAt)
VALUES ('Banán Kft.', 3, NOW(), now());
INSERT INTO company (name, city_id, createdAt, updatedAt)
VALUES ('Barack Kft.', 3, NOW(), now());
INSERT INTO role (name, level, description, createdAt, updatedAt)
VALUES (
        'superuser',
        '1',
        'Able to CRUD all',
        NOW(),
        now()
    );
INSERT INTO role (name, level, description, createdAt, updatedAt)
VALUES (
        'companyadmin',
        '2',
        'CRUD for users, shops + assignment of own properties',
        NOW(),
        now()
    );
INSERT INTO role (name, level, description, createdAt, updatedAt)
VALUES (
        'user',
        '3',
        'Receives the tags after login',
        NOW(),
        now()
    );
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Manna Shop 1', 1, 1, now(), now());
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Manna Shop 2', 1, 1, now(), now());
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Manna Shop 3', 2, 1, now(), now());
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Anna Shop 1', 1, 2, now(), now());
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Anna Shop 2', 1, 2, now(), now());
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Anna Shop 3', 3, 2, now(), now());
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Banán Shop 1', 1, 5, now(), now());
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Banán Shop 2', 2, 5, now(), now());
INSERT INTO shop (name, city_id, company_id, createdAt, updatedAt)
VALUES ('Banán Shop 3', 2, 5, now(), now());
-- test password: 123
INSERT INTO user (
        emailAddress,
        fullName,
        isSuperAdmin,
        company_id,
        password
    )
VALUES (
        'admin@email.com',
        'Test Super',
        1,
        1,
        '$2a$10$0KG3iODkxCJvFJpM9cUTS.KyymPamxRyU47RMAlEQNi8rzkqFf1G2'
    );
INSERT INTO user (
        emailAddress,
        fullName,
        isSuperAdmin,
        company_id,
        password
    )
VALUES (
        'cadmin@email.com',
        'Test CompanyAdmin',
        0,
        1,
        '$2a$10$0KG3iODkxCJvFJpM9cUTS.KyymPamxRyU47RMAlEQNi8rzkqFf1G2'
    );
INSERT INTO user (
        emailAddress,
        fullName,
        isSuperAdmin,
        company_id,
        password
    )
VALUES (
        'user@email.com',
        'Test User',
        0,
        2,
        '$2a$10$0KG3iODkxCJvFJpM9cUTS.KyymPamxRyU47RMAlEQNi8rzkqFf1G2'
    );
INSERT INTO `tagger`.`usershop` (`user_id`, `shop_id`)
VALUES ('3', '8');
INSERT INTO `tagger`.`usershop` (`user_id`, `shop_id`)
VALUES ('3', '9');
INSERT INTO `tagger`.`usershop` (`user_id`, `shop_id`)
VALUES ('3', '6');
INSERT INTO `tagger`.`usershop` (`user_id`, `shop_id`)
VALUES ('3', '5');