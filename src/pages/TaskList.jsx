import { useState, useMemo } from "react";
import Header from "../components/Header";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";


export default function TaskList() {
    const { tasks } = useGlobalContext()
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)
    const [searchQuery, setSearchQuery] = useState()

    function handleSort(keyWord) {
        if (sortBy === keyWord) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(keyWord)
            setSortOrder(1)
        }
    }

    const sortedTask = useMemo(() => {
        const sorted = [...tasks]

        sorted.sort((a, b) => {
            let result = 0

            if (sortBy === 'title') {
                result = a.title.localeCompare(b.title)
            }
            if (sortBy === 'createdAt') {
                result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            if (sortBy === 'status') {
                const order = {
                    "To do": 0,
                    "Doing": 1,
                    "Done": 2
                }
                result = order[a.status] - order[b.status]
            }
            return result * sortOrder;
        })
        return sorted
    }, [tasks, sortBy, sortOrder])

    return (
        <>
            <Header />
            <input placeholder="Cerca qui le tue task"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)} />
            <div className="container">
                <div className="row">
                    <div className="col-sm" onClick={() => handleSort('title')}>
                        <h3 className="bold">Nome</h3>
                    </div>
                    <div className="col-sm" onClick={() => handleSort('status')}>
                        <h3 className="bold">Stato</h3>
                    </div>
                    <div className="col-sm" onClick={() => handleSort('createdAt')}>
                        <h3 className="bold">Data di creazione</h3>
                    </div>
                </div>
                {
                    sortedTask.map(task => (
                        <TaskRow {...task} key={task.id} />
                    ))
                }
            </div>
        </>
    )
}