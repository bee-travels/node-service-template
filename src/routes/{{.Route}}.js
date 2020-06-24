import { Router } from "express";
import { getData } from "../services/dataHandler";
import ExampleError from "../errors/ExampleError";
import Jaeger from "../jaeger";
import CircuitBreaker from "opossum";

const router = Router();

const opossumOptions = {
  timeout: 15000, // If our function takes longer than 10 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000, // After 30 seconds, try again.
};

/**
 * GET /api/v1/{{.Route}}
 * @description Example route
 * @response 200 - OK
 * @response 400 - Error
 */
router.get("/", async (req, res, next) => {
  const context = new Jaeger({{.Route}}, req, res);
  try {
    const breaker = new CircuitBreaker(getData, opossumOptions);
    const data = await breaker.fire(context);
    return res.json(data);
  } catch (e) {
    if (e instanceof ExampleError) {
      return res.status(400).json({ error: e.message });
    }
    next(e);
  }
});

export default router;
