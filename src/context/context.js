/* eslint-disable no-unused-vars */
import React, { useReducer, createContext} from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem("transactions")) || [{"amount":25,"category":"Extra income","type":"Income","date":"2021-04-12","id":"b0fde3fa-8cf4-4280-8ae0-68ef41d4339c"},{"amount":50,"category":"Pets","type":"Expense","date":"2021-04-12","id":"674f3914-a330-4d17-ba42-019260790743"},{"amount":300,"category":"Food","type":"Expense","date":"2021-04-12","id":"44ca1289-544e-47f2-a189-d4f3ed748bdf"},{"amount":50,"category":"Deposits","type":"Income","date":"2021-04-07","id":"f53ad009-89f8-4321-982c-4c7af5d422e2"},{"amount":200,"category":"Salary","type":"Income","date":"2021-04-12","id":"b413b6b3-5caa-4d50-a66e-320e10c93926"}];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    const deleteTransaction = ( id) => dispatch({type:'DELETE_TRANSACTION', payload: id });
    const addTransaction = (transaction) => dispatch({type: 'ADD_TRANSACTION', payload: transaction })

    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount)
    }, 0);

    return(
        <ExpenseTrackerContext.Provider value={{ 
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            { children }
        </ExpenseTrackerContext.Provider>
    );
}