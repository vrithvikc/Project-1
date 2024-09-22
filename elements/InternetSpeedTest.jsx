import DownloadSpeed from "./internet_components/DownloadSpeed"
import UploadSpeed from "./internet_components/UploadSpeed"
import React, { useState } from 'react';
import axios from "axios";
import Ping from "./internet_components/Ping";
import IpAddress from "./internet_components/IpAddress";
import { Box, Button, CircularProgress, Paper, Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000', // Black color
    },
  },
});

const InternetSpeedTest = ({ onTestComplete }) => {

  const [startUploadTest, setStartUploadTest] = useState(false);
  const [startDownloadTest, setStartDownloadTest] = useState(false);
  const [startPingTest, setStartPingTest] = useState(false);
  const [startIPTest, setStartIPTest] = useState(false);

  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [ping, setPing] = useState(null);
  const [ip, setIP] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const handleStartTest = () => {
    setIsRunning(true);
    setStartDownloadTest(true);
  };
  const handleDownloadTestComplete = (speed) => {
    setDownloadSpeed(speed);
    setStartDownloadTest(false);
    setStartUploadTest(true); // Start upload test after download test completes
  };

  const handleUploadTestComplete = async (speed) => {
    setStartUploadTest(false);
    setUploadSpeed(speed);
    setStartIPTest(true);

  };

  const handleIPTestComplete = async (ip) => {
    setStartIPTest(false);
    setIP(ip);
    setStartPingTest(true);
  };

  const handlePingTestComplete = async (ping) => {
    setStartPingTest(false);
    setPing(ping);
    setIsRunning(false);
    const results = { downloadSpeed: downloadSpeed, uploadSpeed: uploadSpeed, ping: ping, ip: ip }
    onTestComplete(results);
    try {
      await axios.post('http://localhost:3000/results', results);
      console.log("Results saved successfully");
    } catch (error) {
      console.error("Error saving results", error);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <ThemeProvider theme={theme}>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleStartTest}
          disabled={isRunning}
          sx={{
            mb: 2,
            color: '#FFF',
            backgroundColor: '#333',
            fontSize: '1.5rem', // Adjust the font size to make the button bigger
            padding: '10px 20px', // Adjust padding to increase button size
            borderRadius: '10px', // Optional: Adjust border radius for rounded corners
          }}
        >
          {isRunning ? <CircularProgress size={24} /> : 'Start Speed Test'}
        </Button> */}
        {/* <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartTest}
            disabled={isRunning}
            sx={{
              width: 150, // Adjust for desired size
              height: 150,
              borderRadius: '50%', // Make it circular
              mb: 2,
              color: '#FFF',
              backgroundColor: '#333',
              fontSize: '1.5rem',
              padding: 0, // Remove default padding
              '&:hover': { // Optional: Hover effect
                backgroundColor: '#555',
              },
            }}
          >
            Go!
          </Button>

          {isRunning && (
            <CircularProgress
              size={50} // Adjust size for visibility
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -25, // Half of the size
                marginLeft: -25,
                color: '#FFF',
              }}
            />
          )}
        </Box> */}
<Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleStartTest}
    disabled={isRunning}
    sx={{
      width: 200, 
      height: 200,
      borderRadius: '50%',
      mb: 2,
      color: '#FFF',
      backgroundColor: '#333',
      fontSize: '1.5rem',
      padding: 0, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      '&:hover': { 
        backgroundColor: '#555',
      
      },
    }}
  >
    <div>

     {isRunning ? '' : 
    <Typography sx={{
      fontSize:'2.5rem',
      // lineHeight: 2, 
      
    }}>Go!</Typography>
  } 
  </div>
  </Button>

  {isRunning && (
    <CircularProgress
      size={50} 
      sx={{
        marginTop:-2,
        position: 'absolute',
        color: '#FFF',
      }}
    />
  )}
</Box>        
      </ThemeProvider>
      <div>
        <DownloadSpeed startTest={startDownloadTest} onTestComplete={handleDownloadTestComplete} />
        <UploadSpeed startTest={startUploadTest} onTestComplete={handleUploadTestComplete} />
        <IpAddress startTest={startIPTest} onTestComplete={handleIPTestComplete} />
        <Ping startTest={startPingTest} onTestComplete={handlePingTestComplete} />
      </div>
    </Box>);
};

export default InternetSpeedTest;