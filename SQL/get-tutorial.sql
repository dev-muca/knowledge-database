SELECT T.id,
    T.title,
    T.content,
    G.name
FROM tutorial_group TG
    RIGHT JOIN `tutorial` T ON T.id = TG.idTutorial
    LEFT JOIN `group` G ON G.id = TG.idGroup
WHERE T.id = ?
ORDER BY T.title;