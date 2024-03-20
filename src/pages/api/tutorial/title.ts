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
      ? readFileSync("@/sql/get-title-categories.sql").toString()
      : readFileSync("@/sql/get-title.sql").toString();
    // : `SELECT T.id,
    //         T.titulo AS 'title',
    //         G.nome AS 'group'
    //    FROM tbl_grupo_tutorial GT
    //         RIGHT JOIN tbl_tutorial T ON T.id = GT.id_tutorial
    //         LEFT JOIN tbl_grupo G ON G.id = GT.id_grupo;`;
    const [result] = await conn.query<RowDataPacket[]>(sql, [category && category]);
    conn.release();

    res.status(200).send(result);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
}
