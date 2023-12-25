import { Response } from "express";

import {  own_db } from "../../../lib/custom";
import { typesModemSales } from "../../../lib/utils/types";

export async function admin_modems( res: Response){
    try{
        const conn =own_db();
        const modems:any =conn
        ?.prepare("SELECT * FROM modems").get()as typesModemSales
        const modems_list =[];
        modems_list.push({total_modems:[modems].length})
        const unsold_modems= conn
        ?.prepare("SELECT COUNT(*) FROM modems WHERE sold_to IS NULL OR expiration_date IS NULL OR expiration_date < ?")
        .get([new Date()])
        modems_list.push({unsold_modems})
        for(let modem of modems){
            const modem_info = {
                id: modem?.id,
                IMEI: modem?.IMEI,
                http_port: modem?.http_port,
                name: modem?.name,
                user: modem?.user,
                password: modem?.password,
                sold_to: modem?.sold_to,
                created_at: modem?.created_at,
                updated_at: modem?.updated_at,
              };
              modems_list.push(modem_info)
        }
        if(modems_list){
            return res.status(200).json(modems_list)
        }
        else{
            return res.status(200).json({error:"modems not found"})
        }
    }catch(_e){
        console.warn(_e);
        return res.status(500).json({ error: "Server Error." });
    }
}