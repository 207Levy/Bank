import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import TransactionsTable from "./components/transactionsTable";
import BankApiManager from "./serverApi/BankApiManger";
import NewTransactionCard from "./components/NewTransactionCard";
import FilterBar from "./components/FilterBar";
import { ExpensesPieChart } from "./components/ExpensesPieChart";
import { Breakdown } from "./components/Breakdown";

export default class App extends Component {
  constructor() {
    super();
    const apiManager = new BankApiManager();
    this.state = {
      BankApiManager: apiManager,
      transactions: [],
      categories: [],
      balance: 0,
    };
  }

  async componentDidMount() {
    this.getAllTransactions();
    const categoriesFromApi = await this.state.BankApiManager.getCatgories();

    this.setState({
      categories: categoriesFromApi.data,
    });
  }

  getAllTransactions = async () => {
    const transactions = await this.state.BankApiManager.getAllTransactions();
    const balance = await this.state.BankApiManager.getBalance();
    this.setState({
      transactions: transactions.data,
      balance: balance.data["SUM(amount)"],
    });
  };

  getFilteredTransactions = async (args) => {
    const transactions =
      await this.state.BankApiManager.getFilteredTransactions(args);
    this.setState({ transactions: transactions.data });
  };

  deleteTransaction = async (id) => {
    this.state.BankApiManager.deleteTransaction(id);
    this.getAllTransactions();
  };

  addTransaction = (transaction) => {
    this.state.BankApiManager.addNewTransaction(transaction);
    this.getAllTransactions();
    alert("transactions added successfuly");
  };
  render() {
    const state = this.state;
    return (
      <Router>
        <div className="App">
          <div className="header">
            <ResponsiveAppBar balance={this.state.balance} />
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <FilterBar
                  categories={this.state.categories}
                  filter={this.getFilteredTransactions}
                  reset={this.getAllTransactions}
                />
                <TransactionsTable
                  transactions={this.state.transactions}
                  deleteFunk={this.deleteTransaction}
                />
              </div>
            )}
          />
          <Route
            exact
            path="/Operations"
            render={() => (
              <NewTransactionCard
                categories={this.state.categories}
                addNewTransaction={this.addTransaction}
              />
            )}
          />

          <Route
            exact
            path="/Breakdown"
            render={() => (
              <Breakdown bankApiManager={this.state.BankApiManager}/>
            )}
          />
        </div>
      </Router>
    );
  }
}
