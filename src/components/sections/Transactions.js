import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Button from '../elements/Button';

const Transactions = ({
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

  const { user } = useContext(AuthContext);
  const [userTransactions, setUserTransactions] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);
  const userDecoded = user ? jwt_decode(user.accessToken) : null;
  const userUuid = userDecoded ? userDecoded.uuid : null;
  const userDebug = userDecoded ? userDecoded.debug : null;

  async function handleDebugBurner() {
    setIsRefreshing(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'transactions/debug/burner',
        {
          userUuid: userUuid,
        }
      );
      setUserTransactions(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  }

  async function handleDebugRestore() {
    setIsRefreshing(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'transactions/debug/restore',
        {
          userUuid: userUuid,
        }
      );
      setUserTransactions(response.data.data);
      setUpdateCounter(updateCounter + 1);
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  }  
  

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + 'transactions/user/' + userUuid
        );
        setUserTransactions(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserTransactions();
  }, [userUuid]);

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + 'transactions/user/' + userUuid
        );
        setUserTransactions(res.data.data);
        setUpdateCounter(updateCounter + 1);
      } catch (error) {
        console.log(error);
      }
    };
    getUserTransactions();
  }, [userUuid, updateCounter]);

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        {userTransactions != null ? (
          <div className="card mb-4 mb-lg-0">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush rounded-3">
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <p className="mb-0 text-primaryx">All Transactions</p>
                </li>
                {userTransactions.map((transaction, i) => {
                  return (
                    <Link
                      to={`/transactions/${transaction.uuid}`}
                      className="list-group-item d-flex justify-content-between align-items-center p-2"
                      key={i}
                    >
                      <p className="mb-0 transaction-items">
                        <img
                          src={transaction.ft_crypto_logo}
                          className="rounded transaction-icon"
                          alt="crypot-logo"
                        />
                       {transaction.ft_crypto_name +
                          ' ' +
                          transaction.type +
                          ' (' +
                          transaction.amount +
                          '$ - ' +
                          transaction.crypto_amount +
                          ' ' +
                          transaction.ft_crypto_symbol +
                          ')'}
                        <br />
                        {format(new Date(transaction.date), 'MM/dd/yyyy')}
                      </p>
                      {transaction.status === 'pending' ? (
                        <Chip
                          label={transaction.status}
                          color="warning"
                          variant="outlined"
                        />
                      ) : transaction.status === 'completed' ? (
                        <Chip
                          label={transaction.status}
                          color="success"
                          variant="outlined"
                        />
                      ) : transaction.status === 'error' ? (
                        <Chip
                          label={transaction.status}
                          color="error"
                          variant="outlined"
                        />
                      ) : transaction.status === 'initialized' ? (
                        <Chip
                          label={transaction.status}
                          color="info"
                          variant="outlined"
                        />
                      ) : (
                        <Chip
                          label="contact support"
                          color="warning"
                          variant="outlined"
                        />
                      )}
                    </Link>
                  );
                })}
                {userDebug ? (
                  <a className="items-center p-3">
                    <p className="mb-0 align-items-center items-center text-center">
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        className="mr-4"
                        onClick={handleDebugBurner}
                        disabled={isRefreshing}
                      >
                        {isRefreshing ? 'Refreshing...' : 'To Burner'}
                      </Button>
                      <Button tag="a" color="primary" wideMobile className="ml-4">
                        Delete
                      </Button>
                    </p>
                  </a>
                ) : null}
              </ul>
            </div>
          </div>
        ) : null}
        {userTransactions == null && userDebug ? (
          <div className="card mb-4 mb-lg-0">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush rounded-3">
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <p className="mb-0 text-primaryx">No Transactions yet</p>
                </li>
                  <a className="items-center p-2">
                    <p className="mb-0 align-items-center items-center text-center">
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        className="mr-4"
                        onClick={handleDebugRestore}
                        disabled={isRefreshing}
                      >
                        {isRefreshing ? 'Refreshing...' : 'Restore 3 Transactions'}
                      </Button>
                    </p>
                  </a>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Transactions;
