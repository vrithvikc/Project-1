import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Ping = ({ onTestComplete, startTest }) => {
    const [ping, setPing] = useState(null);
    const [error, setError] = useState(null);

    const serverUrl = "http://localhost:3000/ping"

    useEffect(()=>{
        if(startTest){
            calculatePing();
        }
    },[startTest])

    const calculatePing = async () => {
        try {
            const startTime = performance.now();
            const response = await fetch(serverUrl, {
                method: 'HEAD', // Using HEAD to avoid fetching the entire resource
                cache: 'no-cache'
              });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const endTime = performance.now();
            const roundTripTime = endTime - startTime;
            setPing(roundTripTime.toFixed(0));
            onTestComplete(roundTripTime.toFixed(0))
            console.log("Ping : ",roundTripTime.toFixed(0));
            setError(null);
        } catch (err) {
            setPing(null);
            setError(err.message);
        }
    };

};

export default Ping;
