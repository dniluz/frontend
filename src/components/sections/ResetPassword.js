import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import axios from 'axios';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const ResetPassword = ({
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

  const history = useHistory();

  const [resetType, setResetType] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newPassword2, setNewPassword2] = React.useState('');
  const [error, setError] = React.useState('');

  useEffect(() => {
    async function verifyToken() {
      const resetToken = window.location.pathname.split("/")[2];
      const res = await axios.get(process.env.REACT_APP_API_URL + 'user/verifyToken/' + resetToken);
      if (res.data.status === 200) {
        setResetType(res.data.type);
      } else {
        setResetType('invalid');
      }
    }
    verifyToken();
  }, []);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  }

  const handleNewPasswordChange2 = (event) => {
    setNewPassword2(event.target.value);
  }

  async function resetPassword() {
    const encryptedPassword = bcrypt.hashSync(newPassword, 10);

    if (bcrypt.compareSync(newPassword2, encryptedPassword)) {
      const result = await axios.post(process.env.REACT_APP_API_URL + 'user/reset_password', { newPassword: encryptedPassword, resetToken: window.location.pathname.split("/")[2] });
      if (result.data.status === 200) {
        history.push('/login');
      } else {
        console.log(result.data.message);
      }
    } else {
      console.log('Passwords do not match');
    }
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
        <div className="container">
          <div className="has-top-divider tiles-wrap center-content">
            <div className='mt-5 reveal-from-bottom'>
              {resetType === 'password' ? (
                <div>
                  <p className='mt-3'>Enter your new password in the fields below.</p>
                  <p className='mt-3'>You need to enter your password two times in order to verify that you entered the correct one.</p>
                  <TextField
                      id="outlined-disabled"
                      label="New Password"
                      variant="outlined"
                      sx={{ m: 1, minWidth: 350 }}
                      type="password"
                      onChange={handleNewPasswordChange}
                  />
                  <br />
                  <TextField
                    id="outlined-disabled"
                    label="Repeat Password"
                    variant="outlined"
                    sx={{ m: 1, minWidth: 350 }}
                    type="password"
                    onChange={handleNewPasswordChange2}
                  />
                  <br />
                  <Button variant="contained" sx={{ m: 1, minWidth: 350 }} onClick={() => {resetPassword()}}>Change Password</Button>
                </div>
              ) : (
                <div className="hero-content center-content">
                  <div className="container-xs">
                    <h1 className="mt-10 mb-16 reveal-from-bottom" data-reveal-delay="200">
                        404: Page not found
                    </h1>
                    <div className="container-xs">
                      <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                          The page you are looking for does not exist. <br />
                          You may have mistyped the address or the page may have moved.
                      </p>
                      <div className="reveal-from-bottom" data-reveal-delay="600">
                        <a className="button button-primary mt-3" href="/">
                            Go Home
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
              
              }
            </div>
          </div>
        </div>
    </section>
  );
}

ResetPassword.propTypes = propTypes;
ResetPassword.defaultProps = defaultProps;

export default ResetPassword;