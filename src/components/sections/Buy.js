import classNames from 'classnames';
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../elements/Button';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MenuItem from '@mui/material/MenuItem';
import { Select } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import jwt_decode from 'jwt-decode';
import CheckoutForm from "./partials/Checkoutform";
import { useHistory } from "react-router-dom";

const currencies = [
  {
    value: "usd",
    label: "$",
  },
  {
    value: "eur",
    label: "€",
  },
  {
    value: "chf",
    label: "",
  }
];

const cryptoCurrencies = [
  {
    value: "btc",
    label: "BTC",
  },
  {
    value: "eth",
    label: "ETH",
  },
  {
    value: "xrp",
    label: "XRP",
  },
  {
    value: "ltc",
    label: "LTC",
  },
  {
    value: "usdt",
    label: "USDT",
  },
];

const stripePromise = loadStripe("pk_test_51MK1aJB8puJ7LDYcie0xMZS5aKoxB6p4CyTWtP10iICaHSZ9CrDigMT8PpQivmJADW9i5bmt6fcZkub8AvO4vKcb002AsvyhjV");

function LinkTab(props) {
  return (
    <Tab
      sx={{ color: '#5c6549', fontWeight: '300', '&.Mui-selected': { color: '#768d5c', borderBottom: '2px solid #9CA9B3' } }}
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

const SellCrypto = ({
  ...props
}) => {
  return (
    <TextField
      required
      id="outlined-required"
      type="password"
      label="Password"
      sx={{ '& input' : {color: '#5c6549'}, '& label.Mui-focused': { color: '#5c6549' }, '& label' : {color: '#5c6549'}, 
      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#5c6549' }, '&:hover fieldset': { borderColor: '#5c6549' }, 
      '&.Mui-focused fieldset': { borderColor: '#5c6549' }} }}
    />
  );
}

const Buy = ({
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
    const history = useHistory();
    
    const [clientSecret, setClientSecret] = useState("");
    const [showPayment, setShowPayment] = useState(false);
    const [value, setValue] = React.useState(0);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [countdown, setCountdown] = useState(25);
    
    const [currency, setCurrency] = useState('USD');
    const [cryptoCurrency, setCryptoCurrency] = useState('BTC');
    const [moneyValue, setMoneyValue] = useState(0);
    const [cryptoValue, setCryptoValue] = useState(0);
    const [email, setEmail] = useState('');

    const [binanceBtc, setBinanceBtc] = useState(null);
    const [binanceEth, setBinanceEth] = useState(null);
    const [binanceXrp, setBinanceXrp] = useState(null);
    const [binanceLtc, setBinanceLtc] = useState(null);
    const binanceUsdt = 1;

    const { user } = useAuthContext();
    const userDecoded = user ? jwt_decode(user.accessToken) : null;
    const userUuid = userDecoded ? userDecoded.uuid : null;
    const isUserLoggedIn = userDecoded ? true : false;

    const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap center-content',
      pushLeft && 'push-left'
    );

    const outerClasses = classNames(
      'section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );
    
    const handleChange = (event, newValue) => {
      setCryptoValue(0);
      setValue(newValue);
    };

    const hadleBuy = () => {
      let uUuid = userUuid;

      const metadata = {
        currency: currency,
        moneyValue: moneyValue,
        cryptoCurrency: cryptoCurrency,
        cryptoValue: cryptoValue,
        userUuid: uUuid,
        type: 'buy',
      }

      const res = axios.post('http://localhost:5001/v1/create-payment-intent', {currency: currency, money: moneyValue, metadata}).then(res => {
        setClientSecret(res.data.clientSecret);
      });
      setShowPayment(true);
    }

    function calculateCryptoPrice(value, cryptoPrice) {
      if (value >= 1500) {
         cryptoPrice = cryptoPrice.toFixed(2);
      } else if (value >= 500) {
         cryptoPrice = cryptoPrice.toFixed(4);
      } else if (value >= 100) {
         cryptoPrice = cryptoPrice.toFixed(5);
      } else if (value < 100) {
         cryptoPrice = cryptoPrice.toFixed(6);
      }
      return cryptoPrice;
   }

    function handleSpendChange(value, cryptoValue) {
      let cryptoPrice = null
      
      switch (cryptoValue) {
        case 'btc':
          cryptoPrice = value / binanceBtc;
          setCryptoValue(calculateCryptoPrice(value, cryptoPrice));
          break;
        case 'eth':
          cryptoPrice = value / binanceEth;
          setCryptoValue(calculateCryptoPrice(value, cryptoPrice));
          break;
        case 'xrp':
          cryptoPrice = value / binanceXrp;
          setCryptoValue(calculateCryptoPrice(value, cryptoPrice));
          break;
        case 'ltc':
          cryptoPrice = value / binanceLtc;
          setCryptoValue(calculateCryptoPrice(value, cryptoPrice));
          break;
        case 'usdt':
          setCryptoValue(binanceUsdt * value);
          break;
        default:
          cryptoPrice = value / binanceBtc;
          setCryptoValue(calculateCryptoPrice(value, cryptoPrice));
          break;
      }
    }

    function handleReceiveCryptoSelect(value) {
      setCryptoCurrency(value);
      handleSpendChange(moneyValue, value);
    }

    function refreshPrices() {
      axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT').then(res => {
        if (res.status === 200) {
          setBinanceBtc(res.data.price);
        } else {
          setBinanceBtc(null);
        }
      });

      axios.get('https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT').then(res => {
        if (res.status === 200) {
          setBinanceEth(res.data.price);
        } else {
          setBinanceEth(null);
        }
      });

      axios.get('https://api.binance.com/api/v3/avgPrice?symbol=XRPUSDT').then(res => {
        if (res.status === 200) {
          setBinanceXrp(res.data.price);
        } else {
          setBinanceXrp(null);
        }
      });

      axios.get('https://api.binance.com/api/v3/avgPrice?symbol=LTCUSDT').then(res => {
        if (res.status === 200) {
          setBinanceLtc(res.data.price);
        } else {
          setBinanceLtc(null);
        }
      });
    }

    useEffect(() => {
      const handleWindowResize = () => {
        setWindowSize(window.innerWidth);
      };
  
      window.addEventListener("resize", handleWindowResize);

      //check wheather the user is logged in or not, if not then redirect to login page
      if (!isUserLoggedIn) {
        history.push('/login');
      }
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    });

    useEffect(() => {
      axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT').then(res => {
        if (res.status === 200) {
          setBinanceBtc(res.data.price);
        } else {
          setBinanceBtc(null);
        }
      });

      axios.get('https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT').then(res => {
          if (res.status === 200) {
            setBinanceEth(res.data.price);
          } else {
            setBinanceEth(null);
          }
        });

      axios.get('https://api.binance.com/api/v3/avgPrice?symbol=XRPUSDT').then(res => {
        if (res.status === 200) {
          setBinanceXrp(res.data.price);
        } else {
          setBinanceXrp(null);
        }
      });

      axios.get('https://api.binance.com/api/v3/avgPrice?symbol=LTCUSDT').then(res => {
        if (res.status === 200) {
          setBinanceLtc(res.data.price);
        } else {
          setBinanceLtc(null);
        }
      });
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setCountdown(countdown => {
          if (countdown <= 1) {
            refreshPrices();
            return 25; // Replace with desired number of seconds
          } else {
            return countdown - 1;
          }
        });
      }, 1000);
  
      const startTime = Date.now();
  
      return () => {
        clearInterval(interval);
        const endTime = Date.now();
        console.log(`Interval was active for ${endTime - startTime} ms`);
      };
    }, []);
  

    const appearance = {
      theme: 'flat',
      variables: {
        colorPrimary: '#768d5c',
        colorBackground: '#151719',
        colorText: '#ffffff',
      },
    };

    const options = {
      clientSecret,
      appearance,
    };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container center-content">
        <div className={innerClasses}>
          <div className={tilesClasses}>
            {clientSecret && showPayment && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>
            )}

            {!showPayment && binanceBtc != null && (
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Box
                  component="form"
                  sx={{
                  '& .MuiTextField-root': { m: 2},
                  bgcolor: '#1d1f21',
                  borderRadius: '20px'
                  }}
                  width="85%"
                  noValidate
                  autoComplete="off"
                  style={{width: windowSize > 1080 ? "650px" : "400px"}}
                >
                  <Box sx={{ width: '100%' }} className="mb-2">
                    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" centered sx={{ mt: 3 }}>
                      <LinkTab label="Buy Crypto" />
                      <LinkTab label="Sell Crypto" disabled className="tab"/>
                    </Tabs>
                  </Box>
                  <div>
                    <TabPanel value={value} index={0}>
                      {isUserLoggedIn ?
                        null
                        :
                        <div>
                        <div style={{width: windowSize > 1080 ? "450px" : "350px", height: "20px", margin: "auto"}} className="mt-2">
                          <p style={{color: "#9CA9B3", margin: "auto", textAlign: "left", marginLeft: "2px", marginBottom: "2px", fontSize: "16px"}}>Your Email:</p>
                        </div>
                          <OutlinedInput
                            id="outlined-adornment-weight"
                            style={{
                              backgroundColor: "#2c2c2e",
                              color: "#e4f1da",
                              padding: 0,
                              borderRadius: "10px",
                              width: windowSize > 1080 ? "450px" : "350px",
                            }}
                            required
                            onChange={(e) => {setEmail(e.target.value)}}
                            className='mt-2'
                            type='email'
                          >
                          </OutlinedInput>
                        </div>
                      }
                      <div style={{width: windowSize > 1080 ? "450px" : "350px", height: "20px", margin: "auto"}} className="mt-2">
                        <p style={{color: "#9CA9B3", margin: "auto", textAlign: "left", marginLeft: "2px", marginBottom: "2px", fontSize: "16px"}}>You Spend:</p>
                      </div>
                      <div>
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        style={{
                          backgroundColor: "#2c2c2e",
                          color: "#e4f1da",
                          padding: 0,
                          borderRadius: "10px",
                          width: windowSize > 1080 ? "450px" : "350px",
                        }}
                        onChange={(e) => {
                          setMoneyValue(e.target.value);
                          handleSpendChange(e.target.value, cryptoCurrency);
                        }}
                        className='mt-2'
                        type='number'
                        endAdornment={
                          <InputAdornment position="end">
                            <Select
                              defaultValue="usd"
                              onChange={(e) => setCurrency(e.target.value)}
                              sx={{
                                backgroundColor: "#39393d",
                                color: "#e4f1da",
                                borderRadius: "10px",
                                borderTopLeftRadius: "2px",
                                borderBottomLeftRadius: "2px",
                                width: windowSize > 1080 ? "150px" : "100px",
                              }}
                              inputProps={{
                                MenuProps: {
                                  MenuListProps: {
                                    sx: {
                                      backgroundColor: "#39393d",
                                      color: "#e4f1da",
                                    },
                                  },
                                },
                              }}
                            >
                              {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.value}
                                </MenuItem>
                              ))}
                            </Select>
                          </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                      />
                      </div>
                      
                      <div style={{width: windowSize > 1080 ? "450px" : "350px", height: "20px", margin: "auto"}} className="mt-4">
                        <p style={{color: "#9CA9B3", margin: "auto", textAlign: "left", marginLeft: "2px", marginBottom: "2px", fontSize: "16px"}}>You Receive About:</p>
                      </div>
                      <div>
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        style={{
                          backgroundColor: "#2c2c2e",
                          color: "#e4f1da",
                          padding: 0,
                          borderRadius: "10px",
                          width: windowSize > 1080 ? "450px" : "350px",
                        }}
                        disabled
                        className='mt-2'
                        type='number'
                        value={cryptoValue}
                        onChange={(e) => {
                          if (e.target.value !== cryptoValue) {
                            setCryptoValue(e.target.value)
                          }
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <Select
                              defaultValue="btc"
                              onChange={(e) => {
                                handleReceiveCryptoSelect(e.target.value)
                              }}
                              sx={{
                                backgroundColor: "#39393d",
                                color: "#e4f1da",
                                borderRadius: "10px",
                                borderTopLeftRadius: "2px",
                                borderBottomLeftRadius: "2px",
                                width: windowSize > 1080 ? "150px" : "100px",
                              }}
                              inputProps={{
                                MenuProps: {
                                  MenuListProps: {
                                    sx: {
                                      backgroundColor: "#39393d",
                                      color: "#e4f1da",
                                    },
                                  },
                                },
                              }}
                            >
                              {cryptoCurrencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.value}
                                </MenuItem>
                              ))}
                            </Select>
                          </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                      />
                      </div>
                    </TabPanel>
                    <p>Prices will refresh in {countdown} seconds</p>
                    <TabPanel value={value} index={1}>
                      <SellCrypto />
                    </TabPanel>
                  </div>
                  {

                  }
                  <Button tag="a" color="primary" wideMobile style={{marginTop: '20px', marginBottom: '50px', color: '#5c6549'}} onClick={hadleBuy} className="buyBtcg">
                      Buy
                  </Button>
                </Box>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Buy;