import {prisma} from "../prisma";
import {Request, Response} from "express";

class CheckingAccountService {
  async create(name: string, email: string, number: string){
    try{
      return await prisma.checkingAccount.create({
        data:{
          name,
          email,
          number
        }
      });
    } catch (error){
      console.error(`Error creating checkingAccount: ${error}`);
      throw error;
    }
  }

  async update(id: string, name: string, email: string, number: string) {
    try {
      return await prisma.checkingAccount.update({
        where: {id},
        data: {
          name,
          email,
          number
        }
      });
    } catch (error) {
      console.error(`Error updating checkingAccount: ${error}`);
      throw error;
    }
  }

  async delete(id: string){
    try{
      return await prisma.checkingAccount.delete({
        where: {id}
      });
    } catch (error){
      console.error(`Error deleting checkingAccount: ${error}`);
      throw error;
    }
  }

  async findAll(){
    try{
      return await prisma.checkingAccount.findMany({
        orderBy: {
          name: "asc"
        }
      });

    } catch (error){
      console.error(`Error fetching checkingAccounts: ${error}`);
      throw error;
    }
  }

  async findById(id: string){
    try{
      const checkingAccout = await prisma.checkingAccount.findUnique({
        where: {id}
      });
      if(!checkingAccout){
        throw new Error("CheckingAccounts not found")
      }
      return checkingAccout;
    } catch (error){
      console.error(`Error fetching checkingAccount: ${error}`);
      throw error;
    }
  }

  async findByName(name: string){
    try {
      return await prisma.checkingAccount.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive"
          }
        },
        orderBy: {
          name: "asc"
        }
      });
    } catch (error){
      console.error(`Error fetching checkingAccounts: ${error}`);
      throw error;
    }
  }


}

export { CheckingAccountService }