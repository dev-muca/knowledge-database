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
              G.group
          FROM tutorial_group TG
              RIGHT JOIN tutorial T ON T.id = GT.idTutorial
              LEFT JOIN group G ON G.id = GT.idGroup
          WHERE G.nome LIKE ?`
      : `SELECT T.id,
            T.title,
            G.group
          FROM tutorial_group TG
            RIGHT JOIN tutorial T ON T.id = GT.idTutorial
            LEFT JOIN group G ON G.id = GT.idGroup;`;
    const [result] = await conn.query<RowDataPacket[]>(sql, [category && category]);
    conn.release();

    res.status(200).send(result);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
}
