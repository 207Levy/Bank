import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import TransactionsTable from "./components/transactionsTable";
import BankApiManager from "./serverApi/BankApiManger";
import NewTransactionCard from "./components/NewTransactionCard";

export default class App extends Component {
  constructor() {
    super();
    const apiManager = new BankApiManager();
    this.state = {
      BankApiManager: apiManager,
      transactions: [],
      categories: []
    };
  }

  async componentDidMount() {
    const transactionsFromApi =
      await this.state.BankApiManager.getAllTransactions();
    console.log(transactionsFromApi.data)
    this.setState({ transactions: transactionsFromApi.data });
  }
  async getAllTransactions() {
    const tr = await this.state.apiManager.getAllTransactions();
    console.log(tr);
    return tr;
  }
  deleteTransaction = (id) => {
    this.state.BankApiManager.deleteTransaction(id);
    this.setState({ transactions: this.getAllTransactions() });
  };
  render() {
    const state = this.state;
    return (
      <Router>
        <div className="App">
          <div className="header">
            <ResponsiveAppBar />
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <TransactionsTable
                transactions={this.state.transactions}
                deleteFunk={this.deleteTransaction}
              />
            )}
          />
          <Route
            exact
            path="/Operations"
            render={() => (
              <NewTransactionCard/>
            )}
          />
        </div>
      </Router>
    );
  }
}
