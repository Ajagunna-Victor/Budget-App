import React, { useState } from 'react';
import {AddBudgetModal, AddExpenseModal, BudgetCard, TotalBudgetCard, UncategorizedBudgetCard, ViewExpensesModal } from './components/index';
import {Button, Stack, Container} from 'react-bootstrap';
import { Uncategorized_Budget_ID, useBudgets } from './contexts/BudgetsContext';
import './App.css';


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal ] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal ] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId ] = useState();
  const [addExpensesModalBudgetId, setAddExpensesModalBudgetId ] = useState();
  const [budgets, getBudgetExpenses ] = useState();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpensesModalBudgetId(budgetId);
  }


  return (
    <>
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>
    <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        alignItems: "flex-start",
    }}>
      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce(
          (total, expense) => total + expense.amount, 0
        )
        return (
          <BudgetCard 
            key={budget.id}
            name={budget.name}
            amount={amount}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
          />
        )
      })}
      <UncategorizedBudgetCard 
          onAddExpenseClick={openAddExpenseModal}
          onViewExpensesClick={() => setViewExpensesModalBudgetId(Uncategorized_Budget_ID)}
      />
      <TotalBudgetCard />
    </div>
    </Container>
    <AddBudgetModal 
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
    />
    <AddExpenseModal 
        show={showAddExpenseModal}
        defaultBudgetId={addExpensesModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
    />
    <ViewExpensesModal 
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
    />
    </>
  );
}

export default App;
