"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reseller_data = exports.modem_schema = exports.admin_products_schema = exports.admin_reseller_schema = void 0;
var zod_1 = require("zod");
exports.admin_reseller_schema = zod_1.z.object({
    telegram: zod_1.z
        .string({ required_error: "Telegram username missing in request." })
        .min(5, { message: "Telegram username cannot less than 5 characters." })
        .max(32, "Telegram username cannot exceed 32 characters."),
    balance: zod_1.z
        .string({ required_error: "Balance missing in request." })
        .min(1, { message: "Balance cannot be empty," })
        .max(10, { message: "Balance cannot be more tha 10 digit" }),
});
exports.admin_products_schema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z
        .string({ required_error: "Product name cannot be empty." })
        .min(1, { message: "Product name cannot be empty." })
        .max(200, { message: "Product name cannot exceed 200 chars." }),
    description: zod_1.z
        .string()
        .max(999, { message: "Product description cannot exceed 999 chars." }),
    duration: zod_1.z
        .number()
        .min(0, { message: "Product duration cannot be less than 0." })
        .max(999999999, {
        message: "Product duration cannot be greater than 999999999.",
    }),
    price: zod_1.z
        .number({ required_error: "Price cannot be empty." })
        .min(0, { message: "Price cannot be less than 0." }),
});
exports.modem_schema = zod_1.z.object({
    id: zod_1.z.number(),
    IMEI: zod_1.z.string(),
    http_port: zod_1.z.string(),
    name: zod_1.z.string(),
    user: zod_1.z.string(),
    password: zod_1.z.string(),
    sold_to: zod_1.z.string(),
    expiration_date: zod_1.z.string(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string(),
});
exports.reseller_data = zod_1.z.object({
    id: zod_1.z.number(),
    telegram: zod_1.z
        .string({ required_error: "Telegram username missing in request." })
        .min(5, { message: "Telegram username cannot less than 5 characters." })
        .max(32, "Telegram username cannot exceed 32 characters."),
    api_key: zod_1.z.string(),
    balance: zod_1.z.number(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string(),
    sold_modems: zod_1.z.number(),
});
