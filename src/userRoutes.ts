import {Router} from "express";
import {UserController} from "./controllers/UserController";
import {AuthController} from "./controllers/AuthController";

const userRoutes = Router();

const userController = new UserController();
const path = '/users';

const authController = new AuthController();

userRoutes.post(path, userController.create);
userRoutes.get(path, authController.authMiddleware, userController.findAll);
userRoutes.get(`${path}/:id`, authController.authMiddleware, userController.findById);
userRoutes.delete(`${path}/:id`, authController.authMiddleware, userController.verifyExists, userController.delete);
userRoutes.put(`${path}/:id`, authController.authMiddleware, userController.verifyExists, userController.update);

userRoutes.post("/auth", authController.authenticate);

export { userRoutes }