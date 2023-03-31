import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useAuthContext } from '../../hooks/useAuthContext';
import jwt_decode from "jwt-decode";

import SupportExistingAccount from './partials/SupportExistingAccount';
import SupportTransaction from './partials/SupportTransaction';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const Support = ({
  className,
  children,
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
    const [existingAccountProblem, setExistingAccountProblem] = React.useState('');

    const handleChange = (event) => {
        setProblem(event.target.value);
    };
    
    const outerClasses = classNames(
    'section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );
  
  const { user } = useAuthContext();
  const userDecoded = user ? jwt_decode(user.accessToken) : false;
  const isUserLoggedIn = userDecoded ? true : false;
  const isMobile = window.innerWidth < 1500 ? true : false;

  const handleResetPasswordButton = () => {
    setProblem('accout_existing');
    setExistingAccountProblem('forgotten_password');
  }

  const handleStolenAccountButton = () => {
    setProblem('accout_existing');
    setExistingAccountProblem('forgotten_account');
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
        <div className="container">
            <div className="has-top-divider tiles-wrap center-content">
                <div className='mt-5 reveal-from-bottom'>
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
                        <MenuItem value={"account_creation"}>Account Creation</MenuItem>
                        <MenuItem value={"accout_existing"}>Existing Account</MenuItem>
                        <MenuItem value={"crypto_transaction"}>Cryptocurrency Transaction</MenuItem>
                        <MenuItem value={"account_verification"}>Identity Verification</MenuItem>
                        <MenuItem value={"bank_transfer"}>Bank Transaction</MenuItem>
                        <MenuItem value={"fraud_report"}>Fraud</MenuItem>
                        <MenuItem value={"bug_report"}>Bug Report</MenuItem>
                        <MenuItem value={"partner_inquiry"}>Partner Inquiry</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    { problem === "account_creation" ? (
                        <div>
                          {isUserLoggedIn ? (
                            <TextField
                            id="outlined-disabled"
                            label="Email"
                            defaultValue={userDecoded.email}
                            disabled
                            variant="outlined"
                            sx={{ m: 1, minWidth: 350 }}
                            />
                            ) : (
                              <TextField
                              id="outlined-disabled"
                              label="Email"
                              variant="outlined"
                              sx={{ m: 1, minWidth: 350 }}
                              />
                              )}
                            <br />
                            <TextField
                              id="outlined-disabled"
                              label="Message"
                              multiline
                              rows={4}
                              variant="outlined"
                              className='mt-2'
                              sx={{ m: 1, minWidth: 350, minHeight: 250 }}
                              />
                          </div>
                        ) : problem === "accout_existing" ? (
                          <div>
                            <SupportExistingAccount problemParent = {existingAccountProblem}/>
                          </div>
                        ) : problem === "crypto_transaction" ? (
                          <div>
                            <SupportTransaction />
                          </div>
                        ) : problem === "account_verification" ? (
                          <div>
                                <h1>Identity Verification</h1>
                            </div>
                        ) : problem === "bank_transfer" ? (
                          <div>
                                <h1>Bank Transaction</h1>
                            </div>
                        ) : problem === "fraud_report" ? (
                          <div>
                                <h1>Fraud</h1>
                            </div>
                        ) : problem === "bug_report" ? (
                          <div>
                                <h1>Bug Report</h1>
                            </div>
                        ) : problem === "partner_inquiry" ? (
                          <div>
                                <h1>Partner Inquiry</h1>
                            </div>
                        ) : problem === "other" ? (
                          <div>
                                <h1>Other</h1>
                            </div>
                        ) : (
                          <div>
                            <h3>Please select a problem to continue</h3>
                            <p>In order to help you better, please select a problem from the list above.</p>
                          </div>
                        )
                      }
                </div>
            </div>
        </div>

        {isMobile === false ? (
          <div className="container reveal-from-right" style={{position: 'absolute', top: 0, right: '-25px', backgroundColor: '#86ac3e', maxWidth: '350px', marginTop: '80px', borderRadius: '20px'}}>
            <h3>Quick Help</h3>
              <p style={{fontSize: '18px', cursor: 'pointer', color: 'white'}} onClick={handleResetPasswordButton}>Forgot Password</p>
              <p style={{fontSize: '18px', cursor: 'pointer', color: 'white', marginTop: '-15px'}} onClick={handleStolenAccountButton}>Stolen Account</p>
          </div>
        ) : null}
    </section>
  );
}

Support.propTypes = propTypes;
Support.defaultProps = defaultProps;

export default Support;