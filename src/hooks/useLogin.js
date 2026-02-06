import { useDispatch } from "react-redux";
import { loginUserData } from "../store/redux/userReducer";
import { useNavigate } from "react-router";
import { useState } from "react";

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const loginUser = async (formData) => {
        setLoading(true);
        setMessage("");

        try {
        const res = await dispatch(loginUserData(formData)).unwrap();
        setMessage(`✅ ${res.message}`);
        // pindah ke halaman home setelah login berhasil
        setTimeout(() => navigate("/home"), 2000);
        } catch (err) {
        setMessage(`❌ ${err}`);
        } finally {
        setLoading(false);
        }
    };

    return { loginUser, loading, message };
};