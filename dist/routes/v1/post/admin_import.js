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
exports.admin_import = void 0;
var custom_1 = require("../../../lib/custom");
function admin_import(_req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var client, conn, collection_modems, modems, _i, modems_1, modem, _b, IMEI, _c, http_port, _d, name_1, _f, proxy_login, _g, proxy_password, currentTime, sold_to, expiration, _e_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, custom_1.get_db)()];
                case 1:
                    client = _h.sent();
                    conn = (0, custom_1.own_db)();
                    collection_modems = (_a = client === null || client === void 0 ? void 0 : client.db) === null || _a === void 0 ? void 0 : _a.collection("modems");
                    return [4 /*yield*/, (collection_modems === null || collection_modems === void 0 ? void 0 : collection_modems.find({}).toArray())];
                case 2:
                    modems = _h.sent();
                    if (!(modems === null || modems === void 0 ? void 0 : modems.length)) {
                        return [2 /*return*/, res.status(304).json({ error: "Could not import no result." })];
                    }
                    for (_i = 0, modems_1 = modems; _i < modems_1.length; _i++) {
                        modem = modems_1[_i];
                        _b = modem.IMEI, IMEI = _b === void 0 ? "" : _b, _c = modem.http_port, http_port = _c === void 0 ? "" : _c, _d = modem.name, name_1 = _d === void 0 ? "" : _d, _f = modem.proxy_login, proxy_login = _f === void 0 ? "" : _f, _g = modem.proxy_password, proxy_password = _g === void 0 ? "" : _g;
                        currentTime = new Date().toISOString();
                        sold_to = null;
                        expiration = null;
                        conn === null || conn === void 0 ? void 0 : conn.prepare("INSERT INTO modems (IMEI, http_port, name, user, password, sold_to, expiration_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").get(IMEI, http_port, name_1, proxy_login, proxy_password, sold_to, expiration, currentTime, currentTime);
                    }
                    conn === null || conn === void 0 ? void 0 : conn.close;
                    client === null || client === void 0 ? void 0 : client.client.close;
                    return [2 /*return*/, res.status(200).json({ success: "SQL executed." })];
                case 3:
                    _e_1 = _h.sent();
                    console.warn(_e_1);
                    return [2 /*return*/, res.status(500).json({ error: "Server Error." })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.admin_import = admin_import;
