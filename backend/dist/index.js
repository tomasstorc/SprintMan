"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_connect_1 = __importDefault(require("./utils/db-connect"));
const auth_controller_1 = __importDefault(require("./controller/auth-controller"));
const programme_controller_1 = __importDefault(require("./controller/programme-controller"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 8000;
(0, db_connect_1.default)();
app.use("/api/auth", auth_controller_1.default);
app.use("/api/programme", programme_controller_1.default);
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
