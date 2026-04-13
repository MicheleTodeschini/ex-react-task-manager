import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <nav className="d-flex align-items-center gap-3 p-3 bg-primary">
                <NavLink className="text-white " to='/' aria-current="page">Vai alla HomePage</NavLink>
                <NavLink className="text-white " to="/TaskList" aria-current="page">
                    Vedi lista delle task
                </NavLink>
                <NavLink className="text-white " to="/AddTask" aria-current="page">
                    Aggiungi una task
                </NavLink>
            </nav>
        </>
    )
}