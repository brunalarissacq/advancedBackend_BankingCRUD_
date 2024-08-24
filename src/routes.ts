import { Router } from "express";
import { CheckingAccountController } from "./controllers/CheckingAccount";

const routes = Router();
const checkingAccountController = new CheckingAccountController();
const pathCheckingAccounts = "/checkingAccounts"

routes.get(pathCheckingAccounts, checkingAccountController.findAll);
routes.get(`${pathCheckingAccounts}/:id`, checkingAccountController.findById);
routes.post(`${pathCheckingAccounts}/create`, checkingAccountController.create);
routes.put(`${pathCheckingAccounts}/update/:id`, checkingAccountController.verifyExists, checkingAccountController.update);
routes.delete(`${pathCheckingAccounts}/delete/:id`, checkingAccountController.verifyExists, checkingAccountController.delete);

export { routes }
