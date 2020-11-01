import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import * as express from "express";
// const app = express();
// const http = require("http").Server(app);
// const io = require("socket.io")(http);
// const port = process.env.PORT || 8181;
// import GcpAPI from "public/voice-widget/voice-widget.js";

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// http.listen(port, function() {
//   alert('listening...');
// });

// const gcpAPI = new GcpAPI();

// io.on("connection", socket => {
//   socket.on("startStream", () => {
//     gcpAPI.startRecognitionStream(io);
//   });

//   socket.on("audiodata", data => {
//     gcpAPI.writingToStream(data);
//   });

//   socket.on("endStream", () => {
//     gcpAPI.stopRecognitionStream();
//   });
// });


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


