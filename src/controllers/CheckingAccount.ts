import {NextFunction, Request, Response} from "express";
import { prisma } from "../prisma";
import {StatementService} from "../services/StatementService";
import {CheckingAccountService} from "../services/CheckingAccountService";

class CheckingAccountController {

  private checkingAccountService: CheckingAccountService

  constructor() {
    this.checkingAccountService = new CheckingAccountService();
  }

  create = async (req: Request, res: Response) => {
    try{
      const { name, email, number } = req.body;

      const validation = this.isValidBody(name, email, number);
      if(!validation.isValid){
        return res.status(400).json({error: validation.msg});
      }

      const checkingAccount = await this.checkingAccountService.create(name, email, number);
      return res.status(200).json({message: "CheckingAccount has been created", account: checkingAccount})
    } catch (error){
      this.handleError(res, error, "Error creating CheckingAccount");
    }
  }

  update = async (req: Request, res: Response) =>  {
    try {
      const id = req.params.id
      const {name, email, number} = req.body;

      const validation = this.isValidBody(name, email, number);
      if(!validation.isValid){
        return res.status(400).json({error: validation.msg});
      }

      const checkingAccount = await this.checkingAccountService.update(id, name, email, number);
      return res.status(200).json({message: "CheckingAccount has been updated", account: checkingAccount})
    } catch (error) {
      this.handleError(res, error, "Error updating CheckingAccount");
    }
  }

  delete = async (req: Request, res: Response) =>  {
    try{
      const id = req.params.id;
      await this.checkingAccountService.delete(id);
      return res.status(200).json({message: "CheckingAccount has been deleted"})
    } catch (error){
      this.handleError(res, error, "Error deleting CheckingAccount");
    }
  }

  findAll = async (req: Request, res: Response) =>  {
    try{
      const checkingAccounts = await this.checkingAccountService.findAll();
      return res.status(200).json({checkingAccounts: checkingAccounts});
    } catch (error){
      this.handleError(res, error, "Error fetching CheckingAccounts");
    }
  }

  findById = async (req: Request, res: Response) =>  {
    try{
      const id = req.params.id;
      const checkingAccount = await this.checkingAccountService.findById(id);
      if(checkingAccount == null){
        return res.status(404).json({error: "Could not find CheckingAccount"});
      }
      return res.status(200).json({checkingAccount: checkingAccount})
    } catch (error){
      this.handleError(res, error, "Error fetching CheckingAccount");
    }
  }

  // findByName = async (req: Request, res: Response) =>  {
  //   try{
  //     const {name} = req.query;
  //     const checkingAccount = await this.checkingAccountService.findByName(name);
  //     if(checkingAccount == null){
  //       return res.status(404).json({error: "Could not find CheckingAccount"});
  //     }
  //     return res.status(200).json({checkingAccount: checkingAccount})
  //   } catch (error){
  //     this.handleError(res, error, "Error fetching CheckingAccount");
  //   }
  // }

  private handleError(res: Response, error: unknown, msg: string){
    if(error instanceof Error){
      console.error(`${msg}. ${error.message}`);
      return res.status(400).json({error: error.message});
    } else {
      console.error(`Unexpected error: ${error}`);
      return res.status(500).json({error: "An unexpected error ocurred"});
    }
  }

  private isValidBody(name: any, email: any, number: any){
    if (typeof name !== "string" || name.trim().length == 0){
      return {isValid: false, msg: "Invalid name: must be a non empty string"}
    }
    if (typeof email !== "string" || email.trim().length == 0){
      return {isValid: false, msg: "Invalid email: must be a non empty string"}
    }
    if (typeof number !== "string" || number.trim().length == 0){
      return {isValid: false, msg: "Invalid number: must be a non empty string"}
    }
    return {isValid: true}
  }

  verifyExists = async (req: Request, res: Response, next: NextFunction)=> {
    try{
      const id = req.params.id;
      const checkingAccount = await this.checkingAccountService.findById(id);
      if(!checkingAccount){
        return res.status(404).json({error: "Could not find checking account"});
      }
      return next();
    } catch (error){
      this.handleError(res, error, "Error verify if exists checkingAccount")
    }
  }


}

export { CheckingAccountController }