import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className=" flex-grow bg-black text-white">
            {
                user ?
                    <>
                        <p>{user.userId}</p>
                        <p>{user.pseudo}</p>
                        <p>{user.email}</p>
                    </>
                    :
                    null
            }
        </div>
    );
};

export default Profile;