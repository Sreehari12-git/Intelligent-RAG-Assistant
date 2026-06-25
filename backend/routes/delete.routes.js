import express from "express"
import { deleteDocument } from "../controllers/doc.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/role.middleware.js";


const router = express.Router();

router.delete("/delete", authenticate,authorize(["ADMIN"]), deleteDocument);

export default router;
