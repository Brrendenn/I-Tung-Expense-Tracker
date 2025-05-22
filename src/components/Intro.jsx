//rrd imports
import { Form } from "react-router-dom"

//library
import { UserPlusIcon } from "@heroicons/react/24/solid"
const Intro = () => {
  return (
    <div className="intro">
        <div>
            <h1>
                Save More <br/><span className="accent">Stress Less</span>
            </h1>
            <p>
                Track your expenses, set budgets, and achieve
                your financial goals effortlessly. I-Tung helps 
                you manage your money with simplicity
            </p>
            <Form method="post">
                <input 
                type="text" 
                name="userName" 
                required 
                placeholder="What is your name?" 
                aria-label="Your Name" 
                autoComplete="given-name"/>
                <input type="hidden" name="_action" value="newUser"/>
                <button type="submit" className="btn btn--dark transform active:scale-95 transition duration-150 ease-in-out">
                    <span>Create Username</span>
                    <UserPlusIcon width={20}/>
                </button>
            </Form>
        </div>
    </div>
  )
}

export default Intro