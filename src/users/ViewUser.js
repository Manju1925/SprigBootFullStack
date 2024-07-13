import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function ViewUser() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <p>Loading user details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <h5 className="card-header">User Details</h5>
                <div className="card-body">
                    <div className="mb-3">
                        <strong>Name:</strong> {user.name}
                    </div>
                    <div className="mb-3">
                        <strong>Username:</strong> {user.username}
                    </div>
                    <div className="mb-3">
                        <strong>Email:</strong> {user.email}
                    </div>
                    <Link to="/" className="btn btn-outline-danger mx-2">Back</Link>
                </div>
            </div>
        </div>
    );
}
