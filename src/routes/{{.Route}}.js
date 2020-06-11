import { Router } from "express";
import { getData, readinessCheck } from "../services/dataHandler";
import ExampleError from "../errors/ExampleError";

const router = Router();

/**
 * GET /api/v1/{{.Route}}
 * @description Example route
 * @response 200 - OK
 * @response 400 - Error
 */
router.get("/", async (req, res, next) => {
  switch (req.baseUrl) {
    case "/ready":
      const isHealthy = await readinessCheck();
      if (isHealthy) {
        res.status(200).json({ status: "ok" });
      } else {
        res.status(503).json({ status: "Service Unavailable" });
      }
      break;
    default:
      try {
        const data = await getData();
        return res.json(data);
      } catch (e) {
        if (e instanceof ExampleError) {
          return res.status(400).json({ error: e.message });
        }
        next(e);
      }
  }
});

export default router;
