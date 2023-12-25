"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var reseller_1 = require("./routes/v1/get/reseller");
var admin_reseller_1 = require("./routes/v1/post/admin_reseller");
var auth_1 = require("./middlewares/auth");
var admin_sql_1 = require("./routes/v1/post/admin_sql");
var admin_import_1 = require("./routes/v1/post/admin_import");
var reseller_modem_1 = require("./routes/v1/get/reseller_modem");
var admin_product_1 = require("./routes/v1/post/admin_product");
var reseller_products_1 = require("./routes/v1/get/reseller_products");
var reseller_buy_product_1 = require("./routes/v1/post/reseller_buy_product");
var reseller_modem_proxies_1 = require("./routes/v1/get/reseller_modem_proxies");
var home_1 = require("./routes/home");
var custom_1 = require("./lib/custom");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var PORT = 5000;
(0, custom_1.setup_own_db)();
app.get("/", home_1.home);
app.get("/api/v1/reseller", auth_1.simpleAuthMiddleware, reseller_1.reseller);
app.post("/api/v1/admin/reseller", auth_1.adminAuthMiddleware, admin_reseller_1.admin_reseller);
app.post("/api/v1/admin/sql", auth_1.adminAuthMiddleware, admin_sql_1.admin_sql);
app.post("/api/v1/admin/import", auth_1.adminAuthMiddleware, admin_import_1.admin_import);
app.get("/api/v1/reseller/modem/:modem_id", auth_1.simpleAuthMiddleware, reseller_modem_1.reseller_modem);
app.post("/api/v1/admin/product", auth_1.adminAuthMiddleware, admin_product_1.admin_product);
app.get("/api/v1/reseller/products", reseller_products_1.reseller_products);
app.post("/api/v1/reseller/product/:product_id", auth_1.simpleAuthMiddleware, reseller_buy_product_1.reseller_buy_product);
app.get("/api/v1/reseller/modem/:modem_id/proxies", auth_1.simpleAuthMiddleware, reseller_modem_proxies_1.reseller_modem_proxies);
app.use(function (_req, res) {
    res.status(404).json({ error: "Route not found" });
});
app.use(function (err, _req, res) {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server is running on port ".concat(PORT));
});
