import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Layouts
import Main, { mainLoader } from "./layouts/Main";

//Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ExpensesPage, { expenseLoader, expensesAction } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import Error from "./pages/Error";

//Actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

//clerk
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

//Library
import { ToastContainer } from "react-toastify";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: (
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col items-center text-center justify-center h-full">
                <h1 className="text-2xl font-bold mt-2">Welcome to <span className="accent">I-Tung</span></h1>
                <p>Please sign in to access your dashboard.</p>
              </div>
            </SignedOut>
          </>
        ),
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expenseLoader,
        action: expensesAction
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;
