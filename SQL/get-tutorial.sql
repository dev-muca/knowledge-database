SELECT T.id,
    T.titulo `title`,
    T.texto `content`,
    G.nome `group`
FROM tbl_grupo_tutorial GT
    RIGHT JOIN tbl_tutorial T ON T.id = GT.id_tutorial
    LEFT JOIN tbl_grupo G ON G.id = GT.id_grupo
WHERE T.id = ?
ORDER BY T.titulo;