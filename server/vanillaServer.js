const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/serverType") {
    res.end("Default Node.JS HTTP Server");
  }
  else res.end("Hello from Node.JS");
});

server.listen(2698);
