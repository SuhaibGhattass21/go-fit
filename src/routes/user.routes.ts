// src/routes/user_routes.ts
import { Router } from "express";
import passport from "passport";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get("/users", passport.authenticate("jwt", { session: false }), UserController.getUsers);
router.get("/users/:id", passport.authenticate("jwt", { session: false }), UserController.getUser);
router.post("/users", UserController.createUser);
router.put("/users/:id", passport.authenticate("jwt", { session: false }), UserController.updateUser);
router.delete("/users/:id", passport.authenticate("jwt", { session: false }), UserController.deleteUser);

export default router;

