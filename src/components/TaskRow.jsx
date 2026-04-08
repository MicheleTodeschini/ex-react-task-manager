import { useGlobalContext } from "../context/GlobalContext";

export default function TaskRow() {

    const { tasks } = useGlobalContext()
    console.log(tasks);


    const statusToClass = {
        'To do': 'bg-danger',
        'Doing': 'bg-warning',
        'Done': 'bg-success'
    }



    return (

        <>
            {tasks?.map((task) => (
                <div className='row' key={task.id}>
                    <div className="col-sm " >
                        <h3 className="bold">{task.title}</h3>
                    </div>
                    <div className={`col-sm ${statusToClass[task.status]}`}>
                        <h3 className="bold">{task.status}</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="bold">{task.createdAt}</h3>
                    </div>
                </div>
            ))}

        </>
    )
}