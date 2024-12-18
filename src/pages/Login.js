import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const notyf = new Notyf();

    // State hooks to store the values of the input fields
    const [emailOrUsername, setEmailOrUsername] = useState(""); // Accepts email or username
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    // Handles login form submission
    function authenticate(e) {
        e.preventDefault();

        fetch('https://blogapi-server.onrender.com/users/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailOrUsername, // The API expects "email", but it can also be a username
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                // Clear input fields after successful login
                setEmailOrUsername('');
                setPassword('');

                notyf.success(data.message);
            } else if (data.message === "No user found") {
                notyf.error(`${emailOrUsername} does not exist`);
            } else if (data.message === "Incorrect email/username or password") {
                notyf.error("Invalid credentials. Please try again.");
            } else {
                notyf.error("Something went wrong!");
            }
        })
        .catch(err => notyf.error("Unable to connect to server."));
    }

    // Retrieves user details and updates the context
    function retrieveUserDetails(token) {
        fetch('https://blogapi-server.onrender.com/users/details', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            });
        })
        .catch(() => notyf.error("Failed to retrieve user details."));
    }

    // Enables/disables the submit button
    useEffect(() => {
        if (emailOrUsername !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [emailOrUsername, password]);

    return (
        user.id ? (
            <Navigate to="/" />
        ) : (
            <Form className="col-6 mx-auto" onSubmit={authenticate}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group>
                    <Form.Label>Email or Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email or username"
                        required
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {isActive ? (
                    <Button className="col-12" variant="primary" type="submit">
                        Login
                    </Button>
                ) : (
                    <Button className="col-12" variant="danger" disabled>
                        Login
                    </Button>
                )}

                <p className="mx-auto py-3 text-center">
                    Don't have an account yet? <Link to="/register">Click here</Link> to register.
                </p>
            </Form>
        )
    );
}
