import { Router } from "express";
import { chat, template } from "../controllers/api.controller";

const router = Router();

router.route("/template").post(template);
router.route("/chat").post(chat);
export default router;
