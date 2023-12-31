import { z } from "zod";

export const admin_reseller_schema = z.object({
  telegram: z
    .string({ required_error: "Telegram username missing in request." })
    .min(5, { message: "Telegram username cannot less than 5 characters." })
    .max(32, "Telegram username cannot exceed 32 characters."),
  balance: z
    .string({ required_error: "Balance missing in request." })
    .min(1, { message: "Balance cannot be empty," })
    .max(10, { message: "Balance cannot be more tha 10 digit" }),
});

export const admin_products_schema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: "Product name cannot be empty." })
    .min(1, { message: "Product name cannot be empty." })
    .max(200, { message: "Product name cannot exceed 200 chars." }),
  description: z
    .string()
    .max(999, { message: "Product description cannot exceed 999 chars." }),
  duration: z
    .number()
    .min(0, { message: "Product duration cannot be less than 0." })
    .max(999999999, {
      message: "Product duration cannot be greater than 999999999.",
    }),
  price: z
    .number({ required_error: "Price cannot be empty." })
    .min(0, { message: "Price cannot be less than 0." }),
});

export const modem_schema = z.object({
  id: z.number(),
  IMEI: z.string(),
  http_port: z.string(),
  name: z.string(),
  user: z.string(),
  password: z.string(),
  sold_to: z.string(),
  expiration_date: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const reseller_data = z.object({
  id: z.number(),
  telegram: z
    .string({ required_error: "Telegram username missing in request." })
    .min(5, { message: "Telegram username cannot less than 5 characters." })
    .max(32, "Telegram username cannot exceed 32 characters."),
  api_key: z.string(),
  balance: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  sold_modems: z.number(),
});

export type typesAdminProducts = z.infer<typeof admin_products_schema>;

export type typesModemSales = z.infer<typeof modem_schema>;

export type typesResellerData = z.infer<typeof reseller_data>;
