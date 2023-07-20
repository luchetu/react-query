import React from 'react'
import DynamicForm from './DynamicForm'
import { formFields } from "./formConfigs/caseForm.json"

function caseForm() {

    return (
        <div className='container'><DynamicForm formFields={formFields?.steps} /></div>
    )
}

export default caseForm