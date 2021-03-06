import React, { useState, useEffect } from 'react';
import Modal from "../Modal";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import queryStringParser from "qs"
import { getAccessToken } from '../../api/twitter';
import InitialStep from '../Modal/InitialStep';
import ConnectTwitterSuccess from '../Modal/ConnectTwitterSuccess';
import Loading from '../Modal/Loading';
import ErrorLogger from '../../services/error-logger';
import Cache from '../../services/cache';
import { getReferralCode, redeemReferralCode } from '../../api/referral';
import { getPosition } from '../../api/user';

const STEPS = {
  INITIAL_STEP: () => InitialStep,
  CONNECT_TWITTER_SUCCESS: () => ConnectTwitterSuccess,
  LOADING: () => Loading
}

function Widget() {
  const [show, setShow] = useState(false);
  const [StepComponent, setStepComponent] = useState(STEPS.INITIAL_STEP);
  const [referralCode, setReferralCode] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const handleTwitterRedirect = async ({ oauth_token, oauth_verifier }) => {
      const { token } = await getAccessToken({
        oAuthToken: oauth_token,
        oAuthVerifier: oauth_verifier
      });
      
      Cache.saveToken(token);

      const existingReferralCode = Cache.getReferralCode();
      
      if (existingReferralCode) {
        await redeemReferralCode(existingReferralCode)
        Cache.removeReferralCode();
      }
  
      const generatedReferralCode = await getReferralCode();
      const position = await getPosition();
  
      setReferralCode(generatedReferralCode);
      setPosition(position);
  
      setStepComponent(STEPS.CONNECT_TWITTER_SUCCESS);
    }

    const handleQueryParams = async () => {
      const url = window.location.href.split("?")[1];
      const res = queryStringParser.parse(url, { ignoreQueryPrefix: true });
      
      if (Object.keys(res).length === 0) {
        return;
      }

      try {
        setShow(true);
        setStepComponent(STEPS.LOADING);

        const { oauth_token, oauth_verifier, referral_code } = res;

        if (oauth_token && oauth_verifier) {
          handleTwitterRedirect({
            oauth_token,
            oauth_verifier
          });
          return;
        }

        if (referral_code) {
          Cache.saveReferralCode(referral_code);
          setStepComponent(STEPS.INITIAL_STEP);
          return;
        }
      } catch (e) {
        ErrorLogger.send(e);
        // TODO: create error step
        setStepComponent(STEPS.INITIAL_STEP);
      }
    }
    
    handleQueryParams();
  }, []);

  const handleShow = () => setShow(true);
  
  return (
    <Container>
      <Button onClick={handleShow} variant="secondary">Get Access</Button>
      <FooterContainer>
        <span>Made with ❤️ by <a href="https://usemicro.com" target="_blank">Micro</a></span>
      </FooterContainer>
      <Modal 
        show={show} 
        setShow={setShow} 
        StepComponent={StepComponent}
        referralCode={referralCode}
        position={position}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 16px;
  flex-direction: column;
  align-items: center;
`

const FooterContainer = styled.div`
  font-size: 12px;
  margin-top: 12px
`

export default Widget;
