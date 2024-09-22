import {React,useState} from 'react'
import SideNav from '../elements/SideNav'
import Box from "@mui/material/Box"
import NavBar from '../elements/NavBar'
import TableConstruct from '../elements/TableConstruct'
import { Typography } from '@mui/material';



export default function History() {


    const [isSideNavOpen, setSideNavOpen] = useState(false);

    const toggleDrawer = () => {
        setSideNavOpen(!isSideNavOpen);
    };

    return (
        <div className='bgcolor'>

            <NavBar pageName={"History"} />
            <Box height={70} />
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

                    {/* <Typography variant="h1" align="center">History</Typography> */}
                    <Box sx={{ p: 3 }}>
                        <TableConstruct/>
                        </Box>

                </Box>
            </Box>
        </div>
    )
}

