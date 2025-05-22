//rrd imports
import { Form, useFetcher } from "react-router-dom"

//library
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

//react imports
import { useEffect, useRef } from "react"

const AddBudgetForm = () => {
  const fetcher = useFetcher()
  const isSubmit = fetcher.state === "submitting"

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if(!isSubmit){
        formRef.current.reset();
        focusRef.current.focus();
    }
  }, [isSubmit])

  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Create budget
        </h2>
        <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
        >
            <div className="grid-xs">
                <label htmlFor="newBudget">Budget Name</label>  
                <input 
                type="text" 
                name="newBudget" 
                id="newBudget"
                placeholder="example., Clothings"
                required
                ref={focusRef}/>
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input 
                type="number"
                step="1000"
                name="newBudgetAmount"
                id="newBudgetAmount"
                placeholder="example., Rp20000"
                required
                inputMode="decimal"/>
            </div>
            <input type="hidden" name="_action" value="createBudget"/>
            <button type="submit" className="btn btn--dark transform active:scale-95 transition duration-150 ease-in-out" disabled={isSubmit}>
                {
                    isSubmit ? <span>Submitting...</span> :
                    <>
                        <span>Create Budget</span>
                        <CurrencyDollarIcon width={20}/>
                    </>
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm