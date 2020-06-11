import { Router } from "express";

import client, { Counter, Summary } from "prom-client";

import timeResponse from "response-time";

const SPECIAL_ENDPOINTS = ["/api-docs", "/metrics", "/ready", "/live"];

const router = Router();

client.register.clear();
const numOfRequests = new Counter({
  name: "numOfRequests",
  help: "Number of requests made",
  labelNames: ["method"],
});

const pathsTaken = new Counter({
  name: "pathsTaken",
  help: "Paths taken in the app",
  labelNames: ["path"],
});

const responses = new Summary({
  name: "responses",
  help: "Response time in millis",
  labelNames: ["method", "path", "status"],
});

router.use((req, _, next) => {
  const currentEndpoint = "/" + req.originalUrl.split("/")[1];
  if (!SPECIAL_ENDPOINTS.includes(currentEndpoint)) {
    numOfRequests.inc({ method: req.method });
    pathsTaken.inc({ path: req.path });
  }
  next();
});

router.use(
  timeResponse((req, res, time) => {
    const currentEndpoint = "/" + req.originalUrl.split("/")[1];
    if (!SPECIAL_ENDPOINTS.includes(currentEndpoint)) {
      responses.labels(req.method, req.url, res.statusCode).observe(time);
    }
  })
);

router.get("/metrics", (_, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(client.register.metrics());
});

export default router;
