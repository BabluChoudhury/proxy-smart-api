import { Request, Response } from "express";
import { get_db, own_db } from "../../../lib/custom";

export async function admin_import(_req: Request, res: Response) {
  try {
    const client = await get_db();
    const conn = own_db();
    const collection_modems = client?.db?.collection("modems");
    const modems = await collection_modems?.find({}).toArray();
    if (!modems?.length) {
      return res.status(304).json({ error: "Could not import no result." });
    }
    for (let modem of modems) {
      let {
        IMEI = "",
        http_port = "",
        name = "",
        proxy_login = "",
        proxy_password = "",
      } = modem;

      let currentTime = new Date().toISOString();
      let sold_to = null;
      let expiration = null;

      conn
        ?.prepare(
          "INSERT INTO modems (IMEI, http_port, name, user, password, sold_to, expiration_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .get(
          IMEI,
          http_port,
          name,
          proxy_login,
          proxy_password,
          sold_to,
          expiration,
          currentTime,
          currentTime
        );
    }
    conn?.close;
    client?.client.close;

    return res.status(200).json({ success: "SQL executed." });
  } catch (_e) {
    console.warn(_e);
    return res.status(500).json({ error: "Server Error." });
  }
}
