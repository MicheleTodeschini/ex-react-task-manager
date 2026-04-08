import React from "react";

const TaskRow = React.memo(({ id, title, status, createdAt }) => {




    const statusToClass = {
        'To do': 'bg-danger',
        'Doing': 'bg-warning',
        'Done': 'bg-success'
    }

    return (

        <>
            {

                <div className='row' key={id}>
                    <div className="col-sm " >
                        <h3 className="bold">{title}</h3>
                    </div>
                    <div className={`col-sm ${statusToClass[status]}`}>
                        <h3 className="bold">{status}</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="bold">{createdAt}</h3>
                    </div>
                </div>
            }


        </>
    )
})

export default TaskRow