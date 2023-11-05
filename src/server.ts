import { createServer } from "net";



const server = createServer()

server.on("connection", handleTcpConnection)
server.listen(3000, () => console.log("listening on port : ", server.address()))

function handleTcpConnection(cx: any){

    let remoteAddress = cx.remoteAddress + ':' + cx.remotePort;  
    console.log('new client connection from %s', remoteAddress);

    cx.on("data", (data: any) => {
        console.log("data : ", data)
    })
}

