import React, { useEffect, useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AuthContext } from "../../../contexts/AuthContext";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';

const SupportTransaction = ({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    pushLeft,
    ...props
    }) => {
    const { user } = useContext(AuthContext);
    const userDecoded = user ? jwt_decode(user.accessToken) : null;
    const userUuid = userDecoded ? userDecoded.uuid : null;

    const [problem, setProblem] = React.useState('');
    const [problemProgress, setProblemProgress] = React.useState(null);
    const [userTransactions, setUserTransactions] = useState(null);


    const handleChange = (event) => {
        setProblem(event.target.value);
    };

    const handleChangeProgress = (event) => {
        setProblemProgress(event.target.value);
    };

    useEffect(() => {
        const getUserTransactions = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL + 'transactions/user/' + userUuid).then((response) => {
                    return response.data.data;
                });
                setUserTransactions(res);
            } catch (error) {}
        };
        getUserTransactions();
    }, [userUuid]);

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Problem</InputLabel>
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={problem}
                onChange={handleChange}
                autoWidth
                label="Select Problem"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"wrong_address"}>Wrong Address</MenuItem>
                <MenuItem value={"transaction_problem"}>Problem with Transaction</MenuItem>
                </Select>
            </FormControl>
            { problem === "wrong_address" ? (
                <div> 
                    <div id='redirect_id-render' style={{maxWidth: '800px'}}>
                        <p className='mt-3'>If you entered the <span style={{color: '#768d5c'}}>wrong address</span> when buying or withdrawing crypto from EthPays, then <span style={{color: '#768d5c'}}>we will not be able to reverse the transaction</span>. As in the crypto space any <span style={{color: '#768d5c'}}>transaction cannot be reversed</span> once it's registered in the blockchain. We are sorry if this happened to you, <span style={{color: '#768d5c'}}>we suggest</span> to always <span style={{color: '#768d5c'}}>check</span> two or three times the <span style={{color: '#768d5c'}}>address</span> when sending cryptocurrency.</p>
                    </div>
                </div>
            ) : problem === "transaction_problem" ? (
                <div>
                    { userDecoded != null ? (
                        <div>
                            <p className='mt-3'>Please select the transaction you are having problems with from the list below.</p>
                            <FormControl sx={{ m: 1, minWidth: 350 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Select Transaction</InputLabel>
                                <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={problemProgress}
                                onChange={handleChangeProgress}
                                autoWidth
                                label="Select Transaction"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {userTransactions != null ? (
                                        userTransactions.map((transaction) => (
                                            <MenuItem value={transaction.uuid}>{transaction.uuid.substring(0, 5) + '..' + transaction.uuid.substring(transaction.uuid.length - 5)}</MenuItem>
                                        ))
                                    ) : null 
                                    }
                                </Select>
                            </FormControl>
                            { problemProgress != null ? (
                                <div className='mt-4'>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 'auto' }}>
                                                    <Typography variant="h7" component="h2">
                                                        Transaction Information
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        <div className='mt-3'>
                                                            <p><b>Transaction Status</b>: {userTransactions != null ? (
                                                                userTransactions.map((transaction) => (
                                                                    transaction.uuid === problemProgress ? (
                                                                        transaction.status
                                                                    ) : null
                                                                ))
                                                            ) : null}</p>
                                                            <p><b>Transaction Informations</b>: {userTransactions != null ? (
                                                                userTransactions.map((transaction) => (
                                                                    transaction.uuid === problemProgress ? (
                                                                        transaction.informations
                                                                    ) : null
                                                                ))
                                                            ) : null}</p>
                                                            <p><b>Transaction Date</b>: {userTransactions != null ? (
                                                                userTransactions.map((transaction) => (
                                                                    transaction.uuid === problemProgress ? (
                                                                        transaction.date
                                                                    ) : null
                                                                ))
                                                            ) : null}</p>
                                                            <p style={{fontSize: '15px'}}><b>Transaction ID</b>: {problemProgress}</p>
                                                        </div>
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            ) : null }
                        </div>
                    ) : (
                        <div>
                            <p className='mt-3'>Please login to your account to continue.</p>
                            <Button variant="contained" sx={{ m: 1, minWidth: 350 }} onClick={() => {window.location.href = '/login'}}>Login</Button>
                        </div>
                    )}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default SupportTransaction;