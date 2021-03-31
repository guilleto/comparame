import express from "express";
import { PlanController } from "../Controllers";
const router = express.Router();

router
    .get("/", PlanController.getPlans)
    .get("/{id}", PlanController.getPlan)
    .post("/", PlanController.createPlan)
    .put("/", PlanController.updatePlan)
    .delete("/", PlanController.deletePlan);

export { router as PlanRoutes };
