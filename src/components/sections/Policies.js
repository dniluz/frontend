import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

  return (
    <section
      {...props}
      className={outerClasses}
    >
        <div className="container">
            <div className={tilesClasses}></div>
            <div>
              <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" centered sx={{ mt: 3 }}>
                  <LinkTab label="Term of Use" href="#tou" />
                  <LinkTab label="AML / KYC Policy" href="#kyc" />
                  <LinkTab label="Cookie Policy" href="#cp" />
                </Tabs>
              </Box>
            </div>
            <div style={{"maxWidth": "900px"}} className="container">
            <TabPanel value={value} index={0}>
              <TermOfUse />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AmlKyc />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CookiePolicy />
            </TabPanel>
            </div>
        </div>
    </section>
  );
}

const TermOfUse = () => {
    return (
      <div>
        <h2 style={{"fontSize": "1.8rem"}} id="tou">Term of Use</h2>
        <div>
          <p className='mt-4' style={{"fontSize": "1rem"}}>Last updated: 1st July 2021</p>
          <p>
              EthPays (defined below under “Our relationship to you”) is committed to protecting the privacy of visitors to our websites and our customers. This Privacy Policy describes how we handle your personal data when you access our services, which include our content on the websites located at EthPays.com, buy.EthPays.com, sell.EthPays.com or any other websites, pages, features, or content we own or operate (collectively, the "Site(s)"), or any EthPays API or third party applications relying on such an API, and related services (referred to collectively hereinafter as "Services").
          </p>
          <p>
              If you have any questions about this Policy, please send them to privacy@EthPays.com
          </p>
        </div>
        <h4 className='mt-5'>Changes to this privacy policy</h4>
        <div>
          <p>
            We may modify this Privacy Policy from time to time. Please check the date at the bottom of this notice to see when it was last updated.
          </p>
        </div>
        <h4 className='mt-5'>Our Relationship to you</h4>
        <div>
          <p>
            EthPays operates internationally through different entities (together “EthPays”, “we”, “us”, “our”) in order to provide Services to our customers. The following table describes which entity (or entities) you are contracting with:
          </p>
          <p>
            The EthPays entity you contract with decides how your personal information is processed in relation to the Services provided to you (typically referred to as a “data controller”).
          </p>
          <p>
            EthPays entities may share your personal information with each other and use it in accordance with this Privacy Policy. For example, even if you reside in the United States your information may be shared with EthPays PTE Limited which provides support functions for our Services including technical infrastructure and customer support.
          </p>
        </div>
        <h4 className='mt-5'>Personal Information we collect</h4>
        <div>
          <p>
            Personal information means any data which relates to a living individual who can be identified from that data, or from that data and other information which is in the possession of, or is likely to come into the possession of, EthPays (or its representatives or service providers). In addition to factual information, it includes any expression of opinion about an individual and any indication of the intentions of EthPays or any other person in respect of an individual. The definition of personal information depends on the relevant law applicable for your physical location.
          </p>
        </div>
        <h5 className='mt-5'>Information you provide to us</h5>
        <div>
          <p>
            This includes information you provide to us in order to establish an account and access our Services. This information is either required by law (e.g. to verify your identity), necessary to provide the requested services (e.g. you will need to provide your bank account number if you would like to link that account to EthPays), or is relevant for our legitimate interests described in greater detail below.
          </p>
          <p>
            The nature of the Services you are requesting will determine the kind of personal information we might ask for, but may include:
          </p>
          <ul>
            <li><b>Identification Information:</b> Full name, date of birth, nationality, gender, signature, utility bills, photographs, phone number, home address, and/or email.</li>
            <li><b>Formal Identification Information:</b> Government issued identity document such as Passport, Driver's License, National Identity Card, State ID Card, Tax ID number, passport number, driver's license details, national identity card details, visa information, and/or any other information deemed necessary to comply with our legal obligations under financial or anti-money laundering laws.</li>
            <li><b>Institutional Information:</b> Employer Identification number (or comparable number issued by a government), proof of legal formation (e.g. Articles of Incorporation), personal identification information for all material beneficial owners.</li>
            <li><b>Financial Information:</b> Bank account information, payment card primary account number (PAN), transaction history, trading data, and/or tax identification.</li>
            <li><b>Transaction Information:</b> Information about the transactions you make on our Services, such as the name of the recipient, your name, the amount, and/or timestamp.</li>
            <li><b>Employment Information:</b> Office location, job title, and/or description of role.</li>
            <li><b>Correspondence:</b> Survey responses, information provided to our support team or user research team.</li>
          </ul>
        </div>
        <h4 className='mt-5'>Information we collect automatically or generate about you</h4>
        <div>
          <p>
            This includes information we collect automatically, such as whenever you interact with the Sites or use the Services. This information helps us address customer support issues, improve the performance of our Sites and applications, provide you with a streamlined and personalized experience, and protect your account from fraud by detecting unauthorized access. Information collected automatically includes:
          </p>
          <ul>
            <li><b>Online Identifiers:</b> Geo location/tracking details, operating system, browser name and version, and/or personal IP addresses.</li>
            <li><b>Usage Data:</b> Authentication data, security questions, click-stream data, public social networking posts, and other data collected via cookies and similar technologies. Please read our Cookie Policy for more information.</li>
          </ul>
        </div>
        <h5 className='mt-5'>Information we collect from other sources</h5>
        <div>
          <p>
            This includes information we may obtain about you from third party sources. The main types of third parties we receive your personal information from are:
          </p>
          <ul>
            <li><b>Identity Verification Providers:</b> We may receive information about you from identity verification providers, such as your name, date of birth, address, and/or other information necessary to verify your identity.</li>
            <li><b>Payment Providers:</b> We may receive information about you from payment providers, such as your name, address, and/or payment card details.</li>
            <li><b>Other Third Parties:</b> We may receive information about you from other third parties, such as your name, address, and/or other information necessary to verify your identity.</li>
          </ul>
        </div>
        <h5 className='mt-5'>Anonymized and aggregated data</h5>
        <div>
          <p>
            We may also collect anonymized and aggregated data about you. This data is not personal information and cannot be used to identify you. We may use this data for any purpose, including to improve our Services and to develop new products and services.
          </p>
        </div>
      </div>
    )
}

const AmlKyc = () => {
    return (
      <div>
        <h2 style={{"fontSize": "1.8rem"}} id="kyc">AML / KYC Policy</h2>
        <div>
          <p className='mt-4' style={{"fontSize": "1rem"}}>Last updated: 1st July 2021</p>
        </div>
      </div>
    )
}

const CookiePolicy = () => {
    return (
      <div>
        <h2 style={{"fontSize": "1.8rem"}} id="cp">Cookie Policy</h2>
        <div>
          <p className='mt-4' style={{"fontSize": "1rem"}}>Last updated: 1st July 2021</p>
        </div>
      </div>
    )
}
          

UserAccount.propTypes = propTypes;
UserAccount.defaultProps = defaultProps;

export default UserAccount;