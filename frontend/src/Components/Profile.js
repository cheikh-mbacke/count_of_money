import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('user'));
        console.log(userLocal)
        if (userLocal) {
            setUser(userLocal);
        } else {
            setUser(null);
        }
    }, []);

    return (
        <div className=" flex-grow bg-black">
            <p className="text-white"> pseudo : {user.userId}</p>
            <p className="text-white"> Role : {user.role ? user.role.roleName : ""}</p>
        </div>
    );
};

export default Profile;