import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import { ChangeEvent } from "react";


export default function FilterByCategory() {

    const {dispatch} = useBudget();

    const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: 'add-filter-category',
            payload: { id: e.target.value},
        })
    }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
        
        <form action="">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label className="font-semibold" htmlFor="category">Filtrar Gastos</label>
                <select 
                    id="category"
                    name="category"
                    className="bg-slate-100 p-3 flex-1 rounded"
                    onChange={handleChange}
                >
                    <option value="">-- Todas las Categorias --</option>
                    {categories.map( category =>  (
                            <option 
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        )
                    )}
                </select>
            </div>
        </form>
    </div>
  )
}
