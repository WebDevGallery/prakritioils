// src/components/EditProfile.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../api/SummaryApi'; // Adjust the import path as necessary

const EditProfile = ({ user, onCancel }) => {
    const [data, setData] = useState({ ...user });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        // Handle address fields separately
        if (name.startsWith('address.')) {
            const fieldName = name.split('.')[1]; // Get the field name after 'address.'
            setData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [fieldName]: value
                }
            }));
        } else {
            setData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success("Profile updated successfully");
                onCancel(); // Close the edit form
            } else {
                toast.error(responseData.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-profile-form">
            <h2>Edit Profile</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={data.name} onChange={handleOnChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={data.email} onChange={handleOnChange} required />
            </div>
            <div>
                <label>Street:</label>
                <input type="text" name="address.street" value={data.address.street} onChange={handleOnChange} required />
            </div>
            <div>
                <label>City:</label>
                <input type="text" name="address.city" value={data.address.city} onChange={handleOnChange} required />
            </div>
            <div>
                <label>State:</label>
                <input type="text" name="address.state" value={data.address.state} onChange={handleOnChange} required />
            </div>
            <div>
                <label>Postal Code:</label>
                <input type="text" name="address.postalCode" value={data.address.postalCode} onChange={handleOnChange} required />
            </div>
            <div>
                <label>Country:</label>
                <input type="text" name="address.country" value={data.address.country} readOnly />
            </div>
            <button type="submit">Update Profile</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditProfile;
