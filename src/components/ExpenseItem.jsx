import React from 'react'

//Helpers
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../Helpers'

//rrd imports
import { Link, useFetcher } from 'react-router-dom';

//library
import { TrashIcon } from '@heroicons/react/24/solid';

const ExpenseItem = ({expense, showBudget}) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId 
  })[0];

  return (
    <>
       <td>{expense.name}</td>
       <td>{formatCurrency(expense.amount)}</td>
       <td>{formatDateToLocaleString(expense.createdAt)}</td>
       <td>{showBudget && (<Link className="transform active:scale-95 transition duration-150 ease-in-out" to={`/budget/${budget.id}`}>{budget.name}</Link>)}</td>
       <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense"/>
          <input type="hidden" name="expenseId" value={expense.id}/>
          <button type="submit" className="btn btn--warning transform active:scale-95 transition duration-150 ease-in-out" aria-label={`Delete ${expense.name} expense`}>
            <TrashIcon width={20}/>
          </button>
        </fetcher.Form>
       </td>
    </>
  )
}

export default ExpenseItem