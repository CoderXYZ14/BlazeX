import { Router } from "express";
import { chat, template } from "../controllers/user.controller";

const router = Router();

router.route("/tempate").post(template);
router.route("/chat").post(chat);
export default router;
