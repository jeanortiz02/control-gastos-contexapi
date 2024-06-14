import { useState, ChangeEvent, useMemo, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
  
  const [budget, setBudget ] = useState(0)
  const {dispatch} = useBudget()

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setBudget(e.target.valueAsNumber)
    // console.log(e.target.valueAsNumber)
  }

  const handleSubmit = ( e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: 'add-budget', payload : {budget}})
    
  }

  const isValid = useMemo( () => {
          return (isNaN(budget)) || budget <= 0
  },[budget])

  return (
    
    <form className="space-y-5" onSubmit={handleSubmit }>
        <div className="flex flex-col space-y-5">
          <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
            Definir Presupuesto
          </label>
          <input 
            id="budget"
            type="number" 
            className="w-full bg-white border-gray-200 p-2 "
            placeholder="Define tu presupuesto"
            name="budget"
            value={budget || ''}
            onChange={ handleChange }
          />
        </div>
        <input 
           type="submit"
           value='Definir prepuesto'
           disabled={isValid}
           className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-40"
        />
    </form>
  )
  
}
