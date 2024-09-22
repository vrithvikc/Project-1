import React, { useState,useEffect } from 'react';
import axios from 'axios';

const UploadSpeed = ({ onTestComplete, startTest }) => {
  const [uploadSpeed, setUploadSpeed] = useState(null);

useEffect(()=>{
    if (startTest){
        handleFileUpload();
    }
},[startTest]);

  const handleFileUpload = async () => {
    const fileSize = 100 * 1024 * 1024; // 100 MB
    const file = new Blob([new Uint8Array(fileSize)], { type: 'application/octet-stream' });
    const formData = new FormData();
    formData.append('file', file, 'testfile');
    const startTime = Date.now();

    try {
        // const largeString = 'a'.repeat(1024 * 1024 * 100); // 100MB 
        await axios.post('http://localhost:3000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
    
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // seconds
      const speed = (file.size / (1024 * 1024)) / duration; // MB/s
      setUploadSpeed(speed.toFixed(2));
      onTestComplete(speed.toFixed(2));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


};

export default UploadSpeed