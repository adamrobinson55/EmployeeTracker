INSERT INTO department (name)
VALUES  ('Scientists'),
        ('Movies'),
        ('Colors');

INSERT INTO role (title, salary, department_id)
VALUES  ('Super Scientist', 3000, 1),
        ('Normal Scientist', 2000, 1),
        ('Bad Scientist', 1000, 1),
        ('Scary Movies', 0, 2),
        ('Funny Movies', 10, 2),
        ('Rabbit Movies', 700, 2),
        ('Red Colors', 1000, 3),
        ('Non-Red Colors', 100000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Albert', 'Einstein', 1, 1),
        ('Mary', 'Anning', 1, 1),
        ('James', 'Garfield', 3, 1),
        ('Joey', 'Falcone', 2, 1),
        ('Scary', 'Movie', 4, 5),
        ('Scarier', 'Movie', 4, 5),
        ('Night', 'Lepis', 6, 6),
        ('Night Of', 'The Lepis', 6, 6),
        ('Red', 'Redder', 7, 9),
        ('Scarlett', 'Red', 7, 9),
        ('Crimson', 'Scarlett', 7, 9),
        ('Blue', 'Bird', 8, 9),
        ('Blue', 'Berry', 8, 9),
        ('Blue', 'Man-Group', 8, 9);

