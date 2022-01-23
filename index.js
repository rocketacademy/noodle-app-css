import { createServer } from "http";
import { readFile } from "fs";

const handleIncomingRequest = (request, response) => {
  // request.url contains the portion of the URL after the domain.
  // E.g. for https://ra.co/index.html, request.url would return "/index.html".
  console.log("request url", request.url);

  // "." refers to the Unix filesystem ".", which represents the current directory.
  const filePath = `.${request.url}`;
  const extName = request.url.split(".").pop();

  const mimeTypes = {
    html: "text/html",
    js: "text/javascript",
    css: "text/css",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpg",
    gif: "image/gif",
    svg: "image/svg+xml",
    wav: "audio/wav",
    mp4: "video/mp4",
    woff: "application/font-woff",
    ttf: "application/font-ttf",
    eot: "application/vnd.ms-fontobject",
    otf: "application/font-otf",
    wasm: "application/wasm",
  };

  const contentType = mimeTypes[extName] || "application/octet-stream";

  readFile(filePath, (error, content) => {
    if (error) {
      console.error("error reading file", error);
      return;
    }

    response.writeHead(200, { "Content-Type": contentType });
    response.end(content, "utf-8");
  });
};

// Initialise server with request listener function handleIncomingRequest
// https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
// Use port 3004 by convention.
createServer(handleIncomingRequest).listen(3004);
