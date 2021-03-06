import React from 'react';
import Modal from "react-bootstrap/Modal";
import { css } from "styled-components";

import { SectionContainer } from "./styles";
import config from "../../../config";

const buildReferralLink = (referralCode) => `${config.webAppUrl}?referral_code=${referralCode}`;

function ConnectTwitterSuccess({ referralCode, position }) {
    return (
        <React.Fragment>
            <Modal.Header style={styles.ModalHeader}>
                <Modal.Title>Successful Twitter follow 🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SectionContainer css={styles.SectionContainer}>
                    <span>Congrats 🤗 You are <strong>#{position}</strong> in line</span>
                    <span>Here is your referral link:</span>
                    <a href={buildReferralLink(referralCode)}>{buildReferralLink(referralCode)}</a>
                </SectionContainer>
            </Modal.Body>
        </React.Fragment>
    )
}

const styles =  {
    SectionContainer: css`
        flex-direction: column;
        align-items: center;
    `,
    ModalHeader: {
        justifyContent: "center"
    },
    EmailButton: css`
        margin-top: 8px;
        background: #4BB543;
        border: none;
    `
}


export default ConnectTwitterSuccess;