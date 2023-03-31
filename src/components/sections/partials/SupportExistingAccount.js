import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const SupportExistingAccount = ({
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

    const [problem, setProblem] = React.useState('');
    const [forgotten_email, setForgottenEmail] = React.useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const userDecoded = user ? jwt_decode(user.accessToken) : null;

    const handleChange = (event) => {
        setProblem(event.target.value);
    };
    
    const handleEmailChange = (event) => {
        setForgottenEmail(event.target.value);
    };
    
    async function sendPasswordReset () {
        await axios.get(process.env.REACT_APP_API_URL + 'user/' + forgotten_email + '/reset_password');
    }

    async function send2FAReset () {
       await axios.get(process.env.REACT_APP_API_URL + 'user/' + forgotten_email + '/reset_2fa');
    }

    async function sendAccountReset () {
        await axios.get(process.env.REACT_APP_API_URL + 'user/' + forgotten_email + '/reset_account');
    }

    function redirectProfile () {
        window.location.href = '/user-account';
    }

    useEffect(() => {
        if (props.problemParent) {
            setProblem(props.problemParent);
        }
    }, [props.problemParent]);


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
                <MenuItem value={"forgotten_password"}>Forgotten Password</MenuItem>
                <MenuItem value={"forgotten_2fa"}>Lost 2FA</MenuItem>
                <MenuItem value={"forgotten_account"}>Stolen Account</MenuItem>
                </Select>
            </FormControl>
            { problem === "forgotten_password" ? (
                <div>
                    { userDecoded != null ? (    
                        <div id='redirect_id-render'>
                            <p className='mt-3'>Click the following buttton to go to your profile page where you will be able to change your current password.</p>
                            <Button variant="contained" sx={{ m: 1, minWidth: 350 }} onClick={() => {redirectProfile()}}>Your Profile</Button>
                        </div>
                        ) : (
                            <div>
                                <p className='mt-3'>Enter your email address below and we will send you a link to reset your password.</p>
                                <TextField
                                    id="outlined-disabled"
                                    label="Email"
                                    variant="outlined"
                                    sx={{ m: 1, minWidth: 350 }}
                                    onChange={handleEmailChange}
                                />
                                <br />
                                <Button variant="contained" sx={{ m: 1, minWidth: 350 }} onClick={() => {sendPasswordReset()}}>Reset Password</Button>
                            </div>
                        )
                    }
                </div>
            ) : problem === "forgotten_2fa" ? (
                <div>
                    <p className='mt-3'>Enter your email address below and we will send you a link to reset your 2FA.</p>
                    <TextField
                        id="outlined-disabled"
                        label="Email"
                        variant="outlined"
                        sx={{ m: 1, minWidth: 350 }}
                        onChange={handleEmailChange}
                    />
                    <br />
                    <Button variant="contained" sx={{ m: 1, minWidth: 350 }} onClick={() => {send2FAReset()}}>Reset 2FA</Button>
                </div>
            ) : problem === "forgotten_account" ? (
                <div>
                    <p className='mt-3'>Enter your email address below and our support team will contact you as soon as possible.</p>
                    <p className='mt-3'>Make sure to check your <span style={{color: '#768d5c'}}>inbox / spam folder</span>, we will contact you only from <span style={{color: '#768d5c'}}>support@ethpays.co</span></p>
                    <TextField
                        id="outlined-disabled"
                        label="Email"
                        variant="outlined"
                        sx={{ m: 1, minWidth: 350 }}
                        onChange={handleEmailChange}
                    />
                    <br />
                    <Button variant="contained" sx={{ m: 1, minWidth: 350 }} onClick={() => {sendAccountReset()}}>Submit Request</Button>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default SupportExistingAccount;