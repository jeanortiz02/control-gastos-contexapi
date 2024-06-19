import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";


export default function ExpenseList() {

    const {state} = useBudget();

    const filteredExpense = state.currentCategory ? state.expense.filter( exp => exp.category === state.currentCategory) : state.expense
    const isEmpty = useMemo( () => filteredExpense.length === 0, [state.currentCategory]);


  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> 
          :(
            <>
            
              <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p> 
                {filteredExpense.map( expense => (
                  <ExpenseDetail
                    key={expense.id}
                    expense={expense}
                  />
                ))}
            
            </>
          ) 
        }
    </div>
  )
}
