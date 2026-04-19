import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

import API_URL from '../config';

const FileUploader = ({ type = 'images', onUpload, accept = 'image/*,video/*', label = 'Загрузить файл' }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileRef = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.post(`${API_URL}/upload/${type}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            // Сохраняем только путь (/uploads/...), чтобы на продакшене не было localhost в базе
            const pathOnly = (response.data.url || '').startsWith('/') ? response.data.url : `/${response.data.url}`;
            setSuccess(`Загружено: ${file.name}`);
            if (onUpload) onUpload(pathOnly);

            // Reset input
            if (fileRef.current) fileRef.current.value = '';
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка загрузки');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ marginBottom: '0.5rem' }}>
            <label style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                borderRadius: '8px',
                cursor: uploading ? 'wait' : 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'opacity 0.2s',
                opacity: uploading ? 0.7 : 1
            }}>
                {uploading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : <FaCloudUploadAlt />}
                {uploading ? 'Загрузка...' : label}
                <input
                    ref={fileRef}
                    type="file"
                    accept={accept}
                    onChange={handleUpload}
                    disabled={uploading}
                    style={{ display: 'none' }}
                />
            </label>
            {error && <div style={{ color: '#f5576c', fontSize: '0.8rem', marginTop: '0.3rem' }}><FaTimes /> {error}</div>}
            {success && <div style={{ color: '#4caf50', fontSize: '0.8rem', marginTop: '0.3rem' }}><FaCheck /> {success}</div>}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default FileUploader;
