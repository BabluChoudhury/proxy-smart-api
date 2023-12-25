import { Request, Response } from "express";
import { own_db } from "../../../lib/custom";
import { typesModemSales, typesResellerData } from "../../../lib/utils/types";

export async function reseller_modem(req: Request, res: Response) {
  try {
    const auth_header = req.headers.authorization as string;
    const modemId = req.params?.modem_id;
    const api_key = auth_header.split(" ")[1];
    const conn = own_db();
    const reseller = conn
      ?.prepare("SELECT * FROM resellers WHERE api_key=?")
      .get(api_key) as typesResellerData;

    if (!reseller) {
      return res.status(401).json({ error: "Invalid API key." });
    }

    const modemQuery = conn
      ?.prepare("SELECT * FROM modems WHERE (id=? OR IMEI=?) AND sold_to=?")
      .get(modemId, modemId, reseller.telegram) as typesModemSales;

    if (!modemQuery) {
      return res.status(400).json({
        error: "Modem not found or not associated with this reseller.",
      });
    }
    const modem_info = {
      id: modemQuery?.id,
      IMEI: modemQuery?.IMEI,
      http_port: modemQuery?.http_port,
      name: modemQuery?.name,
      user: modemQuery?.user,
      password: modemQuery?.password,
      sold_to: modemQuery?.sold_to,
      created_at: modemQuery?.created_at,
      updated_at: modemQuery?.updated_at,
    };

    return res.status(200).json(modem_info);
  } catch (_e) {
    console.warn(_e);
    return res.status(500).json({ error: "Server Error." });
  }
}
