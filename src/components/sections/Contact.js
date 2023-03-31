import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Store } from 'react-notifications-component';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const currencies = [
  {
    value: 'Business_Enquiry',
    label: 'Business Enquiry',
  },
  {
    value: 'Customer_Enquiry',
    label: 'Customer Enquiry',
  },
];

const ContactUs = ({
  className,
  children,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
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

  const innerClasses = classNames(
    'section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const [currency, setCurrency] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [ip, setIP] = React.useState('');
  const [name, setName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  const saveData = async () => {
    if (name === '') {
      notification("Error", "Please enter your name", "danger");
    } else if (last_name === '') {
      notification("Error", "Please enter your last name", "danger");
    } else if (email === '') {
      notification("Error", "Please enter your email", "danger");
    } else if (currency === '') {
      notification("Error", "Please select the client type", "danger");
    } else if (msg === '') {
      notification("Error", "Please enter your message", "danger");
    } else {
      // eslint-disable-next-line
      const res = await axios.post(process.env.REACT_APP_API_URL + 'contact/add', {
        name: name,
        last_name: last_name,
        email: email,
        client_type: currency,
        message: msg,
        ip: ip
      });
      notification("Success", "Your message has been sent", "success");
    }
  }

  function notification(title, message, type) {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3500,
        onScreen: true
      }
    });
  }

  React.useEffect( () => {
    getData()
  }, [])

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
            <div className="hero-content center-content">
                <div className="container-xs">
                    <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                        Please complete the form below and we will get back to you as soon as possible.
                    </p>
                    <div className="reveal-from-bottom" data-reveal-delay="600">
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 2, width: '20ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                          <div>
                            <TextField
                              required
                              id="outlined-required"
                              label="Name"
                              color='primary'
                              onChange={(e) => setName(e.target.value)}
                              sx={{ '& input' : {color: 'white'}, '& label.Mui-focused': { color: 'white' }, '& label' : {color: 'white'},  }}
                            />
                            <TextField
                              required
                              id="outlined-required"
                              label="Last Name"
                              color='primary'
                              onChange={(e) => setLastName(e.target.value)}
                              sx={{ '& input' : {color: 'white'}, '& label.Mui-focused': { color: 'white' }, '& label' : {color: 'white'} }}
                            />
                            <TextField
                              required
                              id="outlined-required"
                              label="Email"
                              color='primary'
                              onChange={(e) => setEmail(e.target.value)}
                              sx={{ '& input' : {color: 'white'}, '& label.Mui-focused': { color: 'white' }, '& label' : {color: 'white'} }}
                            />

                            <TextField
                              required
                              id="outlined-select-currency"
                              select
                              label="Client Type"
                              value={currency}
                              onChange={handleChange}
                              sx={{ '& input' : {color: 'white'}, '& label.Mui-focused': { color: 'white' }, '& label' : {color: 'white'} }}
                            >
                              {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              required
                              label="Message"
                              multiline
                              maxRows={10}
                              value={msg}
                              onChange={(e) => setMsg(e.target.value)}
                              sx={{ '& input' : {color: 'white'}, '& label.Mui-focused': { color: 'white' }, '& label' : {color: 'white'} }}
                            />
                            <br />
                            <Button
                              variant="contained"
                              className='btn-nobr'
                              sx={{backgroundColor: "#86ac3e", textTransform: "none", '&:hover': {backgroundColor: "#86ac3e"}}}
                              onClick={saveData}
                            >
                              Send
                            </Button>
                          </div>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

ContactUs.propTypes = propTypes;
ContactUs.defaultProps = defaultProps;

export default ContactUs;