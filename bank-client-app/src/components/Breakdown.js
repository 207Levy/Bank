import { ExpensesPieChart } from "./ExpensesPieChart";
import { ExpensesTimelineChart } from "./ExpensesTimelineChart";
import { useState } from "react";
import { useEffect } from "react";

export function Breakdown(props) {
  const [categoriesExpenses, setCategoriesExpenses] = useState({});
  const [categoriesEarnings, setCategoriesEarnings] = useState({});

  const [timeline, setTimeline] = useState({});

  const getBreakdownData = async () => {
    const breakdownData = await props.bankApiManager.getBreakdown();
    const pieData = makePieData(breakdownData.data["categories"]);
    const timalineData = makeTimelineData(breakdownData.data["dates"])
    setCategoriesEarnings(pieData["earn"]);
    setCategoriesExpenses(pieData["expense"]);
    setTimeline(timalineData);
  };

  useEffect(() => {
    getBreakdownData();
  }, []);

  const makePieData = (categories) => {
    let expensesData = [["Categories", "Expenses"]];
    let earningsData = [["Categories", "Earnings"]];

    for (let item of categories) {
      let entries = Object.entries(item);
      if (entries[0][1] >= 0) {
        earningsData.push(entries[0]);
      } else {
        expensesData.push([entries[0][0], -1 * entries[0][1]]);
      }
    }
    return { earn: earningsData, expense: expensesData };
  };

  const makeTimelineData = (dates) => {
    let data = [["Year", "Net profit"]];
    for (let item of dates) {
        let entries = Object.entries(item);
        data.push(entries[0])
      }
    return data
  };

  return (
    <div>
      <ExpensesPieChart expenses={categoriesExpenses} title="My Expenses" />
      <ExpensesPieChart expenses={categoriesEarnings} title="My Earnings" />

      <ExpensesTimelineChart expenses={timeline} />
    </div>
  );
}
