import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const GlobalContext = createContext()

const url = import.meta.env.VITE_URL_API

async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}

function GlobalProvider({ children }) {

    const [task, setTask] = useState([])

    useEffect(() => {
        async function fetchUrl() {

            const data = await fetchJson(url)
            setTask(data)
        }
        fetchUrl()

    }, [])
    console.log(task);
    return (
        <GlobalContext.Provider value={{ task, setTask }}>
            {children}
        </GlobalContext.Provider>
    );


}

function useGlobalContext() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };