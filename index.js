"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const int_app_1 = __importDefault(require("./src/int/int-app"));
let port = 7000;
int_app_1.default.get("/", (req, res) => {
    res.send("Get Start App");
});
exports.default = int_app_1.default;
