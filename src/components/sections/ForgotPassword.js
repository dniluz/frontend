import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../elements/Button';
import axios from 'axios';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const ForgotPassworD = ({
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

  const handleSubmit = async () => {
    const res = await axios.get(process.env.REACT_APP_API_URL + 'user/'+email+'/reset_password');
    if(res.data.status === 200) {
      alert("guarda l'email bro");
    } else {
      alert(res.data.message);
    }
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
                        <h3 style={{color: '#5c6549', textAlign: 'center', marginBottom: '20px'}}>Reset Password</h3>
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
                        </div>
                        <Button tag="a" color="primary" wideMobile style={{marginTop: '20px', marginBottom: '50px', color: '#5c6549'}} onClick={handleSubmit} className="button-index">
                            Reset Password
                        </Button>
                      </Box>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

ForgotPassworD.propTypes = propTypes;
ForgotPassworD.defaultProps = defaultProps;

export default ForgotPassworD;