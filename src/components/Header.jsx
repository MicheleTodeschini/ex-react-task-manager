import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <nav >
                <NavLink to='/' aria-current="page">Vai alla HomePage</NavLink>
                <NavLink to="/TaskList" aria-current="page">
                    Vedi lista delle task
                </NavLink>
                <NavLink to="/AddTask" aria-current="page">
                    Aggiungi una task
                </NavLink>
            </nav>
        </>
    )
}