SELECT T.id,
    T.titulo `title`,
    G.nome `group`
FROM tbl_grupo_tutorial GT
    RIGHT JOIN tbl_tutorial T ON T.id = GT.id_tutorial
    LEFT JOIN tbl_grupo G ON G.id = GT.id_grupo
WHERE G.nome LIKE ?