import { UserService } from "../services/UserService";
import {NextFunction, Request, Response} from "express";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async(req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.create(name, email, password);
      return res.status(201).json({message: "User has been created", user: user})
    } catch(error) {
      this.handleError(res, error, "Error creating user");
    }
  }

  findAll = async(req: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      return res.status(200).json({user: users});
    } catch(error) {
      this.handleError(res, error, "Error fetching users");
    }
  }

  findById = async (req: Request, res: Response) =>  {
    try{
      const id = req.params.id;
      const user = await this.userService.findById(id);
      if(!user){
        return res.status(404).json({error: "Could not find user"});
      }
      return res.status(200).json({user: user})
    } catch (error){
      this.handleError(res, error, "Error fetching user");
    }
  }

  delete = async (req: Request, res: Response) =>  {
    try{
      const id = req.params.id;
      await this.userService.delete(id);
      return res.status(204).json({message: "User has been deleted"})
    } catch (error){
      this.handleError(res, error, "Error deleting user");
    }
  }

  update = async (req: Request, res: Response) =>  {
    try {
      const id = req.params.id
      const {name, email, password} = req.body;
      const user = await this.userService.update(id, name, email, password);
      return res.status(200).json({message: "User has been updated", user: user})
    } catch (error) {
      this.handleError(res, error, "Error updating user");
    }
  }

  verifyExists = async (req: Request, res: Response, next: NextFunction)=> {
    try{
      const id = req.params.id;
      if(!this.validateId(id)) {
        return res.status(404).json({error: "Could not find user"});
      }
      const user = await this.userService.findById(id);
      if(!user){
        return res.status(404).json({error: "Could not find user"});
      }
      return next();
    } catch (error){
      this.handleError(res, error, "Error verify if exists user")
    }
  }

  private validateId(id: string) {
    return id.length ===24
  }

  private handleError(res: Response, error: unknown, msg: string){
    if(error instanceof Error){
      console.error(`${msg}. ${error.message}`);
      return res.status(400).json({error: error.message});
    } else {
      console.error(`Unexpected error: ${error}`);
      return res.status(500).json({error: "An unexpected error ocurred"});
    }
  }

}

export { UserController };