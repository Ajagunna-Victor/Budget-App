import React from "react";
import { Uncategorized_Budget_ID, useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";


export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses(Uncategorized_Budget_ID).reduce(
        (total, expense) => total + expense.amount, 0
    )
    if (amount === 0) return null;
    return (
        <BudgetCard
            amount={amount}
            name="Uncategorized"
            gray
            {...props}
        />
    )
}