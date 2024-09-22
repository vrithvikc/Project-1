import React, { useState, useEffect } from 'react';

const IpAddress = ({ onTestComplete, startTest }) => {
    const [clientIp, setClientIp] = useState(null);
    const [error, setError] = useState(null);
    const serverUrl = "http://localhost:3000/ip"

    useEffect(() => {
        if (startTest) {
            fetchClientIp();
        }
    }, [startTest])

    const fetchClientIp = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setClientIp(data.ip);
            onTestComplete(data.ip);
            console.log("IP : ",data.ip);
            setError(null);
        } catch (err) {
            setClientIp(null);
            setError(err.message);
        }
    };

};

export default IpAddress;