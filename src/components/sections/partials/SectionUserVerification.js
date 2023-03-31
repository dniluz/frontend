import React, { useState, useContext } from 'react';
import { AuthContext } from "../../../contexts/AuthContext";
import jwt_decode from "jwt-decode";
import axios from "axios";

const SectionUserVerification = ({
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
        const [complycube, setComplyCube] = useState(null);
        const [kycToken, setKycToken] = useState(null);
        
        const { user } = useContext(AuthContext);
        const userDecoded = user ? jwt_decode(user.accessToken) : null;
        const userUuid = userDecoded ? userDecoded.uuid : null;

        async function startVerification () {
          await getKycToken();
          console.log(kycToken);
          const script = document.createElement('script');
          script.src = 'https://assets.complycube.com/web-sdk/v1/complycube.min.js';
          script.async = true;
          script.onload = () => {
            setComplyCube(window.ComplyCube.mount({
              token: kycToken,
              onComplete: function(data) {
                console.log("Capture complete", data);
              },
            }));
          };
          document.body.appendChild(script);
        }

        async function getKycToken () {
            const res = await axios.get(process.env.REACT_APP_API_URL + 'user/' + userUuid + '/newKycToken').then((response) => {
                return response.data;  
            });
            setKycToken(res.token);
        }
        
    return (
        <div className="section-inner">
            <div id="complycube-mount"></div>
            <h1>SectionUserVerification</h1>
            <button onClick={startVerification}>
                Start verification
            </button>
        </div>
    )
}


export default SectionUserVerification;