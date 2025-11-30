import { useNavigate } from "react-router-dom";

const useCerrarSesion = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return { logout };
};

export default useCerrarSesion;