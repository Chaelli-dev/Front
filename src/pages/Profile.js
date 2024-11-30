import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const [user, setUser] = useState({});

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setUser({
            name: query.get("name"),
            email: query.get("email")
        });
    }, [location]);

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Profile;
