import React from "react";

const UploadImageWrapper = props => {
    const { type, children } = props;

    const handleImageUpload = async (e) => {
        try {
            const formData = new FormData()
            if (type === "report") {
                formData.append('pic', e.target.files)
                const response = await httpClientInstance.post('/api/auth/reports/', formData)
            }
        } catch (error) { }
    }
    return (
        <label htmlFor="imageUpload">
            {children}
            <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ visibility: 'hidden', position: 'absolute' }}
                onChange={handleImageUpload}
            />
        </label>
    );
};
export default UploadImageWrapper;