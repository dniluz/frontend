import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const FeaturesTiles = ({
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

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Enter this new era',
    paragraph: 'Join 80M+ people holding cryptocurrencies for the first time. Get started with as little as $10.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/btc.svg')}
                      alt="Bitcoin Logo"
                      width={64}
                      height={64}
                      href={"/buy/btc"} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Bitcoin
                    </h4>
                  <p className="m-0 text-sm">
                  Bitcoin is a decentralized digital currency that can be transferred on the peer-to-peer bitcoin network. Bitcoin transactions are verified by network nodes.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/eth.svg')}
                      alt="Ethereum Logo"
                      width={64}
                      height={64}
                      href={"/buy/eth"} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Ethereum
                    </h4>
                  <p className="m-0 text-sm">
                  Ethereum is a decentralized, opensource blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Among cryptocurrencies.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/tether.svg')}
                      alt="Tether Logo"
                      width={64}
                      height={64}
                      href={"/buy/tether"} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Tether
                    </h4>
                  <p className="m-0 text-sm">
                  Tether, is an asset-backed cryptocurrency stablecoin. It was launched by the company Tether Limited Inc. in 2014, owned by the Hong Kong-based company iFinex.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/ltc.svg')}
                      alt="Litecoin Logo"
                      width={64}
                      height={64}
                      href={"/buy/ltc"} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Litecoin
                    </h4>
                  <p className="m-0 text-sm">
                  Litecoin is a decentralized peer-to-peer cryptocurrency and opensource software project released under the MIT/X11 license. Inspired by Bitcoin
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/bnb.svg')}
                      alt="Binance Coin Logo"
                      width={64}
                      height={64}
                      href={"/buy/bnb"} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Bnb
                    </h4>
                  <p className="m-0 text-sm">
                  Binance Coin is the cryptocurrency issued by Binance exchange and trades with the BNB symbol. As of Q2 2022, Binance Exchange is the largest cryptocurrency exchange in the world.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/sol.png')}
                      alt="Solana Logo"
                      width={64}
                      height={64}
                      href={"/buy/sol"} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Solana
                    </h4>
                  <p className="m-0 text-sm">
                  Solana is a cryptocurrency that was designed to work similarly to and improve upon Ethereum. Named after a small Southern Californian city.
                    </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;