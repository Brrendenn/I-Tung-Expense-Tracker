//rrd imports
import { Link, useLoaderData } from "react-router-dom";

//helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../Helpers"

//libary
import { toast } from "react-toastify";

//Components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//action
export async function dashboardAction({request}){
  await waait();

  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data)

  //new user case
  if(_action === "newUser"){
      try{
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome, ${values.userName}`)
    }catch(e){
      throw new Error("There was a problem creating your account.")
    }
  }

  //create budget case
  if(_action === "createBudget"){
    try{
      //create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount
      })
      return toast.success("Budget Created!")
    }catch(e){
      throw new Error("There was a problem in creating your budget.")
    }
  }

  //create expense case
  if(_action === "createExpense"){
    try{
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense} created!`)
    }catch(e){
      throw new Error("There was a problem in creating your expense!")
    }
  }

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
//loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return {userName, budgets, expenses};
}

const Dashboard = () => {
  const {userName, budgets, expenses} = useLoaderData();  

  return (
    <div>
        {userName ? (
          <div className="dashboard">
            <h1>Welcome back, <span className="accent">{userName}</span></h1>
            <div className="grid-sm">
              {
                budgets && budgets.length > 0 ? 
                  (<div className="grid-lg">
                    <div className="flex-lg">
                        <AddBudgetForm />
                        <AddExpenseForm budgets={budgets} />
                    </div>
                    <h2>Existing Budgets</h2>
                    <div className="budgets">
                      {
                        budgets.map((budget) => (
                          <BudgetItem key={budget.id}
                          budget={budget} />
                        ))
                      }
                    </div>
                    {
                      expenses && expenses.length > 0
                      && (
                        <div className="grid-md">
                          <h2>Recent Expenses</h2>
                          <Table expenses={expenses.sort((a, b) => b.createdAt -
                          a.createdAt).slice(0, 8)}/>

                          {expenses.length > 8 && (
                            <Link
                              to="expenses"
                              className="btn btn--dark"
                            >
                              View All Expenses
                            </Link>
                          )}
                        </div>
                      )
                    }
                  </div>
                  )
                  : (
                    <div className="grid-sm">
                      <p>Create a budget for your expenses!</p>
                      <AddBudgetForm />
                    </div>
                  )
              }
            </div>
          </div>
        ) : (<Intro/>)}
    </div>
  )
}

export default Dashboard