"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reseller_modem = void 0;
var custom_1 = require("../../../lib/custom");
function reseller_modem(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var auth_header, modemId, api_key, conn, reseller, modemQuery, modem_info;
        return __generator(this, function (_b) {
            try {
                auth_header = req.headers.authorization;
                modemId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.modem_id;
                api_key = auth_header.split(" ")[1];
                conn = (0, custom_1.own_db)();
                reseller = conn === null || conn === void 0 ? void 0 : conn.prepare("SELECT * FROM resellers WHERE api_key=?").get(api_key);
                if (!reseller) {
                    return [2 /*return*/, res.status(401).json({ error: "Invalid API key." })];
                }
                modemQuery = conn === null || conn === void 0 ? void 0 : conn.prepare("SELECT * FROM modems WHERE (id=? OR IMEI=?) AND sold_to=?").get(modemId, modemId, reseller.telegram);
                if (!modemQuery) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Modem not found or not associated with this reseller.",
                        })];
                }
                modem_info = {
                    id: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.id,
                    IMEI: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.IMEI,
                    http_port: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.http_port,
                    name: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.name,
                    user: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.user,
                    password: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.password,
                    sold_to: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.sold_to,
                    created_at: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.created_at,
                    updated_at: modemQuery === null || modemQuery === void 0 ? void 0 : modemQuery.updated_at,
                };
                return [2 /*return*/, res.status(200).json(modem_info)];
            }
            catch (_e) {
                console.warn(_e);
                return [2 /*return*/, res.status(500).json({ error: "Server Error." })];
            }
            return [2 /*return*/];
        });
    });
}
exports.reseller_modem = reseller_modem;
