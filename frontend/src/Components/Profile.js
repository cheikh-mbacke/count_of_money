import React from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className=" flex-grow bg-black">
            <p className="text-white"> pseudo : {user.pseudo}</p>
        </div>
    );
};

export default Profile;