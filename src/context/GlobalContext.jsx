import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext()





function GlobalProvider({ children }) {

    const taskData = useTasks()

    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    );


}

function useGlobalContext() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };