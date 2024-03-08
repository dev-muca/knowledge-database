import { readFileSync } from "fs";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";

import pool from "@/services/database/pool";
import Tutorial from "@/interfaces/Tutorial";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //   res: NextApiResponse<RowDataPacket[] | { message: string }>
) {
  const data = req.body;
  const { id, title, content }: Tutorial = req.body && JSON.parse(data);

  try {
    if (req.method === "POST") {
      try {
        const conn = await pool.getConnection();
        const sql = readFileSync("./sql/create-tutorial.sql").toString();
        const [result] = await conn.query<ResultSetHeader>(sql, [title, content]);
        conn.release();

        return res.status(200).send({ message: "Tutorial Salvo! ✅", affectedRows: result.insertId });
      } catch (error: any) {
        return res.status(500).send({ message: error.message });
      }
    }

    if (req.method === "PATCH") {
      try {
        const conn = await pool.getConnection();
        const sql = readFileSync("./sql/update-tutorial.sql").toString();
        const [result] = await conn.query<ResultSetHeader>(sql, [title, content, id]);
        conn.release();

        return res.status(200).send({ message: "Tutorial Atualizado! 🔄️", affectedRows: result.affectedRows });
      } catch (error: any) {
        return res.status(500).send({ message: error.message });
      }
    }

    if (req.method === "DELETE") {
      try {
        const { id } = req.query;
        const conn = await pool.getConnection();
        const sql = readFileSync("./sql/delete-tutorial.sql").toString();
        const [result] = await conn.query<ResultSetHeader>(sql, [id]);
        conn.release();

        return res.status(200).send({ message: "Tutorial Deletado! ⚠️", affectedRows: result.affectedRows });
      } catch (error: any) {
        return res.status(500).send({ message: error.message });
      }
    }

    return res.status(400).send({ message: "Error: Bad Request" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}
