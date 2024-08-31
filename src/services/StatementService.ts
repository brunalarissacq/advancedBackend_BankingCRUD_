import {prisma} from "../prisma";

class StatementService {

  async deposit(idCheckingAccount: string, amount: number, description: string) {
    try {
      if (amount <=0){
        throw new Error("Amount must be greater than 0");
      }
      return await prisma.statement.create({
        data: {
          idCheckingAccount,
          amount,
          description,
          type: "credit"
        }
      });
    } catch (error) {
      console.error(`Error creating deposit: ${error}`);
      throw error;
    }
  }

  async getBalance(idCheckingAccount: string){
    try {
      const aggregate = await prisma.statement.aggregate({
        _sum: {
          amount: true
        },
        where: { idCheckingAccount }
      });
      return aggregate._sum.amount ?? 0;
    } catch (error) {
      console.error(`Error fetching balance: ${error}`);
      throw error;
    }
  }

  async withdraw(idCheckingAccount: string, amount: number, description: string){
    try {
      return this.createDebt(idCheckingAccount, amount, description);
    } catch (error) {
      console.error(`Error creating withdraw: ${error}`);
      throw error;
    }
  }

  async getAll(idCheckingAccount: string){
    try {
      return await prisma.statement.findMany({
        where: {
          idCheckingAccount
        },
        orderBy: {
          createdAt: "desc"
        }
      })
    } catch (error) {
      console.error(`Error fetching statements: ${error}`);
      throw error;
    }
  }

  async getById(idStatement: string){
    try {
      return await prisma.statement.findUnique({
        where: {
          id: idStatement
        }
      });
    } catch (error) {
      console.error(`Error fetching statement: ${error}`);
      throw error;
    }
  }

  async getByPeriod(idCheckingAccount: string, startDate: Date, endDate: Date){
    try {
      return await prisma.statement.findMany({
        where: {
          idCheckingAccount,
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    } catch (error) {
      console.error(`Error fetching statements: ${error}`);
      throw error;
    }
  }

  async pix(idCheckingAccount: string, amount: number, description: string){
    try {
      return this.createDebt(idCheckingAccount, amount, `PIX - ${description}`);
    } catch (error) {
      console.error(`Error creating pix: ${error}`);
      throw error;
    }
  }

  async ted(idCheckingAccount: string, amount: number, description: string){
    try {
      return this.createDebt(idCheckingAccount, amount, `TED - ${description}`);
    } catch (error) {
      console.error(`Error creating ted: ${error}`);
      throw error;
    }
  }

  private async createDebt(idCheckingAccount: string, amount: number, description: string) {
    try {
      if (amount <= 0) {
        throw new Error("Invalid amount")
      }
      const balance = await this.getBalance(idCheckingAccount);
      if (amount > balance) {
        throw new Error("Insufficient funds")
      }
      return await prisma.statement.create({
        data: {
          idCheckingAccount,
          amount: amount * -1,
          description,
          type: "debit"
        }
      });
    } catch (error) {
      console.error(`Error creating pix: ${error}`);
      throw error;
    }
  }
}

export { StatementService }