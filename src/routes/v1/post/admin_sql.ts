import { Request, Response } from "express";
import { own_db } from "../../../lib/custom";

export async function admin_sql(req: Request, res: Response) {
  try {
    const sql = req.body?.sql;
    if (!sql) {
      return res.status(400).json({ error: "SQL command empty." });
    }
    const conn = own_db();
    conn?.exec(sql);
    conn?.close;
    return res.status(200).json({ success: "SQL executed." });
  } catch (_e) {
    console.warn(_e);
    return res.status(500).json({ error: "Server Error." });
  }
}
