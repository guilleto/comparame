import express from "express";
import { RolController } from "../controllers";
const router = express.Router();

router
    .get("/", RolController.getRols)
    .post("/", RolController.createRol)
    .put("/", RolController.updateRol)
    .delete("/", RolController.deleteRol);

export { router as RolRoutes };
