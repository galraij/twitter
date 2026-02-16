import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (

        //copy to css
        <div
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                padding: "12px 16px",
                borderBottom: "1px solid #ddd",
                background: "white",
                display: "flex",
                gap: "12px",
            }}
        >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </div>
    );
}
