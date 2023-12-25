import { Request, Response } from "express";
import { own_db } from "../../../lib/custom";
import { admin_products_schema } from "../../../lib/utils/validations/form";
import { ZodError } from "zod";

export async function admin_product(req: Request, res: Response) {
  try {
    const validate_body = admin_products_schema.parse({
      name: req.body?.name,
      description: req.body?.description,
      duration: req.body.duration,
      price: req.body.price,
    });

    const conn = own_db();
    const currentTime = new Date().toISOString();
    conn
      ?.prepare(
        "INSERT INTO products (name, description, price, duration, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .get(
        validate_body.name,
        validate_body.description,
        validate_body.price,
        validate_body.duration,
        currentTime,
        currentTime
      );
    conn?.close;
    return res.status(200).json({ success: "Product created." });
  } catch (_e) {
    console.warn(_e);
    if (_e instanceof ZodError) {
      const e = _e.message;
      const ex = JSON.parse(e);
      return res.status(400).json({ error: ex[0]["message"] });
    }
    return res.status(500).json({ error: "Server Error." });
  }
}
