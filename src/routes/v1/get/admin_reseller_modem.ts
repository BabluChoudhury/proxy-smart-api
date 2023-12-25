import { Request, Response } from "express";

import {  own_db } from "../../../lib/custom";
import { typesResellerData } from "../../../lib/utils/types";

export async function admin_reseller_modem(req: Request, res: Response){
    try{
        const reseller_id= req.params.reseller_id;
        const conn=own_db();
        const reseller =conn
        ?.prepare("SELECT * FROM resellers WHERE id=?")
        .get(reseller_id) as typesResellerData
        if(reseller){
            const resellerData = {
                id: reseller.id,
                telegram: reseller.telegram,
                api_key: reseller.api_key,
                balance: reseller.balance,
                created_at: reseller.created_at,
                updated_at: reseller.updated_at,
                sold_modems: reseller?.sold_modems ? reseller.sold_modems : 0,
              };
              return res.status(200).json(resellerData)
        }
        else{
            return res.status(404).json("resellers not found")
        }
    }catch(_e){
        console.warn(_e);
        return res.status(500).json({ error: "Server Error." });
    }
}