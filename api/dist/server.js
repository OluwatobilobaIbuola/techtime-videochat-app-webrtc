"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, express_1.json)());
server.listen(process.env.PORT || 5000, () => {
    console.log("Listening at 5000");
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("userConnectionDetails", {
            signal: data.signal,
            from: data.from,
            name: data.name,
            isReceivingCall: true,
        });
    });
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("userConnectionDetails", {
            signal: data.signal,
            from: data.from,
            name: "",
            isReceivingCall: false,
        });
    });
    socket.on("sendMsg", (data) => {
        io.to(data.to).emit("receiveMsg", data.msg);
    });
    socket.on("close", () => {
        socket.broadcast.emit("callEnded");
    });
});
//# sourceMappingURL=server.js.map