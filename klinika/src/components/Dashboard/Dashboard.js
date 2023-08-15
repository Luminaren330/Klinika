import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";
import { links } from "../../data/navbar-data";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container_schedule}>
        <h4 className={styles.header}>Witaj</h4>
        <div className={styles.card_container}>
          {links.map((element) => {
            const { id, link, text } = element;
            return (
              <Link key={id} to={`${link}`} className={styles.card}>
                {text}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
