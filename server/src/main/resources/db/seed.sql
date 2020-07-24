insert into users
values ('Amy', '$2a$10$dH1dWY2pvrCh/QvMt8EyxerAwYw5a7.AHGcEbdUqwzeLcK02ZhgNm', true),
       ('Bob', '$2a$10$hdOWqRiu82N7b.Mh3eAUi.p2dJicwRm2jPBvh/rgTYyRM7lZpFI5e', true),
       ('Cam', '$2a$10$1PR5BIEGHfMgZQdYey74QuaSUq.EaKlwsOo4kLLtDnKlqu3hRdXj6', true);

insert into authorities
values ('Amy', 'ROLE_USER'),
       ('Bob', 'ROLE_USER'),
       ('Cam', 'ROLE_USER');