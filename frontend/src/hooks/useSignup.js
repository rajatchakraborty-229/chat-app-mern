import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}=useAuthContext()

    const signUp = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullname, username, password, confirmPassword, gender });
        if (!success) {
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
            });

            if (!res.ok) {
                const data = await res.json(); // Read the JSON response only once
                if (res.status === 400 && data.error) {
                    toast.error(data.error); // Display error message from server
                } else {
                    throw new Error('Network response was not ok');
                }
            } else {
                const data = await res.json();
                localStorage.setItem("chat-user",JSON.stringify(data))
                setAuthUser(data)
                console.log(data);
                toast.success("Signed up successfully!"); // Example success message
            }
        } catch (error) {
            console.error('Sign up error:', error);
            toast.error("Failed to sign up. Please try again later.");
        } finally {
            setLoading(false); // Ensure loading is set to false after a response
        }
    };

    return { loading, signUp };
}

export default useSignup;

function handleInputErrors({ fullname, username, password, confirmPassword, gender }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}
