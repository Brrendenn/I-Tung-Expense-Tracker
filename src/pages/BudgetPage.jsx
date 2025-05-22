import React from 'react'

//helpers
import { calculateSpent, createExpense, deleteItem, getAllMatchingItems } from '../Helpers'

//rrd imports
import { useLoaderData } from 'react-router-dom';

//components
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';

//library
import { toast } from 'react-toastify';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

//loader
export async function budgetLoader({params}) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    if(!budget){
        throw new Error("The budget doesn't exist!");
    }

    return {budget, expenses};
}

//actions
export async function budgetAction({request}){
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    //create expense case
      if(_action === "createExpense"){
        try{
          createExpense ({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget
          })
          return toast.success(`Expense ${values.newExpense} created!`)
        }catch(e){
          throw new Error("There was a problem in creating your expense!")
        }
      }
      
    //delete expense
    if(_action === "deleteExpense"){
        try{
          deleteItem({
            key: "expenses",
            id: values.expenseId
          })
          return toast.success(`Expense deleted!`)
        }catch(e){
          throw new Error("There was a problem in deleting your expense!")
        }
      }
}

const BudgetPage = () => {
  const {budget, expenses} = useLoaderData();

  return (
    <div className="grid-lg">
        <h1 className="h2">
            <span className="accent">{budget.name} </span>
            Overview
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} showDelete={true}/>
            <AddExpenseForm budgets={[budget]}/>
        </div>
        {
            expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name} </span>
                        Expenses  
                    </h2>
                    <Table expenses={expenses} showBudget={false}/>
                </div>
            )
        }
        {
            expenses && expenses.length > 0 && (
                <div className="my-4 w-full max-w-md">
                    <h2 className="accent mb-2 text-lg font-bold">Expense Breakdown</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                              dataKey="value"
                              isAnimationActive={true}
                              data={[
                                {name: "Spent", value: calculateSpent(budget.id)},
                                {name: "Remaining", value: budget.amount - calculateSpent(budget.id)}
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label
                            >
                                <Cell key="spent" fill="#f87171"/>
                                <Cell key="remaining" fill="#4ade80"/>
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )
        }
    </div>
  )
}

export default BudgetPage