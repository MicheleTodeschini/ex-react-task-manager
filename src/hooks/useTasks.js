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

    const addTask = async ({ title, description, status }) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, status })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        setTasks(prevTasks => [...prevTasks, data.task]);
    };

    const removeTask = async (id) => {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        } else {
            console.log({ 'success': data.success });
            alert('Task eliminata')
        }
    }

    const updateTask = () => {

    }

    return { tasks, addTask, removeTask, updateTask }
}