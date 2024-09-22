import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DownloadSpeed = ({ onTestComplete, startTest }) => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  useEffect(() => {
    if (startTest) {
      handleFileDownload();
    }
  }, [startTest]);

  const handleFileDownload = async () => {
    const startTime = Date.now();

    try {
      const response = await axios.get('http://localhost:3000/download', {
        responseType: 'arraybuffer',
      });


      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // seconds
      const sizeInMB = response.data.byteLength / (1024 * 1024); // MB
      const speed = sizeInMB / duration; // MB/s
      setDownloadSpeed(speed.toFixed(2));
      onTestComplete(speed.toFixed(2));
      console.log(speed.toFixed(2));
      // Create a link to download the file
      // const url = URL.createObjectURL(response.data);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'largefile';
      // document.body.appendChild(a);
      // a.click();
      // a.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  
};

export default DownloadSpeed;