import { Router } from "express";
import { CheckingAccountController } from "./controllers/CheckingAccount";
import { StatementController } from "./controllers/StatementController";
import { AuthController } from "./controllers/AuthController";

const routes = Router();
const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();
const authController = new AuthController();

const pathCheckingAccounts = "/checkingAccounts"

routes.get(pathCheckingAccounts, authController.authMiddleware, checkingAccountController.findAll);
routes.get(`${pathCheckingAccounts}/:id`, authController.authMiddleware, checkingAccountController.findById);
routes.post(`${pathCheckingAccounts}/create`, authController.authMiddleware, checkingAccountController.create);
routes.put(`${pathCheckingAccounts}/update/:id`, authController.authMiddleware, checkingAccountController.verifyExists, checkingAccountController.update);
routes.delete(`${pathCheckingAccounts}/delete/:id`, authController.authMiddleware, checkingAccountController.verifyExists, checkingAccountController.delete);

routes.post(`${pathCheckingAccounts}/:id/deposit`, authController.authMiddleware, checkingAccountController.verifyExists, statementController.deposit);
routes.get(`${pathCheckingAccounts}/:id/statements`, authController.authMiddleware, checkingAccountController.verifyExists, statementController.getStatement);
routes.post(`${pathCheckingAccounts}/:id/withdraw`, authController.authMiddleware, checkingAccountController.verifyExists, statementController.withdraw);
routes.get(`${pathCheckingAccounts}/:id/balance`, authController.authMiddleware, checkingAccountController.verifyExists, statementController.getBalance);
routes.get(`${pathCheckingAccounts}/:id/statementsPeriod`, authController.authMiddleware, checkingAccountController.verifyExists, statementController.getStatementByPeriod);
routes.get(`${pathCheckingAccounts}/:id/statement`, authController.authMiddleware, statementController.getStatementById);
routes.post(`${pathCheckingAccounts}/:id/pix`, authController.authMiddleware, checkingAccountController.verifyExists, statementController.sendPix);
routes.post(`${pathCheckingAccounts}/:id/ted`, authController.authMiddleware, checkingAccountController.verifyExists, statementController.sendTed);

export { routes }
