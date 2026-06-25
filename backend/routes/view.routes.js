import express from "express"
import { listDocuments } from "../controllers/doc.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/view-all", authenticate, authorize(["ADMIN"]), listDocuments);

export default router;