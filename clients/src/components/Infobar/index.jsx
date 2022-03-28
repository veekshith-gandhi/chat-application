/** @format */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faClose } from "@fortawesome/free-solid-svg-icons";
import styles from "./infobar.module.css";

const InfoBar = ({ room }) => (
  <div className={styles.infoBar}>
    <div className={styles.leftInnerContainer}>
      <FontAwesomeIcon
        className={styles.onlineIcon}
        alt="online icon"
        icon={faCircle}
      />
      <h3>{room}</h3>
    </div>
    <div className={styles.rightInnerContainer}>
      <a href="/">
        <FontAwesomeIcon icon={faClose} />
      </a>
    </div>
  </div>
);

export default InfoBar;
