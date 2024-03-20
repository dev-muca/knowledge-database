import { readFileSync } from "fs";
import { RowDataPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";

import pool from "@/services/database/pool";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RowDataPacket[] | { message: string }>
) {
  try {
    const { category } = req.query;
    const conn = await pool.getConnection();
    const sql = category
      ? `SELECT T.id,
              T.title,
              G.name grupo
          FROM tutorial_grupo TG
              RIGHT JOIN tutorial T ON T.id = TG.idTutorial
              LEFT JOIN grupo G ON G.id = TG.idGroup
          WHERE G.nome LIKE ?`
      : `SELECT T.id,
            T.title,
            G.name grupo
          FROM tutorial_grupo TG
            RIGHT JOIN tutorial T ON T.id = TG.idTutorial
            LEFT JOIN grupo G ON G.id = TG.idGroup`;
    const [result] = await conn.query<RowDataPacket[]>(sql, [category && category]);
    conn.release();

    res.status(200).send(result);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
}
