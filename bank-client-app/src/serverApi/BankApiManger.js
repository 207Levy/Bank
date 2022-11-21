import axios from "axios";

export default class BankApiManager {
  constructor() {
    this.baseUrl = "http://localhost:8080/";
  }

  async getAllTransactions() {
    try {
      return await axios.get(this.baseUrl + "transactions");
    } catch (error) {
      console.warn(error);
    }
  }

  async getFilteredTransactions(args) {
    try {
      return await axios.get(
        this.baseUrl +
          "transactions" +
          `?category=${args["category"]}&amount=${args["amount"]}&date=${args["date"]}`
      );
    } catch (error) {
      console.warn(error);
    }
  }

  getBreakdown() {
    try {
      return axios.get(this.baseUrl + "breakdown");
    } catch (error) {
      console.warn(error);
    }
  }

  async getBalance() {
    try {
      return await axios.get(this.baseUrl + "transactions/balance");
    } catch (error) {
      console.warn(error);
    }
  }

  async getCatgories() {
    return await axios.get(this.baseUrl + "categories");
  }

  async deleteTransaction(id) {
    try {
      return await axios.delete(this.baseUrl + `transactions/${id}`);
    } catch (error) {
      console.warn(error);
    }
  }

  async addNewTransaction(transaction) {
    try {
      return await axios.post(this.baseUrl + "transactions", transaction);
    } catch (error) {
      console.warn(error);
    }
  }
}
