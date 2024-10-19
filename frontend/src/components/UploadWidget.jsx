import { useEffect, useRef } from 'react';
import { Tag } from "antd";

const UploadWidget = ({ onImageUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'djxiafbbq',
            upload_preset: 'recipeapp',
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                onImageUpload(result.info.secure_url);
            } else {
                console.error("Upload error:", error);
            }
        });
    }, [onImageUpload]);

    return (
        <>
            <Tag style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => widgetRef.current.open()}>Upload Recipe Image</Tag>
        </>
    );
};

export default UploadWidget;