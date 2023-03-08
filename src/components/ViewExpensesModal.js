import React from "react";
import { Modal, Button, Stack } from 'react-bootstrap';
import { Uncategorized_Budget_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";


export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getBudgetExpenses(budgetId);
    const budget = 
    Uncategorized_Budget_ID === budgetId
    ? { name: "Uncategorized", id: Uncategorized_Budget_ID }
    : budgets.find(b => b.id === budgetId)


    return (
        <Modal
            show={budgetId != null}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== Uncategorized_Budget_ID && (
                            <Button 
                                onClick={() => {
                                    deleteBudget(budget);
                                    handleClose();
                                }}
                                variant="outline-danger"
                            >
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.descripton}</div>
                            <div className="fs-5">
                                {currencyFormatter.format(expense.amount)}
                            </div>
                            <Button
                                onClick={() => deleteExpense(expense)}
                                size="sm"
                                variant="outline-danger"
                            >
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}