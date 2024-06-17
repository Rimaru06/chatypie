import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((request: any, response: any) => {
  console.log(new Date() + " Recieved request for" + request.url);
  response.end("hi there");
});


const wss = new WebSocketServer({ server });

const clients = new Map();

wss.on("connection", function connection(ws : WebSocket) {
  ws.on("error", console.error);
  const id = Math.random().toString(36).substring(2);
  clients.set(id, ws);
  ws.send(JSON.stringify({ id, type: "assign_id" }));

  ws.on("message",  (message : any) => {
    const parsedMessage = JSON.parse(message);
    if(parsedMessage.type == 'send_message')
        {
            const {targetId , content} = parsedMessage;
            const targetClient = clients.get(targetId);
            if(targetClient)
            {
                targetClient.send(JSON.stringify({type: "message" , content}));
            }
        }
  });

   ws.on('close' , () => {
    console.log("Client disconnected");
    clients.delete(id);
    });
});

server.listen(8080 ,  () => {
    console.log(new Date() + " Server is listening on port 8080")
})
