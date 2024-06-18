import { v4 as uid } from 'uuid'
import { DraftExpense, Expense } from "../types";


export type BudgetActions = 
    {type: 'add-budget', payload: { budget : number}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} | 
    {type: 'add-expense', payload: { expense : DraftExpense}} 

export type BudgetState = {
    budget: number;
    modal: boolean;
    expense: Expense[]
}

export const initialState : BudgetState = {
    budget: 0,
    modal: false,
    expense: [],
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
            modal : false
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


    return state;
}