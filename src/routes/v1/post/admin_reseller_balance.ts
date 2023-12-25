import { Request, Response } from "express";

import { own_db } from "../../../lib/custom";
import { typesResellerData } from "../../../lib/utils/types";

export async function admin_reseller_balance(req: Request, res: Response){
    try{
        const conn = own_db();
        const reseller_id=req.params.reseller_id;
        const action =req.body.action;
        const amount =req.body.amount;
        const reseller =conn
        ?.prepare("SELECT * FROM resellers WHERE id=?")
        .get(reseller_id) as typesResellerData;

        if(!reseller){
            return res.status(404).json({errer:"Reseller not found."})
        }
        if(action === "add"){
            conn?.prepare("UPDATE resellers SET balance=? WHERE id=?")
            .get((reseller?.balance + amount),reseller_id)
        }
        else if(action === "remove"){
            conn?.prepare("UPDATE resellers SET balance=? WHERE id=?")
            .get((reseller?.balance - amount),reseller_id)
        }
        else if(action === "set"){
            conn?.prepare("UPDATE resellers SET balance=? WHERE id=?")
            .get(amount,reseller_id)
        } 
        else{
            return res.status(401).json({error:"Invalid action."})
        }

    }catch(_e){
        console.warn(_e);
        return res.status(500).json({ error: "Server Error." });
    }
}