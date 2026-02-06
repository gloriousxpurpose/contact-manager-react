import { useDispatch } from "react-redux";
import { createUserData } from "../store/redux/userReducer";
import { useNavigate } from "react-router";
import { useState } from "react";

export const useRegister = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const registerUser = async (formData) => {
        setLoading(true);
        setMessage("");

        try {
        const res = await dispatch(createUserData(formData)).unwrap();
        setMessage(`✅ ${res.message}`);

        // pindah ke login setelah 3 detik
        setTimeout(() => navigate("/login"), 5000);
        } catch (err) {
        setMessage(`❌ ${err}`);
        } finally {
        setLoading(false);
        }

    }

    return { registerUser, loading, message };

}