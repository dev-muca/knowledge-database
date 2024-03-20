import { readFileSync } from "fs";
import { RowDataPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";

import pool from "@/services/database/pool";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RowDataPacket[] | { message: string }>
) {
  try {
    const conn = await pool.getConnection();
    const sql = `SELECT id, name FROM group`;
    const [result] = await conn.query<RowDataPacket[]>(sql);
    conn.release();

    res.status(200).send(result);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
}
