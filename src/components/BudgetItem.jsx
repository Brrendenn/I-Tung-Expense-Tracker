import React from 'react'

//Helper 
import { calculateSpent, formatCurrency, formatPercentage } from '../Helpers';

//rrd imports
import { Form, Link } from 'react-router-dom';

//library
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';

const BudgetItem = ({budget, showDelete = false}) => {

  const {id, name, amount, color} = budget;
  const spent = calculateSpent(id);

  return (
    <div className="budget">
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} budgeted</p>
        </div>
        <progress max={amount} value={spent}>
            {formatPercentage(spent / amount)}
        </progress>
        <div className="progress-text">
            <small>{formatCurrency(spent)}spent</small>
            <small>{formatCurrency(amount - spent)}remaining</small>
        </div>
        {
          showDelete ? (
            <div className="flex-sm">
              <Form method="post" action="delete" onSubmit={(event) => {
                if(!confirm("Budget will be deleted permanently!")){
                  event.preventDefault();
                }
              }}>
                <button type="submit" className="btn transform active:scale-95 transition duration-150 ease-in-out">
                  <span>Delete</span>
                  <TrashIcon width={20}/>
                </button>
              </Form>
            </div>
          ) : (
            <div className="flex-sm">
              <Link
                to={`/budget/${id}`}
                className="btn transform active:scale-95 transition duration-150 ease-in-out"
              >
                <span>View Details</span>
                <BanknotesIcon width={20}/>
              </Link>
            </div>
          )
        }
    </div>
  )
}

export default BudgetItem