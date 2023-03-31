import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const NotFound = ({
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

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
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
        </div>
      </div>
    </section>
  );
}

NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;