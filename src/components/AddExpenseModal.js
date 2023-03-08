import React, { useRef } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets, Uncategorized_Budget_ID } from "../contexts/BudgetsContext";


export default function AddExpenseModal({
    show, 
    handleClose, 
    defaultBudgetId,
}) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();
    const { AddExpense, budgets } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault();
        AddExpense({
            descripton: descriptionRef.current.value,
            amount: amountRef.current.value,
            budgetId: budgetIdRef.current.value,
        })
        handleClose();
    }
    
    return (
        <Modal
        show={show}
        onHide={handleClose}
    >
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Expenses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        ref={descriptionRef}
                        autoFocus
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>amount</Form.Label>
                        <Form.Control 
                            type="number"
                            ref={amountRef}
                            min={0}
                            step={0.01}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            <option id={Uncategorized_Budget_ID}>Uncategorized</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>
                                {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
            </Modal.Body>
        </Form>
    </Modal>
    )
}