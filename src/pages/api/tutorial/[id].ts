import Tutorial from "@/interfaces/Tutorial";
import pool from "@/services/database/pool";
import { readFileSync } from "fs";
import { RowDataPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<RowDataPacket | { message: string }>) {
  const { id } = req.query;
  try {
    const conn = await pool.getConnection();
    const sql = `SELECT T.id,
                      T.title,
                      T.content,
                      G.name AS 'group'
                  FROM tutorial_group TG
                      RIGHT JOIN tutorial T ON T.id = TG.idTutorial
                      LEFT JOIN grupo G ON G.id = TG.idGroup
                  WHERE T.id = ?
                  ORDER BY T.title`;
    const [result] = await conn.query<RowDataPacket[]>(sql, [id]);
    conn.release();

    res.status(200).send(result[0]);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
}
