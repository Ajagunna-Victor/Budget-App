import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext();

export const Uncategorized_Budget_ID = "Uncategorized";

export function useBudgets() {
    return useContext(BudgetsContext);
}

export function BudgetsProvider({children}) {
    const [budgets, setBudgets ] = useLocalStorage('budgets', []);
    const [expenses, setExpenses ] = useLocalStorage('expenses', []);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expenses => expenses.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [ ...prevExpenses, { id: uuidV4(), description, amount, budgetId}]
        })
    }

    function AddBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [ ...prevBudgets, { id: uuidV4(), name, max}]
        })
    }

    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expenses => {
                if(expenses.budgetId !== id ) return expenses
                return { ...expenses, budgetId: Uncategorized_Budget_ID }
            })
        })

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetsContext.Provider 
            value= {{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                AddBudget,
                deleteBudget,
                deleteExpense,
            }}
        >
            {children}
        </BudgetsContext.Provider>
    )
};