import {NextFunction, Request, Response} from "express";
import { prisma } from "../prisma"

class StatementController {

  verifyAmount(req: Request, res: Response, next: NextFunction) {
    const { amount } = req.body;

    if(amount <= 0){
      return res.status(400).json({ message: "Ivalid amount"});
    }
    return next();
  }

  async deposit(req: Request, res: Response) {
    try {
      const idCheckingAccount = req.params.id;
      const { amount, description } = req.body;

      const statement = await prisma.statement.create({
        data: {
          idCheckingAccount,
          amount,
          description,
          type: "credit"
        }
      });
      return res.status(201).json({message: "Statement has been created", statement: statement})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Internal error", error: error});
    }
  }

  async getStatement(req: Request, res: Response) {
    try {
      const idCheckingAccount = req.params.id;
      const statements = await prisma.statement.findMany({
        where: { idCheckingAccount }
      });
      return res.status(200).json({statements: statements})
    } catch (error){
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }

  async withdraw(req: Request, res: Response) {
    try {
      const idCheckingAccount = req.params.id;
      const { amount, description } = req.body;

      const statement = await prisma.statement.create({
        data: {
          idCheckingAccount,
          amount: amount *-1,
          description,
          type: "debit"
        }
      });
      return res.status(201).json({message: "Statement has been created", statement: statement})
    } catch (error){
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }
}

export { StatementController };