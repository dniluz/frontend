import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../elements/Button';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const PartnerS = ({
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

  const outerClasses = classNames(
    'section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );
  
  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const innerClasses = classNames(
    'section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [ip, setIP] = React.useState('');
  const { user, dispatch } = useAuthContext();

  const handleSubmit = async () => {
    console.log(process.env.REACT_APP_API_URL);
    const res = await axios.post(process.env.REACT_APP_API_URL + 'user/login', {email, password, ip});
    if(res.data.status === 200) {
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch({type: 'LOGIN', payload: res.data});
    } else {
      alert(res.data.message);
    }
  }

  useEffect(() => {
    getData();
    if (user && user !== null) {
      window.location.href = '/';
    }
  }, [user]);

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
        <div className="container">
            <div className={innerClasses}>
                <div className={tilesClasses}>
                    <div className="reveal-from-bottom" data-reveal-delay="600" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 2, width: '75%'},
                          bgcolor: '#1d1f21',
                          borderRadius: '20px'
                          }}
                        width="85%"
                        noValidate
                        autoComplete="off"
                      >
                        <h3 style={{color: '#5c6549', textAlign: 'center', marginBottom: '20px'}}>Login</h3>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                sx={{ '& input' : {color: '#5c6549'}, '& label.Mui-focused': { color: '#5c6549' }, '& label' : {color: '#5c6549'}, 
                                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#5c6549' }, '&:hover fieldset': { borderColor: '#5c6549' }, 
                                '&.Mui-focused fieldset': { borderColor: '#5c6549' }} }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                type="password"
                                label="Password"
                                sx={{ '& input' : {color: '#5c6549'}, '& label.Mui-focused': { color: '#5c6549' }, '& label' : {color: '#5c6549'}, 
                                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#5c6549' }, '&:hover fieldset': { borderColor: '#5c6549' }, 
                                '&.Mui-focused fieldset': { borderColor: '#5c6549' }} }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                          <Link to="/forgot-password" style={{color: '#5c6549', textDecoration: 'none', marginRight: '10px'}}>Forgot Password</Link>
                          {/* disable the next link to make it not clickable using css */}
                          <Link style={{color: 'white', textDecoration: 'none', marginRight: '10px', pointerEvents: 'none'}}>or</Link>
                          <Link to="/register" style={{color: '#5c6549', textDecoration: 'none'}}>Create Account</Link>
                        </div>
                        <Button tag="a" color="primary" wideMobile style={{marginTop: '20px', marginBottom: '50px', color: '#5c6549'}} onClick={handleSubmit} className="button-index">
                            Login
                        </Button>
                      </Box>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

PartnerS.propTypes = propTypes;
PartnerS.defaultProps = defaultProps;

export default PartnerS;