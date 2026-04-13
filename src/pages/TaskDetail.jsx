import Header from '../components/Header'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import EditTaskModal from '../components/EditTaskModal'
import { useGlobalContext } from '../context/GlobalContext'

const TaskDetail = React.memo(() => {

    const { id } = useParams()
    const { removeTask, updateTask, tasks } = useGlobalContext()
    const navigate = useNavigate()

    const singleTask = tasks.find(task => task.id === parseInt(id))
    const [show, setShow] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const statusToClass = {
        'To do': 'bg-danger',
        'Doing': 'bg-warning',
        'Done': 'bg-success'
    }

    if (!singleTask) {
        return <p>Loading...</p>
    }

    function handleDelete() {
        console.log('Elimino task');
        removeTask(parseInt(id))
        navigate('/TaskList')
    }

    const handleUpdate = async updatedTask => {
        try {
            await updateTask(updatedTask.id, updatedTask)
            alert('modifica della task avvenuta correttamente')
            setEditModal(false)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <Header />

            <div className='container '>

                <div className='row m-3 border border-dark' key={id}>
                    <div className="col-sm " >
                        <h3> {singleTask.title}</h3>
                        <h4>{singleTask.description}</h4>
                        <button onClick={() => setShow(true)}
                            className='btn btn-danger m-3'>Elimina task
                        </button>
                        <button onClick={() => setEditModal(true)} className='btn btn-info'>
                            Modifica Task
                        </button>
                    </div>
                    <div className={`col-sm ${statusToClass[singleTask.status]}`}>
                        <h3 className="bold text-center mt-4">{singleTask.status}</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="bold mt-4">{` ${new Date(singleTask.createdAt).toLocaleString()}`}</h3>

                    </div >


                    <Modal
                        title={singleTask.title}
                        content={singleTask.description}
                        show={show}
                        onClose={() => setShow(false)}
                        onConfirm={handleDelete}

                    />
                    <EditTaskModal
                        task={singleTask}
                        show={editModal}
                        onClose={() => setEditModal(false)}
                        onSave={handleUpdate}
                    />

                </div>
            </div>

        </>
    )
})


export default TaskDetail