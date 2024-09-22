import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Grid, Typography } from '@mui/material';

function TableConstruct() {
    const [historyData, setHistoryData] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    useEffect(() => {
        const fetchHistory = async () => {
            const dateThing = `http://localhost:3000/history?fromDate=${fromDate.toISOString().split('T')[0]}&toDate=${toDate.toISOString().split('T')[0]}`;
            const response = await fetch(dateThing);
            const data = await response.json();
            setHistoryData(data);
            console.log(dateThing);
        };
        fetchHistory();
    }, [fromDate, toDate]); // Fetch whenever dates change

    return (
        <Box sx={{ p: 3 }}>
            
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="From Date"
                        type="date"
                        value={fromDate.toISOString().split('T')[0]}
                        onChange={(e) => setFromDate(new Date(e.target.value))}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="To Date"
                        type="date"
                        value={toDate.toISOString().split('T')[0]}
                        onChange={(e) => setToDate(new Date(e.target.value))}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>SNo.</TableCell>
                            <TableCell>Download Speed (Mbps)</TableCell>
                            <TableCell>Upload Speed (Mbps)</TableCell>
                            <TableCell>Ping (ms)</TableCell>
                            <TableCell>IP Address</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historyData.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.download_speed}</TableCell>
                                <TableCell>{item.upload_speed}</TableCell>
                                <TableCell>{item.ping}</TableCell>
                                <TableCell>{item.ip}</TableCell>
                                <TableCell>
                                    {(() => {
                                        const dateObj = new Date(item.test_date);
                                        return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
                                    })()}
                                </TableCell>
                                <TableCell>
                                    {(() => {
                                        const dateObj = new Date(item.test_date);
                                        return dateObj.toLocaleTimeString();
                                    })()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TableConstruct;
