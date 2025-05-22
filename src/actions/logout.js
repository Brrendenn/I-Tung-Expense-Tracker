//rrd imports
import { redirect } from "react-router-dom";

//helpers
import { deleteItem } from "../Helpers";

//library
import { toast } from "react-toastify";

export async function logoutAction() {
    //delete the user
    deleteItem({
        key: "userName"
    })
    deleteItem({
        key: "budgets"
    })
    deleteItem({
        key: "expenses"
    })

    toast.success("User deleted!")
    //return redirect
    return redirect("/")
    
}