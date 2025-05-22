//libary
import { toast } from "react-toastify";

//helpers
import { deleteItem, getAllMatchingItems } from "../Helpers";

//rrd imports
import { redirect } from "react-router-dom";

export function deleteBudget({params}){
    try{
        deleteItem({
        key: "budgets",
        id: params.id
    });

    const associatedExpenses = getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    associatedExpenses.forEach((expense) => {
        deleteItem({
            key: "expenses",
            id: expense.id
        });
    });
    toast.success("Budget deleted succesfully!");
    } catch(e){
        throw new Error("There was a problem in deleting your budget.");
    }
    return redirect("/");
}