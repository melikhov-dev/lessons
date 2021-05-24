const http2 = require("http2");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events").EventEmitter;
const {
    HTTP2_HEADER_SCHEME,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_AUTHORITY,
    HTTP_STATUS_OK
} = require("http2").constants;
let streamCount = 0;

const parseCookie = str =>
    str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});

class SSE extends EventEmitter{
    constructor() {
        super();
    }
    init(stream, headers) {
        let id = 0;
        const cookie = headers.cookie ? parseCookie(headers.cookie) : {};
        this.setMaxListeners(this.getMaxListeners() + 1);
        stream.respond({
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache"
        })
        const dataListener = (data) => {
            if (data.event) {
                stream.write(`event: ${data.event}\n`);
            }
            stream.write(`data: user ${cookie.name ?? "anonymous" } ${data.data}\n`);
            stream.write(`id: ${++id} \n`);
            stream.write("\n");
        }
        this.on('data', dataListener);
        stream.on('close', () => {
            this.removeListener('data', dataListener);
            --streamCount;
            this.setMaxListeners(this.getMaxListeners() - 1);
            console.log(`Stream closed`);
        })

        console.log(`Stream ${++streamCount} created`);
    }
    send(data) {
        this.emit('data', data);
    }
}

const sse = new SSE();

const server = http2.createSecureServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
});

server.on('stream',(stream, headers) => {
    const scheme = headers[HTTP2_HEADER_SCHEME];
    const authority = headers[HTTP2_HEADER_AUTHORITY];
    const urlPath = headers[HTTP2_HEADER_PATH];
    const url = new URL(`${scheme}://${authority}${urlPath}`);

    if (url.pathname === "/stream") {
        sse.init(stream, headers);
        return;
    }

    if (url.pathname === "/login") {
        const name = url.searchParams.get("name");
        stream.respond({
            "set-cookie": `name=${name}`,
            ":status": "303",
            "location": "/"
        })
    }

    if (url.pathname === "/send-message") {
        const data = url.searchParams.get("message");
        sse.send({data});
        stream.respond({
            ':status': HTTP_STATUS_OK
        })
        stream.end("ok");
        return;
    }

    const fileStream = fs.createReadStream(path.join(__dirname, "index.html"));
    fileStream.pipe(stream);
}).listen(8080, () => {
    console.log("Server started on 8080")
})
