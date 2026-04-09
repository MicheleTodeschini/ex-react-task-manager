import Header from '../components/Header'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const TaskDetail = React.memo(({ title, status, createdAt }) => {

    const { id } = useParams()
    const url = import.meta.env.VITE_URL_API

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

    return (
        <>
            <Header />
            {

                <div className='row' key={id}>
                    <div className="col-sm " >
                        <NavLink to="/task/:id" aria-current="page">
                            {singleTask.title}
                        </NavLink>
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