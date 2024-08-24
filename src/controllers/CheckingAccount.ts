import {NextFunction, Request, Response} from "express";
import { prisma } from "../prisma";

class CheckingAccountController {

  async verifyExists(req: Request, res: Response, next: NextFunction){
    try{
      const id = req.params.id;
      const checkingAccount = await prisma.checkingAccount.findUnique({
        where: {id}
      });
      if(checkingAccount == null){
        return res.status(404).json({error: "Could not find checking account"});
      }
      return next();
    } catch (error){
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }

  async create(req: Request, res: Response){
    try{
      const { name, email, number } = req.body;
      const checkingAccount = await prisma.checkingAccount.create({
        data:{
          name,
          email,
          number
        }
      });
      return res.status(201).json({message: "Checking account has been created", account: checkingAccount})
    } catch (error){
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id
      const {name, email, number} = req.body;
      const checkingAccount = await prisma.checkingAccount.update({
        where: {id},
        data: {
          name,
          email,
          number
        }
      });
      return res.status(200).json({message: "Checking account has been updated", account: checkingAccount})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Internal error", error: error});
    }
  }

  async delete(req: Request, res: Response){
    try{
      const id = req.params.id;
      await prisma.checkingAccount.delete({
        where: {id}
      });
      return res.status(204).json({message: "Checking account has been deleted"})
    } catch (error){
      console.log(error);
      return res.status(500).json({message: "Internal error", error: error});
    }
  }

  async findAll(req: Request, res: Response){
    try{
      const checkingAccounts = await prisma.checkingAccount.findMany();
      return res.status(200).json({checkingAccounts: checkingAccounts});
    } catch (error){
      console.log(error);
      return res.status(500).json({message: "Internal error", error: error});
    }
  }

  async findById(req: Request, res: Response){
    try{
      const id = req.params.id;
      const checkingAccount = await prisma.checkingAccount.findUnique({
        where: {id}
      });
      if(checkingAccount == null){
        return res.status(404).json({error: "Could not find checking account"});
      }
      return res.status(200).json({checkingAccount: checkingAccount})
    } catch (error){
      console.log(error);
      return res.status(500).json({message: "Internal error", error: error});
    }
  }
}

export { CheckingAccountController }