import React from "react";
import { uploadAvatar } from "../services/webServices";

const UploadImageWrapper = props => {
    const { children } = props;

    const handleImageUpload = async e => {
        try {
            const formData = new FormData();
            formData.append("pic", e.target.files);
            const response = await uploadAvatar(formData);
        } catch (error) {}
    };
    return (
        <label htmlFor="imageUpload">
            {children}
            <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ visibility: "hidden", position: "absolute" }}
                onChange={handleImageUpload}
            />
        </label>
    );
};
export default UploadImageWrapper;
