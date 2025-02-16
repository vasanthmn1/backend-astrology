"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const int_app_1 = __importDefault(require("./src/int/int-app"));
const PublicRouter_1 = __importDefault(require("./src/router/PublicRouter"));
const UserRouter_1 = __importDefault(require("./src/router/UserRouter"));
const CommonRouter_1 = __importDefault(require("./src/router/CommonRouter"));
const AuthMiddleWare_1 = require("./src/middleware/AuthMiddleWare");
const AccountRouter_1 = __importDefault(require("./src/router/AccountRouter"));
const AdminRouter_1 = __importDefault(require("./src/router/AdminRouter"));
let authMiddleWare = new AuthMiddleWare_1.AuthMiddleWare();
//completed
int_app_1.default.use('/user', UserRouter_1.default);
int_app_1.default.use('/cm', CommonRouter_1.default);
int_app_1.default.use('/acc', AccountRouter_1.default);
int_app_1.default.use('/admin', AdminRouter_1.default);
int_app_1.default.use("/pb", PublicRouter_1.default); //authMiddleWare.publicAccessMiddleware,
int_app_1.default.get("/", (req, res) => {
    res.send("Server is running!");
});
exports.default = int_app_1.default;
