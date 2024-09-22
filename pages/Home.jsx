import { React, useState, useEffect } from 'react';
import SideNav from '../elements/SideNav';
import Box from '@mui/material/Box';
import NavBar from '../elements/NavBar';
import { Grid,  Typography, Paper } from '@mui/material';
import "../dash.css";
import InternetSpeedTest from '../elements/InternetSpeedTest';

function Home() {
  const [testResults, setTestResults] = useState(null);

  const handleTestComplete = (results) => {
    setTestResults(results);
  };

  const [isSideNavOpen, setSideNavOpen] = useState(false);

  const toggleDrawer = () => {
    setSideNavOpen(!isSideNavOpen);
  };

return (
  <div className='bgcolor'>
    <NavBar pageName={'Home'} />
    <Box height={150} />
    <Box sx={{ display: 'flex' }}>
      <SideNav isOpen={isSideNavOpen} toggleDrawer={toggleDrawer} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          transition: 'margin-left 0.3s', 
          marginLeft: isSideNavOpen ? '250px' : '0' 
        }}
      >
        {/* <Typography variant="h1" align="center">Home</Typography> */}
        <Box sx={{ p: 3 }}>
          
            <InternetSpeedTest onTestComplete={handleTestComplete} />
          
          {testResults && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Download Speed</Typography>
                  <Typography variant="body1">{testResults.downloadSpeed} MB/s</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Upload Speed</Typography>
                  <Typography variant="body1">{testResults.uploadSpeed} MB/s</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">IP Address</Typography>
                  <Typography variant="body1">{testResults.ip}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Ping</Typography>
                  <Typography variant="body1">{testResults.ping} ms</Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  </div>
);

}



export default Home