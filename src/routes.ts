import { Router } from "express";
import { CheckingAccountController } from "./controllers/CheckingAccount";
import { StatementController } from "./controllers/StatementController";

const routes = Router();
const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();
const pathCheckingAccounts = "/checkingAccounts"

routes.get(pathCheckingAccounts, checkingAccountController.findAll);
routes.get(`${pathCheckingAccounts}/:id`, checkingAccountController.findById);
routes.post(`${pathCheckingAccounts}/create`, checkingAccountController.create);
routes.put(`${pathCheckingAccounts}/update/:id`, checkingAccountController.verifyExists, checkingAccountController.update);
routes.delete(`${pathCheckingAccounts}/delete/:id`, checkingAccountController.verifyExists, checkingAccountController.delete);

routes.post(`${pathCheckingAccounts}/:id/deposit`, checkingAccountController.verifyExists, statementController.verifyAmount, statementController.deposit);
routes.get(`${pathCheckingAccounts}/:id/statements`, checkingAccountController.verifyExists, statementController.getStatement);
routes.post(`${pathCheckingAccounts}/:id/withdraw`, checkingAccountController.verifyExists, statementController.verifyAmount, statementController.withdraw);

export { routes }
