import React from "react";
import { NavLink } from "react-router-dom";

const TaskRow = React.memo(({ id, title, status, createdAt }) => {




    const statusToClass = {
        'To do': 'bg-danger',
        'Doing': 'bg-warning',
        'Done': 'bg-success'
    }

    return (

        <>
            {

                <div className='row border border-secondary bg-light' key={id}>
                    <div className="col-sm " >
                        <NavLink to={`/task/${id}`} className='text-decoration-none text-dark ' aria-current="page">
                            {title}
                        </NavLink>
                    </div>
                    <div className={`col-sm ${statusToClass[status]}`}>
                        <h3 className="bold ">{status}</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="bold">{` ${new Date(createdAt).toLocaleString()}`}</h3>
                    </div>
                </div>
            }


        </>
    )
})

export default TaskRow