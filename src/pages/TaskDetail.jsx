import Header from '../components/Header'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams, Link } from 'react-router-dom'
import useTasks from '../hooks/useTasks'

const TaskDetail = React.memo(() => {

    const { id } = useParams()
    const url = import.meta.env.VITE_URL_API
    const { removeTask } = useTasks()

    const [singleTask, setSingleTask] = useState([])

    async function fetchJson(url) {
        const response = await fetch(url)
        const obj = await response.json()
        return obj
    }

    const statusToClass = {
        'To do': 'bg-danger',
        'Doing': 'bg-warning',
        'Done': 'bg-success'
    }

    useEffect(() => {
        async function fetchSingolo() {
            try {
                const data = await fetchJson(url)

                const taskSingola = data.find(task => task.id === parseInt(id))

                console.log(taskSingola)

                setSingleTask(taskSingola)
            } catch (error) {
                console.error(error)
            }
        }

        fetchSingolo()
    }, [id])

    function handleDelete() {
        console.log('Elimino task');
        removeTask(parseInt(id))

    }

    return (
        <>
            <Header />
            {

                <div className='row' key={id}>
                    <div className="col-sm " >
                        <h3> {singleTask.title}</h3>


                        <p>{singleTask.description}</p>
                        <Link to={'/TaskList'}>
                            <button onClick={handleDelete}

                                className='btn btn-danger'>Elimina task</button>
                        </Link>
                    </div>
                    <div className={`col-sm ${statusToClass[singleTask.status]}`}>
                        <h3 className="bold">{singleTask.status}</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="bold">{` ${new Date(singleTask.createdAt).toLocaleString()}`}</h3>

                    </div>
                </div>
            }
        </>
    )
})


export default TaskDetail