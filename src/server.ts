import { Socket, createServer } from "net";



const server = createServer()

server.on("connection", handleTcpConnection)
server.listen(3000, () => console.log("listening on port : ", server.address()))

function handleTcpConnection(cx: Socket){

    let remoteAddress = cx.remoteAddress + ':' + cx.remotePort;  
    console.log('new client connection from %s', remoteAddress);

    cx.setEncoding("utf8")

    cx.on("data", (data: String) => onRequest(data, cx))

    cx.on("close", () => {
        console.log("connection is closed from : ", remoteAddress)
    })

    cx.on("error", (error: Object) => {
        console.log("error : ", error)
    })
}

function onRequest(data: String, cx: Socket) {
    const url = getBaseUrl(data)
    if (url === '/') {
        cx.write(parseResponse('Welcome to the homepage!'));
    } else if (url === '/about') {
        cx.write(parseResponse('About us page'));
    } else {
        cx.write(parseResponse('Page not found'));
    }
}

function parseResponse (data: String) {
    const httpRespose = [
        "HTTP/1.1 200 OK",
        "Content-Type: text/html",
        `Content-length: ${byteSize(data)}`,
        "",
        "",
        data,
    ].map(line => line.concat("\r\n")).join('')
    return httpRespose
}

function getBaseUrl(incomingMessage: String): String {
    const requestObject = incomingMessage.split('\r\n')
    return requestObject[0].split(' ')[1]
}

function byteSize (data: any) {
    return new Blob([data]).size
}

