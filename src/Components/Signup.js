// Signup.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSignup = (e) => {
        e.preventDefault();
        // Here you would typically handle signup logic
        console.log('Signing up with:', { username, email, password });
        
        // For demonstration, we'll just redirect to the dashboard
        // In a real application, you would validate the credentials
        history.push('/dashboard');
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;