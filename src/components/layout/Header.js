import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import { useAuthContext } from '../../hooks/useAuthContext';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ApiIcon from '@mui/icons-material/Api';
import { useLogout } from '../../hooks/useLogout';

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userCompany, setUserCompany] = useState(null);
  const axiosJwt = axios.create();

  const { logout } = useLogout();
  const { user, dispatch } = useAuthContext();
  
  const nav = useRef(null);
  const hamburger = useRef(null);

  const userDecoded = user ? jwt_decode(user.accessToken) : null;
  const userLetter = userDecoded ? userDecoded.username.charAt(0).toUpperCase() : null;
  const userRole = userDecoded ? userDecoded.role : null;
  const userUuid = userDecoded ? userDecoded.uuid : null;
  const companyLogo = userCompany ? userCompany.logo_url : null;

  useEffect(() => {
    if (user) {
    const getUserCompany = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + 'companys/user/' + userUuid).then((response) => {
          return response.data.data;
        });
        setUserCompany(res[0]);
      } catch (error) {}
    };
    getUserCompany();
    }
  }, [userUuid, user]);

  const handleLogout = () => {
    logout();
  }

  const refreshToken = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const res = await axios.post(process.env.REACT_APP_API_URL + 'user/refresh', {token: currentUser.refreshToken});
    const newUser = {
      ...currentUser,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken
    }
    localStorage.setItem('user', JSON.stringify(newUser));
    dispatch({type: 'LOGIN', payload: newUser});

    return res.data;
  };

  if (user) {
    axiosJwt.interceptors.request.use(
      async (config) => {
        let curretDate = new Date();
        let loc_user = JSON.parse(localStorage.getItem('user'));
        const decodedAccessToken = jwt_decode(loc_user.accessToken);
        if(decodedAccessToken.exp * 1000 < curretDate.getTime() + 86400000) {
          const data = await refreshToken();
          config.headers['authorization'] = 'Bearer ' + data.accessToken;
        }
        return config;
      }, (error)  => {
        return Promise.reject(error);
      }
    );
  }

  useEffect(() => {
    const handleHello = async () => {
      await axiosJwt.get(process.env.REACT_APP_API_URL + 'user/hello');
    }
    handleHello();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });  

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }  

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    <li>
                      <Link to="/partner" onClick={closeMenu}>Partners</Link>
                    </li>
                    <li>
                      <Link to="/about-us" onClick={closeMenu}>About Us</Link>
                    </li>
                    <li>
                      <Link to="/support" onClick={closeMenu}>Support</Link>
                    </li>
                      { user ? (
                        <li>
                          <Tooltip title="My Account">
                            <IconButton
                              onClick={handleClick}
                              size="small"
                              aria-controls={open ? 'account-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                            >
                              { companyLogo ? (
                                <Avatar sx={{ width: 32, height: 32 }} src={companyLogo} />
                              ) : (
                              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#768d5c' }}>{userLetter}</Avatar>
                              )}
                            </IconButton>
                          </Tooltip>
                          <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                              elevation: 0,
                              sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                  width: 28,
                                  height: 28,
                                  ml: -0.5,
                                  mr: 1,
                                  backgroundColor: '#fff',
                                },
                                '& .aizug3234_a': {
                                  width: 28,
                                  height: 28,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                '& .aizug3234_h': {
                                  width: 28,
                                  height: 28,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                '&:before': {
                                  content: '""',
                                  display: 'block',
                                  position: 'absolute',
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: 'background.paper',
                                  transform: 'translateY(-50%) rotate(45deg)',
                                  zIndex: 0,
                                },
                              },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          >
                            <MenuItem className='aklshjbkz2314a'>
                              <Avatar />
                              <Link className='aklshjbkz2314a_c' to="/user-account">My Account</Link>
                            </MenuItem>
                            {userRole === 'partner' || userRole === 'owner' ? (
                              <MenuItem className='aklshjbkz2314a'>
                                <HandshakeIcon className='aizug3234_h' />
                                <Link className='aklshjbkz2314a_c' to="/about-us">Partner Portal</Link>
                              </MenuItem>
                              ) : null
                            }
                            {userRole === 'partner' || userRole === 'owner' ? (
                              <MenuItem className='aklshjbkz2314a'>
                                <ApiIcon className='aizug3234_a' />
                                <Link className='aklshjbkz2314a_c' to="/api-portal">Api Portal</Link>
                              </MenuItem>
                              ) : null
                            }
                            {userRole === 'owner' ? (
                              <MenuItem className='aklshjbkz2314a'>
                                <AdminPanelSettingsIcon className='aizug3234_a' />
                                <Link className='aklshjbkz2314a_c' to="/admin-portal">Admin Portal</Link>
                              </MenuItem>
                              ) : null
                            }
                            <Divider />
                            <MenuItem className='aklshjbkz2314a'>
                              <ListItemIcon>
                                <Settings fontSize="small"/>
                              </ListItemIcon>
                              <Link className='aklshjbkz2314a_c' to="/about-us">Settings</Link>
                            </MenuItem>
                            
                            <MenuItem className='aklshjbkz2314a'>
                              <ListItemIcon>
                                <Logout fontSize="small" className='col2b34z' onClick={handleLogout}/>
                              </ListItemIcon>
                              <Link className='aklshjbkz2314a_c' to="/" onClick={handleLogout}>Logout</Link>
                            </MenuItem>
                          </Menu>
                        </li>
                        ) : (
                          <li>
                            <Link to="/login" onClick={closeMenu}>Login</Link>
                          </li>
                        )}
                  </ul>
                  {!hideSignin &&
                    <ul
                      className="list-reset header-nav-right"
                    >
                      <li className='li_buy'>
                        <Link to="/buy" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu}>Buy now</Link>
                      </li>
                    </ul>}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
