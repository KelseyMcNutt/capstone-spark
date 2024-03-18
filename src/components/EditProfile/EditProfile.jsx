import { useState, useEffect } from "react"
import { getProfileInfo, updateProfile } from "../../services/ProfileServices"
import { useNavigate } from "react-router-dom"

export const EditProfile = ({ currentUser }) => {
    const [profileInfo, setProfileInfo] = useState({
        profilePic: "",
        username: "",
        email: ""
    })

const navigate = useNavigate()

    useEffect(() => {
        if (currentUser?.id) {
            getProfileInfo(currentUser.id).then((data) => {
                const profileObj = data[0]
                setProfileInfo(profileObj)
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfileInfo({
            ...profileInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProfile(currentUser.id, profileInfo).then(() => {
        
        })
        navigate('/profile')

    }

    return (
        <div className="editForm">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="profilePic">Profile Picture:</label>
                    <input 
                        type="text" 
                        id="profilePic" 
                        name="profilePic" 
                        value={profileInfo.profilePic} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={profileInfo.username} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={profileInfo.email} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};
