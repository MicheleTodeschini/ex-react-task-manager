import Modal from "./Modal";
import { useState, useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function EditTaskModal({ show, onClose, task, onSave }) {

    const formRef = useRef()
    const { tasks } = useGlobalContext()

    const [editedTask, setEditedTask] = useState(task)

    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSave(editedTask)
    }

    return (
        <Modal
            title='Modifica task'
            content={
                <form ref={formRef} onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                    <div>
                        <label className="form-label">Nome Task</label>
                        <input
                            className="form-control"
                            type="text"
                            value={editedTask.title}
                            onChange={e => changeEditedTask('title', e)}
                        />
                    </div>

                    <div>
                        <label className="form-label">Descrizione della Task</label>
                        <input
                            className="form-control"
                            type="text"
                            value={editedTask.description}
                            onChange={e => changeEditedTask('description', e)}
                        />
                    </div>

                    <div>
                        <label className="form-label">Stato della task</label>
                        <select
                            className="form-select"
                            value={editedTask.status}
                            onChange={e => changeEditedTask('status', e)}
                        >
                            {['To do', 'Doing', 'Done'].map((value, index) => (
                                <option value={value} key={index}>{value}</option>
                            ))}
                        </select>
                    </div>

                </form>
            }
            confirmText='Salva'
            show={show}
            onClose={onClose}
            onConfirm={() => formRef.current.requestSubmit()}

        />
    )
}