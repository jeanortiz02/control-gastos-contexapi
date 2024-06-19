
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date(),
    });
    
    const [error, setError] = useState('')
    const { dispatch, state} = useBudget()

    useEffect( () => {
        if ( state.editingId ) {
            const edit = state.expense.filter( currentExpense => currentExpense.id === state.editingId)[0];
            
            setExpense(edit);
        }
    }, [state.editingId])


    const handleChange = ( e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    const handleDateChange = ( value : Value ) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(expense).includes('') || Object.values(expense).includes(0)) {
            setError('Todos los campos son obligatorios');
            return;
        }

        // Agregando un nuevo gasto

        if ( state.editingId  ) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense}}})
        } else {
            dispatch( {type: 'add-expense', payload: { expense }})
        }

        // Reiniciar el State 
        setExpense( {
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date(),
        })
    }

  return (
    <form 
        className="space-y-5"
        onSubmit={ handleSubmit }
    >

        <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
            {state.editingId ? 'Guardar Cambios' : 'Nuevos Gastos'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseName"
                className="text-xl"
            >
                Nombre Gasto:
            </label>

            <input 
                type="text" 
                id="expenseName"
                placeholder="Agrega el nombre del gasto"
                className="bg-slate-100 p-2 "
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >
                Cantidad:
            </label>

            <input 
                type="number" 
                id="amount"
                placeholder="Agrega la cantidad del gasto, ejemplo: 300"
                className="bg-slate-100 p-2 "
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-xl"
            >
                Categoria:
            </label>

           <select 
                name="category" 
                className="p-2 bg-slate-100"
                id="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">-- Seleccione ---</option>
                    {categories.map( category => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
           </select>
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="date"
                className="text-xl"
            >
                Fecha Gasto:
            </label>

            <DatePicker 
                className='bg-slate-100 p-2 border-0'
                value={expense.date}
                onChange={handleDateChange}
            />

        </div>

        <input 
            type="submit" 
            value={state.editingId ? 'Actualizar Cambios' : 'Registrar Gasto'}
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        />
        

    </form>
  )
}
