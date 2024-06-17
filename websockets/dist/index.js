"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((request, response) => {
    console.log(new Date() + " Recieved request for" + request.url);
    response.end("hi there");
});
const wss = new ws_1.WebSocketServer({ server });
const clients = new Map();
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    const id = Math.random().toString(36).substring(2);
    clients.set(id, ws);
    ws.send(JSON.stringify({ id, type: "assign_id" }));
    ws.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == 'send_message') {
            const { targetId, content } = parsedMessage;
            const targetClient = clients.get(targetId);
            if (targetClient) {
                targetClient.send(JSON.stringify({ type: "message", content }));
            }
        }
    });
    ws.on('close', () => {
        console.log("Client disconnected");
        clients.delete(id);
    });
});
server.listen(8080, () => {
    console.log(new Date() + " Server is listening on port 8080");
});
