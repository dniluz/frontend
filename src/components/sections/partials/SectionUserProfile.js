import React from "react";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Chip from '@mui/material/Chip';

const SectionUserProfile = ({
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

        const { user } = useContext(AuthContext);
        const [userCompany, setUserCompany] = useState(null);
        const [userTransactions, setUserTransactions] = useState(null);
        const [lastUserTransaction, setLastUserTransaction] = useState(null);
        const userDecoded = user ? jwt_decode(user.accessToken) : null;
        const userUuid = userDecoded ? userDecoded.uuid : null;
        const companyLogo = userCompany ? userCompany.logo_url : null;
        const userStatus = user ? user.status : 999;
        const userLetter = userDecoded ? userDecoded.username.charAt(0).toUpperCase() : null;

        function smallerTransactionUuid(uuid) {
            let newTransaction = uuid.substring(0, 3) + '..' + uuid.substring(uuid.length - 3)
            return newTransaction;
        }

        useEffect(() => {
            const getUserCompany = async () => {
              try {
                const res = await axios.get(process.env.REACT_APP_API_URL + 'companys/user/' + userUuid).then((response) => {
                  return response.data.data;
                });
                setUserCompany(res[0]);
              } catch (error) {}
            };
            getUserCompany();

            const getUserTransactions = async () => {
                try {
                    const res = await axios.get(process.env.REACT_APP_API_URL + 'transactions/user/' + userUuid).then((response) => {
                        console.log(response.data.data);
                        return response.data.data;
                    });
                    setUserTransactions(res);
                } catch (error) {}
            };
            getUserTransactions();

            const getLastUserTransaction = async () => {
                try {
                    const res = await axios.get(process.env.REACT_APP_API_URL + 'transactions/user/' + userUuid + '/last_two').then((response) => {
                        return response.data.data;
                    });
                    setLastUserTransaction(res);
                } catch (error) {}
            };
            getLastUserTransaction();
        }, [userUuid]);

        return (
            <>
                {userStatus === 200 && userCompany != null ? (
                    <div className="SectionUserProfile">
                        <section>
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="card mb-4">
                                            <div className="card-body text-center items-center justify-content-center row">
                                                { companyLogo ? (
                                                    <img src={companyLogo} alt="avatar" className="rounded-circle img-fluid" style={{width: "150px"}} />
                                                ) : (
                                                <Avatar sx={{ width: 150, height: 150, backgroundColor: '#768d5c', fontSize: '80px' }} className='rounded-circle img-fluid'>{userLetter}</Avatar>
                                                )}
                                                <h5 className="my-3">{userDecoded.username}</h5>
                                                {userDecoded.role === "owner" ? (
                                                    <p className="mb-1 text-danger">Owner</p>
                                                ) : userDecoded.role === "partner" ? (
                                                    <p className="mb-1 text-primary">Partner</p>
                                                ) : (
                                                    <p className="mb-1 text-primaryx">{userDecoded.role}</p>
                                                )}
                                                {userCompany.default === "true" ? (
                                                    <p className="mb-1 text-primaryx">{userDecoded.surname}</p>
                                                ) : (
                                                <p className="text-muted mb-4 mr-2">{userCompany.name}
                                                {userCompany.star === "true" ? (
                                                    <VerifiedIcon style={{color: "#768d5c", width: "20px", marginLeft: "5px"}} />
                                                ) : null }
                                                </p>
                                                )}
                                                {/* <div className="d-flex justify-content-center mb-2">
                                                    <button type="button" className="btn btn-primary">Follow</button>
                                                    <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                                </div> */}
                                            </div>
                                        </div>
                                        {userTransactions != null ? (
                                            <div className="card mb-4 mb-lg-0">
                                                <div className="card-body p-0">
                                                    <ul className="list-group list-group-flush rounded-3">
                                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                            <p className="mb-0 text-primaryx">Recent Transactions</p>
                                                        </li>
                                                        {lastUserTransaction != null ? (
                                                            <>
                                                                {lastUserTransaction.map((transaction, i) => (
                                                                   <Link to={`/transactions/${transaction.uuid}`} className="list-group-item d-flex p-2" key={i}>
                                                                   <img
                                                                       src={transaction.ft_crypto_logo}
                                                                       className="rounded transaction-icon"
                                                                       alt="crypot-logo"
                                                                   />
                                                                   <div className="d-flex flex-column justify-content-start align-items-start w-100 ml-2">
                                                                       <div className="d-flex justify-content-between w-100 align-items-center">
                                                                           {transaction.type === "buy" ? (
                                                                               <p className="mb-0 transactions-brief-buy left-0">{smallerTransactionUuid(transaction.uuid)} <span className="c34k5hkjhw3jk4">- ${transaction.amount}</span></p>
                                                                               ) : (
                                                                               <p className="mb-0 transactions-brief-sell">{smallerTransactionUuid(transaction.uuid)} <span className="c34k5hkjhw3jk4">- ${transaction.amount}</span></p>
                                                                           )}
                                                                           <div>
                                                                               { transaction.status === "pending" ? (
                                                                                   <Chip label={transaction.status} color="warning" variant="outlined" />
                                                                               ) : transaction.status === "completed" ? (
                                                                                   <Chip label={transaction.status} color="success" variant="outlined" />
                                                                               ) : transaction.status === "error" ? (
                                                                                   <Chip label={transaction.status} color="error" variant="outlined" />
                                                                               ) :  transaction.status === "initialized" ? (
                                                                                   <Chip label={transaction.status} color="info" variant="outlined" />
                                                                               ) : (
                                                                                   <Chip label="contact support" color="warning" variant="outlined" />
                                                                               )}
                                                                           </div>
                                                                       </div>
                                                                   </div>
                                                               </Link>
                                                                ))}
                                                                <Link to={`/transactions/`} className="list-group-item d-flex justify-content-between align-items-center p-2">
                                                                    <p className="mb-0">All Transactions</p>
                                                                </Link>
                                                            </>
                                                        ) : null}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Full Name</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{userDecoded.surname + " " + userDecoded.name}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Email</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{userDecoded.email}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                {userCompany != null ? (
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <p className="mb-0">Company</p>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <p className="text-muted mb-0">{userCompany.name}
                                                            {userCompany.star === true ? (
                                                                <VerifiedIcon style={{color: "#768d5c", width: "20px", marginLeft: "5px"}} />
                                                            ) : null }
                                                            </p>
                                                            
                                                        </div>
                                                    </div>
                                                ) : null}
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Verification</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">KYC - {userDecoded.verificationLevel}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">User uid</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{userDecoded.uuid}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-md-6">
                                                <div className="card mb-4 mb-md-0">
                                                    <div className="card-body">
                                                        <p className="mb-4"><span className="text-primaryx font-italic me-1">assigment</span> Project Status
                                                        </p>
                                                        <p className="mb-1" style={{fontSize: ".77rem"}}>Web Design</p>
                                                        <div className="progress rounded" style={{height: "5px"}}>
                                                            <div className="progress-bar" role="progressbar" style={{widows: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Website Markup</p>
                                                        <div className="progress rounded" style={{height: "5px"}}>
                                                            <div className="progress-bar" role="progressbar" style={{width: "72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>One Page</p>
                                                        <div className="progress rounded" style={{height: "5px"}}>
                                                            <div className="progress-bar" role="progressbar" style={{width: "89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Mobile Template</p>
                                                        <div className="progress rounded" style={{height: "5px"}}>
                                                            <div className="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Backend API</p>
                                                        <div className="progress rounded mb-2" style={{height: "5px"}}>
                                                            <div className="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    ) : null
                }
            </>
    )
}


export default SectionUserProfile;