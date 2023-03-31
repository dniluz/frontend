import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import jwt_decode from 'jwt-decode';

import SectionUserProfile from './partials/SectionUserProfile';
import SectionUserSecurity from './partials/SectionUserSecurity';
import SectionUserVerification from './partials/SectionUserVerification';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

function LinkTab(props) {
  return (
    <Tab
      sx={{ color: '#9CA9B3', fontWeight: '300', '&.Mui-selected': { color: '#768d5c', borderBottom: '2px solid #9CA9B3' } }}
      component="div"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3}} className="-mt-20">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserAccount = ({
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
  const [value, setValue] = React.useState(0);
  const user = JSON.parse(localStorage.getItem('user'));
  const userDecoded = user ? jwt_decode(user.accessToken) : null;
  var verification = false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    pushLeft && 'push-left',
    topDivider && 'has-top-divider',
  );

  if (!user) {
    window.location.href = '/login';
  }
  
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={tilesClasses}>
          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" centered sx={{ mt: 3 }}>
              <LinkTab label="Profile" />
              {verification === false ? <LinkTab label="Verification" href="/user-verification" /> : null}
            </Tabs>
          </Box>
        </div>
        <TabPanel value={value} index={0}>
          <SectionUserProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
        <SectionUserVerification />
        </TabPanel>
      </div>
    </section>
  );
}

UserAccount.propTypes = propTypes;
UserAccount.defaultProps = defaultProps;

export default UserAccount;