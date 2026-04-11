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
                <form ref={formRef} onSubmit={handleSubmit}>
                    <label>
                        Nome Task: <input
                            type="text"
                            value={editedTask.title}
                            onChange={e => changeEditedTask('title', e)}
                        />
                    </label>
                    <label>
                        Descrizione della TAsk: <input
                            type="text"
                            value={editedTask.description}
                            onChange={e => changeEditedTask('description', e)}
                        />
                    </label>
                    <label>
                        Stato della task:

                        <select value={editedTask.status}
                            onChange={e => changeEditedTask('status', e)}>
                            {['To do', 'Doing', 'Done'].map((value, index) => (
                                <option value={value} key={index} >{value}</option>
                            ))}
                        </select>
                    </label>
                </form>
            }
            confirmText='Salva'
            show={show}
            onClose={onClose}
            onConfirm={() => formRef.current.requestSubmit()}

        />
    )
}