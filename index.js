const http = require("http");
const url = require("url");
const fs = require("fs");

let errorFile = (req, res) => {
  fs.readFile("404.html", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
    }
    res.write(data);
    return res.end();
  });
};
http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    if (q.pathname === "/") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          errorFile(req, res);
        } else {
          res.write(data);
          return res.end();
        }
      });
    } else {
      fs.readFile(filename, function (err, data) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          errorFile(req, res);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        }
      });
    }
  })
  .listen(8080);
