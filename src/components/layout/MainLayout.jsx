import {Header} from "@/components/header/Navigation.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ROUTES} from "@/constants/routes.js";

const MainLayout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate(ROUTES.LOGIN)
        }
    }, [token, navigate]);
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default MainLayout;