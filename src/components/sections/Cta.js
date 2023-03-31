import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Store } from 'react-notifications-component';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {
  const [email, setEmail] = React.useState('');

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );  

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

  const saveData = async () => {
    if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      // eslint-disable-next-line
      const response = await axios.post('http://localhost:4000/mailing_list/addemail', {
        email: email
      });
      notification('Success', 'You have been added to our mailing list', 'success');
    } else {
      notification('Error', 'Please enter a valid email address', 'danger');
    }
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div
          className={innerClasses}
        >
          <div className="cta-slogan">
            <h3 className="m-0">
              Want to receive news from us?
              </h3>
          </div>
          <div className="cta-action">
            <TextField
              variant="standard"
              label="Your email"
              type={'email'}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "green",
                },
                '& input' : {color: 'white'}, '& label.Mui-focused': { color: 'white' }, '& label' : {color: 'white'},
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{backgroundColor: "rgba(0,0,0,0)", textTransform: "none", boxShadow: 0, '&:hover': {boxShadow: 0, backgroundColor: "rgba(0,0,0,0)"}}}
              onClick={() => {saveData()}}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;