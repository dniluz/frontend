import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { FiInstagram, FiTwitter } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { AiFillMediumCircle } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';
import { IoBusinessSharp } from 'react-icons/io5';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const AboutUs = ({
  className,
  children,
  pushLeft,
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

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container has-top-divider">
        <div className="section-inner center-content">
          <h2 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
            We belive in the future of cryptocurrency.
          </h2>
          <p className="m-0 mb-32 reveal-from-bottom mt-3" data-reveal-delay="400">
            We are a team of cryptocurrency enthusiasts who believe in the future of cryptocurrency. We are here to help people get started with cryptocurrency and to help them understand the basics of cryptocurrency.
          </p>
          <p className="m-0 mb-32 reveal-from-bottom mt-3" data-reveal-delay="400">
            We look forward to make cryptocurrency more accessible to everyone, by developing a multitude of tools and services that will help people interact with cryptocurrency in a more user-friendly way.
          </p>
        </div>
        <div className={innerClasses}>
          <div className="the-team">
            <div className="row justify-content-center center-content">
              <h2 style={{marginTop: '-40px', marginBottom: '70px'}} className="reveal-from-top" data-reveal-delay="500">EthPays Team</h2>
              <div className="col-md-4 center-content reveal-from-right" data-reveal-delay="600">
                <div className="team-member">
                  <div className="team-img">
                    <img src="https://cdn.ethpays.co/v1/images/static/anto.png" className="img-responsive" alt="team member" width={"200px"} style={{borderRadius: '20%'}}/>
                  </div>
                  <div className="team-hover">
                    <div className="desk">
                      <h4 style={{marginBottom: '5px'}}>Antonio Foresta</h4>
                      <p>CEO &amp; Head Developer</p>
                    </div>
                    <div className="s-link">
                      <a href="#"><i className="fa fa-twitter"></i></a>
                      <a href="#"><i className="fa fa-facebook"></i></a>
                      <a href="#"><i className="fa fa-google-plus"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 center-content reveal-from-right" data-reveal-delay="700">
                <div className="team-member">
                  <div className="team-img">
                    <img src="https://cdn.ethpays.co/v1/images/static/default.jpg" className="img-responsive" alt="team member" width={"200px"} style={{borderRadius: '20%'}}/>
                  </div>
                  <div className="team-hover">
                    <div className="desk">
                      <h4 style={{marginBottom: '5px'}}>X X</h4>
                      <p>Co Founder</p>
                    </div>
                    <div className="s-link">
                      <a href="#"><i className="fa fa-twitter"></i></a>
                      <a href="#"><i className="fa fa-facebook"></i></a>
                      <a href="#"><i className="fa fa-google-plus"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 center-content reveal-from-right" data-reveal-delay="800">
                <div className="team-member">
                  <div className="team-img">
                    <img src="https://cdn.ethpays.co/v1/images/static/default.jpg" className="img-responsive" alt="team member" width={"200px"} style={{borderRadius: '20%'}}/>
                  </div>
                  <div className="team-hover">
                    <div className="desk">
                      <h4 style={{marginBottom: '5px'}}>X X</h4>
                      <p>Markeeting Manager</p>
                    </div>
                    <div className="s-link">
                      <a href="#"><i className="fa fa-twitter"></i></a>
                      <a href="#"><i className="fa fa-facebook"></i></a>
                      <a href="#"><i className="fa fa-google-plus"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 center-content reveal-from-right" data-reveal-delay="900">
                <div className="team-member">
                  <div className="team-img">
                    <img src="https://cdn.ethpays.co/v1/images/static/default.jpg" className="img-responsive" alt="team member" width={"200px"} style={{borderRadius: '20%'}}/>
                  </div>
                  <div className="team-hover">
                    <div className="desk">
                      <h4 style={{marginBottom: '5px'}}>X X</h4>
                      <p>Head Customer Support</p>
                    </div>
                    <div className="s-link">
                      <a href="#"><i className="fa fa-twitter"></i></a>
                      <a href="#"><i className="fa fa-facebook"></i></a>
                      <a href="#"><i className="fa fa-google-plus"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 center-content reveal-from-right" data-reveal-delay="1000">
                <div className="team-member">
                  <div className="team-img">
                    <img src="https://cdn.ethpays.co/v1/images/static/default.jpg" className="img-responsive" alt="team member" width={"200px"} style={{borderRadius: '20%'}}/>
                  </div>
                  <div className="team-hover">
                    <div className="desk">
                      <h4 style={{marginBottom: '5px'}}>X X</h4>
                      <p>Head Product</p>
                    </div>
                    <div className="s-link">
                      <a href="#"><i className="fa fa-twitter"></i></a>
                      <a href="#"><i className="fa fa-facebook"></i></a>
                      <a href="#"><i className="fa fa-google-plus"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 center-content reveal-from-right" data-reveal-delay="1100">
                <div className="team-member">
                  <div className="team-img">
                    <img src="https://cdn.ethpays.co/v1/images/static/default.jpg" className="img-responsive" alt="team member" width={"200px"} style={{borderRadius: '20%'}}/>
                  </div>
                  <div className="team-hover">
                    <div className="desk">
                      <h4 style={{marginBottom: '5px'}}>X X</h4>
                      <p>Head Lawyer</p>
                    </div>
                    <div className="s-link">
                      <a href="#"><i className="fa fa-twitter"></i></a>
                      <a href="#"><i className="fa fa-facebook"></i></a>
                      <a href="#"><i className="fa fa-google-plus"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={innerClasses}>
          <div className="Social-media center-content">
            <h2 style={{marginTop: '-40px', marginBottom: '70px'}} className="reveal-from-top" data-reveal-delay="500">Our Socials</h2>
            <div className="row justify-content-center center-content" style={{marginTop: '-15px'}}>
              <div className="col-md-4 center-content reveal-from-right mt-2" data-reveal-delay="600" style={{maxWidth: '130px', height: 'auto'}}>
                <div className="team-member">
                  <div className="team-img">
                    <a href="https://instagram.com/">
                      <FiInstagram size={75} style={{color: '#768d5c'}}/>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 center-content reveal-from-right mt-2" data-reveal-delay="600" style={{maxWidth: '130px', height: 'auto'}}>
                <div className="team-member">
                  <div className="team-img">
                    <a href="https://tiktok.com/">
                      <FaTiktok size={75} style={{color: '#768d5c'}}/>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 center-content reveal-from-right mt-2" data-reveal-delay="600" style={{maxWidth: '130px', height: 'auto'}}>
                <div className="team-member">
                  <div className="team-img">
                    <a href="https://instagram.com/">
                      <FiTwitter size={75} style={{color: '#768d5c'}}/>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 center-content reveal-from-right mt-2" data-reveal-delay="600" style={{maxWidth: '130px', height: 'auto'}}>
                <div className="team-member">
                  <div className="team-img">
                    <a href="https://instagram.com/">
                      <AiFillMediumCircle size={75} style={{color: '#768d5c'}}/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={innerClasses}>
          <div className="partners center-content">
            <h2 style={{marginTop: '-40px', marginBottom: '70px'}} className="reveal-from-top" data-reveal-delay="500">Our Objectives</h2>
          </div>

          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <IoIosPeople size={220} style={{color: 'white'}}/>
                </div>
              </div>
            </div>
            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image">
                    <h4 className="mt-0 mb-8 x32hj4grdhjg32f">The People</h4>
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <p className='c34k5hkjhw3jk4'><b>Our primary Focus is on People</b></p>
                  <p className="m-0 text-sm">
                    Our principal mission is to make the world of cryptocurrency more accessible to the masses. We want to make it easier for people to get into the crypto space.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <hr></hr>
          
          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image">
                    <h4 className="mt-0 mb-8 x32hj4grdhjg32f">Businesses</h4>
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <p className='c34k5hkjhw3jk4'><b>Our secondary Focus is on Businesses</b></p>
                  <p className="m-0 text-sm">
                  we want to assist not only individuals but also businesses to easily access the world of cryptocurrencies
                  </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <IoBusinessSharp size={175} style={{color: 'white'}}/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

AboutUs.propTypes = propTypes;
AboutUs.defaultProps = defaultProps;

export default AboutUs;