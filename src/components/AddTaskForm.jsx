import { useMemo, useRef, useState } from "react"
import useTasks from "../hooks/useTasks";

export default function AddTaskForm() {

    const { addTask } = useTasks();
    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\\\`~`;

    const [title, setTitle] = useState('')

    const descriptionRef = useRef()
    const statoTaskRef = useRef()

    async function handleSubmit(e) {
        e.preventDefault()
        const status = statoTaskRef.current.value
        const description = descriptionRef.current.value

        try {
            await addTask({
                title,
                description,
                status
            });
            alert('task aggiunta')
        } catch (err) {
            alert(err)
            console.error(err.message);
        }
        setTitle('')
        statoTaskRef.current.value = ''
        descriptionRef.current.value = ''

    }

    const checkTitle = useMemo(() => {
        const titoloValido = title.split('').every(char =>
            !symbols.includes(char)
        )
        return titoloValido && title !== ''
    }, [title])

    return (
        <>
            <div className="container mt-4">

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Inserisci il nome della nuova task"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <div
                            className="form-text"
                            style={{ color: checkTitle ? 'green' : 'red' }}
                        >
                            {checkTitle ? 'Titolo valido' : 'Il campo non può essere vuoto e non può contenere simboli speciali'}</div>
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control w-50"
                            type="text"
                            placeholder="aggiungi la descrizione per la task"
                            ref={descriptionRef}
                        />
                    </div>
                    <div className="mb-3 w-50">
                        <select className="form-select"
                            ref={statoTaskRef}
                            required
                        >
                            <option value="">Selezione lo stato</option>
                            <option value="To do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary"
                    >Invia modulo aggiunta task</button>

                </form>
            </div>
        </>
    )

}