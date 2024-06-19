import { v4 as uid } from 'uuid'
import { DraftExpense, Expense } from "../types";


export type BudgetActions = 
    {type: 'add-budget', payload: { budget : number}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} | 
    {type: 'add-expense', payload: { expense : DraftExpense}} |
    {type: 'remove-expense', payload: { id : string}} |
    {type: 'get-expense-by-id', payload: { id : string}} |
    {type: 'update-expense', payload: { expense : Expense}} 

export type BudgetState = {
    budget: number;
    modal: boolean;
    expense: Expense[];
    editingId: Expense['id']
}


const initialBudget = () => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpense = () => {
    const localStorageExpense = localStorage.getItem('expense');
    return localStorageExpense ? JSON.parse(localStorageExpense) : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expense: initialExpense(),
    editingId: ''
}

const createExpense = (draftExpense : DraftExpense) : Expense  => {

    return {
        ...draftExpense,
        id: uid(),

    }
}

export const budgetReducer = (
    state: BudgetState = initialState, 
    action: BudgetActions

) => {

    if ( action.type === 'add-budget') {

        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if ( action.type === 'show-modal') {

        return {
            ...state,
            modal : true
        }
    }

    if ( action.type === 'close-modal') {

        return {
            ...state,
            modal : false,
            editingId: '',
        }
    }

    if ( action.type === 'add-expense' ) {
            const expense = createExpense( action.payload.expense );
        return {
            ...state,
            expense: [...state.expense, expense],
            modal: false,
        }
    }

    if ( action.type === 'remove-expense') {
        return {
            ...state,
            expense : state.expense.filter(exp => exp.id !== action.payload.id)
        }
    }

    if( action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if ( action.type === 'update-expense') {
        return {
            ...state,
            expense: state.expense.map( exp => exp.id === action.payload.expense.id ? action.payload.expense : exp ),
            modal: false,
            editingId: '',
        }
    }


    return state;
}