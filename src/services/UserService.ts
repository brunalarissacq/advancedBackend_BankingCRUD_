import { prisma } from "../prisma";
import { hash } from "bcryptjs";

class UserService {

  async create(name: string, email: string, password: string) {
    try {
      const userExist = await prisma.user.findUnique({
        where: {email}
      })
      if (userExist){
        throw new Error("User already exists in the database.")
      }
      const hashPassword = await hash(password, 10)
      return await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword
        }, select: {
          id: true,
          name: true,
          email: true,
          password: false,
          updatedAt: true,
          createdAt: true
        }
      })
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      throw error;
    }
  }

  async findAll(){
    try {
      return await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          updatedAt: true,
          createdAt: true
        }
      });
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
      throw error;
    }
  }

  async findById(id: string){
    try {
      return await prisma.user.findUnique({
        where: {
          id: id
        }, select: {
          id: true,
          name: true,
          email: true,
          password: false,
          updatedAt: true,
          createdAt: true
        }
      });
    } catch (error) {
      console.error(`Error fetching user: ${error}`);
      throw error;
    }
  }

  async delete(id: string){
    try {
      return await prisma.user.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
      throw error;
    }
  }

  async update(id: string, name: string, email: string, password: string){
    try {
      const userExist = await prisma.user.findUnique({
        where: {email}
      })
      if (userExist){
        throw new Error("User already exists in the database.")
      }
      const hashPassword = await hash(password, 10)
      return await prisma.user.update({
        where: {
          id: id
        }, data: {
          name,
          email,
          password: hashPassword
        }, select: {
          id: true,
          name: true,
          email: true,
          password: false,
          updatedAt: true,
          createdAt: true
        }
      });
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
      throw error;
    }
  }

}

export { UserService };