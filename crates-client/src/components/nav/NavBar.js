import { logout } from "../helpers/logout"
import { useNavigate } from "react-router-dom"

export const NavBar = () => {

    const navigate = useNavigate();

    return (
        <>
            <h1 className="text-black">"Hello World!"</h1>
            <button onClick={() => logout.logout(navigate)}>Sign Out</button>
        </>
    )
}