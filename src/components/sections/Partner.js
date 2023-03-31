import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '../elements/Button';

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

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          
          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image">
                    <h4 className="mt-0 mb-8 x32hj4grdhjg32f reveal-from-left" data-reveal-delay="350">Revenue</h4>
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <p className='c34k5hkjhw3jk4 reveal-from-left' data-reveal-delay="450"><b>Start incrasing your income with crypto</b></p>
                  <p className="m-0 text-sm reveal-from-left" data-reveal-delay="550">
                    Start accepting cryptocurrency as a payments method today, or start using our simple integration to automate cryptocurrency transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-right" data-reveal-delay="750">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <img 
                  src='images/partner-phone.png'
                  width='100%'
                  height='100%'
                  alt='partner'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={innerClasses}>
            <div className={tilesClasses}>
              <div className="tiles-item reveal-from-left" data-reveal-delay="1350">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <img 
                    src='images/globe.svg'
                    width='50%'
                    height='50%'
                    alt='partner'
                    />
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-bottom" data-reveal-delay="800">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image">
                      <h4 className="mt-0 mb-8 x32hj4grdhjg32f reveal-from-right" data-reveal-delay="950">User Coverage</h4>
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <p className='c34k5hkjhw3jk4 reveal-from-right' data-reveal-delay="1050"><b>We support Customer All around the world</b></p>
                    <p className="m-0 text-sm reveal-from-right" data-reveal-delay="1150">
                      We are regulated in the UK and have a global presence. We support almost all countries and currencies, and we are constantly expanding our reach.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={innerClasses}>
            <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#97b764', borderRadius: '20px', minHeight: 185 }}>
              <Grid
                container
                spacing={2}
              >
                <Grid  {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className='container_234ghjwegr  reveal-from-bottom' data-reveal-delay="200">
                    <div className='center_234ghjwegr'>
                      <p className='c34k5hkjhw3jk3 jsgfhjsa3242'><b>100+</b></p>
                      <p className='c34k5hkjhw3jk4'>Supported Cryptocurrencies</p>
                    </div>
                  </div>
                </Grid>
                <Grid  {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className='container_234ghjwegr reveal-from-bottom' data-reveal-delay="250">
                    <div className='center_234ghjwegr'>
                      <p className='c34k5hkjhw3jk3 jsgfhjsa3242 '><b>20+</b></p>
                      <p className='c34k5hkjhw3jk4'>Supported gateway</p>
                    </div>
                  </div>
                </Grid>
                <Grid  {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className='container_234ghjwegr reveal-from-bottom' data-reveal-delay="300">
                    <div className='center_234ghjwegr'>
                      <p className='c34k5hkjhw3jk3 jsgfhjsa3242'><b>200+</b></p>
                      <p className='c34k5hkjhw3jk4'>Supported Countries</p>
                    </div>
                  </div>
                </Grid>
                <Grid  {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className='container_234ghjwegr reveal-from-bottom' data-reveal-delay="350">
                    <div className='center_234ghjwegr'>
                      <p className='c34k5hkjhw3jk3 jsgfhjsa3242'><b>10+</b></p>
                      <p className='c34k5hkjhw3jk4'>Supported Networks</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>

          <div className={innerClasses}>
            <div className={tilesClasses}>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image">
                      <h4 className="mt-0 mb-8 x32hj4grdhjg32f reveal-from-left" data-reveal-delay="450">KYC</h4>
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <p className='c34k5hkjhw3jk4 reveal-from-left' data-reveal-delay="550"><b>Anti Money-Laundering Policy</b></p>
                    <p className="m-0 text-sm reveal-from-left" data-reveal-delay="650">
                      You can choose from which amount of money your want to verificate your users (our limit is 2000$/mo). We take care of your users privacy and we don't store any personal information of the users.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-right" data-reveal-delay="850">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <img 
                    src='images/kyc.png'
                    width='60%'
                    alt='partner'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={innerClasses}>
            <div className={tilesClasses}>
              <div className=" reveal-from-bottom">
                <div className="">
                  <h4 className="mt-0 mb-8 x32hj4grdhjg32f">Easy implementation</h4>
                  <p className='c34k5hkjhw3jk4'><b>Our implementation is very simple and clear</b></p>
                  <p className="text-sm">
                      Our Simple integration is made to be as easy as possible. We provide you with a simple API and a dashboard to manage everything.
                      We support multiple stacks, such as NodeJS and PHP. We also provide you with a simple integration guide, and vaious examples.
                      If you need any help, we are always here to help you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={innerClasses}>
            <div className={tilesClasses}>
              <div className=" reveal-from-bottom">
                <div className="">
                  <h4 className="mt-0 mb-8 x32hj4grdhjg32f">Examples & Docs</h4>
                  <p className='c34k5hkjhw3jk4'><b>Here you can find useful examples and all needed documentation</b></p>
                  <div className='container_234ghjwegr jaskh234kjh'>
                    <div className='center_234ghjwegr'>
                      <Button tag="a" color="dark" wideMobile href="/dev/example" className={"fdsk2j3h5j"}>
                        Examples
                      </Button>
                      <Button tag="a" color="dark" wideMobile href="docs.ethpays.co/start" className={"fdsk2j3h4j"}>
                        Docs
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
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