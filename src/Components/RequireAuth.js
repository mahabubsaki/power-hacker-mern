import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../App";

const RequireAuth = ({ children }) => {
    const { setUser } = useContext(AppContext)
    const localStorageUser = localStorage.getItem('power-hacker-user')
    if (localStorageUser) {
        setUser(true)
    } else {
        localStorage.removeItem('power-hacker-user')
        localStorage.removeItem('token')
    }
    if (!localStorageUser) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;