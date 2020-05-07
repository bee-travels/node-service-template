import { Router } from "express";
import { getData } from "../services/dataHandler";
import ExampleError from "../errors/ExampleError";

const router = Router();

/**
 * @swagger
 *
 * /api/v1/{{.Route}}:
 *   get:
 *     description: Example route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Example Error
 */
router.get("/", async (req, res, next) => {
  try {
    const data = await getData();
    return res.json(data);
  } catch (e) {
    if (e instanceof ExampleError) {
      return res.status(400).json({ error: e.message });
    }
    next(e);
  }
});

export default router;
