import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <NavLink to="/AddTask" aria-current="page">
                Vedi lista delle task
            </NavLink>
            <NavLink to="/TaskList" aria-current="page">
                Aggiungi una task
            </NavLink>
        </>
    )
}