import { useContext, useEffect, useState } from "react";

const url = import.meta.env.VITE_URL_API

async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}

export default function useTasks() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchUrl() {

            const data = await fetchJson(url)
            setTasks(data)
        }
        fetchUrl()

    }, [])

    const addTask = () => {

    }

    const removeTask = () => {

    }

    const updateTask = () => {

    }

    return { tasks, addTask, removeTask, updateTask }
}