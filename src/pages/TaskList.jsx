import Header from "../components/Header";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";


export default function TaskList() {
    const { tasks } = useGlobalContext()

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h3 className="bold">Nome</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="bold">Stato</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="bold">Data di creazione</h3>
                    </div>
                </div>
                {
                    tasks.map(task => (
                        <TaskRow {...task} key={task.id} />
                    ))
                }
            </div>
        </>
    )
}