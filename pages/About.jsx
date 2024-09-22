import React, { useState } from 'react';
import SideNav from '../elements/SideNav';
import Box from "@mui/material/Box";
import { Typography, Paper, Button, Divider, Grid } from '@mui/material';
import NavBar from '../elements/NavBar';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import Stack from '@mui/material/Stack';
import BrushIcon from '@mui/icons-material/Brush';

export default function About() {

    const [isSideNavOpen, setSideNavOpen] = useState(false);

    const toggleDrawer = () => {
        setSideNavOpen(!isSideNavOpen);
    };

    const members = [
        { name: "Shashank", email: "se21ucse198@mahindrauniversity.edu.in" },
        { name: "Nithish", email: "se21ucse093@mahindrauniversity.edu.in" },
        { name: "Rithwik", email: "se21ucse165@mahindrauniversity.edu.in" },
        { name: "Sandeep", email: "se21ucse028@mahindrauniversity.edu.in" },
        { name: "Pavan", email: "se21ucse150@mahindrauniversity.edu.in" },
        { name: "Adhish", email: "se21ucse009@mahindrauniversity.edu.in" },
        { name: "Sai Kiran", email: "se21uari010@mahindrauniversity.edu.in" }
    ];
    return (
        <div className='bgcolor'>
            <NavBar pageName={"About us"} />
            <Box height={150} />
            <Box sx={{ display: 'flex' }} >
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
                    {/* <Typography variant="h1" align="center" sx={{ mb: 4 }}>About Us</Typography> */}
                    

                    <Paper sx={{ p: 3, mb: 4, padding: 7 }}>
                        <Typography fontSize={25} variant="body1" align='center'>
                            This website, "SpeedCheck," was created by Team 29 as a project for our Software Engineering course. Our project utilizes packet transfer to calculate the client's internet speed and stores the results in a local database to maintain a history of tests conducted. We used ReactJS for the front-end framework and Material UI as our CSS framework. For the back-end, we chose NodeJS with the ExpressJS framework.

                            Please feel free to explore and contribute to our GitHub repository (yay FOSS!).

                        </Typography>
                        <Box height={20} />
                    </Paper>
                    
                    <Divider sx={{ my: 4 }} />

                    <Typography fontSize={30} variant="body1" align='center'>
                        Our Contact Info

                    </Typography>
                    <Box height={20} />

                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {members.map((member, index) => (
                            <Grid item key={index}>
                                <Button
                                target='_blank'
                                    size='large'
                                    href={`mailto:${member.email}`}
                                    variant="outlined"
                                    startIcon={<EmailIcon />}
                                    sx={{ textTransform: 'none', color: 'inherit', borderColor: 'inherit' }}
                                >
                                    {member.name}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{ my: 4 }} />

                    {/* <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Typography variant="h3" sx={{ mb: 2 }}>Team Members</Typography>
                    </Grid> */}

                    {/* <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {members.map((member, index) => (
                            <Grid item key={index}>
                                <Typography variant="h6" sx={{ mb: 1 }}>{member.name}</Typography>
                                <Button
                                    href={`mailto:${member.email}`}
                                    variant="outlined"
                                    startIcon={<EmailIcon />}
                                    sx={{ textTransform: 'none', color: 'inherit', borderColor: 'inherit' }}
                                >
                                    Email
                                </Button>
                            </Grid>
                        ))}
                    </Grid> */}
                    {/* <Divider sx={{ my: 4 }} /> */}
                    <Grid container spacing={2} justifyContent="center" alignItems="center">

                        <Grid item>
                            <Button
                                size="large"
                                target='_blank'
                                href="https://github.com/Dabbin-Giraffe/Bandwidth-site"
                                variant="outlined"
                                sx={{
                                    borderColor: 'black',
                                    color: 'black',
                                    minWidth: 75,
                                    height: 45,
                                    marginLeft: 9,
                                    '&:hover': {
                                        borderColor: 'gray',
                                        backgroundColor: 'lightgray'
                                    }
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>  {/* Align icon and text */}
                                    <GitHubIcon fontSize='medium' />
                                    <Typography fontSize={"medium"} variant="body1">GitHub</Typography>
                                </Stack>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                size="large"
                                href="https://mui.com/"
                                target="_blank"
                                variant="outlined"
                                sx={{
                                    borderColor: 'black',
                                    color: 'black',
                                    minWidth: 75,
                                    height: 45,

                                    '&:hover': {
                                        borderColor: 'gray',
                                        backgroundColor: 'lightgray'
                                    }
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>  {/* Align icon and text */}
                                    <BrushIcon fontSize='medium' />
                                    <Typography fontSize={"medium"} variant="body1">Material UI</Typography>
                                </Stack>
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </div>
    );
}
