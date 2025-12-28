"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const router = useRouter(); // Corrected: Hook must be called as a function

    function validate() {
        let err = {};
        if (!formValues.email) {
            err.email = "Value for email is required";
        }
        if (!formValues.password) {
            err.password = "Value for password is required";
        } else if (formValues.password.length < 6) {
            err.password = "Password needs to be greater than 6";
        }
        return err;
    }

    async function onSubmitHandler(e) { // Corrected: Added async for await fetch
        e.preventDefault();

        let err = validate();
        if (Object.keys(err).length > 0) { // Corrected: Parenthesis placement
            return;
        }

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: formValues.email, password: formValues.password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert('Login Failed');
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={onSubmitHandler}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={formValues.email} 
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} 
                />

                <label>Password</label>
                <input 
                    type="password" 
                    value={formValues.password} 
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })} 
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}