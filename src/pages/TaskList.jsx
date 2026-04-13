import { useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";


export default function TaskList() {
    const { tasks } = useGlobalContext()
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const debounceSearch = useCallback(debounce(setSearchQuery, 500))

    function handleSort(keyWord) {
        if (sortBy === keyWord) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(keyWord)
            setSortOrder(1)
        }
    }

    const sortedTask = useMemo(() => {
        let sorted = [...tasks]

        if (searchQuery) {
            sorted = sorted.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }

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
    }, [tasks, sortBy, sortOrder, searchQuery])

    function debounce(callback, delay) {
        let timer
        return (value) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback(value)
            }, delay);
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <input
                    className="m-3"
                    placeholder="Cerca qui le tue task"
                    type="text"

                    onChange={e => debounceSearch(e.target.value)} />
                <div className="row">
                    <div className="col-sm bg-primary" onClick={() => handleSort('title')}>
                        <h3 className="bold text-white">Nome</h3>
                    </div>
                    <div className="col-sm bg-info" onClick={() => handleSort('status')}>
                        <h3 className="bold text-white">Stato</h3>
                    </div>
                    <div className="col-sm bg-primary" onClick={() => handleSort('createdAt')}>
                        <h3 className="bold text-white">Data di creazione</h3>
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