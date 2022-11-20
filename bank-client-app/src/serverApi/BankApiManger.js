import axios from "axios";

export default class BankApiManager {
  constructor() {
    this.baseUrl = "http://localhost:8080/";
  }

  async getAllTransactions() {
    return await axios.get(this.baseUrl + "transactions");
  }

  async getFilteredTransactions(args) {
    return await axios.get(
      this.baseUrl +
        "transactions" +
        `?category=${args["category"]}&amount=${args["amount"]}&date=${args["date"]}`
    );
  }

  getBreakdown() {
    return axios.get(this.baseUrl + "breakdown");
  }

  async getBalance() {
    return await axios.get(this.baseUrl + "transactions/balance");
  }

  async getCatgories() {
    return await axios.get(this.baseUrl + "categories");
  }

  async deleteTransaction(id) {
    return await axios.delete(this.baseUrl + `transactions/${id}`);
  }

  async addNewTransaction(transaction) {
    return await axios.post(this.baseUrl + "transactions", transaction);
  }
}
